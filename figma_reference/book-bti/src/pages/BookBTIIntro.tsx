import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Heart, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';

export function BookBTIIntro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate('/')}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Decorative Icons */}
          <div className="flex justify-center gap-6 mb-8">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <BookOpen className="w-12 h-12 text-amber-600" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-12 h-12 text-rose-500" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-12 h-12 text-orange-500" />
            </motion.div>
          </div>

          {/* Title */}
          <h1 className="text-4xl text-center mb-4 text-gray-800">
            나의 'Book-BTI'는?
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-center mb-8 text-gray-600">
            파주 출판단지에서 나만의 완벽한 장소 찾기
          </p>

          {/* Description Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-6 shadow-lg"
          >
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                AI가 당신의 답변을 분석하여 당신의 'Book-BTI'를 진단하고, 
                파주 출판단지에서의 완벽한 하루를 위한 맞춤 장소를 추천해드립니다.
              </p>
            </div>
          </motion.div>

          {/* Disclaimer Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-amber-100/50 rounded-2xl p-6 mb-8 border border-amber-200/50"
          >
            <p className="text-sm text-amber-900">
              <span className="inline-block mr-1">💡</span>
              잠깐! 'Book-BTI'는 독서 및 공간 취향을 기반으로 하기 때문에, 
              실제 MBTI와 다를 수 있어요.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              onClick={() => navigate('/book-bti/quiz')}
              className="w-full py-6 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              테스트 시작하기
            </Button>
          </motion.div>

          {/* Additional Info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center text-sm text-gray-500 mt-6"
          >
            약 2분 소요 · 총 4개의 질문
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
