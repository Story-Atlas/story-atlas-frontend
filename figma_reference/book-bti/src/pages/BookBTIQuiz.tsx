import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Users, Heart, Lightbulb, Sparkles, Map as MapIcon, Navigation, CheckCircle } from 'lucide-react';
import { BookBTIAnswerCard } from '../components/BookBTIAnswerCard';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';

interface Question {
  id: number;
  axis: 'EI' | 'FT' | 'NS' | 'PJ';
  question: string;
  optionA: {
    type: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  };
  optionB: {
    type: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  };
}

const questions: Question[] = [
  {
    id: 1,
    axis: 'EI',
    question: "당신이 생각하는 '완벽한 휴식의 날'은?",
    optionA: {
      type: 'I',
      title: '조용한 고요함',
      description: '아무도 없는 곳에서 순수하게 나에게 집중하며 에너지를 충전하고 싶어요.',
      icon: <BookOpen className="w-8 h-8 text-rose-500" />,
    },
    optionB: {
      type: 'E',
      title: '활기찬 백색소음',
      description: '사람들의 적당한 에너지와 백색소음 속에서 세상을 관찰하며 에너지를 얻고 싶어요.',
      icon: <Users className="w-8 h-8 text-blue-500" />,
    },
  },
  {
    id: 2,
    axis: 'FT',
    question: "'파주 출판단지'에 도착했어요. 지금 가장 원하는 것은?",
    optionA: {
      type: 'F',
      title: '마음을 위한 위로',
      description: '머리를 비우고 마음을 채워야 해요. 따뜻한 감성과 휴식이 필요해요.',
      icon: <Heart className="w-8 h-8 text-rose-500" />,
    },
    optionB: {
      type: 'T',
      title: '두뇌를 위한 영감',
      description: '새로운 지식이나 아이디어를 탐색하며 지적인 자극을 느끼고 싶어요.',
      icon: <Lightbulb className="w-8 h-8 text-blue-500" />,
    },
  },
  {
    id: 3,
    axis: 'NS',
    question: "지금 당장 '책의 세계'로 여행을 떠난다면?",
    optionA: {
      type: 'N',
      title: '상상의 세계로',
      description: '현실을 잊고 소설/판타지의 주인공이 되거나, 예술/디자인의 추상적 세계를 탐험하고 싶어요.',
      icon: <Sparkles className="w-8 h-8 text-rose-500" />,
    },
    optionB: {
      type: 'S',
      title: '현실의 세계로',
      description: '실제 역사 속 인물을 만나거나, 실용적 지식으로 현실의 문제를 해결하고 싶어요.',
      icon: <MapIcon className="w-8 h-8 text-blue-500" />,
    },
  },
  {
    id: 4,
    axis: 'PJ',
    question: "'보물지도'를 발견했어요! 당신의 선택은?",
    optionA: {
      type: 'P',
      title: '골목으로 헤매기',
      description: '지도는 참고만! 발길 가는 대로 우연히 발견하는 예상 밖의 장소가 더 좋아요.',
      icon: <Navigation className="w-8 h-8 text-rose-500" />,
    },
    optionB: {
      type: 'J',
      title: '최적 루트 따르기',
      description: 'A부터 Z까지, 지도의 가장 완벽한 경로를 따라 실패 없이 완벽하게 탐험하고 싶어요.',
      icon: <CheckCircle className="w-8 h-8 text-blue-500" />,
    },
  },
];

export function BookBTIQuiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | null>(null);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (option: 'A' | 'B') => {
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
      // Calculate Book-BTI type
      const type = `${newAnswers.EI}${newAnswers.NS}${newAnswers.FT}${newAnswers.PJ}`;
      navigate('/book-bti/loading', { state: { type } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => currentQuestion > 0 ? setCurrentQuestion(currentQuestion - 1) : navigate('/book-bti')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="text-gray-600">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Content */}
      <div className="container mx-auto px-4 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {/* Question Title */}
            <h1 className="text-3xl text-center mb-12 text-gray-800 px-4">
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto"
              >
                <Button
                  onClick={handleNext}
                  className="w-full py-6 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {currentQuestion < questions.length - 1 ? '다음' : '결과 보기'}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}