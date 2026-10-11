import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Phục vụ các file mp3 tĩnh từ thư mục Audio hoặc public/Audio
app.use('/Audio', express.static(path.join(__dirname, 'public/Audio')));
app.use('/audio', express.static(path.join(__dirname, 'public/Audio')));
app.use('/Audio', express.static(path.join(__dirname, 'Audio')));
app.use('/audio', express.static(path.join(__dirname, 'Audio')));

// Khởi tạo Gemini client nếu có API key
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({ apiKey });
}

/**
 * Endpoint trò chuyện cùng Anh Hiệu AI
 */
app.post('/api/anh-hieu/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, questionContext, isAnswered } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Tin nhắn không hợp lệ' });
      return;
    }

    if (!aiClient) {
      res.json({
        reply: 'Anh Hiệu AI đang tạm nghỉ. Em vẫn có thể tiếp tục trò chơi nhé!',
      });
      return;
    }

    // Kiểm tra xem câu hỏi có phải đang dò hỏi đáp án khi chưa hoàn thành câu không
    const lowerMsg = message.toLowerCase();
    const isAskingForAnswer = 
      lowerMsg.includes('đáp án') || 
      lowerMsg.includes('kết quả') || 
      lowerMsg.includes('con gì') || 
      lowerMsg.includes('quân gì') || 
      lowerMsg.includes('chọn a') || 
      lowerMsg.includes('chọn b') || 
      lowerMsg.includes('chọn c') || 
      lowerMsg.includes('đáp án là gì') ||
      lowerMsg.includes('đáp án đúng');

    if (!isAnswered && isAskingForAnswer) {
      res.json({
        reply: 'Anh chưa thể nói đáp án khi em đang chơi đâu. Em hãy chú ý các từ khóa trong câu hô nhé!',
      });
      return;
    }

    // System prompt dành cho Anh Hiệu AI
    const knowledgeInfo = questionContext?.knowledgeContext
      ? `\nHỌC SINH ĐANG TÌM HIỂU MỤC KIẾN THỨC BÀI CHÒI:
- Nhóm: ${questionContext.knowledgeContext.nhom}
- Tiêu đề: ${questionContext.knowledgeContext.tieuDe}
- Nội dung gốc: ${questionContext.knowledgeContext.noiDung}
Nhiệm vụ: Giải thích sâu sắc hơn, mở rộng chi tiết văn hóa/lịch sử/nghệ thuật xứ Quảng sinh động, dễ hiểu, giúp học sinh THCS nhớ lâu.`
      : '';

    const systemPrompt = `Bạn là "ANH HIỆU AI", một nghệ nhân hô Bài chòi Quảng Nam giàu kinh nghiệm, hóm hỉnh, am hiểu sâu sắc văn hóa dân gian xứ Quảng và rất yêu mến các em học sinh THCS.
Xưng hô: "Anh" - gọi người dùng là "em".
Giọng điệu: Thân thiện, mộc mạc, đậm chất ca dao dân ca xứ Quảng, truyền cảm hứng tìm hiểu di sản văn hóa dân tộc.
${knowledgeInfo}

CÂU HỎI HIỆN TẠI HỌC SINH ĐANG THAM GIA:
- Pho bài: ${questionContext?.pho || 'Chung'}
- Lời hô: ${questionContext?.loiHo || 'Không có'}
- Trạng thái: ${isAnswered ? 'Học sinh ĐÃ TRẢ LỜI XONG câu này (cho phép giải thích chi tiết tên quân bài, nghĩa bóng, điển tích ca dao)' : 'Học sinh ĐANG TRONG QUÁ TRÌNH CHƠI (CHƯA TRẢ LỜI XONG)'}

QUY TẮC CỐT LÕI BẮT BUỘC:
1. Nếu trạng thái là CHƯA TRẢ LỜI XONG (trong câu đố quiz):
   - TUYỆT ĐỐI KHÔNG TIẾT LỘ ĐÁP ÁN (không nói tên quân bài đúng, không nói chữ cái A, B, C).
   - Nếu học sinh hỏi đáp án hoặc cố tình dò hỏi, hãy trả lời chính xác: "Anh chưa thể nói đáp án khi em đang chơi đâu. Em hãy chú ý các từ khóa trong câu hô nhé!"
   - Có thể giải nghĩa từ ngữ cổ/từ địa phương trong câu hô (ví dụ: "chạng vạng", "lù lù", "lều chõng", "vung nồi") hoặc gợi ý cách suy luận từ khóa.
2. Nếu trạng thái là ĐÃ TRẢ LỜI XONG hoặc đang tìm hiểu kiến thức:
   - Em có thể giải thích cặn kẽ ý nghĩa câu ca dao, từ khóa nhận biết, xuất xứ dân gian và cách ghi nhớ quân bài.
3. Độ dài câu trả lời: Ngắn gọn, súc tích (từ 2 đến 4 câu), phù hợp với học sinh THCS, không viết tràng giang đại hải.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nTin nhắn của học sinh: ${message}` }],
        },
      ],
    });

    const reply = response.text || 'Anh Hiệu AI đang lắng nghe em đây!';
    res.json({ reply });
  } catch (error) {
    console.error('Error in Anh Hieu AI chat:', error);
    res.json({
      reply: 'Anh Hiệu AI đang tạm nghỉ. Em vẫn có thể tiếp tục trò chơi nhé!',
    });
  }
});

