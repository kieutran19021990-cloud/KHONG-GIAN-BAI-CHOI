import React from 'react';
import { X, BookOpen, Sparkles, Award } from 'lucide-react';

interface CulturalHandbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CulturalHandbookModal: React.FC<CulturalHandbookModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#fffdf9] border-2 border-[#b45309] rounded-2xl shadow-2xl p-6 sm:p-8"
        role="dialog"
        aria-labelledby="handbook-title"
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
          aria-label="Đóng sổ tay"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tiêu đề */}
        <div className="flex items-center gap-3 border-b border-amber-200 pb-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 id="handbook-title" className="text-xl sm:text-2xl font-bold font-heritage text-[#831843]">
              Sổ Tay Văn Hóa: Bài Chòi Xứ Quảng
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Kiến thức hỗ trợ học tập dành cho học sinh THCS
            </p>
          </div>
        </div>

        {/* Nội dung sổ tay */}
        <div className="space-y-6 text-stone-800 text-sm sm:text-base leading-relaxed">
          {/* Mục 1: Di sản văn hóa */}
          <section className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/80">
            <div className="flex items-center gap-2 font-bold text-amber-900 mb-2">
              <Award className="w-5 h-5 text-amber-700" />
              <h3>1. Bài chòi là gì?</h3>
            </div>
            <p className="text-stone-700">
              Nghệ thuật Bài chòi Trung Bộ Việt Nam (trong đó có Quảng Nam) được UNESCO ghi danh là 
              <strong> Di sản Văn hóa Phi vật thể đại diện của nhân loại</strong> vào năm 2017. 
              Hội chơi diễn ra trong không gian các chòi tre dựng giữa sân làng hoặc bên dòng sông Hoài (Hội An) vào dịp Tết và lễ hội.
            </p>
          </section>

          {/* Mục 2: Ba pho bài */}
          <section>
            <h3 className="font-bold text-stone-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              2. Ba Pho Bài Chòi (Gồm 30 quân bài)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#faf5ee] border border-amber-300/80 rounded-lg">
                <span className="block font-bold text-amber-800 text-sm mb-1">Pho Văn (10 quân)</span>
                <p className="text-xs text-stone-600">
                  Ông Ầm, Bánh Hai, Ba Bụng, Tứ Tượng, Ngũ Ruột, Sáu Ghe, Bảy Liễu, Tám Miểng, Chín Cu, Chín Gối.
                </p>
              </div>

              <div className="p-3 bg-[#faf5ee] border border-amber-300/80 rounded-lg">
                <span className="block font-bold text-emerald-800 text-sm mb-1">Pho Vạn (10 quân)</span>
                <p className="text-xs text-stone-600">
                  Bạch Huê, Nhứt Trò, Nhì Bí, Tam Quăng, Tứ Móc, Ngũ Trợt, Lục Chạng, Thất Vung, Bát Bồng, Cửu Điều.
                </p>
              </div>

              <div className="p-3 bg-[#faf5ee] border border-amber-300/80 rounded-lg">
                <span className="block font-bold text-red-800 text-sm mb-1">Pho Sách (10 quân)</span>
                <p className="text-xs text-stone-600">
                  Thái Tử, Nhứt Nọc, Nhì Nghèo, Ba Gà, Tứ Sách, Năm Dụm, Sáu Bưởng, Bảy Thưa, Tám Dừng, Cửu Chùa.
                </p>
              </div>
            </div>
          </section>

          {/* Mục 3: Nghệ nhân Anh Hiệu */}
          <section className="bg-stone-50 p-4 rounded-xl border border-stone-200">
            <h3 className="font-bold text-stone-900 mb-2">3. Vai trò của &quot;Anh Hiệu&quot; trong hội Bài chòi</h3>
            <p className="text-stone-700">
              <strong>Anh Hiệu</strong> (hoặc Chị Hiệu) là linh hồn của cuộc chơi. Người nghệ nhân này vừa xóc ống thẻ lấy quân bài, vừa ứng khẩu những câu thơ lục bát, câu hò, điệu lý dí dỏm, sâu sắc để đố người chơi trên các chòi. Khi câu hát dứt, tên quân bài được xướng lên trong tiếng trống hội rộn rã!
            </p>
          </section>

          {/* Mẹo chơi */}
          <div className="text-xs text-stone-500 italic text-center pt-2">
            Mẹo nhỏ: Chú ý các từ khóa gợi ý về đồ vật, con vật hoặc âm thanh quen thuộc trong câu thơ lục bát để đoán trúng quân bài nhé!
          </div>
        </div>

        {/* Nút hiểu rồi */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-medium rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            Đã hiểu, quay lại trò chơi
          </button>
        </div>
      </div>
    </div>
  );
};
