import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Download, BookMarked } from 'lucide-react';
import { BookmarkData } from './BookmarkGenerator';
import { toast } from 'sonner@2.0.3';

interface BookmarkPreviewProps {
  data: BookmarkData | null;
  isGenerating: boolean;
}

export function BookmarkPreview({ data, isGenerating }: BookmarkPreviewProps) {
  const handleDownload = () => {
    toast.success('책갈피를 다운로드했습니다');
  };

  const getFontFamily = (font: string) => {
    const fonts: Record<string, string> = {
      serif: 'font-serif',
      sans: 'font-sans',
      handwriting: 'font-serif italic',
      modern: 'font-sans',
      default: 'font-serif'
    };
    return fonts[font] || fonts.default;
  };

  const getColorScheme = (scheme: string) => {
    const colors: Record<string, { bg: string; text: string; accent: string }> = {
      '따뜻한': { bg: 'bg-gradient-to-br from-amber-100 to-orange-100', text: 'text-amber-900', accent: 'text-orange-600' },
      '차가운': { bg: 'bg-gradient-to-br from-blue-100 to-cyan-100', text: 'text-blue-900', accent: 'text-cyan-600' },
      '자연': { bg: 'bg-gradient-to-br from-green-100 to-emerald-100', text: 'text-green-900', accent: 'text-emerald-600' },
      '파스텔': { bg: 'bg-gradient-to-br from-pink-100 to-purple-100', text: 'text-purple-900', accent: 'text-pink-600' },
      '모노톤': { bg: 'bg-gradient-to-br from-gray-100 to-slate-100', text: 'text-gray-900', accent: 'text-slate-600' },
      '화려한': { bg: 'bg-gradient-to-br from-rose-200 to-violet-200', text: 'text-rose-900', accent: 'text-violet-600' }
    };
    return colors[scheme] || colors['따뜻한'];
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>미리보기</CardTitle>
        <CardDescription>
          생성된 책갈피를 확인하고 다운로드하세요
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center p-12 space-y-4">
            <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
            <p className="text-gray-600">AI가 책갈피를 생성하고 있습니다...</p>
          </div>
        ) : data ? (
          <div className="space-y-6">
            {/* 책갈피 디자인 */}
            <div className="mx-auto w-[240px]">
              <div
                className={`${getColorScheme(data.colorScheme).bg} rounded-lg shadow-xl p-6 aspect-[2/3] flex flex-col justify-between border-2 border-white`}
              >
                <div className="space-y-4">
                  <div className={`${getColorScheme(data.colorScheme).accent}`}>
                    <BookMarked className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-3">
                    <p className={`${getFontFamily(data.font)} ${getColorScheme(data.colorScheme).text} leading-relaxed`}>
                      "{data.quote}"
                    </p>
                  </div>
                </div>

                <div className={`space-y-1 pt-4 border-t-2 ${getColorScheme(data.colorScheme).accent} border-opacity-20`}>
                  <p className={`${getColorScheme(data.colorScheme).text}`}>
                    {data.title}
                  </p>
                  {data.author && (
                    <p className={`${getColorScheme(data.colorScheme).accent} text-sm`}>
                      {data.author}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 설정 정보 */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">글꼴:</span>
                <span>{data.font === 'default' ? 'AI 추천' : data.font}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">장르:</span>
                <span>{data.genre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">분위기:</span>
                <span>{data.mood}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">색상:</span>
                <span>{data.colorScheme}</span>
              </div>
            </div>

            {/* 다운로드 버튼 */}
            <Button
              onClick={handleDownload}
              className="w-full"
              variant="outline"
            >
              <Download className="w-4 h-4 mr-2" />
              이미지로 다운로드
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center space-y-3">
            <BookMarked className="w-16 h-16 text-gray-300" />
            <p className="text-gray-500">
              좌측 폼을 작성하고<br />책갈피를 생성해보세요
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
