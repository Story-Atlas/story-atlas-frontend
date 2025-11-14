// src/app/places/page.js
// 리다이렉트: Places 탭이 Field of Harmony로 변경됨

import { redirect } from 'next/navigation';

export default function PlacesPage() {
  redirect('/harmony');
}
