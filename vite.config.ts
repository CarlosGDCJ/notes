import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    // allows vite to access posts
    server: {
        fs: {
            allow: ['./notes']
        }
    }
});
