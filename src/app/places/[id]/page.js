// src/app/places/[id]/page.js

// params 객체를 통해 URL의 동적 세그먼트(예: [id]) 값을 받을 수 있습니다.
export default function PlaceDetailPage({ params }) {
    const { id } = params; // URL에서 'id' 값을 추출 (예: 'e1', 'c1')
  
    return (
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">상세 정보 페이지 (탭)</h1>
  
        <p className="text-lg">
          (임시) 여기는 <strong className="text-blue-600">{id}</strong>번 항목의
          상세 정보가 표시될 자리입니다.
        </p>
  
        {/* 나중에 DB가 준비되면, 
          이 {id} 값을 사용해 DB에서 데이터를 조회한 뒤 
          여기에 멋진 UI를 그리면 됩니다.
        */}
      </main>
    );
  }