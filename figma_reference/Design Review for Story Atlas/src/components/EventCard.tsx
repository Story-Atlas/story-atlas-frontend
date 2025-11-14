import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';

interface EventCardProps {
  id: string;
  name: string;
  headline?: string;
  imageUrl?: string;
  startDate?: string;
  endDate?: string;
  status?: number;
}

export function EventCard({ id, name, headline, imageUrl, startDate, endDate, status }: EventCardProps) {
  const isEnded = status === -1;

  return (
    <Link 
      to={`/events/${id}`}
      className="block transition-all duration-300 hover:scale-105"
    >
      <div className="w-[288px] flex-shrink-0 shadow-lg overflow-hidden">
        <div className="relative h-[320px] bg-gray-200">
          <ImageWithFallback
            src={imageUrl || 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678'}
            alt={name}
            className={`w-full h-full object-contain ${isEnded ? 'opacity-50' : ''}`}
          />
          {isEnded && (
            <div className="absolute top-4 right-4">
              <Badge variant="outline" className="bg-white">종료</Badge>
            </div>
          )}
        </div>
        <div className="p-4 bg-white">
          <h3 className="mb-2">{name}</h3>
          {headline && (
            <p className="text-gray-600 mb-2 line-clamp-2">{headline}</p>
          )}
          {(startDate || endDate) && (
            <p className="text-gray-500">
              {startDate === endDate ? startDate : `${startDate} ~ ${endDate}`}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
