// API 기본 URL 유틸리티
// 프로덕션 환경에서는 상대 경로 사용, 개발 환경에서는 localhost 사용

export function getApiBase() {
  // 클라이언트 사이드에서만 실행
  if (typeof window === 'undefined') {
    // 서버 사이드에서는 환경 변수 또는 기본값 사용
    return process.env.NEXT_PUBLIC_API_URL || '/api';
  }
  
  // 클라이언트 사이드: 상대 경로 사용 (프로덕션) 또는 환경 변수
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // 프로덕션 환경에서는 상대 경로 사용
  // 개발 환경에서도 상대 경로 사용 (next.config.mjs의 rewrites가 처리)
  // 단, 환경 변수가 설정되어 있으면 그것을 사용
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

