import React from 'react';
import { Volume2, VolumeX, BookOpen } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenHandbook: () => void;
  onOpenChat: () => void;
  onGoKnowledge?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenHandbook,
  onOpenChat,
  onGoKnowledge,
}) => {
  return (
    <header className="w-full border-b border-amber-900/15 bg-[#faf5ee]/90 backdrop-blur-xs sticky top-0 z-40 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-700 to-red-800 flex items-center justify-center text-amber-100 shadow-sm border border-amber-600/30">
            <span className="font-heritage text-base font-black">BC</span>
          </div>
          <div>
            <div className="font-heritage font-bold text-base sm:text-lg text-red-950 leading-tight tracking-wide">
              BÀI CHÒI AI – HỒN QUẢNG
            </div>
            <div className="text-[11px] text-amber-900/80 font-medium">
              Di sản văn hóa phi vật thể xứ Quảng
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Nút Khám phá Bài chòi */}
          {onGoKnowledge && (
            <button
              onClick={onGoKnowledge}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-amber-950 bg-amber-100/90 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors cursor-pointer"
              title="Khám phá 25 chuyên đề di sản Bài chòi"
            >
              <BookOpen className="w-4 h-4 text-amber-800" />
              <span className="hidden sm:inline">Khám phá</span>
            </button>
          )}

          {/* Nút Hỏi Anh Hiệu AI */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold text-red-950 bg-gradient-to-r from-amber-200 to-amber-300 hover:from-amber-300 hover:to-amber-400 border border-amber-500 rounded-lg shadow-xs transition-all cursor-pointer animate-pulse"
            title="Mở trò chuyện cùng Anh Hiệu AI"
          >
            <span>🎭</span>
            <span className="hidden xs:inline">Hỏi Anh Hiệu AI</span>
          </button>

          {/* Sổ tay Bài chòi */}
          <button
            onClick={onOpenHandbook}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-amber-950 bg-amber-100/80 hover:bg-amber-200/80 border border-amber-300 rounded-lg transition-colors cursor-pointer"
            title="Mở Sổ tay Bài chòi tìm hiểu thêm"
          >
            <BookOpen className="w-4 h-4 text-amber-800" />
            <span className="hidden sm:inline">Sổ tay di sản</span>
          </button>

          {/* Bật / Tắt âm thanh */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-amber-800 text-amber-50 border-amber-900 hover:bg-amber-900'
                : 'bg-stone-100 text-stone-500 border-stone-300 hover:bg-stone-200'
            }`}
            title={soundEnabled ? 'Đang bật âm thanh trống & hiệu ứng' : 'Đang tắt âm thanh'}
            aria-label="Chuyển đổi âm thanh"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
