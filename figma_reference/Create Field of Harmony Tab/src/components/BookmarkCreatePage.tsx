import { useState } from 'react';
import { Bookmark, BookOpen, Download } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function BookmarkCreatePage() {
  const [quote, setQuote] = useState('');
  const [selectedFont, setSelectedFont] = useState('Pretendard, sans-serif');
  const [selectedColor, setSelectedColor] = useState('#8B4513');

  const fonts = [
    { name: 'Pretendard', value: 'Pretendard, sans-serif' },
    { name: 'Dancing Script', value: 'Dancing Script, cursive' },
    { name: 'Serif', value: 'Georgia, serif' },
    { name: 'Monospace', value: 'Courier New, monospace' },
  ];

  const colors = [
    { name: 'Brown', value: '#8B4513' },
    { name: 'Dark Brown', value: '#654321' },
    { name: 'Amber', value: '#D97706' },
    { name: 'Black', value: '#000000' },
    { name: 'Navy', value: '#1e3a8a' },
    { name: 'Forest', value: '#065f46' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float">
          <BookOpen className="w-16 h-16 text-orange-300/30" />
        </div>
        <div className="absolute top-40 right-20 animate-float-delayed">
          <Bookmark className="w-12 h-12 text-amber-300/30" />
        </div>
        <div className="absolute bottom-32 left-32 animate-float-slow">
          <BookOpen className="w-20 h-20 text-rose-300/30" />
        </div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <Bookmark className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="font-pretendard-bold mb-4">
            Create Your Own Bookmark
          </h1>
          <p className="text-gray-600">
            Create a one-of-a-kind bookmark with your favorite book quote
          </p>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Form Controls */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="quote">Your Favorite Quote</Label>
                <Textarea
                  id="quote"
                  placeholder="Enter a quote from your favorite book..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="font">Font Style</Label>
                <Select value={selectedFont} onValueChange={setSelectedFont}>
                  <SelectTrigger id="font">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>{font.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <div className="grid grid-cols-6 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-full aspect-square rounded-lg border-2 transition-all ${
                        selectedColor === color.value
                          ? 'border-[hsl(var(--accent-brown))] scale-110'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <Button className="w-full bg-[hsl(var(--accent-brown))] hover:bg-[hsl(var(--accent-brown))]/90">
                <Download className="w-4 h-4 mr-2" />
                Download Bookmark
              </Button>
            </div>

            {/* Preview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col items-center">
              <Label className="mb-4 block">Preview</Label>
              <p className="text-gray-500 mb-4">
                Standard bookmark size: 50mm × 150mm (1:3 ratio)
              </p>
              <div
                className="relative w-full max-w-xs rounded-xl flex items-center justify-center p-6 shadow-lg"
                style={{
                  aspectRatio: '1 / 3',
                  background: `linear-gradient(135deg, ${selectedColor}15, ${selectedColor}05)`,
                }}
              >
                {/* Bookmark Tab */}
                <div 
                  className="absolute top-0 left-4 w-8 h-12 bg-gradient-to-b from-amber-600 to-amber-700" 
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 70%, 0 85%)' }}
                />
                
                {/* Quote */}
                {quote ? (
                  <p
                    className="text-center relative z-10 px-4"
                    style={{
                      fontFamily: selectedFont,
                      color: selectedColor,
                      fontSize: '0.9rem',
                      lineHeight: '1.7',
                    }}
                  >
                    "{quote}"
                  </p>
                ) : (
                  <p className="text-center text-gray-400 px-4">
                    Your quote will appear here...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
