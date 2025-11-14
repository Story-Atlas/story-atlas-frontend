"use client";

import { useState, useMemo } from "react";
import { Header } from "./components/Header";
import { HomeTab } from "./components/HomeTab";
import { EventsTab } from "./components/EventsTab";
import { PlacesTab } from "./components/PlacesTab";
import { BottomNav } from "./components/BottomNav";
import { PlaceDetailSheet } from "./components/PlaceDetailSheet";
import { EventDetailSheet } from "./components/EventDetailSheet";

// Mock data with detailed information - 실제로는 API에서 가져올 데이터
const mockData = {
  events: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1760860255607-d3d96e39b66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGV4aGliaXRpb24lMjBwb3N0ZXJ8ZW58MXx8fHwxNzYyNTA1NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      images: [
        "https://images.unsplash.com/photo-1760860255607-d3d96e39b66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGV4aGliaXRpb24lMjBwb3N0ZXJ8ZW58MXx8fHwxNzYyNTA1NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1697373525667-629371d58795?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwbGlicmFyeSUyMGludGVyaW9yfGVufDF8fHx8MTc2MjUwNTYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      name: "봄날의 독서 페스티벌",
      headline: "책과 음악이 어우러지는 특별한 하루",
      period: "2024.03.15 - 2024.03.17",
      isEnded: false,
      description: "파주 출판단지에서 열리는 특별한 독서 축제입니다. 베스트셀러 작가들과의 만남, 북콘서트, 체험 프로그램 등 다양한 문화 행사가 준비되어 있습니다. 책을 사랑하는 모든 분들을 초대합니다.",
      location: "파주 출판도시 아시아 광장",
      time: "10:00 - 18:00",
      price: "무료",
      organizer: "파주출판도시문화재단",
      capacity: "선착순 500명",
      website: "https://pajubookcity.org",
      tags: ["독서", "문화축제", "북토크", "음악"],
      relatedEvents: [
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1760860255607-d3d96e39b66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGV4aGliaXRpb24lMjBwb3N0ZXJ8ZW58MXx8fHwxNzYyNTA1NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
          name: "북 아트 전시회",
          headline: "책으로 만나는 예술의 세계",
          period: "2024.03.01 - 2024.03.31",
          isEnded: false,
        },
        {
          id: 4,
          image: "https://images.unsplash.com/photo-1697373525667-629371d58795?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwbGlicmFyeSUyMGludGVyaW9yfGVufDF8fHx8MTc2MjUwNTYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
          name: "출판문화제",
          headline: "파주 출판단지의 봄 축제",
          period: "2024.04.05 - 2024.04.07",
          isEnded: false,
        },
      ],
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1697373525667-629371d58795?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwbGlicmFyeSUyMGludGVyaW9yfGVufDF8fHx8MTc2MjUwNTYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "작가와의 만남",
      headline: "베스트셀러 작가와 함께하는 북토크",
      period: "2024.02.20 - 2024.02.20",
      isEnded: true,
      description: "올해 베스트셀러 1위를 차지한 작가와의 특별한 만남 시간이었습니다.",
      location: "열린책들 아트홀",
      time: "14:00 - 16:00",
      price: "10,000원",
      organizer: "열린책들",
      tags: ["북토크", "작가"],
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1760860255607-d3d96e39b66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGV4aGliaXRpb24lMjBwb3N0ZXJ8ZW58MXx8fHwxNzYyNTA1NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "북 아트 전시회",
      headline: "책으로 만나는 예술의 세계",
      period: "2024.03.01 - 2024.03.31",
      isEnded: false,
      description: "책을 예술로 승화시킨 독특한 작품들을 만나보세요. 북 아티스트들의 창의적인 작품 세계를 경험할 수 있습니다.",
      location: "아시아출판문화정보센터 갤러리",
      time: "화-일 10:00 - 18:00 (월요일 휴관)",
      price: "무료",
      organizer: "북아트협회",
      tags: ["전시", "북아트", "예술"],
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1697373525667-629371d58795?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwbGlicmFyeSUyMGludGVyaW9yfGVufDF8fHx8MTc2MjUwNTYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "출판문화제",
      headline: "파주 출판단지의 봄 축제",
      period: "2024.04.05 - 2024.04.07",
      isEnded: false,
      description: "파주 출판단지의 대표 축제로, 출판사들의 특별 할인 판매와 문화 공연이 함께 진행됩니다.",
      location: "파주 출판단지 일대",
      time: "10:00 - 19:00",
      price: "무료 입장 (도서 구매 별도)",
      organizer: "파주출판도시",
      tags: ["축제", "도서할인", "공연"],
    },
  ],
  bookCafes: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1700906010457-c7a565935b81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rc3RvcmUlMjBjYWZlfGVufDF8fHx8MTc2MjUwNTYwNHww&ixlib=rb-4.1.0&q=80&w=1080",
      images: [
        "https://images.unsplash.com/photo-1700906010457-c7a565935b81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rc3RvcmUlMjBjYWZlfGVufDF8fHx8MTc2MjUwNTYwNHww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1572890112232-c981226d9bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwcmVhZGluZyUyMGNvcm5lcnxlbnwxfHx8fDE3NjI2MTk5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1684006997322-6a5128f44816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYyNjAyODg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      name: "책방 카페 숲",
      headline: "조용한 독서 공간과 따뜻한 커피가 있는 곳",
      category: "북카페",
      description: "아늑한 분위기 속에서 책을 읽으며 여유를 즐길 수 있는 북카페입니다. 엄선된 독립출판물과 인문서적, 그리고 핸드드립 커피를 만나보세요.",
      address: "경기도 파주시 회동길 145 지혜의 숲",
      hours: "화-일 10:00 - 20:00 (월요일 휴무)",
      phone: "031-955-0082",
      website: "https://forestofwisdom.com",
      rating: 4.7,
      tags: ["독서", "커피", "조용함", "힐링"],
      relatedPlaces: [
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1697373525667-629371d58795?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwbGlicmFyeSUyMGludGVyaW9yfGVufDF8fHx8MTc2MjUwNTYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
          name: "리딩 라운지",
          headline: "넓은 서가와 편안한 소파가 있는 복합문화공간",
          category: "북카페",
        },
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1700906010457-c7a565935b81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rc3RvcmUlMjBjYWZlfGVufDF8fHx8MTc2MjUwNTYwNHww&ixlib=rb-4.1.0&q=80&w=1080",
          name: "북앤북스",
          headline: "신간부터 희귀본까지, 다양한 책을 만날 수 있는 서점",
          category: "북카페",
        },
      ],
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1697373525667-629371d58795?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwbGlicmFyeSUyMGludGVyaW9yfGVufDF8fHx8MTc2MjUwNTYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "리딩 라운지",
      headline: "넓은 서가와 편안한 소파가 있는 복합문화공간",
      category: "북카페",
      description: "3층 규모의 넓은 공간에 다양한 장르의 책들이 구비되어 있습니다.",
      address: "경기도 파주시 회동길 230",
      hours: "매일 09:00 - 22:00",
      phone: "031-955-1234",
      rating: 4.5,
      tags: ["넓은공간", "독서", "스터디"],
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1700906010457-c7a565935b81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rc3RvcmUlMjBjYWZlfGVufDF8fHx8MTc2MjUwNTYwNHww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "북앤북스",
      headline: "신간부터 희귀본까지, 다양한 책을 만날 수 있는 서점",
      category: "북카페",
      address: "경기도 파주시 회동길 330",
      hours: "화-일 10:30 - 19:00",
      phone: "031-955-5678",
      rating: 4.6,
      tags: ["서점", "희귀본", "신간"],
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1697373525667-629371d58795?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwbGlicmFyeSUyMGludGVyaW9yfGVufDF8fHx8MTc2MjUwNTYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "페이지 터너",
      headline: "아늑한 분위기에서 즐기는 독서와 디저트",
      category: "북카페",
      address: "경기도 파주시 회동길 180",
      hours: "매일 11:00 - 21:00",
      phone: "031-955-9876",
      rating: 4.4,
      tags: ["디저트", "아늑함", "데이트"],
    },
  ],
  brunchCafes: [
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1537157590327-6af6d87663d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVuY2glMjBjb2ZmZWUlMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MjUwNTYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "모닝 페이지",
      headline: "건강한 브런치와 스페셜티 커피를 즐기는 공간",
      category: "브런치",
      address: "경기도 파주시 회동길 200",
      hours: "주말 09:00 - 15:00",
      phone: "031-955-3333",
      rating: 4.8,
      tags: ["브런치", "건강식", "주말"],
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1537157590327-6af6d87663d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVuY2glMjBjb2ZmZWUlMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MjUwNTYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "선데이 브런치",
      headline: "주말 오전을 특별하게 만드는 브런치 전문점",
      category: "브런치",
      address: "경기도 파주시 회동길 250",
      hours: "토-일 10:00 - 16:00",
      phone: "031-955-4444",
      rating: 4.6,
      tags: ["브런치", "주말", "가족"],
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1537157590327-6af6d87663d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVuY2glMjBjb2ZmZWUlMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MjUwNTYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "그린테이블",
      headline: "신선한 샐러드와 수제 베이커리가 있는 곳",
      category: "브런치",
      address: "경기도 파주시 회동길 280",
      hours: "매일 08:00 - 17:00",
      phone: "031-955-5555",
      rating: 4.7,
      tags: ["샐러드", "비건", "베이커리"],
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1537157590327-6af6d87663d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVuY2glMjBjb2ZmZWUlMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MjUwNTYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "카페 에그",
      headline: "다양한 에그 베네딕트를 맛볼 수 있는 브런치 카페",
      category: "브런치",
      address: "경기도 파주시 회동길 310",
      hours: "매일 09:00 - 15:00",
      phone: "031-955-6666",
      rating: 4.5,
      tags: ["에그베네딕트", "브런치", "인기"],
    },
  ],
  outdoorCafes: [
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1689075326462-581d7705c0ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwY2FmZSUyMHRlcnJhY2V8ZW58MXx8fHwxNzYyNDQ4NDE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      images: [
        "https://images.unsplash.com/photo-1689075326462-581d7705c0ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwY2FmZSUyMHRlcnJhY2V8ZW58MXx8fHwxNzYyNDQ4NDE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1650338031185-1e97add7a389?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBwYXRpbyUyMGRpbmluZ3xlbnwxfHx8fDE3NjI2MTk5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      name: "가든 카페",
      headline: "푸른 정원이 보이는 야외 테라스 카페",
      category: "야외카페",
      description: "사계절 변화하는 정원을 감상하며 커피를 즐길 수 있는 특별한 공간입니다. 반려동물 동반 가능합니다.",
      address: "경기도 파주시 회동길 400",
      hours: "매일 10:00 - 21:00",
      phone: "031-955-7777",
      rating: 4.9,
      tags: ["야외", "정원", "반려동물", "뷰맛집"],
      relatedPlaces: [
        {
          id: 10,
          image: "https://images.unsplash.com/photo-1689075326462-581d7705c0ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwY2FmZSUyMHRlcnJhY2V8ZW58MXx8fHwxNzYyNDQ4NDE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
          name: "스카이 라운지",
          headline: "탁 트인 전망과 함께하는 루프탑 카페",
          category: "야외카페",
        },
      ],
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1689075326462-581d7705c0ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwY2FmZSUyMHRlcnJhY2V8ZW58MXx8fHwxNzYyNDQ4NDE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "스카이 라운지",
      headline: "탁 트인 전망과 함께하는 루프탑 카페",
      category: "야외카페",
      address: "경기도 파주시 회동길 420",
      hours: "매일 11:00 - 23:00",
      phone: "031-955-8888",
      rating: 4.7,
      tags: ["루프탑", "야외", "야경", "데이트"],
    },
    {
      id: 11,
      image: "https://images.unsplash.com/photo-1689075326462-581d7705c0ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwY2FmZSUyMHRlcnJhY2V8ZW58MXx8fHwxNzYyNDQ4NDE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "테라스 앤",
      headline: "자연 속에서 즐기는 여유로운 커피 한 잔",
      category: "야외카페",
      address: "경기도 파주시 회동길 450",
      hours: "매일 10:00 - 20:00",
      phone: "031-955-9999",
      rating: 4.6,
      tags: ["야외", "자연", "힐링"],
    },
    {
      id: 12,
      image: "https://images.unsplash.com/photo-1689075326462-581d7705c0ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwY2FmZSUyMHRlcnJhY2V8ZW58MXx8fHwxNzYyNDQ4NDE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "포레스트",
      headline: "숲속 정원에서 즐기는 특별한 티타임",
      category: "야외카페",
      address: "경기도 파주시 회동길 480",
      hours: "화-일 10:00 - 19:00",
      phone: "031-955-1111",
      rating: 4.8,
      tags: ["숲", "정원", "티하우스"],
    },
  ],
  attractions: [
    {
      id: 13,
      image: "https://images.unsplash.com/photo-1619417889956-c701044fed86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwYXR0cmFjdGlvbiUyMGxhbmRtYXJrfGVufDF8fHx8MTc2MjQ5ODU0NXww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "출판도시 아시아",
      headline: "아시아 출판문화의 중심지, 다양한 전시와 체험",
      category: "관광지",
      description: "파주 출판단지의 대표 문화공간으로, 전시, 공연, 교육 프로그램 등이 운영됩니다.",
      address: "경기도 파주시 회동길 145",
      hours: "화-일 10:00 - 18:00 (월요일 휴관)",
      phone: "031-955-0082",
      rating: 4.5,
      tags: ["문화공간", "전시", "교육"],
    },
    {
      id: 14,
      image: "https://images.unsplash.com/photo-1619417889956-c701044fed86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwYXR0cmFjdGlvbiUyMGxhbmRtYXJrfGVufDF8fHx8MTc2MjQ5ODU0NXww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "북소리 공원",
      headline: "책과 자연이 어우러진 야외 공원",
      category: "관광지",
      address: "경기도 파주시 회동길 300",
      hours: "상시 개방",
      rating: 4.3,
      tags: ["공원", "산책", "자연"],
    },
    {
      id: 15,
      image: "https://images.unsplash.com/photo-1619417889956-c701044fed86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwYXR0cmFjdGlvbiUyMGxhbmRtYXJrfGVufDF8fHx8MTc2MjQ5ODU0NXww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "활판인쇄 박물관",
      headline: "전통 인쇄 문화를 체험할 수 있는 특별한 공간",
      category: "관광지",
      address: "경기도 파주시 회동길 350",
      hours: "화-일 10:00 - 17:00",
      phone: "031-955-2222",
      rating: 4.6,
      tags: ["박물관", "체험", "역사"],
    },
    {
      id: 16,
      image: "https://images.unsplash.com/photo-1619417889956-c701044fed86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwYXR0cmFjdGlvbiUyMGxhbmRtYXJrfGVufDF8fHx8MTc2MjQ5ODU0NXww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "파주 북시티",
      headline: "현대 건축과 책이 만나는 문화 복합 공간",
      category: "관광지",
      address: "경기도 파주시 회동길 500",
      hours: "매일 10:00 - 20:00",
      rating: 4.4,
      tags: ["건축", "복합문화공간", "포토스팟"],
    },
  ],
};

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "events" | "places">("home");
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [placeSheetOpen, setPlaceSheetOpen] = useState(false);
  const [eventSheetOpen, setEventSheetOpen] = useState(false);

  // Combine all places into one array for PlacesTab
  const allPlaces = useMemo(
    () => [
      ...mockData.bookCafes,
      ...mockData.brunchCafes,
      ...mockData.outdoorCafes,
      ...mockData.attractions,
    ],
    []
  );

  const handlePlaceClick = (place: any) => {
    setSelectedPlace(place);
    setPlaceSheetOpen(true);
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setEventSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--warm-bg))]">
      <Header />
      
      {/* Tab Content */}
      {activeTab === "home" && (
        <HomeTab
          mockData={mockData}
          onPlaceClick={handlePlaceClick}
          onEventClick={handleEventClick}
        />
      )}

      {activeTab === "events" && (
        <EventsTab
          events={mockData.events}
          onEventClick={handleEventClick}
        />
      )}

      {activeTab === "places" && (
        <PlacesTab
          places={allPlaces}
          onPlaceClick={handlePlaceClick}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Detail Sheets */}
      <PlaceDetailSheet
        place={selectedPlace}
        open={placeSheetOpen}
        onOpenChange={setPlaceSheetOpen}
      />
      <EventDetailSheet
        event={selectedEvent}
        open={eventSheetOpen}
        onOpenChange={setEventSheetOpen}
      />
    </div>
  );
}
