/**
 * 익명 사용자 (Guest User) 관리 유틸리티
 * localStorage를 사용하여 기기별 고유 ID를 생성하고 관리합니다.
 */

const GUEST_USER_ID_KEY = 'story_atlas_guest_user_id';

/**
 * UUID v4 생성 함수
 * @returns {string} UUID 문자열
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * 익명 사용자 ID 가져오기 또는 생성하기
 * localStorage에 저장된 ID가 있으면 반환하고, 없으면 새로 생성하여 저장합니다.
 * 
 * @returns {string} 익명 사용자 ID (UUID)
 */
export function getGuestUserId() {
  if (typeof window === 'undefined') {
    // 서버 사이드에서는 null 반환
    return null;
  }
  
  let guestUserId = localStorage.getItem(GUEST_USER_ID_KEY);
  
  if (!guestUserId) {
    // 새 UUID 생성 및 저장
    guestUserId = generateUUID();
    localStorage.setItem(GUEST_USER_ID_KEY, guestUserId);
  }
  
  return guestUserId;
}

/**
 * 익명 사용자 ID 초기화 (테스트용)
 */
export function resetGuestUserId() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(GUEST_USER_ID_KEY);
  }
}

/**
 * 현재 익명 사용자 ID 확인 (생성하지 않음)
 * @returns {string|null} 저장된 ID 또는 null
 */
export function getExistingGuestUserId() {
  if (typeof window === 'undefined') {
    return null;
  }
  
  return localStorage.getItem(GUEST_USER_ID_KEY);
}

