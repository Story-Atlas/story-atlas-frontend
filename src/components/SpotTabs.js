"use client";

import { useState } from 'react';
import Link from 'next/link';

// 아이콘 컴포넌트
function MapPinIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}

function ExternalLinkIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}


export function SpotTabs({ spot }) {
  const [activeTab, setActiveTab] = useState('intro');

  const tabs = [
    { id: 'intro', label: '소개' },
    { id: 'info', label: '이용정보' },
  ];

  return (
    <div className="w-full">
      {/* 탭 헤더 */}
      <div className="flex border-b border-gray-300 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-semibold text-lg transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div className="min-h-[200px]">
        {activeTab === 'intro' && (
          <div className="space-y-6">
            {/* 헤드라인 */}
            {spot.description?.headline && (
              <p className="text-2xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4 font-title">
                {spot.description.headline}
              </p>
            )}

            {/* 본문 */}
            {spot.description?.paragraph1 && (
              <p className="text-lg text-gray-900 leading-relaxed">
                {spot.description.paragraph1}
              </p>
            )}
            {spot.description?.paragraph2 && (
              <p className="text-lg text-gray-900 leading-relaxed">
                {spot.description.paragraph2}
              </p>
            )}
            {spot.description?.paragraph3 && (
              <p className="text-lg text-gray-900 leading-relaxed">
                {spot.description.paragraph3}
              </p>
            )}
          </div>
        )}

        {activeTab === 'info' && (
          <div className="space-y-4">
            {spot.address && (
              <div className="flex items-start gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">주소</p>
                  <p className="text-gray-700">{spot.address}</p>
                </div>
              </div>
            )}
            
            {spot.operating_hours && (
              <div className="flex items-start gap-3">
                <span className="text-2xl">🕐</span>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">운영시간</p>
                  <p className="text-gray-700 whitespace-pre-line">{spot.operating_hours}</p>
                </div>
              </div>
            )}
            
            {spot.admission_fee && (
              <div className="flex items-start gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">관람료</p>
                  <p className="text-gray-700">{spot.admission_fee}</p>
                </div>
              </div>
            )}
            
            {spot.contact && (
              <div className="flex items-start gap-3">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">문의</p>
                  <p className="text-gray-700">{spot.contact}</p>
                </div>
              </div>
            )}

            {/* 네이버 지도 링크 박스 */}
            {spot.naver_map_url && (
              <Link
                href={spot.naver_map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-6"
              >
                <div className="bg-gradient-to-br from-[hsl(var(--accent-brown))] to-[hsl(var(--accent-brown))]/80 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="bg-white/20 rounded-full p-3 group-hover:bg-white/30 transition-colors">
                        <MapPinIcon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white mb-2 flex items-center gap-2 font-semibold">
                          찾아오시는 길
                          <ExternalLinkIcon className="w-4 h-4 opacity-70" />
                        </h3>
                        {spot.address && (
                          <p className="text-white/90 mb-2">{spot.address}</p>
                        )}
                        <p className="text-white/70 text-sm">
                          네이버 지도에서 위치 확인하기
                        </p>
                      </div>
                    </div>
                    <div className="ml-2 mt-1">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <span className="text-white text-xl">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

