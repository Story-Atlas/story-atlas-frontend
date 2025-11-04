// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... (images: { ... } 부분은 그대로 둡니다)
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

  // CSP: Base64(data:) 이미지를 허용하는 보안 설정
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            
            // 👇 여기에 DB에 저장된 이미지의 도메인을 띄어쓰기로 추가합니다.
            //    (예: 구글, 네이버 검색 등에서 가져온 이미지 도메인)
            value: "img-src 'self' data: images.pexels.com googleusercontent.com *.googleusercontent.com search.pstatic.net *.pstatic.net;",
            
            // *.googleusercontent.com 는 lh3.googleusercontent.com 등을 모두 허용
            // *.pstatic.net 는 Naver 이미지 도메인을 허용
          },
        ],
      },
    ];
  },

  // ... (rewrites 부분은 그대로 둡니다)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
    ];
  },
};

export default nextConfig;