export interface Question {
  id: number;
  pho: string;
  tenQuan: string;
  loiHo: string;
  dapAnA: string;
  dapAnB: string;
  dapAnC: string;
  dapAnDung: 'A' | 'B' | 'C';
  goiY: string;
  giaiThich: string;
  audio?: string;
}

export interface QuestionAttempt {
  questionId: number;
  firstChoice: 'A' | 'B' | 'C' | null;
  secondChoice: 'A' | 'B' | 'C' | null;
  isCorrect: boolean;
  earnedPoints: number; // 10 nếu đúng lần 1, 5 nếu đúng lần 2, 0 nếu sai cả 2
}

export interface GameSummary {
  totalScore: number;
  correctCount: number;
  wrongCount: number;
  accuracy: number; // %
  rankText: string;
}
