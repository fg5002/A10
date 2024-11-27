import { sveltekit } from '@sveltejs/kit/vite'; 
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({ 
  server: {
    https: true,
    proxy: {},
  },
  plugins: [ 
    sveltekit(),
    mkcert(),
    { 
      name: 'configure-response-headers', 
      configureServer: (server) => { 
        server.middlewares.use((_req, res, next) => { 
          res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp'); 
          res.setHeader('Cross-Origin-Opener-Policy', 'same-origin'); 
          next(); 
        }); 
      }, 
    }, 
  ],  
  optimizeDeps: {  
    exclude: ['sqlocal'],  
  },      
}); 