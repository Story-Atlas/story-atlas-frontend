// sitemap.js - 동적 사이트맵 생성

export default function sitemap() {
  const baseUrl = 'https://storyatlas.site';
  
  // 정적 페이지들
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/places`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/my-atlas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/book-bti`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/harmony`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // TODO: 동적 페이지들 (events/[id], places/[id], spots/[id])은
  // API에서 데이터를 가져와서 동적으로 생성할 수 있습니다.
  // 현재는 정적 페이지만 포함합니다.

  return staticPages;
}


