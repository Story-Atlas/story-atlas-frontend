// performance-config.js - 성능 최적화 설정

// 이미지 최적화 설정
export const imageOptimization = {
  formats: ['image/avif', 'image/webp'],
  sizes: {
    thumbnail: '(max-width: 640px) 100vw, 640px',
    medium: '(max-width: 1024px) 100vw, 1024px',
    large: '(max-width: 1920px) 100vw, 1920px',
  },
};

// 리소스 힌트 설정
export const resourceHints = {
  preconnect: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ],
  dnsPrefetch: [
    'https://api.storyatlas.site',
  ],
};







