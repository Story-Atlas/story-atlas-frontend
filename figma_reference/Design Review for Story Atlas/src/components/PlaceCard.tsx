import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PlaceCardProps {
  id: string;
  name: string;
  headline?: string;
  imageUrl?: string;
  type?: 'places' | 'spots';
}

export function PlaceCard({ id, name, headline, imageUrl, type = 'places' }: PlaceCardProps) {
  return (
    <Link 
      to={`/${type}/${id}`}
      className="block transition-all duration-300 hover:scale-105"
    >
      <div className="w-[288px] flex-shrink-0 shadow-lg overflow-hidden">
        <div className="relative h-[192px] bg-gray-200">
          <ImageWithFallback
            src={imageUrl || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570'}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 bg-white">
          <h3 className="mb-2">{name}</h3>
          {headline && (
            <p className="text-gray-600 line-clamp-2">{headline}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
