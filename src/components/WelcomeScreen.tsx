import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  BookOpen, 
  MessageCircle, 
  Info, 
  ArrowRight, 
  Compass, 
  Music, 
  Award 
} from 'lucide-react';
import { playDrumSound } from '../utils/audio';
import { ProjectAboutModal } from './ProjectAboutModal';
import { BaiChoiHeroIllustration, AnhHieuAvatarIllustration, BaiChoiCardsIllustration } from './BaiChoiIllustrations';

interface WelcomeScreenProps {
  onStart: () => void;
  onGoKnowledge: () => void;
  onOpenChat: () => void;
  soundEnabled: boolean;
  onOpenHandbook: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  onGoKnowledge,
  onOpenChat,
  soundEnabled,
}) => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const handleStartPlay = () => {
    if (soundEnabled) {
      playDrumSound();
    }
    onStart();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center text-center">
      {/* Huy hiệu di sản UNESCO */}
      <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs sm:text-sm font-medium shadow-xs">
        <Sparkles className="w-4 h-4 text-amber-700" />
        <span>Di sản Văn hóa Phi vật thể Đại diện của Nhân loại (UNESCO)</span>
      </div>

      {/* 1. Tiêu đề lớn */}
      <h1 className="text-3xl sm:text-5xl font-extrabold font-heritage text-[#7f1d1d] tracking-wide leading-tight mb-3">
        BÀI CHÒI AI – HỒN QUẢNG
      </h1>

      {/* 2. Dòng giới thiệu */}
      <p className="text-lg sm:text-2xl font-bold font-heritage text-[#9a3412] mb-3">
        “Chạm di sản – Học văn hóa – Sống cùng Bài chòi”
      </p>

      {/* 3. Phần giới thiệu ngắn */}
      <p className="text-sm sm:text-base text-stone-700 max-w-2xl mx-auto leading-relaxed mb-6 font-medium">
        Đây là nền tảng giáo dục số giúp học sinh tìm hiểu, trải nghiệm và khám phá nghệ thuật Bài chòi Quảng Nam thông qua trò chơi và trí tuệ nhân tạo.
      </p>

      {/* KHUNG MINH HỌA NGHỆ THUẬT DÂN GIAN XỨ QUẢNG (HERO BANNER) */}
      <div className="w-full max-w-3xl mb-8 rounded-3xl overflow-hidden border-2 border-amber-300/80 shadow-lg bg-[#fffdfa] relative group">
        <BaiChoiHeroIllustration className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.01]" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-stone-900/60 backdrop-blur-xs text-amber-200 text-xs font-semibold">
            🏮 Không gian diễn xướng Hội Bài chòi Quảng Nam
          </span>
          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-red-900/70 backdrop-blur-xs text-white text-xs font-medium">
            🎭 Anh Hiệu xướng bài & gõ song loan
          </span>
        </div>
      </div>

      {/* 6. Nút truy cập nhanh: Khám phá · Chơi ngay · Hỏi Anh Hiệu */}
      <div className="w-full max-w-xl flex items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 p-1.5 bg-[#f5ede0] rounded-2xl border border-amber-200 shadow-2xs">
        <button
          onClick={onGoKnowledge}
          className="flex-1 py-2 sm:py-2.5 px-3 bg-white hover:bg-amber-50 text-amber-950 font-bold text-xs sm:text-sm rounded-xl border border-amber-200 transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-98"
        >
          <BookOpen className="w-4 h-4 text-amber-800" />
          <span>Khám phá</span>
        </button>

        <button
          onClick={handleStartPlay}
          className="flex-1 py-2 sm:py-2.5 px-3 bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-900 hover:to-amber-800 text-white font-bold text-xs sm:text-sm rounded-xl border border-amber-400 transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-98"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Chơi ngay</span>
        </button>

        <button
          onClick={onOpenChat}
          className="flex-1 py-2 sm:py-2.5 px-3 bg-white hover:bg-amber-50 text-red-950 font-bold text-xs sm:text-sm rounded-xl border border-amber-200 transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-98"
        >
          <span className="text-sm">🎭</span>
          <span>Hỏi Anh Hiệu</span>
        </button>
      </div>

      {/* 4. BỐN THẺ CHỨC NĂNG LỚN (A, B, C, D) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 text-left">
        {/* THẺ A: KHÁM PHÁ BÀI CHÒI */}
        <div className="bg-[#fffefb] border-2 border-amber-300 hover:border-amber-500 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 mb-3 border border-amber-300/60 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-amber-900" />
            </div>
            <h2 className="font-heritage text-lg sm:text-xl font-bold text-red-950 mb-1">
              A. KHÁM PHÁ BÀI CHÒI
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mb-4 leading-relaxed">
              “Tìm hiểu kiến thức về Bài chòi Quảng Nam”
            </p>
          </div>
          <button
            onClick={onGoKnowledge}
            className="w-full py-3 px-4 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-sm rounded-xl border border-amber-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <span>Khám phá ngay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* THẺ B: CHƠI BÀI CHÒI */}
        <div className="bg-[#fffefb] border-2 border-red-300 hover:border-red-500 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-800 mb-3 border border-red-300/60 group-hover:scale-105 transition-transform">
              <Play className="w-6 h-6 text-red-900 fill-current" />
            </div>
            <h2 className="font-heritage text-lg sm:text-xl font-bold text-red-950 mb-1">
              B. CHƠI BÀI CHÒI
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mb-4 leading-relaxed">
              “Nghe câu hô – Đoán quân bài – Nhận điểm”
            </p>
          </div>
          <button
            onClick={handleStartPlay}
            className="w-full py-3 px-4 bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-900 hover:to-amber-800 text-white font-bold text-sm rounded-xl border border-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
          >
            <span>Bắt đầu chơi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* THẺ C: ANH HIỆU AI */}
        <div className="bg-[#fffefb] border-2 border-amber-300 hover:border-amber-500 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="w-14 h-14 rounded-2xl overflow-hidden mb-3 border border-amber-300/80 group-hover:scale-105 transition-transform shadow-xs">
              <AnhHieuAvatarIllustration className="w-full h-full" />
            </div>
            <h2 className="font-heritage text-lg sm:text-xl font-bold text-red-950 mb-1 flex items-center gap-2">
              <span>C. ANH HIỆU AI</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-sans">Trợ lý</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mb-4 leading-relaxed">
              “Hỏi đáp, giải thích và khám phá Bài chòi cùng AI”
            </p>
          </div>
          <button
            onClick={onOpenChat}
            className="w-full py-3 px-4 bg-white hover:bg-amber-50 text-red-950 font-bold text-sm rounded-xl border border-amber-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <span>Trò chuyện</span>
            <MessageCircle className="w-4 h-4 text-amber-800" />
          </button>
        </div>

        {/* THẺ D: GIỚI THIỆU DỰ ÁN */}
        <div className="bg-[#fffefb] border-2 border-stone-300 hover:border-amber-400 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800 mb-3 border border-stone-200 group-hover:scale-105 transition-transform">
              <Info className="w-6 h-6 text-stone-700" />
            </div>
            <h2 className="font-heritage text-lg sm:text-xl font-bold text-red-950 mb-1">
              D. GIỚI THIỆU DỰ ÁN
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mb-4 leading-relaxed">
              “Khám phá mục tiêu và ý nghĩa của Bài Chòi AI – Hồn Quảng”
            </p>
          </div>
          <button
            onClick={() => setIsAboutModalOpen(true)}
            className="w-full py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-sm rounded-xl border border-stone-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <span>Tìm hiểu</span>
            <ArrowRight className="w-4 h-4 text-stone-600" />
          </button>
        </div>
      </div>

      {/* 5. Khung thông điệp cốt lõi hiển thị trực tiếp ở chân trang */}
      <div className="w-full max-w-2xl bg-amber-50/90 border border-amber-300 rounded-2xl p-4 sm:p-5 text-center shadow-2xs">
        <div className="text-xs text-amber-900 font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Thông điệp Hồn Quảng</span>
        </div>
        <p className="font-heritage text-sm sm:text-base font-bold text-[#7f1d1d] italic">
          “Công nghệ không thay thế di sản, mà giúp thế hệ trẻ đến gần di sản hơn.”
        </p>
      </div>

      {/* Modal giới thiệu chi tiết dự án (khi bấm Tìm hiểu ở Thẻ D) */}
      <ProjectAboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
};
