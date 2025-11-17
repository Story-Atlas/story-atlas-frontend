// StructuredData.js - 구조화된 데이터 (JSON-LD) 컴포넌트

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Story Atlas",
    "alternateName": "파주 출판단지 아카이브",
    "url": "https://storyatlas.site",
    "description": "파주 출판단지의 행사, 북카페, 관광지를 한눈에. Book BTI로 나에게 맞는 장소를 찾아보세요.",
    "inLanguage": "ko-KR",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://storyatlas.site/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Story Atlas",
    "url": "https://storyatlas.site",
    "logo": "https://storyatlas.site/logo.png",
    "description": "파주 출판단지 아카이브 플랫폼",
    "sameAs": [
      // 소셜 미디어 링크 추가 가능
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BreadcrumbStructuredData({ items }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}



