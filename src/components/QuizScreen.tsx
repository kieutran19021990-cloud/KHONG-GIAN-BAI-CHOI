import React, { useState, useEffect, useRef } from 'react';
import { Question } from '../types/game';
import { QUESTIONS_DATA } from '../data/questions';
import { 
  Volume2, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Award,
  Sparkles
} from 'lucide-react';
import { 
  playDrumSound, 
  playClickClapper, 
  playCorrectSound, 
  playHintSound, 
  speakCallVerse,
  stopSpeaking 
} from '../utils/audio';

interface QuizScreenProps {
  questions?: Question[];
  currentScore: number;
  correctAnswersCount: number;
  soundEnabled: boolean;
  onAnswerAttempt: (
    questionId: number, 
    isFirstAttempt: boolean, 
    chosenKey: 'A' | 'B' | 'C', 
    isCorrect: boolean, 
    pointsToAdd: number
  ) => void;
  onNextQuestion: () => void;
  onFinishGame: () => void;
  onOpenChat: () => void;
  onActiveQuestionChange?: (question: Question, isAnswered: boolean) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions = QUESTIONS_DATA,
  currentScore,
  correctAnswersCount,
  soundEnabled,
  onAnswerAttempt,
  onNextQuestion,
  onFinishGame,
  onOpenChat,
  onActiveQuestionChange,
}) => {
  const activeQuestions = questions && questions.length > 0 ? questions : QUESTIONS_DATA;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = activeQuestions[currentIndex];
  const isLastQuestion = currentIndex === activeQuestions.length - 1;

  // Trạng thái câu hỏi:
  // 'idle': chưa chọn
  // 'hint_shown': sai lần 1 -> hiện gợi ý, cho chọn lần 2
  // 'answered_correct_first': đúng lần 1 (+10đ)
  // 'answered_correct_second': đúng lần 2 (+5đ)
  // 'answered_wrong_second': sai lần 2 (+0đ)
  type QuestionState = 
    | 'idle' 
    | 'hint_shown' 
    | 'answered_correct_first' 
    | 'answered_correct_second' 
    | 'answered_wrong_second';

  const [questionState, setQuestionState] = useState<QuestionState>('idle');
  const [firstFailedKey, setFirstFailedKey] = useState<'A' | 'B' | 'C' | null>(null);
  const [selectedKey, setSelectedKey] = useState<'A' | 'B' | 'C' | null>(null);
  const [canAdvance, setCanAdvance] = useState(false);
  const [isChanting, setIsChanting] = useState(false);
  const [isBusy, setIsBusy] = useState(false); // Chống click đúp liên tục

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const isAnswered = 
    questionState === 'answered_correct_first' || 
    questionState === 'answered_correct_second' || 
    questionState === 'answered_wrong_second';

  useEffect(() => {
    if (currentQuestion && onActiveQuestionChange) {
      onActiveQuestionChange(currentQuestion, isAnswered);
    }
  }, [currentQuestion, isAnswered, onActiveQuestionChange]);

  // Dừng phát file audio
  const stopAudio = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      audioPlayerRef.current = null;
    }
    setIsPlayingAudio(false);
  };

  // Reset hoàn toàn trạng thái khi chuyển sang câu mới
  useEffect(() => {
    setQuestionState('idle');
    setFirstFailedKey(null);
    setSelectedKey(null);
    setCanAdvance(false);
    setIsBusy(false);
    stopSpeaking();
    setIsChanting(false);
    stopAudio();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      stopSpeaking();
      stopAudio();
    };
  }, [currentIndex]);

  if (!currentQuestion) return null;

  // Danh sách 3 phương án lựa chọn
  const optionsList: { key: 'A' | 'B' | 'C'; text: string }[] = [
    { key: 'A', text: currentQuestion.dapAnA },
    { key: 'B', text: currentQuestion.dapAnB },
    { key: 'C', text: currentQuestion.dapAnC },
  ];

  // Phát file audio mp3 của câu hiện tại (Yêu cầu 3, 4, 5, 8)
  const handlePlayAudio = () => {
    if (!currentQuestion.audio || currentQuestion.audio.trim() === '') return;

    if (isPlayingAudio) {
      stopAudio();
      return;
    }

    try {
      stopAudio();
      const audio = new Audio(currentQuestion.audio);
      audioPlayerRef.current = audio;
      setIsPlayingAudio(true);

      audio.onended = () => {
        setIsPlayingAudio(false);
        audioPlayerRef.current = null;
      };

      audio.onerror = (err) => {
        console.warn('Không thể phát file audio câu hỏi:', currentQuestion.audio, err);
        setIsPlayingAudio(false);
        audioPlayerRef.current = null;
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Lỗi khi phát audio:', err);
          setIsPlayingAudio(false);
          audioPlayerRef.current = null;
        });
      }
    } catch (err) {
      console.warn('Lỗi khởi tạo audio:', err);
      setIsPlayingAudio(false);
      audioPlayerRef.current = null;
    }
  };

  // Xử lý khi học sinh chọn đáp án
  const handleSelectOption = (key: 'A' | 'B' | 'C') => {
    // Chặn bấm nhiều lần hoặc bấm khi câu đã hoàn thành
    if (isBusy) return;
    if (
      questionState === 'answered_correct_first' || 
      questionState === 'answered_correct_second' || 
      questionState === 'answered_wrong_second' || 
      key === firstFailedKey
    ) {
      return;
    }

    setIsBusy(true);
    setSelectedKey(key);
    const isCorrect = key === currentQuestion.dapAnDung;

    if (questionState === 'idle') {
      // ===== LẦN CHỌN THỨ NHẤT =====
      if (isCorrect) {
        if (soundEnabled) playCorrectSound();
        setQuestionState('answered_correct_first');
        onAnswerAttempt(currentQuestion.id, true, key, true, 10);

        // Sau 1,5 giây cho phép chuyển sang câu tiếp theo
        setCanAdvance(false);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setCanAdvance(true);
          setIsBusy(false);
          if (soundEnabled) playDrumSound();
        }, 1500);
      } else {
        // Sai lần đầu: hiện gợi ý, không hiện đáp án, cho chọn lần 2
        if (soundEnabled) playHintSound();
        setFirstFailedKey(key);
        setQuestionState('hint_shown');
        onAnswerAttempt(currentQuestion.id, true, key, false, 0);
        setIsBusy(false);
      }
    } else if (questionState === 'hint_shown') {
      // ===== LẦN CHỌN THỨ HAI =====
      if (isCorrect) {
        if (soundEnabled) playCorrectSound();
        setQuestionState('answered_correct_second');
        onAnswerAttempt(currentQuestion.id, false, key, true, 5);
        setCanAdvance(true);
        setIsBusy(false);
      } else {
        if (soundEnabled) playClickClapper();
        setQuestionState('answered_wrong_second');
        onAnswerAttempt(currentQuestion.id, false, key, false, 0);
        setCanAdvance(true);
        setIsBusy(false);
      }
    }
  };

  // Chuyển sang câu tiếp theo hoặc xem kết quả
  const handleNext = () => {
    if (!canAdvance) return;
    if (soundEnabled) playDrumSound();

    if (isLastQuestion) {
      onFinishGame();
    } else {
      setCurrentIndex((prev) => prev + 1);
      onNextQuestion();
    }
  };

  // Màu sắc tượng trưng cho từng pho bài
  const getPhoBadge = (pho: string) => {
    if (pho.includes('Sách')) {
      return 'bg-red-100 text-red-900 border-red-300';
    }
    if (pho.includes('Văn')) {
      return 'bg-amber-100 text-amber-950 border-amber-300';
    }
    return 'bg-emerald-100 text-emerald-950 border-emerald-300';
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 sm:py-8 flex flex-col">
      {/* ===== THANH THÔNG TIN: “Câu X/30” VÀ “Điểm: …” ===== */}
      <div className="w-full bg-[#fbf6ee] border border-amber-300/80 rounded-2xl p-3.5 sm:p-4 mb-5 shadow-xs flex items-center justify-between gap-3 text-stone-800">
        {/* Câu X/30 */}
        <div className="flex items-center gap-2">
          <span className="font-heritage text-lg sm:text-2xl font-bold text-amber-950 tracking-wide">
            Câu {currentIndex + 1}/{activeQuestions.length}
          </span>
        </div>

        {/* Điểm: … và Số câu đúng */}
        <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 font-semibold text-stone-700">
            <span>Đúng:</span>
            <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
              {correctAnswersCount}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-bold text-stone-800">
            <span>Điểm:</span>
            <span className="inline-flex items-center gap-1 min-w-[36px] h-7 px-2.5 rounded-full bg-amber-200 text-amber-950 font-black border border-amber-300 shadow-xs text-sm sm:text-base">
              <Award className="w-4 h-4 text-amber-800" />
              {currentScore}
            </span>
          </div>
        </div>
      </div>

      {/* ===== KHUNG NỘI DUNG CÂU HỎI & LỜI HÔ NGHỆ NHÂN ===== */}
      <div className="w-full bg-[#fffefb] border-2 border-[#b45309] rounded-2xl p-5 sm:p-7 shadow-md mb-6 relative">
        {/* Tên pho bài & Nút nghe hô & Nút hỏi Anh Hiệu AI */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-amber-200/80 pb-3">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
              Pho bài:
            </span>
            <span
              className={`px-3 py-1 text-xs sm:text-sm font-bold rounded-lg border ${getPhoBadge(currentQuestion.pho)}`}
            >
              Pho: {currentQuestion.pho}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Nút 🔊 Nghe câu hô (Chỉ hiển thị khi question.audio có giá trị) */}
            {Boolean(currentQuestion.audio && currentQuestion.audio.trim() !== '') && (
              <button
                onClick={handlePlayAudio}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold rounded-xl border transition-all cursor-pointer shadow-xs ${
                  isPlayingAudio
                    ? 'bg-red-800 text-white border-red-900 shadow-sm animate-pulse'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
                }`}
                title="Bấm để nghe file âm thanh câu hô"
              >
                <span>🔊</span>
                <span>{isPlayingAudio ? 'Đang phát...' : 'Nghe câu hô'}</span>
              </button>
            )}

            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold rounded-xl border border-amber-500 bg-amber-100 hover:bg-amber-200 text-amber-950 transition-all cursor-pointer shadow-xs"
              title="Hỏi Anh Hiệu AI để hiểu thêm về câu hô và bài chòi"
            >
              <span>🎭</span>
              <span>Hỏi Anh Hiệu AI</span>
            </button>
          </div>
        </div>

        {/* Lời hô của nghệ nhân */}
        <div className="my-3 p-5 sm:p-6 bg-[#faf4e6] rounded-xl border-l-4 border-[#b45309] shadow-xs relative">
          <div className="text-xs font-semibold text-amber-900/80 mb-2 uppercase tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Lời hô của nghệ nhân:
          </div>

          <blockquote className="font-heritage text-lg sm:text-2xl font-bold text-[#451a03] leading-relaxed whitespace-pre-line text-center italic py-2">
            {currentQuestion.loiHo}
          </blockquote>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 text-center italic mt-1">
          💡 Đọc kỹ câu hô để đoán đúng quân bài bên dưới!
        </p>
      </div>

      {/* ===== 3 NÚT ĐÁP ÁN A, B, C (NÚT LỚN) ===== */}
      <div className="w-full space-y-3 mb-6">
        <div className="text-xs sm:text-sm font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center justify-between">
          <span>Chọn đáp án:</span>
          {questionState === 'hint_shown' && (
            <span className="text-xs font-semibold text-amber-800 animate-pulse">
              Em hãy chọn lại lần 2 (Đúng được +5 điểm)
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {optionsList.map((opt) => {
            const isFirstFailed = firstFailedKey === opt.key;
            const isCorrectOption = opt.key === currentQuestion.dapAnDung;

            let buttonStyle = 'bg-[#fffdf9] hover:bg-amber-50 text-stone-900 border-amber-300 shadow-sm';
            let keyBadgeStyle = 'bg-amber-100 text-amber-900 border-amber-300';
            let isDisabled = false;

            if (isFirstFailed) {
              buttonStyle = 'bg-stone-100 text-stone-400 border-stone-200 opacity-60 line-through cursor-not-allowed';
              keyBadgeStyle = 'bg-stone-200 text-stone-400 border-stone-300';
              isDisabled = true;
            } else if (
              questionState === 'answered_correct_first' || 
              questionState === 'answered_correct_second'
            ) {
              if (isCorrectOption) {
                buttonStyle = 'bg-emerald-50 text-emerald-950 border-emerald-500 ring-2 ring-emerald-400 shadow-md';
                keyBadgeStyle = 'bg-emerald-600 text-white border-emerald-700';
              } else {
                buttonStyle = 'bg-[#faf7f0] text-stone-400 border-stone-200 opacity-70';
                keyBadgeStyle = 'bg-stone-200 text-stone-400 border-stone-300';
              }
              isDisabled = true;
            } else if (questionState === 'answered_wrong_second') {
              if (isCorrectOption) {
                buttonStyle = 'bg-emerald-50 text-emerald-950 border-emerald-500 ring-2 ring-emerald-400 shadow-sm';
                keyBadgeStyle = 'bg-emerald-600 text-white border-emerald-700';
              } else if (selectedKey === opt.key) {
                buttonStyle = 'bg-red-50 text-red-950 border-red-400 opacity-70';
                keyBadgeStyle = 'bg-red-600 text-white border-red-700';
              } else {
                buttonStyle = 'bg-stone-50 text-stone-400 border-stone-200 opacity-50';
                keyBadgeStyle = 'bg-stone-200 text-stone-400 border-stone-300';
              }
              isDisabled = true;
            }

            return (
              <button
                key={opt.key}
                disabled={isDisabled || isBusy}
                onClick={() => handleSelectOption(opt.key)}
                className={`min-h-[72px] sm:min-h-[88px] p-4 rounded-xl border-2 transition-all duration-150 flex items-center sm:flex-col sm:justify-center gap-3 text-left sm:text-center cursor-pointer active:scale-98 ${buttonStyle}`}
                aria-label={`Đáp án ${opt.key}: ${opt.text}`}
              >
                <span
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-base shrink-0 border ${keyBadgeStyle}`}
                >
                  {opt.key}
                </span>
                <span className="font-heritage text-base sm:text-xl font-bold tracking-wide">
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== PHẢN HỒI KHI CHỌN ĐÁP ÁN ===== */}
      <div className="w-full mb-6">
        {/* ĐÚNG LẦN 1: +10 ĐIỂM */}
        {questionState === 'answered_correct_first' && (
          <div className="p-4 sm:p-5 bg-emerald-50 border-2 border-emerald-500 rounded-2xl shadow-sm text-emerald-950 animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5 font-bold text-lg sm:text-xl text-emerald-800 mb-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <span>Chính xác! +10 điểm</span>
            </div>
            <p className="text-sm sm:text-base text-stone-800 mb-1">
              <strong>Giải thích:</strong> {currentQuestion.giaiThich}
            </p>
            {!canAdvance && (
              <div className="mt-3 text-xs text-emerald-700 italic flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Chuẩn bị nút chuyển câu trong giây lát...
              </div>
            )}
          </div>
        )}

        {/* SAI LẦN 1: HIỆN GỢI Ý & CHO CHỌN LẠI LẦN 2 */}
        {questionState === 'hint_shown' && (
          <div className="p-4 sm:p-5 bg-amber-50/90 border-2 border-amber-400 rounded-2xl shadow-sm text-amber-950 animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5 font-bold text-base sm:text-lg text-amber-900 mb-2">
              <HelpCircle className="w-5 h-5 text-amber-700" />
              <span>Chưa đúng. Anh Hiệu cho em một gợi ý nhé!</span>
            </div>
            <div className="bg-white/80 p-3.5 rounded-xl border border-amber-300 text-stone-800 text-sm sm:text-base leading-relaxed">
              <span className="font-bold text-amber-900">💡 Gợi ý của Anh Hiệu: </span>
              {currentQuestion.goiY}
            </div>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 italic">
              👉 Em hãy chọn lại một trong 2 đáp án còn lại phía trên nhé!
            </p>
          </div>
        )}

        {/* ĐÚNG LẦN 2: +5 ĐIỂM */}
        {questionState === 'answered_correct_second' && (
          <div className="p-4 sm:p-5 bg-emerald-50 border-2 border-emerald-500 rounded-2xl shadow-sm text-emerald-950 animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5 font-bold text-lg sm:text-xl text-emerald-800 mb-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <span>Chính xác! +5 điểm</span>
            </div>
            <p className="text-sm sm:text-base text-stone-800 mb-1">
              <strong>Giải thích:</strong> {currentQuestion.giaiThich}
            </p>
          </div>
        )}

        {/* SAI LẦN 2: HIỆN ĐÁP ÁN ĐÚNG & GIẢI THÍCH, 0 ĐIỂM */}
        {questionState === 'answered_wrong_second' && (
          <div className="p-4 sm:p-5 bg-red-50 border-2 border-red-400 rounded-2xl shadow-sm text-red-950 animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5 font-bold text-base sm:text-lg text-red-800 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span>Chưa đúng ở lần 2. (Không cộng điểm)</span>
            </div>
            <p className="text-sm sm:text-base text-stone-800 mb-2">
              Đáp án đúng là: <strong>{currentQuestion.dapAnDung}. {optionsList.find(o => o.key === currentQuestion.dapAnDung)?.text}</strong>
            </p>
            <p className="text-sm sm:text-base text-stone-800 mb-1">
              <strong>Giải thích:</strong> {currentQuestion.giaiThich}
            </p>
          </div>
        )}
      </div>

      {/* ===== NÚT CÂU TIẾP THEO ===== */}
      {canAdvance && (
        <div className="w-full flex justify-center pb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={handleNext}
            className="w-full sm:w-auto min-w-[260px] px-8 py-3.5 bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-900 hover:to-amber-800 active:scale-98 text-white font-heritage font-bold text-base sm:text-lg rounded-xl shadow-md border-2 border-amber-400/80 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isLastQuestion ? 'HOÀN THÀNH & XEM KẾT QUẢ' : 'CÂU TIẾP THEO'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
