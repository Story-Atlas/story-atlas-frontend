// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 성능 최적화
  compress: true,
  poweredByHeader: false,
  
  // 실험적 기능
  experimental: {
    // optimizeCss: true, // 일시적으로 비활성화 (RangeError 해결을 위해)
  },
  
  // 컴파일러 옵션
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // ... (images: { ... } 부분은 그대로 둡니다)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'search.pstatic.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.pstatic.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8001',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '49.50.137.233',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'storyatlas.site',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'storyatlas.site',
        pathname: '/media/**',
      },
    ],
    // 로컬 이미지 최적화 활성화
    // /media/ 경로는 Nginx가 직접 서빙하므로 unoptimized로 설정
    unoptimized: true,
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
            value: "img-src 'self' data: http://localhost:8001 http://localhost:8000 images.pexels.com googleusercontent.com *.googleusercontent.com search.pstatic.net *.pstatic.net via.placeholder.com;",
            
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
      {
        source: '/media/:path*',
        destination: 'http://localhost:8000/media/:path*',
      },
    ];
  },
};

export default nextConfig;