import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookBTIPlaceCardProps {
  name: string;
  image: string;
  reason: string;
  tags: string[];
  delay?: number;
}

export function BookBTIPlaceCard({
  name,
  image,
  reason,
  tags,
  delay = 0,
}: BookBTIPlaceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Place Name */}
        <h3 className="text-xl mb-2 text-gray-800">{name}</h3>

        {/* Reason */}
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
          {reason}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          variant="outline"
          className="w-full rounded-full border-gray-200 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:border-amber-200"
        >
          <MapPin className="w-4 h-4 mr-2" />
          상세보기
        </Button>
      </div>
    </motion.div>
  );
}
