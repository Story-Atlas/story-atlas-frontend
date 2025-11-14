import { useState, useRef } from 'react';
import { Download } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const FONTS = [
  { value: 'pretendard', label: 'Pretendard', fontFamily: 'Pretendard, sans-serif' },
  { value: 'dancing', label: 'Dancing Script', fontFamily: 'Dancing Script, cursive' },
];

const COLORS = [
  { value: 'brown', label: '브라운', color: '#8B4513' },
  { value: 'black', label: '블랙', color: '#000000' },
  { value: 'navy', label: '네이비', color: '#001F3F' },
  { value: 'green', label: '그린', color: '#2D5016' },
];

export function BookmarkForm() {
  const [text, setText] = useState('');
  const [font, setFont] = useState('pretendard');
  const [color, setColor] = useState('brown');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const selectedFont = FONTS.find(f => f.value === font);
  const selectedColor = COLORS.find(c => c.value === color);

  const drawBookmark = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size (bookmark dimensions)
    canvas.width = 600;
    canvas.height = 1800;

    // Background
    ctx.fillStyle = '#FFFEF7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = selectedColor?.color || '#8B4513';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // Text
    ctx.fillStyle = selectedColor?.color || '#8B4513';
    ctx.font = `32px ${selectedFont?.fontFamily || 'sans-serif'}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // Word wrap
    const maxWidth = canvas.width - 100;
    const lineHeight = 50;
    const words = text.split('\n').join(' ').split(' ');
    let line = '';
    let y = 80;

    words.forEach((word) => {
      const testLine = line + word + ' ';
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && line !== '') {
        ctx.fillText(line, canvas.width / 2, y);
        line = word + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    });
    ctx.fillText(line, canvas.width / 2, y);
  };

  const handleDownload = () => {
    drawBookmark();
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bookmark.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="space-y-6">
        <div>
          <label className="block mb-2">책 구절</label>
          <Textarea
            placeholder="좋아하는 책 구절을 입력하세요..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[150px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">폰트</label>
            <Select value={font} onValueChange={setFont}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FONTS.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-2">색상</label>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COLORS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: c.color }}
                      />
                      {c.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block mb-2">미리보기</label>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 min-h-[300px] flex items-center justify-center bg-[#FFFEF7]"
            style={{
              color: selectedColor?.color,
              fontFamily: selectedFont?.fontFamily,
            }}
          >
            {text ? (
              <p className="text-center whitespace-pre-wrap max-w-md">
                {text}
              </p>
            ) : (
              <p className="text-gray-400">여기에 미리보기가 표시됩니다</p>
            )}
          </div>
        </div>

        <Button 
          onClick={handleDownload} 
          disabled={!text}
          className="w-full gap-2"
        >
          <Download className="w-4 h-4" />
          책갈피 다운로드
        </Button>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
