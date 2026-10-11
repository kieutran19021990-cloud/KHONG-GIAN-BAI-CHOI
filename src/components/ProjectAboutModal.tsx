import React from 'react';
import { X, Target, Users, BookOpen, Sparkles, HeartHandshake, Layers } from 'lucide-react';

interface ProjectAboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectAboutModal: React.FC<ProjectAboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#fffdf9] border-2 border-[#b45309] rounded-2xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-labelledby="project-about-title"
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
          aria-label="Đóng cửa sổ"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tiêu đề modal */}
        <div className="flex items-center gap-3 border-b border-amber-200 pb-4 mb-5">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-red-900 text-xl font-bold">
            🎋
          </div>
          <div>
            <h2 id="project-about-title" className="text-xl sm:text-2xl font-bold font-heritage text-[#7f1d1d]">
              GIỚI THIỆU DỰ ÁN
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-medium">
              Bài Chòi AI – Hồn Quảng · Nền tảng Giáo dục Di sản Số
            </p>
          </div>
        </div>

        {/* Nội dung chi tiết theo yêu cầu 5 */}
        <div className="space-y-4 text-stone-800 text-sm sm:text-base leading-relaxed">
          {/* Mục tiêu */}
          <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 font-bold text-amber-950 mb-1.5 text-sm sm:text-base">
              <Target className="w-4 h-4 text-amber-800" />
              <h3>1. Mục tiêu dự án</h3>
            </div>
            <p className="text-stone-700 text-xs sm:text-sm">
              Ứng dụng <strong>công nghệ số và trí tuệ nhân tạo (AI)</strong> để hỗ trợ giáo dục địa phương, đổi mới phương pháp học tập và lan tỏa tình yêu di sản văn hóa phi vật thể <strong>Bài chòi Quảng Nam</strong> đến với thế hệ trẻ.
            </p>
          </div>

          {/* Đối tượng */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
            <div className="flex items-center gap-2 font-bold text-stone-900 mb-1.5 text-sm sm:text-base">
              <Users className="w-4 h-4 text-red-800" />
              <h3>2. Đối tượng hướng đến</h3>
            </div>
            <p className="text-stone-700 text-xs sm:text-sm">
              Trọng tâm là <strong>học sinh THCS</strong> (phục vụ môn học Giáo dục Địa phương, Ngữ văn, Lịch sử), giáo viên, cùng những người yêu mến văn hóa dân gian Việt Nam.
            </p>
          </div>

          {/* Nội dung chính */}
          <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 font-bold text-amber-950 mb-2 text-sm sm:text-base">
              <Layers className="w-4 h-4 text-amber-800" />
              <h3>3. Nội dung &amp; Tính năng chính</h3>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-stone-700">
              <li className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-amber-200/60">
                <span className="text-amber-800 font-bold">✦</span>
                <span><strong>25 mục kiến thức</strong> di sản chi tiết</span>
              </li>
              <li className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-amber-200/60">
                <span className="text-amber-800 font-bold">✦</span>
                <span><strong>30 câu hô quân bài</strong> chính thức</span>
              </li>
              <li className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-amber-200/60">
                <span className="text-amber-800 font-bold">✦</span>
                <span><strong>Trò chơi tương tác</strong> đoán quân bài</span>
              </li>
              <li className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-amber-200/60">
                <span className="text-amber-800 font-bold">✦</span>
                <span><strong>Anh Hiệu AI</strong> đồng hành hỏi đáp</span>
              </li>
              <li className="col-span-1 sm:col-span-2 flex items-center gap-1.5 bg-white p-2 rounded-lg border border-amber-200/60 text-stone-600 italic">
                <span className="text-amber-800 font-bold">✦</span>
                <span><strong>Audio câu hô nghệ nhân:</strong> Sẵn sàng bổ sung trong thư mục Audio</span>
              </li>
            </ul>
          </div>

          {/* Thông điệp cốt lõi */}
          <div className="p-4 bg-gradient-to-r from-red-900 to-amber-900 rounded-xl text-white text-center shadow-sm">
            <div className="flex items-center justify-center gap-1.5 text-xs text-amber-200 font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Thông điệp của dự án</span>
            </div>
            <blockquote className="font-heritage text-base sm:text-lg font-bold italic text-amber-100">
              “Công nghệ không thay thế di sản, mà giúp thế hệ trẻ đến gần di sản hơn.”
            </blockquote>
          </div>
        </div>

        {/* Nút đóng phía dưới */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-medium rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
