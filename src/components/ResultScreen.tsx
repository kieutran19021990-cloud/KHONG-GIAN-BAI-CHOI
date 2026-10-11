import React, { useEffect, useState } from 'react';
import { Question } from '../types/game';
import { 
  Trophy, 
  RotateCcw, 
  Home, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Award,
  Sparkles,
  Bot,
  Compass,
  Star,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Check
} from 'lucide-react';
import { playCorrectSound, playDrumSound } from '../utils/audio';
import { getAnhHieuSummaryFeedback } from '../services/anhHieuAI';

export interface ResultItem {
  question: Question;
  earnedPoints: number;
  isCorrect: boolean;
  chosenKey: string | null;
}

interface ResultScreenProps {
  totalScore: number;
  maxScore: number;
  correctCount: number;
  wrongCount: number;
  totalQuestions: number;
  results: ResultItem[];
  soundEnabled: boolean;
  onPlayAgain: () => void;
  onGoHome: () => void;
  onOpenHandbook: () => void;
  onGoKnowledge?: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  totalScore,
  maxScore,
  correctCount,
  wrongCount,
  totalQuestions,
  results,
  soundEnabled,
  onPlayAgain,
  onGoHome,
  onOpenHandbook,
  onGoKnowledge,
}) => {
  // Thống kê chi tiết điểm số và lần trả lời:
  const correctFirstCount = results.filter((r) => r.earnedPoints === 10).length;
  const correctHintCount = results.filter((r) => r.earnedPoints === 5).length;
  const actualWrongCount = results.filter((r) => !r.isCorrect || r.earnedPoints === 0).length;
  const totalCorrect = correctFirstCount + correctHintCount;

  // Tỷ lệ chính xác (%)
  const effectiveTotal = totalQuestions > 0 ? totalQuestions : 30;
  const accuracy = Math.round((totalCorrect / effectiveTotal) * 100);

  // Trạng thái nhận xét của Anh Hiệu AI
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(null);

  // ==================== YÊU CẦU 3: XẾP LOẠI CHÍNH XÁC ====================
  // Nếu tỷ lệ >= 80%: 🏆 “Nhà khám phá Bài chòi xuất sắc”
  // Nếu tỷ lệ >= 50% và < 80%: ⭐ “Nhà khám phá Bài chòi”
  // Nếu tỷ lệ < 50%: 🌱 “Hãy tiếp tục luyện tập cùng Anh Hiệu”
  let rankIcon = '🏆';
  let rankText = '';
  let badgeColor = '';
  let badgeBorder = '';
  let rankAdvice = '';

  if (accuracy >= 80) {
    rankIcon = '🏆';
    rankText = 'Nhà khám phá Bài chòi xuất sắc';
    badgeColor = 'bg-amber-50 text-amber-950 border-amber-300';
    badgeBorder = 'border-amber-400';
    rankAdvice = 'Tuyệt vời! Em có sự nhạy bén và ghi nhớ lời hô quân bài chòi rất xuất sắc.';
  } else if (accuracy >= 50) {
    rankIcon = '⭐';
    rankText = 'Nhà khám phá Bài chòi';
    badgeColor = 'bg-blue-50 text-blue-950 border-blue-300';
    badgeBorder = 'border-blue-400';
    rankAdvice = 'Rất đáng khen! Em đã hiểu được nhiều câu hô dân gian, chỉ cần rèn luyện thêm một chút là thành tài.';
  } else {
    rankIcon = '🌱';
    rankText = 'Hãy tiếp tục luyện tập cùng Anh Hiệu';
    badgeColor = 'bg-emerald-50 text-emerald-950 border-emerald-300';
    badgeBorder = 'border-emerald-400';
    rankAdvice = 'Đừng lo lắng nhé! Nghệ thuật Bài chòi cần thời gian để thấm nhuần. Hãy cùng Anh Hiệu luyện tập thêm!';
  }

  // ==================== YÊU CẦU 4 & 5: PHÂN TÍCH KẾT QUẢ THEO 3 PHO ====================
  // Pho Văn, Pho Vạn, Pho Sách
  const getPhoCategory = (phoStr: string): 'Văn' | 'Vạn' | 'Sách' => {
    const lower = phoStr.toLowerCase();
    if (lower.includes('văn')) return 'Văn';
    if (lower.includes('vạn')) return 'Vạn';
    return 'Sách';
  };

  const phoVanItems = results.filter((r) => getPhoCategory(r.question.pho) === 'Văn');
  const phoVanTItems = results.filter((r) => getPhoCategory(r.question.pho) === 'Vạn');
  const phoSachItems = results.filter((r) => getPhoCategory(r.question.pho) === 'Sách');

  const calcPho = (items: ResultItem[], name: string, icon: string, shortDesc: string) => {
    const total = items.length > 0 ? items.length : 10;
    const correct = items.filter((i) => i.isCorrect).length;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { name, total, correct, percent, icon, shortDesc };
  };

  const phoVanStat = calcPho(phoVanItems, 'Pho Văn', '📜', 'Ẩm thực, đời sống bình dị & tính cách con người xứ Quảng');
  const phoVanTStat = calcPho(phoVanTItems, 'Pho Vạn', '⛵', 'Sông nước Cửa Đại, ghe bầu, nghề chài lưới & đi biển');
  const phoSachStat = calcPho(phoSachItems, 'Pho Sách', '🎋', 'Chữ nghĩa, trường thi, lều chõng & nề nếp gia phong');

  const allPhoStats = [phoVanStat, phoVanTStat, phoSachStat];

  // Xác định pho hiểu rõ nhất và pho cần rèn luyện thêm
  const sortedPhoByPercent = [...allPhoStats].sort((a, b) => b.percent - a.percent);
  const bestPho = sortedPhoByPercent[0];
  const weakestPho = sortedPhoByPercent[sortedPhoByPercent.length - 1];

  // Kiểm tra nếu tất cả đều đạt điểm tuyệt đối 100%
  const isAllPerfect = allPhoStats.every((p) => p.percent === 100);

  useEffect(() => {
    if (soundEnabled) {
      playCorrectSound();
    }
  }, [soundEnabled]);

  const handlePlayAgain = () => {
    if (soundEnabled) playDrumSound();
    onPlayAgain();
  };

  const handleGoHome = () => {
    if (soundEnabled) playDrumSound();
    onGoHome();
  };

  // Yêu cầu nhận xét của Anh Hiệu AI
  const handleRequestAiFeedback = async () => {
    if (isLoadingAi) return;
    setIsLoadingAi(true);

    const wrongCardsList = results
      .filter((r) => !r.isCorrect)
      .map((r) => `${r.question.tenQuan} (${r.question.pho})`);

    try {
      const feedback = await getAnhHieuSummaryFeedback({
        totalScore,
        correctFirstCount,
        correctHintCount,
        wrongCount: actualWrongCount,
        wrongCardsList,
        bestPho: `${bestPho.name} (${bestPho.correct}/${bestPho.total} câu - ${bestPho.percent}%)`,
        weakestPho: isAllPerfect ? 'Đã thành thạo cả 3 pho' : `${weakestPho.name} (${weakestPho.correct}/${weakestPho.total} câu - ${weakestPho.percent}%)`,
      });
      setAiFeedback(feedback);
    } catch {
      setAiFeedback('Anh Hiệu AI đang tạm nghỉ. Em vẫn có thể tiếp tục trò chơi nhé!');
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-8 flex flex-col items-center animate-in fade-in duration-300">
      {/* Biểu tượng cúp vinh danh */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-red-600 to-amber-700 flex items-center justify-center text-amber-100 shadow-xl border-3 border-amber-300 mb-3 animate-in zoom-in-75 duration-300">
        <Trophy className="w-10 h-10 drop-shadow-md text-amber-200" />
      </div>

      {/* Tiêu đề kết quả */}
      <h2 className="text-2xl sm:text-3xl font-heritage font-bold text-red-950 mb-1 text-center tracking-wide">
        KẾT QUẢ KHÁM PHÁ BÀI CHÒI
      </h2>
      <p className="text-xs sm:text-sm text-stone-600 mb-6 text-center max-w-lg">
        Chúc mừng em đã hoàn thành toàn bộ 30 câu hỏi về di sản Bài chòi Quảng Nam!
      </p>

      {/* Khung chính chứa toàn bộ kết quả */}
      <div className="w-full bg-[#fdfbf7] border-2 border-amber-700/30 rounded-2xl p-4 sm:p-6 shadow-md mb-6 space-y-6">
        
        {/* ==================== 1. XẾP LOẠI VINH DANH ==================== */}
        <div className={`p-4 sm:p-5 rounded-xl border-2 ${badgeColor} ${badgeBorder} shadow-xs text-center transition-all`}>
          <div className="flex items-center justify-center gap-2 mb-1.5 text-xs sm:text-sm text-stone-600 uppercase tracking-widest font-semibold">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>XẾP LOẠI DANH HIỆU</span>
          </div>

          <div className="text-2xl sm:text-3xl font-heritage font-black text-red-900 flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl sm:text-4xl">{rankIcon}</span>
            <span>“{rankText}”</span>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 italic max-w-md mx-auto">
            {rankAdvice}
          </p>
        </div>

        {/* ==================== 2. THỐNG KÊ CHI TIẾT (YÊU CẦU 2) ==================== */}
        <div>
          <div className="flex items-center gap-2 font-heritage font-bold text-base text-red-950 mb-3">
            <Award className="w-5 h-5 text-amber-700" />
            <span>THỐNG KÊ ĐIỂM SỐ &amp; TỶ LỆ</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 text-center">
            {/* Tổng điểm */}
            <div className="col-span-2 sm:col-span-1 p-3 bg-gradient-to-b from-amber-50 to-amber-100/70 rounded-xl border border-amber-300 flex flex-col justify-center">
              <div className="text-[11px] sm:text-xs text-stone-700 font-semibold mb-0.5">Tổng điểm</div>
              <div className="text-2xl sm:text-3xl font-heritage font-black text-amber-950">
                {totalScore}
              </div>
              <div className="text-[11px] text-amber-900/80 font-medium">/{maxScore} điểm</div>
            </div>

            {/* Đúng ngay lần đầu (+10 điểm) */}
            <div className="p-3 bg-emerald-50/90 rounded-xl border border-emerald-300 flex flex-col justify-center">
              <div className="text-[11px] sm:text-xs text-emerald-900 font-semibold mb-0.5 flex items-center justify-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Đúng lần đầu</span>
              </div>
              <div className="text-xl sm:text-2xl font-heritage font-bold text-emerald-800">
                {correctFirstCount}
              </div>
              <div className="text-[10px] text-emerald-700 font-medium">+10đ / câu</div>
            </div>

            {/* Đúng sau gợi ý (+5 điểm) */}
            <div className="p-3 bg-amber-50/90 rounded-xl border border-amber-300 flex flex-col justify-center">
              <div className="text-[11px] sm:text-xs text-amber-900 font-semibold mb-0.5 flex items-center justify-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>Đúng sau gợi ý</span>
              </div>
              <div className="text-xl sm:text-2xl font-heritage font-bold text-amber-800">
                {correctHintCount}
              </div>
              <div className="text-[10px] text-amber-700 font-medium">+5đ / câu</div>
            </div>

            {/* Số câu sai */}
            <div className="p-3 bg-red-50/80 rounded-xl border border-red-300 flex flex-col justify-center">
              <div className="text-[11px] sm:text-xs text-red-900 font-semibold mb-0.5 flex items-center justify-center gap-1">
                <XCircle className="w-3.5 h-3.5 text-red-600" />
                <span>Số câu sai</span>
              </div>
              <div className="text-xl sm:text-2xl font-heritage font-bold text-red-800">
                {actualWrongCount}
              </div>
              <div className="text-[10px] text-red-700 font-medium">0đ / câu</div>
            </div>

            {/* Tỷ lệ chính xác */}
            <div className="col-span-2 sm:col-span-1 p-3 bg-stone-100/80 rounded-xl border border-stone-300 flex flex-col justify-center">
              <div className="text-[11px] sm:text-xs text-stone-700 font-semibold mb-0.5">Tỷ lệ chính xác</div>
              <div className="text-xl sm:text-2xl font-heritage font-black text-stone-900">
                {accuracy}%
              </div>
              <div className="text-[10px] text-stone-600 font-medium">{totalCorrect}/{effectiveTotal} câu đúng</div>
            </div>
          </div>
        </div>

        {/* ==================== 3. PHÂN TÍCH KẾT QUẢ THEO 3 PHO (YÊU CẦU 4 & 5) ==================== */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#f7f0e4] border-2 border-amber-300/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">📊</span>
              <h3 className="font-heritage font-bold text-base sm:text-lg text-red-950">
                PHÂN TÍCH KẾT QUẢ THEO 3 PHO
              </h3>
            </div>
            <span className="text-xs text-amber-900/80 italic">
              Đánh giá mức độ am hiểu từng pho bài
            </span>
          </div>

          {/* 3 Thẻ Pho: Văn, Vạn, Sách */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {allPhoStats.map((pho) => (
              <div 
                key={pho.name}
                className="bg-white rounded-xl p-3.5 border border-amber-200/90 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-1.5 font-heritage font-bold text-stone-900 text-sm">
                      <span className="text-base">{pho.icon}</span>
                      <span>{pho.name}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      pho.percent >= 80 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : pho.percent >= 50 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {pho.percent}%
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-500 mb-2 line-clamp-2 leading-snug">
                    {pho.shortDesc}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-stone-700 font-semibold mb-1">
                    <span>Số câu đúng:</span>
                    <span className="font-bold text-red-950">{pho.correct}/{pho.total}</span>
                  </div>

                  {/* Thanh tiến độ trực quan */}
                  <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 rounded-full ${
                        pho.percent >= 80 
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' 
                          : pho.percent >= 50 
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600' 
                          : 'bg-gradient-to-r from-red-500 to-red-600'
                      }`}
                      style={{ width: `${Math.max(pho.percent, 5)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Đánh giá điểm mạnh & điểm cần rèn luyện thêm (Yêu cầu 5) */}
          <div className="bg-white/80 rounded-xl p-3.5 border border-amber-200 space-y-2.5 text-xs sm:text-sm">
            {/* Pho hiểu rõ nhất */}
            <div className="flex items-start gap-2.5">
              <span className="text-base shrink-0 mt-0.5">🌟</span>
              <div>
                <span className="font-bold text-stone-900">Pho hiểu rõ nhất: </span>
                <span className="font-bold text-emerald-800">
                  {bestPho.name} ({bestPho.correct}/{bestPho.total} câu – {bestPho.percent}%)
                </span>
                <p className="text-stone-600 text-xs mt-0.5">
                  {bestPho.percent === 100
                    ? 'Xuất sắc! Em ghi nhớ hoàn hảo toàn bộ câu hô của pho này.'
                    : 'Em suy luận rất nhanh và nhận diện chính xác các từ khóa trong câu hô của pho này.'}
                </p>
              </div>
            </div>

            {/* Pho cần rèn luyện thêm */}
            <div className="flex items-start gap-2.5 pt-2 border-t border-amber-100">
              <span className="text-base shrink-0 mt-0.5">🎯</span>
              <div>
                <span className="font-bold text-stone-900">Pho cần rèn luyện thêm: </span>
                {isAllPerfect ? (
                  <span className="font-bold text-emerald-800">
                    Em đã nắm vững tuyệt đối cả 3 pho bài chòi!
                  </span>
                ) : (
                  <>
                    <span className="font-bold text-amber-800">
                      {weakestPho.name} ({weakestPho.correct}/{weakestPho.total} câu – {weakestPho.percent}%)
                    </span>
                    <p className="text-stone-600 text-xs mt-0.5">
                      <strong>Lời khuyên từ Anh Hiệu:</strong> Em hãy vào mục <em>Sổ tay di sản</em> hoặc <em>Khám phá Bài chòi</em> để nghe lại các câu hô và tìm hiểu sâu hơn về 10 quân bài của {weakestPho.name} nhé!
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ==================== 4. NHẬN XÉT CỦA ANH HIỆU AI ==================== */}
        <div className="p-4 rounded-xl bg-[#faf5ee] border-2 border-amber-300 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 font-bold text-sm text-red-950 font-heritage">
              <span className="text-lg">🎭</span>
              <span>LỜI NHẮN NHỦ TỪ ANH HIỆU AI</span>
            </div>

            {!aiFeedback && (
              <button
                onClick={handleRequestAiFeedback}
                disabled={isLoadingAi}
                className="px-4 py-2 bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-900 hover:to-amber-800 disabled:opacity-60 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Bot className="w-4 h-4" />
                <span>{isLoadingAi ? 'Anh Hiệu đang viết nhận xét...' : 'Nhận xét của Anh Hiệu AI'}</span>
              </button>
            )}
          </div>

          {aiFeedback ? (
            <div className="p-3.5 bg-white rounded-lg border border-amber-200 text-xs sm:text-sm text-stone-800 leading-relaxed italic animate-in fade-in duration-300">
              “{aiFeedback}”
            </div>
          ) : (
            <p className="text-xs text-stone-600 italic">
              Bấm nút &quot;Nhận xét của Anh Hiệu AI&quot; để lắng nghe lời khuyên và động viên 3–5 câu từ nghệ nhân dành riêng cho kết quả của em!
            </p>
          )}
        </div>

        {/* ==================== 5. BẢNG GHI NHỚ CHI TIẾT 30 QUÂN BÀI (YÊU CẦU 6) ==================== */}
        <div className="text-left border-t border-amber-200/80 pt-4">
          <div className="font-heritage font-bold text-sm sm:text-base text-stone-900 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span>📋</span>
              <span>BẢNG CHI TIẾT 30 QUÂN BÀI ĐÃ CHƠI</span>
            </div>
            <span className="text-xs text-stone-500 font-normal">
              Bấm vào từng câu để xem câu hô &amp; giải thích
            </span>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {results.map((r, index) => {
              const isExpanded = expandedQuestionId === r.question.id;
              const isCorrectFirst = r.earnedPoints === 10;
              const isCorrectHint = r.earnedPoints === 5;
              const isFailed = !r.isCorrect || r.earnedPoints === 0;

              return (
                <div 
                  key={r.question.id}
                  className="rounded-lg bg-stone-50 border border-stone-200/90 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedQuestionId(isExpanded ? null : r.question.id)}
                    className="w-full p-2.5 text-left flex items-center justify-between gap-2 hover:bg-stone-100/70 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      {isCorrectFirst && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {isCorrectHint && (
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      )}
                      {isFailed && (
                        <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                      )}

                      <div className="truncate text-xs sm:text-sm">
                        <span className="font-bold text-stone-900 mr-1.5">
                          Câu {index + 1}:
                        </span>
                        <span className="font-semibold text-red-950">
                          {r.question.tenQuan}
                        </span>
                        <span className="text-stone-500 text-xs ml-1.5">
                          ({r.question.pho})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        isCorrectFirst
                          ? 'bg-emerald-100 text-emerald-800'
                          : isCorrectHint
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {isCorrectFirst
                          ? '+10đ (Đúng lần 1)'
                          : isCorrectHint
                          ? '+5đ (Đúng sau gợi ý)'
                          : '0đ (Chưa đúng)'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-stone-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-400" />
                      )}
                    </div>
                  </button>

                  {/* Chi tiết mở rộng khi bấm vào */}
                  {isExpanded && (
                    <div className="px-3 pb-3 pt-1 border-t border-stone-200 text-xs bg-white space-y-1.5">
                      <div className="p-2 rounded bg-amber-50/70 border border-amber-200 text-stone-800 italic leading-relaxed">
                        <strong>Lời hô:</strong> “{r.question.loiHo}”
                      </div>
                      <div className="text-stone-700">
                        <strong>Giải thích:</strong> {r.question.giaiThich}
                      </div>
                      <div className="text-stone-500">
                        <strong>Gợi ý của câu:</strong> {r.question.goiY}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==================== 6. NÚT ĐIỀU HƯỚNG THEO YÊU CẦU ==================== */}
      <div className="w-full flex flex-wrap items-center justify-center gap-3">
        {/* Nút Chơi lại */}
        <button
          onClick={handlePlayAgain}
          className="flex-1 sm:flex-none min-w-[160px] px-6 py-3.5 bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-900 hover:to-amber-800 active:scale-98 text-white font-heritage font-bold text-base rounded-xl shadow-md border-2 border-amber-400 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          <span>CHƠI LẠI</span>
        </button>

        {/* Nút Về trang chủ */}
        <button
          onClick={handleGoHome}
          className="flex-1 sm:flex-none min-w-[160px] px-6 py-3.5 bg-white hover:bg-stone-100 active:scale-98 text-stone-800 font-heritage font-bold text-base rounded-xl shadow-xs border border-stone-300 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <Home className="w-5 h-5 text-stone-700" />
          <span>VỀ TRANG CHỦ</span>
        </button>

        {/* Nút Sổ tay di sản */}
        <button
          onClick={onOpenHandbook}
          className="w-full sm:w-auto px-5 py-3.5 bg-amber-100/90 hover:bg-amber-200 active:scale-98 text-amber-950 font-heritage font-bold text-sm rounded-xl border border-amber-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-amber-800" />
          <span>Sổ tay di sản</span>
        </button>

        {/* Nút Khám phá nếu có */}
        {onGoKnowledge && (
          <button
            onClick={onGoKnowledge}
            className="w-full sm:w-auto px-5 py-3.5 bg-emerald-100/80 hover:bg-emerald-200 active:scale-98 text-emerald-950 font-heritage font-bold text-sm rounded-xl border border-emerald-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-emerald-800" />
            <span>Khám phá Bài chòi</span>
          </button>
        )}
      </div>
    </div>
  );
};
