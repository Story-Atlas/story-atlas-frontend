import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, Sparkles } from 'lucide-react';

export function BookBTILoading() {
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.state?.type || 'INFP';

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/book-bti/result', { state: { type } });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, type]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
      <div className="text-center px-4">
        {/* Animated Icons */}
        <div className="relative mb-12">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sparkles className="w-16 h-16 text-amber-400" />
          </motion.div>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            <BookOpen className="w-24 h-24 text-orange-500 mx-auto" />
          </motion.div>
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl mb-4 text-gray-800">
            당신의 취향을 분석하고 있어요...
          </h2>
          <p className="text-gray-600">
            완벽한 장소를 찾는 중입니다
          </p>
        </motion.div>

        {/* Loading Dots */}
        <div className="flex gap-2 justify-center mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
            />
          ))}
        </div>

        {/* Participant Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-gray-500 mt-8"
        >
          기반: 14:58 참여자
        </motion.p>
      </div>
    </div>
  );
}
