"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { BookBTIAnswerCard } from '@/components/BookBTIAnswerCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/Progress';

// 아이콘 컴포넌트
function BookOpenIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

function UsersIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function HeartIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
}

function BoltIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}

function DocumentTextIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function SparklesIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function MapIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function ArrowPathIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );
}

function EyeIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function CheckCircleIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

const questions = [
  {
    id: 1,
    axis: 'EI',
    question: "오늘 하루, 당신에게 '완벽한 휴식'이란?",
    optionA: {
      type: 'I',
      title: '조용한 고요함',
      description: '아무도 없는 곳에서 오롯이 \'나\'에게 집중하며 에너지를 충전하고 싶어요.',
      icon: <BookOpenIcon className="w-8 h-8 text-rose-500" />,
    },
    optionB: {
      type: 'E',
      title: '활기찬 백색소음',
      description: '적당한 사람들의 활기와 백색소음 속에서 \'세상\'을 구경하며 에너지를 얻고 싶어요.',
      icon: <UsersIcon className="w-8 h-8 text-blue-500" />,
    },
  },
  {
    id: 2,
    axis: 'FT',
    question: "'파주출판도시'에 온 당신, 지금 가장 원하는 것은?",
    optionA: {
      type: 'F',
      title: '마음의 위로',
      description: '머리는 비우고, 가슴을 채워줄 따뜻한 \'감성\'과 \'휴식\'이 필요해요.',
      icon: <HeartIcon className="w-8 h-8 text-rose-500" />,
    },
    optionB: {
      type: 'T',
      title: '두뇌를 위한 영감',
      description: '새로운 \'지식\'이나 \'아이디어\'를 탐구하며 지적인 \'자극\'을 느끼고 싶어요.',
      icon: <BoltIcon className="w-8 h-8 text-blue-500" />,
    },
  },
  {
    id: 3,
    axis: 'NS',
    question: "지금 당장 '책 속 세계'로 떠난다면?",
    optionA: {
      type: 'N',
      title: '상상의 세계로',
      description: '\'소설/판타지\', \'예술/디자인\'의 추상적인 세계를 탐험하고 싶어요.',
      icon: <SparklesIcon className="w-8 h-8 text-rose-500" />,
    },
    optionB: {
      type: 'S',
      title: '현실의 세계로',
      description: '실제 \'역사\', \'실용/지식\'을 통해 현실의 문제를 해결하고 싶어요.',
      icon: <MapIcon className="w-8 h-8 text-blue-500" />,
    },
  },
  {
    id: 4,
    axis: 'PJ',
    question: "'보물지도'가 손에 들어왔다! 당신의 선택은?",
    optionA: {
      type: 'P',
      title: '골목으로 헤매기',
      description: '지도는 참고만! 발길 가는 대로 우연히 발견하는 예상 밖의 장소가 더 좋아요.',
      icon: <ArrowPathIcon className="w-8 h-8 text-rose-500" />,
    },
    optionB: {
      type: 'J',
      title: '최적 루트 따르기',
      description: 'A부터 Z까지, 지도의 가장 완벽한 경로를 따라 실패 없이 완벽하게 탐험하고 싶어요.',
      icon: <CheckCircleIcon className="w-8 h-8 text-blue-500" />,
    },
  },
  // 질문 5-8: 일상 행동 패턴 질문
  {
    id: 5,
    axis: 'PJ',
    question: "서점에 들어갔을 때 당신의 첫 행동은?",
    optionA: {
      type: 'P',
      title: '감으로 골라보기',
      description: '눈에 띄는 책부터 펼쳐보며 우연의 발견을 즐긴다.',
      icon: <EyeIcon className="w-8 h-8 text-rose-500" />,
    },
    optionB: {
      type: 'J',
      title: '체계적으로 탐색하기',
      description: '장르별, 주제별로 분류된 책장을 순서대로 둘러본다.',
      icon: <CheckCircleIcon className="w-8 h-8 text-blue-500" />,
    },
  },
  {
    id: 6,
    axis: 'EI',
    question: "이상적인 주말 계획은?",
    optionA: {
      type: 'I',
      title: '계획된 활동',
      description: '미리 정한 일정대로 조용한 카페나 도서관에서 시간을 보낸다.',
      icon: <BookOpenIcon className="w-8 h-8 text-rose-500" />,
    },
    optionB: {
      type: 'E',
      title: '즉흥적인 모험',
      description: '친구들과 만나서 그때그때 결정하며 새로운 장소를 탐험한다.',
      icon: <UsersIcon className="w-8 h-8 text-blue-500" />,
    },
  },
  {
    id: 7,
    axis: 'FT',
    question: "책을 선택할 때 가장 중요하게 생각하는 것은?",
    optionA: {
      type: 'F',
      title: '감성적 공감',
      description: '이야기의 감정과 주인공의 내적 갈등에 깊이 공감할 수 있는가.',
      icon: <HeartIcon className="w-8 h-8 text-rose-500" />,
    },
    optionB: {
      type: 'T',
      title: '논리적 설득',
      description: '명확한 논리와 근거, 실용적인 지식이나 아이디어를 얻을 수 있는가.',
      icon: <DocumentTextIcon className="w-8 h-8 text-blue-500" />,
    },
  },
  {
    id: 8,
    axis: 'NS',
    question: "문화 공간에서 시간을 보내는 방식은?",
    optionA: {
      type: 'N',
      title: '깊이 있는 집중',
      description: '한 곳에 오래 머물며 작품이나 공간의 세부를 깊이 탐구한다.',
      icon: <SparklesIcon className="w-8 h-8 text-rose-500" />,
    },
    optionB: {
      type: 'S',
      title: '다양한 경험 탐색',
      description: '여러 공간을 빠르게 둘러보며 전체적인 분위기와 특징을 파악한다.',
      icon: <MapIcon className="w-8 h-8 text-blue-500" />,
    },
  },
];

