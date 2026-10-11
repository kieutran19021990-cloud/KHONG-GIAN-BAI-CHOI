/**
 * Trình phát âm thanh truyền thống (Web Audio API)
 * Tạo âm thanh trống hội, tiếng mõ tre, chiêng khánh không phụ thuộc file ngoài.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Tiếng trống hội trầm ấm ("Tùng!")
 */
export function playDrumSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    // pitch drops quickly like a wooden skin drum
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.35);

    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.5);
  } catch (err) {
    console.debug('Audio error', err);
  }
}

/**
 * Tiếng mõ tre / sanh sứa giòn giã ("Cắc!")
 */
export function playClickClapper() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch (err) {
    console.debug('Audio error', err);
  }
}

/**
 * Tiếng chiêng khánh mừng chiến thắng / chính xác
 */
export function playCorrectSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Chime 1
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    const now = ctx.currentTime;
    osc1.type = 'sine';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.setValueAtTime(659.25, now + 0.12); // E5
    osc1.frequency.setValueAtTime(783.99, now + 0.24); // G5

    osc2.frequency.setValueAtTime(1046.5, now + 0.24); // C6

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now + 0.24);
    osc1.stop(now + 0.8);
    osc2.stop(now + 0.8);
  } catch (err) {
    console.debug('Audio error', err);
  }
}

/**
 * Tiếng gõ nhắc nhở nhẹ nhàng khi chọn sai lần 1
 */
export function playHintSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const now = ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(349.23, now + 0.25);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  } catch (err) {
    console.debug('Audio error', err);
  }
}

/**
 * Giọng hô của Anh Hiệu bằng Web Speech Synthesis
 */
export function speakCallVerse(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  try {
    window.speechSynthesis.cancel();

    // Clean quotes for better pronunciation
    const cleanText = text.replace(/[“”"']/g, '').replace(/\n/g, ', ');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Tìm giọng đọc tiếng Việt nếu có
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find((v) => v.lang.startsWith('vi') || v.name.toLowerCase().includes('vietnam'));
    if (viVoice) {
      utterance.voice = viVoice;
    }

    utterance.lang = 'vi-VN';
    utterance.rate = 0.88; // Đọc thong dong theo nhịp câu hô ca dao
    utterance.pitch = 1.05;

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.debug('TTS error', err);
    if (onEnd) onEnd();
  }
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
