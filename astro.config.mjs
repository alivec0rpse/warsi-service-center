import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages deployment configuration
  site: 'https://warsi.qzz.io',
  base: '/',
  
  // Enable Tailwind CSS integration
  integrations: [tailwind()],
  
  // Build configuration for optimal performance
  build: {
    inlineStylesheets: 'auto',
  },
  
  // Compression and optimization
  compressHTML: true,
  
  // Output configuration
  output: 'static',
});