// Fisher-Yates 셔플 알고리즘
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function BookBTIQuiz() {
  const router = useRouter();
  
  // 질문을 컴포넌트 마운트 시 한 번만 랜덤으로 섞기
  const shuffledQuestions = useMemo(() => shuffleArray(questions), []);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]); // 배열로 변경: ['A', 'B', 'A', ...]
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const question = shuffledQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    // 답변을 배열에 추가 (섞인 질문 순서대로)
    const newAnswers = [...answers, selectedAnswer];

    if (currentQuestion < shuffledQuestions.length - 1) {
      // 아직 마지막 질문이 아님
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // 마지막 질문: 8개 답변 완료 (이미 newAnswers에 마지막 답변이 포함됨)
      // 답변을 원래 질문 ID 순서로 정렬 (백엔드가 질문을 ID 순서로 가져오므로)
      const answersByQuestionId = new Array(8).fill(null);
      shuffledQuestions.forEach((question, index) => {
        answersByQuestionId[question.id - 1] = newAnswers[index];
      });
      
      // sessionStorage에 답변 저장 (URL 길이 제한 회피)
      const storageKey = `bookbti_answers_${Date.now()}`;
      sessionStorage.setItem(storageKey, JSON.stringify(answersByQuestionId));
      sessionStorage.setItem('bookbti_current_answers_key', storageKey);
      router.push(`/book-bti/loading?key=${storageKey}`);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      const newAnswers = answers.slice(0, -1); // 마지막 답변 제거
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion - 1);
      // 이전 질문의 답변 복원
      const prevAnswer = newAnswers[newAnswers.length - 1];
      setSelectedAnswer(prevAnswer || null);
    } else {
      router.push('/book-bti');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <Header />
      
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <span className="text-gray-600 font-medium">
            {currentQuestion + 1} / {shuffledQuestions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Question Title */}
          <h1 className="text-3xl text-center mb-12 text-gray-800 px-4 font-bold">
            {question.question}
          </h1>

          {/* Answer Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <BookBTIAnswerCard
              icon={question.optionA.icon}
              title={question.optionA.title}
              description={question.optionA.description}
              isSelected={selectedAnswer === 'A'}
              onSelect={() => handleAnswer('A')}
              accentColor="pink"
            />
            <BookBTIAnswerCard
              icon={question.optionB.icon}
              title={question.optionB.title}
              description={question.optionB.description}
              isSelected={selectedAnswer === 'B'}
              onSelect={() => handleAnswer('B')}
              accentColor="blue"
            />
          </div>

          {/* Next Button */}
          {selectedAnswer && (
            <div className="max-w-md mx-auto">
              <Button
                onClick={handleNext}
                  className="w-full py-6 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {currentQuestion < shuffledQuestions.length - 1 ? '다음' : '결과 보기'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

