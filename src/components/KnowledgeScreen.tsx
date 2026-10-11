import React, { useState, useMemo } from 'react';
import { KNOWLEDGE_DATA, KnowledgeItem } from '../data/knowledge';
import { 
  Search, 
  BookOpen, 
  Play, 
  Home, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  X,
  Compass,
  Music,
  Award,
  Layers,
  Users
} from 'lucide-react';

interface KnowledgeScreenProps {
  onStartGame: () => void;
  onGoHome: () => void;
  onAskAIAboutTopic: (item: KnowledgeItem) => void;
}

const KNOWLEDGE_GROUPS = [
  'Tất cả',
  'Kiến thức nền tảng',
  'Anh Hiệu và diễn xướng',
  'Bộ bài và cách chơi',
  'Nghệ thuật biểu diễn',
  'Giá trị văn hóa và giáo dục',
] as const;

export const KnowledgeScreen: React.FC<KnowledgeScreenProps> = ({
  onStartGame,
  onGoHome,
  onAskAIAboutTopic,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('Tất cả');
  // Quản lý trạng thái mở rộng/thu gọn của từng card
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Lọc kiến thức theo từ khóa tìm kiếm và nhóm
  const filteredData = useMemo(() => {
    return KNOWLEDGE_DATA.filter((item) => {
      const matchGroup = selectedGroup === 'Tất cả' || item.nhom === selectedGroup;
      const matchSearch =
        item.tieuDe.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.noiDung.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nhom.toLowerCase().includes(searchTerm.toLowerCase());
      return matchGroup && matchSearch;
    });
  }, [selectedGroup, searchTerm]);

  // Biểu tượng theo từng nhóm
  const getGroupIcon = (groupName: string) => {
    switch (groupName) {
      case 'Kiến thức nền tảng':
        return <Compass className="w-4 h-4 text-red-800" />;
      case 'Anh Hiệu và diễn xướng':
        return <Users className="w-4 h-4 text-amber-800" />;
      case 'Bộ bài và cách chơi':
        return <Layers className="w-4 h-4 text-emerald-800" />;
      case 'Nghệ thuật biểu diễn':
        return <Music className="w-4 h-4 text-blue-800" />;
      case 'Giá trị văn hóa và giáo dục':
        return <Award className="w-4 h-4 text-purple-800" />;
      default:
        return <BookOpen className="w-4 h-4 text-stone-700" />;
    }
  };

  // Màu sắc badge theo từng nhóm
  const getGroupBadgeColor = (groupName: string) => {
    switch (groupName) {
      case 'Kiến thức nền tảng':
        return 'bg-red-50 text-red-900 border-red-200';
      case 'Anh Hiệu và diễn xướng':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'Bộ bài và cách chơi':
        return 'bg-emerald-50 text-emerald-900 border-emerald-200';
      case 'Nghệ thuật biểu diễn':
        return 'bg-blue-50 text-blue-900 border-blue-200';
      case 'Giá trị văn hóa và giáo dục':
        return 'bg-purple-50 text-purple-900 border-purple-200';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 flex flex-col">
      {/* ===== BANNER TIÊU ĐỀ TRANG ===== */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs sm:text-sm font-medium shadow-xs mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Sổ tay tra cứu 25 chuyên đề di sản văn hóa</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-heritage text-[#7f1d1d] tracking-wide leading-tight mb-2">
          KHÁM PHÁ BÀI CHÒI
        </h1>

        <p className="text-xs sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Tìm hiểu cội nguồn, cách chơi, nghệ thuật diễn xướng của Anh Hiệu và giá trị văn hóa độc đáo của Bài chòi xứ Quảng.
        </p>
      </div>

      {/* ===== THANH TÌM KIẾM & NÚT ĐIỀU HƯỚNG NHANH ===== */}
      <div className="w-full bg-[#fdfbf7] border-2 border-[#b45309] rounded-2xl p-4 sm:p-5 shadow-sm mb-6 space-y-4">
        {/* Ô tìm kiếm: “Tìm hiểu về Bài chòi...” */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm hiểu về Bài chòi..."
            className="w-full pl-11 pr-10 py-2.5 sm:py-3 bg-white border border-stone-300 focus:border-amber-600 focus:outline-hidden rounded-xl text-sm sm:text-base text-stone-900 placeholder-stone-400 shadow-xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
              title="Xóa tìm kiếm"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Thanh lọc theo 5 nhóm kiến thức */}
        <div>
          <div className="text-xs font-semibold text-stone-700 mb-2 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-amber-800" />
            <span>Lọc theo nhóm kiến thức:</span>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {KNOWLEDGE_GROUPS.map((group) => {
              const isSelected = selectedGroup === group;
              return (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-800 text-white border-amber-900 shadow-xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50 hover:text-amber-950'
                  }`}
                >
                  {group}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== KẾT QUẢ ĐẾM ===== */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-stone-600 mb-4 px-1">
        <span>
          Đang hiển thị: <strong>{filteredData.length}</strong> / {KNOWLEDGE_DATA.length} mục kiến thức
        </span>
        {searchTerm && (
          <span className="italic">
            Từ khóa: &quot;{searchTerm}&quot;
          </span>
        )}
      </div>

      {/* ===== DANH SÁCH 25 MỤC KIẾN THỨC DẠNG CARD / ACCORDION ===== */}
      <div className="space-y-3.5 mb-8">
        {filteredData.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-6 text-stone-500">
            <BookOpen className="w-10 h-10 mx-auto text-stone-300 mb-2" />
            <p className="text-base font-semibold text-stone-700 mb-1">
              Không tìm thấy mục kiến thức nào phù hợp
            </p>
            <p className="text-xs sm:text-sm text-stone-500">
              Em hãy thử tìm kiếm với từ khóa khác hoặc bấm nút &quot;Tất cả&quot; phía trên nhé!
            </p>
          </div>
        ) : (
          filteredData.map((item) => {
            const isExpanded = !!expandedItems[item.id];
            const isLongText = item.noiDung.length > 120;

            return (
              <div
                key={item.id}
                className="bg-white border border-amber-200/80 hover:border-amber-400 rounded-xl p-4 sm:p-5 shadow-xs transition-all duration-150 relative overflow-hidden"
              >
                {/* Header card: Nhóm & Tiêu đề */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] sm:text-xs font-bold border ${getGroupBadgeColor(
                        item.nhom
                      )}`}
                    >
                      {getGroupIcon(item.nhom)}
                      <span>{item.nhom}</span>
                    </span>
                    <span className="text-xs text-stone-600 font-medium">#{item.id}</span>
                  </div>

                  {/* Nút: 🎭 Hỏi Anh Hiệu AI (Yêu cầu 8, 9) */}
                  <button
                    onClick={() => onAskAIAboutTopic(item)}
                    className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                    title={`Hỏi Anh Hiệu AI giải thích sâu hơn về "${item.tieuDe}"`}
                  >
                    <span>🎭</span>
                    <span>Hỏi Anh Hiệu AI</span>
                  </button>
                </div>

                {/* Tiêu đề mục */}
                <h2 className="font-heritage text-base sm:text-lg font-bold text-red-950 mb-2">
                  {item.tieuDe}
                </h2>

                {/* Nội dung mục (hỗ trợ rút gọn/xem thêm nếu cần) */}
                <div className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                  <p className={!isExpanded && isLongText ? 'line-clamp-2' : ''}>
                    {item.noiDung}
                  </p>
                </div>

                {/* Nút xem thêm / thu gọn */}
                {isLongText && (
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="mt-2 text-xs font-bold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Thu gọn' : 'Xem thêm chi tiết'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ===== CÁC NÚT ĐIỀU HƯỚNG DƯỚI CÙNG (YÊU CẦU 10, 11) ===== */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-amber-200">
        {/* Nút: Bắt đầu chơi (chuyển sang game 30 câu) */}
        <button
          onClick={onStartGame}
          className="w-full sm:w-auto min-w-[220px] px-8 py-3.5 bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-900 hover:to-amber-800 active:scale-98 text-white font-heritage font-bold text-base rounded-xl shadow-md border-2 border-amber-400 flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>BẮT ĐẦU CHƠI (30 CÂU)</span>
        </button>

        {/* Nút: Về trang chủ */}
        <button
          onClick={onGoHome}
          className="w-full sm:w-auto min-w-[180px] px-6 py-3.5 bg-white hover:bg-stone-100 active:scale-98 text-stone-800 font-heritage font-bold text-base rounded-xl shadow-sm border border-stone-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Home className="w-5 h-5 text-stone-700" />
          <span>VỀ TRANG CHỦ</span>
        </button>
      </div>
    </div>
  );
};