/**
 * Endpoint nhận xét tổng kết của Anh Hiệu AI sau khi hoàn thành 30 câu
 */
app.post('/api/anh-hieu/feedback', async (req: Request, res: Response): Promise<void> => {
  try {
    const { totalScore, correctFirstCount, correctHintCount, wrongCount, wrongCardsList, bestPho, weakestPho } = req.body;

    if (!aiClient) {
      res.json({
        feedback: 'Anh Hiệu rất vui vì em đã nỗ lực hoàn thành trọn vẹn hành trình 30 quân Bài chòi xứ Quảng! Hãy tiếp tục nuôi dưỡng tình yêu với di sản văn hóa quê hương nhé!',
      });
      return;
    }

    const phoContext = `
- Pho hiểu rõ nhất: ${bestPho || 'Chưa xác định'}
- Pho cần rèn luyện thêm: ${weakestPho || 'Đã nắm vững đều các pho'}`;

    const prompt = `Bạn là Anh Hiệu AI - nghệ nhân Bài chòi Quảng Nam. Hãy viết một lời nhận xét ngắn gọn (khoảng 3 đến 5 câu), ấm áp, khích lệ một em học sinh THCS vừa hoàn thành trò chơi Bài Chòi AI - Hồn Quảng.
Thông số kết quả của em:
- Tổng điểm: ${totalScore}/300 điểm
- Trả lời đúng ngay lần đầu: ${correctFirstCount} câu
- Trả lời đúng sau khi xem gợi ý: ${correctHintCount} câu
- Trả lời sai (cả 2 lần): ${wrongCount} câu
- Các quân bài em làm sai hoặc chưa nhớ: ${wrongCardsList?.length > 0 ? wrongCardsList.join(', ') : 'Không có (em đúng hết)'}${phoContext}

Yêu cầu:
- Xưng "Anh", gọi "em".
- Nhận xét đúng thực lực nhưng giàu tính khích lệ, dí dỏm, mộc mạc phong vị Bài chòi xứ Quảng.
- Khen ngợi pho em làm tốt nhất, khuyên em chú ý ôn lại pho cần rèn luyện thêm (nếu có).
- Độ dài đúng 3 đến 5 câu.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const feedback = response.text || 'Anh Hiệu khen ngợi tinh thần học hỏi của em. Em đã có một hành trình khám phá di sản Bài chòi thật tuyệt vời!';
    res.json({ feedback });
  } catch (error) {
    console.error('Error in Anh Hieu AI feedback:', error);
    res.json({
      feedback: 'Anh Hiệu AI đang tạm nghỉ. Em vẫn có thể tiếp tục trò chơi nhé!',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
