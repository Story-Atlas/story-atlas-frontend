"use client";

import { useState } from 'react';
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

function LightbulbIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m4.5 0a12.05 12.05 0 003.478-.397 3 3 0 003.478-3.478 12.05 12.05 0 00-.397-3.478m-6.122 0a12.05 12.05 0 00-.397 3.478 3 3 0 003.478 3.478 12.06 12.06 0 004.5 0m0 0a12.05 12.05 0 003.478-.397 3.001 3.001 0 001.576-1.576 12.05 12.05 0 00.397-3.478m-3.478 3.478a3 3 0 01-1.576 1.576 12.05 12.05 0 01-.397 3.478m0 0a12.06 12.06 0 01-4.5 0m4.5 0v-.001" />
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

function NavigationIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l8.735 12.545a.75.75 0 01.146.41v10.09a.75.75 0 00.995.72l4.907-1.581a.75.75 0 01.588 0l4.907 1.581a.75.75 0 00.995-.72v-10.09a.75.75 0 01.146-.41L21 3m-9 12l-9-12m9 12l9-12m-9 12v8.25" />
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
      icon: <LightbulbIcon className="w-8 h-8 text-blue-500" />,
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
      icon: <NavigationIcon className="w-8 h-8 text-rose-500" />,
    },
    optionB: {
      type: 'J',
      title: '최적 루트 따르기',
      description: 'A부터 Z까지, 지도의 가장 완벽한 경로를 따라 실패 없이 완벽하게 탐험하고 싶어요.',
      icon: <CheckCircleIcon className="w-8 h-8 text-blue-500" />,
    },
  },
];

export default function BookBTIQuiz() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const answerType = selectedAnswer === 'A' ? question.optionA.type : question.optionB.type;
    const newAnswers = { ...answers, [question.axis]: answerType };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Calculate Book-BTI type: E/I + N/S + F/T + P/J
      const btiCode = `${newAnswers.EI}${newAnswers.NS}${newAnswers.FT}${newAnswers.PJ}`;
      router.push(`/book-bti/loading?type=${btiCode}`);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const prevQuestion = questions[currentQuestion - 1];
      setSelectedAnswer(answers[prevQuestion.axis] === prevQuestion.optionA.type ? 'A' : 'B');
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
            {currentQuestion + 1} / {questions.length}
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
                {currentQuestion < questions.length - 1 ? '다음' : '결과 보기'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

