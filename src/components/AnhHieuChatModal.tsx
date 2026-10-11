import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, MessageCircle, HelpCircle, BookOpen } from 'lucide-react';
import { askAnhHieuAI, ChatMessage, QuestionContext } from '../services/anhHieuAI';
import { AnhHieuAvatarIllustration } from './BaiChoiIllustrations';

interface AnhHieuChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionContext: QuestionContext | null;
  isAnswered: boolean;
  initialPrompt?: string | null;
}

export const AnhHieuChatModal: React.FC<AnhHieuChatModalProps> = ({
  isOpen,
  onClose,
  questionContext,
  isAnswered,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'anh_hieu',
      text: 'Chào em! Anh là Anh Hiệu AI đây. Trong lúc chơi hoặc tìm hiểu các kiến thức về Bài chòi xứ Quảng, nếu cần giải nghĩa câu hô, từ khó hay muốn anh kể thêm chuyện dân gian, em cứ thoải mái hỏi anh nhé!',
      timestamp: Date.now(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastPromptRef = useRef<string | null>(null);

  // Cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Tự động gửi câu hỏi khi được kích hoạt với initialPrompt mới
  useEffect(() => {
    if (isOpen && initialPrompt && initialPrompt !== lastPromptRef.current) {
      lastPromptRef.current = initialPrompt;
      handleSend(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

  if (!isOpen) return null;

  // Gửi tin nhắn do người dùng nhập
  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    try {
      const reply = await askAnhHieuAI(text, questionContext, isAnswered);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'anh_hieu',
        text: reply,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'anh_hieu',
          text: 'Anh Hiệu AI đang tạm nghỉ. Em vẫn có thể tiếp tục trò chơi nhé!',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Nút hỏi nhanh: Gợi ý cho em (BẮT BUỘC dùng đúng questionContext.goiY theo yêu cầu 8)
  const handleQuickHint = () => {
    if (isTyping) return;
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: 'Gợi ý cho em',
      timestamp: Date.now(),
    };

    const hintText = questionContext?.goiY 
      ? `💡 Gợi ý của Anh Hiệu: ${questionContext.goiY}` 
      : 'Em hãy chú ý đọc kỹ từng từ khóa chỉ đồ vật, con vật hoặc âm thanh quen thuộc trong câu thơ lục bát nhé!';

    const aiMsg: ChatMessage = {
      id: `ai-${Date.now()}`,
      sender: 'anh_hieu',
      text: hintText,
      timestamp: Date.now() + 10,
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
  };

  // Nút hỏi nhanh các câu khác
  const handleQuickQuestion = (questionText: string) => {
    handleSend(questionText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg h-[620px] max-h-[90vh] bg-[#fdfbf7] border-2 border-[#b45309] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-labelledby="anh-hieu-chat-title"
      >
        {/* Header của Chat */}
        <div className="bg-gradient-to-r from-red-900 via-amber-800 to-amber-900 text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-amber-600/40">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-300 shadow-sm shrink-0 bg-amber-50">
              <AnhHieuAvatarIllustration className="w-full h-full" />
            </div>
            <div>
              <h3 id="anh-hieu-chat-title" className="font-heritage font-bold text-base sm:text-lg flex items-center gap-1.5">
                <span>ANH HIỆU AI</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </h3>
              <p className="text-xs text-amber-200 font-medium">
                Bạn đồng hành khám phá di sản Bài chòi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-amber-200 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Đóng cửa sổ chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thông tin ngữ cảnh (câu hỏi đang chơi hoặc kiến thức đang tìm hiểu) */}
        {questionContext && (
          <div className="bg-amber-100/70 border-b border-amber-200 px-3.5 py-2 text-xs text-amber-950 flex items-center justify-between gap-2">
            {questionContext.knowledgeContext ? (
              <>
                <span className="font-semibold truncate">
                  📖 {questionContext.knowledgeContext.tieuDe}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-200 text-amber-900 shrink-0">
                  {questionContext.knowledgeContext.nhom}
                </span>
              </>
            ) : (
              <>
                <span className="font-semibold truncate">
                  Đang xem: Pho {questionContext.pho} {isAnswered && questionContext.tenQuan ? `– Quân ${questionContext.tenQuan}` : ''}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isAnswered ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
                }`}>
                  {isAnswered ? 'Đã giải xong' : 'Đang chơi'}
                </span>
              </>
            )}
          </div>
        )}

        {/* Khung tin nhắn cuộn */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 text-sm">
          {messages.map((msg) => {
            const isAI = msg.sender === 'anh_hieu';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isAI ? 'justify-start' : 'justify-end'}`}
              >
                {isAI && (
                  <div className="w-7 h-7 rounded-full bg-amber-200 text-amber-950 flex items-center justify-center text-xs shrink-0 font-bold border border-amber-300">
                    🎭
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                    isAI
                      ? 'bg-white text-stone-800 border border-amber-200 shadow-xs rounded-tl-xs'
                      : 'bg-gradient-to-r from-red-800 to-amber-800 text-white shadow-xs rounded-tr-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-2.5 justify-start">
              <div className="w-7 h-7 rounded-full bg-amber-200 text-amber-950 flex items-center justify-center text-xs shrink-0 font-bold border border-amber-300">
                🎭
              </div>
              <div className="bg-white px-3.5 py-2 rounded-2xl border border-amber-200 shadow-xs text-xs text-stone-500 italic flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
                Anh Hiệu đang suy nghĩ câu trả lời...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Các nút hỏi nhanh (Yêu cầu 10) */}
        <div className="px-3.5 py-2 bg-stone-50/80 border-t border-amber-200/80">
          <div className="text-[11px] font-semibold text-stone-600 mb-1.5 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-amber-700" />
            <span>Gợi ý hỏi nhanh:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {/* Nút 1: Giải thích câu hô */}
            <button
              onClick={() => handleQuickQuestion('Anh Hiệu giải thích giúp em câu hô này với!')}
              disabled={isTyping}
              className="px-2.5 py-1 bg-white hover:bg-amber-100/70 border border-amber-300 rounded-lg text-amber-950 shrink-0 transition-colors cursor-pointer disabled:opacity-50"
            >
              📜 Giải thích câu hô
            </button>

            {/* Nút 2: Từ này nghĩa là gì? */}
            <button
              onClick={() => handleQuickQuestion('Trong câu hô này có từ nào khó hiểu không anh Hiệu?')}
              disabled={isTyping}
              className="px-2.5 py-1 bg-white hover:bg-amber-100/70 border border-amber-300 rounded-lg text-amber-950 shrink-0 transition-colors cursor-pointer disabled:opacity-50"
            >
              📖 Từ này nghĩa là gì?
            </button>

            {/* Nút 3: Gợi ý cho em (dùng đúng question.goiY) */}
            <button
              onClick={handleQuickHint}
              disabled={isTyping}
              className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 border border-amber-400 font-bold rounded-lg text-amber-900 shrink-0 transition-colors cursor-pointer disabled:opacity-50"
            >
              💡 Gợi ý cho em
            </button>

            {/* Nút 4: Kể thêm về quân bài */}
            <button
              onClick={() => handleQuickQuestion('Anh Hiệu kể thêm cho em về quân bài này với!')}
              disabled={isTyping}
              className="px-2.5 py-1 bg-white hover:bg-amber-100/70 border border-amber-300 rounded-lg text-amber-950 shrink-0 transition-colors cursor-pointer disabled:opacity-50"
            >
              🎴 Kể thêm về quân bài
            </button>

            {/* Nút 5: Bài chòi là gì? */}
            <button
              onClick={() => handleQuickQuestion('Bài chòi là gì vậy anh Hiệu?')}
              disabled={isTyping}
              className="px-2.5 py-1 bg-white hover:bg-amber-100/70 border border-amber-300 rounded-lg text-amber-950 shrink-0 transition-colors cursor-pointer disabled:opacity-50"
            >
              🎋 Bài chòi là gì?
            </button>
          </div>
        </div>

        {/* Ô nhập tin nhắn */}
        <div className="p-3 bg-white border-t border-amber-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Nhập câu hỏi cho Anh Hiệu AI..."
              disabled={isTyping}
              className="flex-1 px-3.5 py-2.5 bg-stone-50 border border-stone-300 focus:border-amber-600 focus:outline-hidden rounded-xl text-sm text-stone-800 placeholder-stone-400"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="px-3.5 py-2.5 bg-amber-800 hover:bg-amber-900 disabled:bg-stone-300 text-white rounded-xl transition-colors flex items-center justify-center cursor-pointer shrink-0"
              aria-label="Gửi tin nhắn"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
