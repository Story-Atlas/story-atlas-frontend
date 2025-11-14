import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ChevronDown, Sparkles, Settings2 } from 'lucide-react';
import { BookmarkData } from './BookmarkGenerator';
import { toast } from 'sonner@2.0.3';

interface BookmarkFormProps {
  onGenerate: (data: BookmarkData) => void;
  isGenerating: boolean;
}

export function BookmarkForm({ onGenerate, isGenerating }: BookmarkFormProps) {
  const [title, setTitle] = useState('');
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  // 고급 설정
  const [font, setFont] = useState('default');
  const [genre, setGenre] = useState('문학');
  const [mood, setMood] = useState('차분한');
  const [colorScheme, setColorScheme] = useState('따뜻한');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !quote.trim()) {
      toast.error('책 제목과 구절을 입력해주세요');
      return;
    }
    
    onGenerate({
      title,
      quote,
      author,
      font,
      genre,
      mood,
      colorScheme
    });
    
    toast.success('책갈피를 생성하고 있습니다');
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>책갈피 정보 입력</CardTitle>
        <CardDescription>
          책 제목과 마음에 드는 구절을 입력하면 AI가 아름다운 책갈피를 만들어드립니다
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 필수 입력 필드 */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                책 제목 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="예: 어린왕자"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote">
                좋아하는 구절 <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="quote"
                placeholder="예: 가장 중요한 것은 눈에 보이지 않아"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">작가 (선택)</Label>
              <Input
                id="author"
                placeholder="예: 생텍쥐페리"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
          </div>

          {/* 고급 설정 */}
          <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
            <CollapsibleTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-between"
              >
                <span className="flex items-center gap-2">
                  <Settings2 className="w-4 h-4" />
                  고급 설정
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isAdvancedOpen ? 'rotate-180' : ''
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="font">글꼴 스타일</Label>
                <Select value={font} onValueChange={setFont}>
                  <SelectTrigger id="font">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">기본 (AI 추천)</SelectItem>
                    <SelectItem value="serif">명조체</SelectItem>
                    <SelectItem value="sans">고딕체</SelectItem>
                    <SelectItem value="handwriting">손글씨</SelectItem>
                    <SelectItem value="modern">모던</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="genre">장르</Label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger id="genre">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="문학">문학</SelectItem>
                    <SelectItem value="시">시</SelectItem>
                    <SelectItem value="자기계발">자기계발</SelectItem>
                    <SelectItem value="철학">철학</SelectItem>
                    <SelectItem value="판타지">판타지</SelectItem>
                    <SelectItem value="SF">SF</SelectItem>
                    <SelectItem value="로맨스">로맨스</SelectItem>
                    <SelectItem value="추리">추리</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mood">분위기</Label>
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger id="mood">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="차분한">차분한</SelectItem>
                    <SelectItem value="감성적인">감성적인</SelectItem>
                    <SelectItem value="활기찬">활기찬</SelectItem>
                    <SelectItem value="우아한">우아한</SelectItem>
                    <SelectItem value="미니멀">미니멀</SelectItem>
                    <SelectItem value="빈티지">빈티지</SelectItem>
                    <SelectItem value="모던">모던</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="colorScheme">색상 테마</Label>
                <Select value={colorScheme} onValueChange={setColorScheme}>
                  <SelectTrigger id="colorScheme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="따뜻한">따뜻한 톤</SelectItem>
                    <SelectItem value="차가운">차가운 톤</SelectItem>
                    <SelectItem value="자연">자연 색상</SelectItem>
                    <SelectItem value="파스텔">파스텔</SelectItem>
                    <SelectItem value="모노톤">모노톤</SelectItem>
                    <SelectItem value="화려한">화려한</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* 생성 버튼 */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>생성 중...</>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                책갈피 생성하기
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
