import React from 'react';
import { 
  Play, 
  Home, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  HelpCircle, 
  Trophy, 
  AlertCircle, 
  ShieldAlert, 
  Award,
  ArrowRight
} from 'lucide-react';
import { playDrumSound } from '../utils/audio';
import { BaiChoiCardsIllustration } from './BaiChoiIllustrations';

interface HowToPlayScreenProps {
  onStartQuiz: () => void;
  onGoHome: () => void;
  soundEnabled: boolean;
}

export const HowToPlayScreen: React.FC<HowToPlayScreenProps> = ({
  onStartQuiz,
  onGoHome,
  soundEnabled,
}) => {
  const handleStart = () => {
    if (soundEnabled) {
      playDrumSound();
    }
    onStartQuiz();
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-8 flex flex-col items-center">
      {/* Huy hiệu */}
      <div className="mb-3 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs sm:text-sm font-medium shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-amber-700" />
        <span>Luật chơi Hội Bài chòi</span>
      </div>

      {/* 2. Tiêu đề & Mô tả ngắn */}
      <h1 className="text-2xl sm:text-4xl font-extrabold font-heritage text-[#7f1d1d] tracking-wide leading-tight mb-2 text-center">
        HƯỚNG DẪN CHƠI BÀI CHÒI AI
      </h1>
      <p className="text-sm sm:text-base font-medium text-[#9a3412] mb-4 text-center">
        “Lắng nghe câu hô, suy luận và chọn đúng quân bài.”
      </p>

      {/* Minh họa bộ bài và dụng cụ Bài chòi dân gian */}
      <div className="w-full max-w-md mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-sm bg-[#fffefb]">
        <BaiChoiCardsIllustration className="w-full h-auto" />
      </div>

      {/* Khung nội dung chính */}
      <div className="w-full bg-[#fdfbf7] border-2 border-[#b45309] rounded-2xl p-5 sm:p-7 shadow-sm mb-6 space-y-6 text-left">
        {/* 3. BỐN BƯỚC THAM GIA TRÒ CHƠI */}
        <div>
          <h2 className="font-heritage text-base sm:text-lg font-bold text-red-950 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-red-100 text-red-900 flex items-center justify-center text-xs font-black">
              1
            </span>
            <span>4 Bước tham gia cuộc chơi:</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            {/* Bước 1 */}
            <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 shadow-2xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 font-bold">
                <Volume2 className="w-4 h-4 text-amber-800" />
              </div>
              <div>
                <span className="font-bold text-red-950 block mb-0.5">Bước 1:</span>
                <p className="text-stone-700">Đọc hoặc nghe câu hô của nghệ nhân.</p>
              </div>
            </div>

            {/* Bước 2 */}
            <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 shadow-2xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <span className="font-bold text-red-950 block mb-0.5">Bước 2:</span>
                <p className="text-stone-700">Chọn một trong 3 đáp án A, B, C.</p>
              </div>
            </div>

            {/* Bước 3 */}
            <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 shadow-2xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 font-bold">
                <HelpCircle className="w-4 h-4 text-amber-700" />
              </div>
              <div>
                <span className="font-bold text-red-950 block mb-0.5">Bước 3:</span>
                <p className="text-stone-700">Nếu trả lời sai lần đầu, Anh Hiệu sẽ cho em một gợi ý.</p>
              </div>
            </div>

            {/* Bước 4 */}
            <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 shadow-2xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 font-bold">
                <Trophy className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <span className="font-bold text-red-950 block mb-0.5">Bước 4:</span>
                <p className="text-stone-700">Hoàn thành các câu hỏi và xem kết quả cuối trò chơi.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. LUẬT TÍNH ĐIỂM RÕ RÀNG */}
        <div className="pt-4 border-t border-amber-200">
          <h2 className="font-heritage text-base sm:text-lg font-bold text-red-950 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-red-100 text-red-900 flex items-center justify-center text-xs font-black">
              2
            </span>
            <span>Luật tính điểm:</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-center">
            {/* Đúng lần 1 */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 shadow-2xs">
              <div className="text-xs font-semibold text-emerald-900 mb-1">Đúng ngay lần đầu</div>
              <div className="text-2xl font-heritage font-black text-emerald-700">+10 điểm</div>
              <div className="text-[11px] text-emerald-800 mt-1">Xuất sắc &amp; trọn vẹn</div>
            </div>

            {/* Đúng lần 2 sau gợi ý */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 shadow-2xs">
              <div className="text-xs font-semibold text-amber-900 mb-1">Sai lần đầu, đúng sau gợi ý</div>
              <div className="text-2xl font-heritage font-black text-amber-800">+5 điểm</div>
              <div className="text-[11px] text-amber-900 mt-1">Nhớ ý gợi ý của Anh Hiệu</div>
            </div>

            {/* Sai cả 2 lần */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-300 shadow-2xs">
              <div className="text-xs font-semibold text-stone-700 mb-1">Sai cả hai lần</div>
              <div className="text-2xl font-heritage font-black text-stone-500">0 điểm</div>
              <div className="text-[11px] text-stone-600 mt-1">Xem đáp án &amp; giải thích</div>
            </div>
          </div>
        </div>

        {/* 5. PHẦN LƯU Ý QUAN TRỌNG */}
        <div className="pt-4 border-t border-amber-200 bg-amber-50/70 p-4 rounded-xl border border-amber-200">
          <h2 className="font-heritage text-sm sm:text-base font-bold text-amber-950 mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-800" />
            <span>Lưu ý dành cho em:</span>
          </h2>

          <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
            <li className="flex items-start gap-2">
              <span className="text-amber-800 font-bold mt-0.5">•</span>
              <span>Mỗi câu chỉ có tối đa <strong>2 lượt trả lời</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-800 font-bold mt-0.5">•</span>
              <span>Không thể cộng điểm nhiều lần cho cùng một câu.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-800 font-bold mt-0.5">•</span>
              <span><strong>Anh Hiệu AI không tiết lộ đáp án</strong> khi câu hỏi chưa hoàn thành.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-800 font-bold mt-0.5">•</span>
              <span>Một số câu sau này có thể có nút <strong>“Nghe câu hô”</strong> (khi có file audio).</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 6 & 7. NÚT HÀNH ĐỘNG: BẮT ĐẦU CHƠI & VỀ TRANG CHỦ */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
        {/* Nút lớn BẮT ĐẦU CHƠI */}
        <button
          onClick={handleStart}
          className="w-full sm:w-auto min-w-[260px] px-8 py-4 bg-gradient-to-r from-red-800 via-red-700 to-amber-700 hover:from-red-900 hover:to-amber-800 active:scale-98 text-white font-heritage font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-amber-400 flex items-center justify-center gap-2.5 cursor-pointer group"
        >
          <Play className="w-5 h-5 fill-current transition-transform group-hover:scale-110" />
          <span>BẮT ĐẦU CHƠI</span>
        </button>

        {/* Nút Về trang chủ */}
        <button
          onClick={onGoHome}
          className="w-full sm:w-auto min-w-[180px] px-6 py-4 bg-white hover:bg-stone-100 active:scale-98 text-stone-800 font-heritage font-bold text-base rounded-2xl shadow-sm border border-stone-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <Home className="w-5 h-5 text-stone-700" />
          <span>VỀ TRANG CHỦ</span>
        </button>
      </div>
    </div>
  );
};
