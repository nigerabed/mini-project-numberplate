/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
 output: 'export',
 // Optional: Change the output directory (default is 'out')
 // distDir: 'dist',
 images: {
   unoptimized: true, // Required for static export
 },
}

export default nextConfig;
