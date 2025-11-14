import { motion } from 'motion/react';

interface BookBTITypeCardProps {
  type: string;
  catchphrase: string;
  description: string;
  backgroundColor: string;
}

export function BookBTITypeCard({
  type,
  catchphrase,
  description,
  backgroundColor,
}: BookBTITypeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative rounded-3xl p-8 ${backgroundColor} overflow-hidden`}
      style={{ minHeight: '280px' }}
    >
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Type Label */}
        <div className="text-5xl mb-4 tracking-wider text-gray-800">
          {type}
        </div>

        {/* Catchphrase */}
        <h2 className="text-2xl mb-4 text-gray-800">
          {catchphrase}
        </h2>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed">
          {description}
        </p>

        {/* Bottom Logo Text */}
        <div className="mt-6 text-sm text-gray-500">
          나의 Book-BTI는?
        </div>
      </div>
    </motion.div>
  );
}
