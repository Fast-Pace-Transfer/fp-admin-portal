/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['https://blog.logrocket.com/'],
    layoutRaw: true 
  },
}

module.exports = nextConfig
