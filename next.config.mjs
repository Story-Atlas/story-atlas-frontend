/** @type {import('next').NextConfig} */
const nextConfig = {
  // 기존 Pexels 이미지 허용 설정 (그대로 둡니다)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // 👇 ⭐️ 이 부분이 Base64(data:)를 허용하는 새 설정입니다.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            // 'self'는 우리 도메인, data:는 Base64 이미지를 허용한다는 뜻입니다.
            value: "img-src 'self' data: images.pexels.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;