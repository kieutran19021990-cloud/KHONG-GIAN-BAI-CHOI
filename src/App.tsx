import React, { useState } from 'react';
import { QUESTIONS_DATA, shuffleQuestions } from './data/questions';
import { Question } from './types/game';
import { KnowledgeItem } from './data/knowledge';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { KnowledgeScreen } from './components/KnowledgeScreen';
import { HowToPlayScreen } from './components/HowToPlayScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { CulturalHandbookModal } from './components/CulturalHandbookModal';
import { AnhHieuChatModal } from './components/AnhHieuChatModal';

type GameStage = 'welcome' | 'knowledge' | 'howToPlay' | 'quiz' | 'result';

interface AttemptRecord {
  question: Question;
  earnedPoints: number;
  isCorrect: boolean;
  chosenKey: string | null;
}

export default function App() {
  const [stage, setStage] = useState<GameStage>('welcome');
  const [questions, setQuestions] = useState<Question[]>(() => shuffleQuestions(QUESTIONS_DATA));
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isHandbookOpen, setIsHandbookOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [activeKnowledgeItem, setActiveKnowledgeItem] = useState<KnowledgeItem | null>(null);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | null>(null);
  const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState<boolean>(false);

  // Điểm số và thống kê
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [wrongAnswersCount, setWrongAnswersCount] = useState<number>(0);
  const [attemptRecords, setAttemptRecords] = useState<AttemptRecord[]>([]);

  // Bắt đầu chơi: Trộn ngẫu nhiên thứ tự 30 câu hỏi
  const handleStartGame = () => {
    const shuffled = shuffleQuestions(QUESTIONS_DATA);
    setQuestions(shuffled);
    setCurrentScore(0);
    setCorrectAnswersCount(0);
    setWrongAnswersCount(0);
    setAttemptRecords([]);
    setActiveKnowledgeItem(null);
    setStage('quiz');
  };

  // Hỏi Anh Hiệu AI về một mục kiến thức
  const handleAskAIAboutTopic = (item: KnowledgeItem) => {
    setActiveKnowledgeItem(item);
    setActiveQuestion(null);
    setIsCurrentQuestionAnswered(true);
    setChatInitialPrompt(`Anh Hiệu ơi, hãy giải thích sâu hơn giúp em về chủ đề: "${item.tieuDe}" (${item.nhom}) nhé!`);
    setIsChatOpen(true);
  };

  // Mở chat thông thường từ thanh điều hướng
  const handleOpenGeneralChat = () => {
    setChatInitialPrompt(null);
    setIsChatOpen(true);
  };

  // Ghi nhận khi học sinh trả lời một câu (Chấm cố định hoàn toàn không gọi AI)
  const handleAnswerAttempt = (
    questionId: number,
    isFirstAttempt: boolean,
    chosenKey: 'A' | 'B' | 'C',
    isCorrect: boolean,
    pointsToAdd: number
  ) => {
    // Không cho phép cộng điểm nhiều lần cho cùng một câu
    if (attemptRecords.some((r) => r.question.id === questionId)) {
      return;
    }

    const targetQuestion = questions.find((q) => q.id === questionId);
    if (!targetQuestion) return;

    if (isFirstAttempt) {
      if (isCorrect) {
        // Đúng ngay lần đầu: +10 điểm
        setCurrentScore((prev) => prev + pointsToAdd);
        setCorrectAnswersCount((prev) => prev + 1);
        setAttemptRecords((prev) => [
          ...prev,
          {
            question: targetQuestion,
            earnedPoints: pointsToAdd,
            isCorrect: true,
            chosenKey,
          },
        ]);
      }
      // Nếu sai lần đầu: chưa kết thúc, chờ chọn lần 2
    } else {
      // Lần chọn thứ hai:
      if (isCorrect) {
        // Đúng ở lần 2: +5 điểm
        setCurrentScore((prev) => prev + pointsToAdd);
        setCorrectAnswersCount((prev) => prev + 1);
        setAttemptRecords((prev) => [
          ...prev,
          {
            question: targetQuestion,
            earnedPoints: pointsToAdd,
            isCorrect: true,
            chosenKey,
          },
        ]);
      } else {
        // Sai ở lần 2: 0 điểm
        setWrongAnswersCount((prev) => prev + 1);
        setAttemptRecords((prev) => [
          ...prev,
          {
            question: targetQuestion,
            earnedPoints: 0,
            isCorrect: false,
            chosenKey,
          },
        ]);
      }
    }
  };

  // Hoàn thành toàn bộ 30 câu
  const handleFinishGame = () => {
    setStage('result');
  };

  // Chơi lại ngay: xáo trộn lại 30 câu hỏi và bắt đầu ván mới
  const handlePlayAgain = () => {
    handleStartGame();
  };

  // Về trang chủ
  const handleGoHome = () => {
    setStage('welcome');
  };

  return (
    <div className="min-h-screen bg-[#fcf8f2] flex flex-col font-sans text-stone-900 bg-folk-pattern relative">
      {/* Header thanh lịch với bật tắt âm thanh, sổ tay, khám phá & hỏi AI */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onOpenHandbook={() => setIsHandbookOpen(true)}
        onOpenChat={handleOpenGeneralChat}
        onGoKnowledge={() => setStage('knowledge')}
      />

      {/* Nội dung chính theo stage */}
      <main className="flex-1 flex flex-col justify-center items-center py-4 sm:py-6">
        {stage === 'welcome' && (
          <WelcomeScreen
            onStart={() => setStage('howToPlay')}
            onGoKnowledge={() => setStage('knowledge')}
            onOpenChat={handleOpenGeneralChat}
            soundEnabled={soundEnabled}
            onOpenHandbook={() => setIsHandbookOpen(true)}
          />
        )}

        {stage === 'knowledge' && (
          <KnowledgeScreen
            onStartGame={() => setStage('howToPlay')}
            onGoHome={handleGoHome}
            onAskAIAboutTopic={handleAskAIAboutTopic}
          />
        )}

        {stage === 'howToPlay' && (
          <HowToPlayScreen
            onStartQuiz={handleStartGame}
            onGoHome={handleGoHome}
            soundEnabled={soundEnabled}
          />
        )}

        {stage === 'quiz' && (
          <QuizScreen
            questions={questions}
            currentScore={currentScore}
            correctAnswersCount={correctAnswersCount}
            soundEnabled={soundEnabled}
            onAnswerAttempt={handleAnswerAttempt}
            onNextQuestion={() => {}}
            onFinishGame={handleFinishGame}
            onOpenChat={() => {
              setActiveKnowledgeItem(null);
              setChatInitialPrompt(null);
              setIsChatOpen(true);
            }}
            onActiveQuestionChange={(q, answered) => {
              setActiveQuestion(q);
              setIsCurrentQuestionAnswered(answered);
            }}
          />
        )}

        {stage === 'result' && (
          <ResultScreen
            totalScore={currentScore}
            maxScore={questions.length * 10}
            correctCount={correctAnswersCount}
            wrongCount={wrongAnswersCount}
            totalQuestions={questions.length}
            results={attemptRecords}
            soundEnabled={soundEnabled}
            onPlayAgain={handlePlayAgain}
            onGoHome={handleGoHome}
            onOpenHandbook={() => setIsHandbookOpen(true)}
            onGoKnowledge={() => setStage('knowledge')}
          />
        )}
      </main>

      {/* Cửa sổ chat nhỏ: ANH HIỆU AI */}
      <AnhHieuChatModal
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setChatInitialPrompt(null);
        }}
        initialPrompt={chatInitialPrompt}
        questionContext={
          activeKnowledgeItem
            ? {
                knowledgeContext: {
                  tieuDe: activeKnowledgeItem.tieuDe,
                  noiDung: activeKnowledgeItem.noiDung,
                  nhom: activeKnowledgeItem.nhom,
                },
              }
            : activeQuestion
            ? {
                pho: activeQuestion.pho,
                tenQuan: activeQuestion.tenQuan,
                loiHo: activeQuestion.loiHo,
                goiY: activeQuestion.goiY,
              }
            : null
        }
        isAnswered={activeKnowledgeItem ? true : isCurrentQuestionAnswered}
      />

      {/* Nút bấm nổi hỏi Anh Hiệu AI góc phải màn hình khi đang chơi hoặc khám phá */}
      {(stage === 'quiz' || stage === 'knowledge') && !isChatOpen && (
        <button
          onClick={handleOpenGeneralChat}
          className="fixed bottom-5 right-5 z-40 px-4 py-2.5 bg-gradient-to-r from-red-800 via-amber-700 to-amber-800 hover:from-red-900 hover:to-amber-900 text-white font-heritage font-bold text-sm sm:text-base rounded-full shadow-xl border-2 border-amber-300 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 animate-bounce"
          title="Bấm để trò chuyện cùng Anh Hiệu AI"
          aria-label="Hỏi Anh Hiệu AI"
        >
          <span className="text-lg">🎭</span>
          <span>Hỏi Anh Hiệu AI</span>
        </button>
      )}

      {/* Modal Sổ tay Bài Chòi */}
      <CulturalHandbookModal
        isOpen={isHandbookOpen}
        onClose={() => setIsHandbookOpen(false)}
      />

      {/* Footer */}
      <footer className="w-full border-t border-amber-900/10 py-4 px-4 text-center text-xs text-stone-600 bg-[#f9f4ea]/80">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            🎋 <strong>BÀI CHÒI AI – HỒN QUẢNG</strong> · Trò chơi giáo dục di sản 30 quân Bài chòi
          </span>
          <span className="text-amber-900/70">
            Hội An · Quảng Nam · Tự hào di sản văn hóa Việt Nam
          </span>
        </div>
      </footer>
    </div>
  );
}
