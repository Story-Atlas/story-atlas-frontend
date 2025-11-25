// API 기본 URL 유틸리티
// 프로덕션 환경에서는 상대 경로 사용, 개발 환경에서는 localhost 사용

export function getApiBase() {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;

  if (envUrl) {
    return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
  }

  // 환경 변수가 없는 경우 기본값
  // 클라이언트: 상대 경로 /api (Next.js rewrites 사용 시)
  // 서버: http://localhost:8000/api (개발 환경 가정)
  if (typeof window === 'undefined') {
    return 'http://localhost:8000/api';
  }

  return '/api';
}

export function getImageUrl(imageUrl) {
  if (!imageUrl) return '';

  // 이미 절대 URL인 경우 그대로 반환
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // 상대 경로인 경우 그대로 반환 (Nginx가 처리)
  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }

  // 파일명만 있는 경우
  return `/${imageUrl}`;
}

