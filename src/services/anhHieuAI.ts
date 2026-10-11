/**
 * Dịch vụ hỗ trợ học tập - ANH HIỆU AI
 * Kết nối với backend proxy hoặc phản hồi an toàn cho học sinh
 */

export interface ChatMessage {
  id: string;
  sender: 'user' | 'anh_hieu';
  text: string;
  timestamp: number;
}

export interface QuestionContext {
  pho?: string;
  tenQuan?: string;
  loiHo?: string;
  goiY?: string;
  knowledgeContext?: {
    tieuDe: string;
    noiDung: string;
    nhom: string;
  };
}

const FALLBACK_MESSAGE = 'Anh Hiệu AI đang tạm nghỉ. Em vẫn có thể tiếp tục trò chơi nhé!';

/**
 * Kiểm tra xem học sinh có đang hỏi trực tiếp đáp án khi đang làm câu hỏi không
 */
function isAskingForDirectAnswer(message: string): boolean {
  const normalized = message.toLowerCase().trim();
  const answerKeywords = [
    'đáp án',
    'kết quả',
    'chọn đáp án nào',
    'chọn câu nào',
    'chọn con gì',
    'chọn quân gì',
    'con gì',
    'quân gì',
    'chọn a',
    'chọn b',
    'chọn c',
    'đáp án là gì',
    'đáp án đúng',
    'chỉ bài',
    'bày bài',
    'chỉ đáp án',
    'cho đáp án',
  ];
  return answerKeywords.some((kw) => normalized.includes(kw));
}

/**
 * Gửi tin nhắn tới Anh Hiệu AI
 */
export async function askAnhHieuAI(
  message: string,
  context: QuestionContext | null,
  isAnswered: boolean
): Promise<string> {
  // QUY TẮC 7: Nếu học sinh hỏi đáp án của câu đang chơi (chưa hoàn thành), AI TUYỆT ĐỐI không tiết lộ đáp án!
  if (!isAnswered && isAskingForDirectAnswer(message)) {
    return 'Anh chưa thể nói đáp án khi em đang chơi đâu. Em hãy chú ý các từ khóa trong câu hô nhé!';
  }

  try {
    const response = await fetch('/api/anh-hieu/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        questionContext: context
          ? {
              pho: context.pho,
              loiHo: context.loiHo,
              // Chỉ gửi tên quân khi câu đã được trả lời xong
              ...(isAnswered ? { tenQuan: context.tenQuan } : {}),
            }
          : null,
        isAnswered,
      }),
    });

    if (!response.ok) {
      return FALLBACK_MESSAGE;
    }

    const data = await response.json();
    return data.reply || FALLBACK_MESSAGE;
  } catch (error) {
    console.warn('Anh Hieu AI network error:', error);
    return FALLBACK_MESSAGE;
  }
}

/**
 * Nhận xét tổng kết 3-5 câu của Anh Hiệu AI sau khi hoàn thành ván chơi
 */
export async function getAnhHieuSummaryFeedback(stats: {
  totalScore: number;
  correctFirstCount: number;
  correctHintCount: number;
  wrongCount: number;
  wrongCardsList: string[];
  bestPho?: string;
  weakestPho?: string;
}): Promise<string> {
  try {
    const response = await fetch('/api/anh-hieu/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stats),
    });

    if (!response.ok) {
      return FALLBACK_MESSAGE;
    }

    const data = await response.json();
    return data.feedback || FALLBACK_MESSAGE;
  } catch (error) {
    console.warn('Anh Hieu AI feedback network error:', error);
    return FALLBACK_MESSAGE;
  }
}
