import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "./ui/badge";

interface EventCardProps {
  image: string;
  name: string;
  headline: string;
  period: string;
  isEnded?: boolean;
  onClick?: () => void;
}

export function EventCard({ image, name, headline, period, isEnded, onClick }: EventCardProps) {
  return (
    <div className="group flex-shrink-0 w-72 cursor-pointer" onClick={onClick}>
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <ImageWithFallback
            src={image}
            alt={name}
            className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-110 ${
              isEnded ? 'opacity-50 grayscale' : ''
            }`}
          />
          {isEnded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                종료된 행사
              </Badge>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h4 className="mb-2 group-hover:text-[hsl(var(--accent-brown))] transition-colors">
            {name}
          </h4>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {headline}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="h-3.5 w-3.5" />
            <span>{period}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
