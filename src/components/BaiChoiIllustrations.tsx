import React from 'react';

export interface IllustrationProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

/**
 * BỘ HÌNH MINH HỌA VECTOR NGHỆ THUẬT BÀI CHÒI QUẢNG NAM
 * Phong cách:
 * - Văn hóa dân gian xứ Quảng (Hội An, Mỹ Sơn, tháp chàm, chòi tre, cờ hội ngũ sắc)
 * - Tông màu chuẩn: Đỏ nâu (#8b1e1e, #991b1b), vàng đất (#d97706, #b45309), kem (#fef3c7, #fffbeb), cam gạch (#c2410c, #ea580c)
 * - Vector SVG cao cấp, sáng, sắc nét, không chữ, không watermark, chừa khoảng trống thoáng đãng cho layout
 */

/**
 * 1. HERO BANNER: ANH HIỆU BÀI CHÒI HÔ BÀI VÀ HỘI DÂN GIAN
 * Thể hiện Anh Hiệu cầm thẻ bài tre, gõ song loan, chòi rạ truyền thống, cờ hội ngũ sắc, lồng đèn Hội An
 */
export const BaiChoiHeroIllustration: React.FC<IllustrationProps> = ({ 
  className = "w-full h-auto", 
  width = "100%", 
  height = "100%" 
}) => {
  return (
    <svg
      viewBox="0 0 1000 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      aria-label="Minh họa nghệ thuật Hội Bài chòi Quảng Nam và Anh Hiệu"
    >
      <defs>
        {/* Gradients phong cách đất nung & nắng gió xứ Quảng */}
        <linearGradient id="skyGrad" x1="500" y1="0" x2="500" y2="480" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="55%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fed7aa" />
        </linearGradient>

        <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.15" />
        </linearGradient>

        <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>

        <linearGradient id="tunicGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#991b1b" />
          <stop offset="50%" stopColor="#b91c1c" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>

        <linearGradient id="choiRoofGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>

        <linearGradient id="cardBambooGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="50%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        {/* Mẫu hoa văn chiếu cói dân gian */}
        <pattern id="folkPattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 0 10 L 10 0 L 20 10 L 10 20 Z" fill="none" stroke="#fcd34d" strokeWidth="0.8" opacity="0.4" />
        </pattern>
      </defs>

      {/* Bầu trời kem ấm vàng */}
      <rect width="1000" height="480" rx="24" fill="url(#skyGrad)" />
      <rect width="1000" height="480" rx="24" fill="url(#folkPattern)" />

      {/* Vầng mặt trời bình minh xứ Quảng (góc phải) */}
      <circle cx="780" cy="140" r="130" fill="url(#sunGrad)" />
      <circle cx="780" cy="140" r="95" fill="#fde68a" opacity="0.45" />

      {/* Những cánh chim én và mây cách điệu lượn nhẹ nhàng */}
      <g stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" opacity="0.4">
        <path d="M 120 70 Q 135 60 150 70 Q 165 60 180 70" />
        <path d="M 190 95 Q 202 85 215 95 Q 227 85 240 95" />
        <path d="M 620 50 Q 632 42 645 50 Q 657 42 670 50" />
      </g>

      {/* Dãy núi Ngũ Hành Sơn / Hòn Kẽm xa xa */}
      <path 
        d="M 0 350 Q 120 300 240 330 T 480 320 T 720 305 T 1000 320 L 1000 480 L 0 480 Z" 
        fill="#fed7aa" 
        opacity="0.65" 
      />
      <path 
        d="M 0 375 Q 160 330 320 360 T 640 345 T 900 355 T 1000 365 L 1000 480 L 0 480 Z" 
        fill="#fcd34d" 
        opacity="0.5" 
      />

      {/* Mặt sân hội Bài chòi Quảng Nam (Đất nung & chiếu cói) */}
      <path d="M 0 400 Q 500 380 1000 400 L 1000 480 L 0 480 Z" fill="url(#groundGrad)" />
      <path d="M 0 425 Q 500 415 1000 425 L 1000 480 L 0 480 Z" fill="#78350f" />

      {/* DÂY CỜ HỘI NGŨ SẮC DÂN GIAN UỐN LƯỢN TỪ TRÁI SANG PHẢI */}
      <g>
        {/* Dây cờ trên */}
        <path d="M 30 50 Q 260 130 500 80 T 970 70" stroke="#78350f" strokeWidth="2" strokeDasharray="3 3" fill="none" opacity="0.7" />
        {/* Các lá cờ đuôi nheo ngũ sắc */}
        <polygon points="70,60 95,65 82,100" fill="#dc2626" />
        <polygon points="120,73 145,80 132,115" fill="#f59e0b" />
        <polygon points="170,88 195,95 182,130" fill="#15803d" />
        <polygon points="220,100 245,105 232,140" fill="#2563eb" />
        <polygon points="270,105 295,108 282,143" fill="#ea580c" />
        <polygon points="320,104 345,102 332,138" fill="#b91c1c" />
        <polygon points="370,98 395,94 382,130" fill="#ca8a04" />
        <polygon points="420,90 445,84 432,122" fill="#047857" />
        <polygon points="470,81 495,76 482,112" fill="#9333ea" />
        <polygon points="520,76 545,73 532,110" fill="#dc2626" />
        <polygon points="570,72 595,70 582,106" fill="#f59e0b" />
        <polygon points="620,70 645,70 632,105" fill="#2563eb" />
        <polygon points="670,70 695,70 682,105" fill="#15803d" />
      </g>

      {/* Dàn đèn lồng phố cổ Hội An treo duyên dáng bên trái */}
      <g opacity="0.85">
        <line x1="80" y1="0" x2="80" y2="120" stroke="#78350f" strokeWidth="1.5" />
        <ellipse cx="80" cy="140" rx="16" ry="22" fill="#dc2626" />
        <ellipse cx="80" cy="140" rx="10" ry="22" fill="#b91c1c" />
        <line x1="80" y1="162" x2="80" y2="180" stroke="#f59e0b" strokeWidth="2" />

        <line x1="140" y1="0" x2="140" y2="150" stroke="#78350f" strokeWidth="1.5" />
        <ellipse cx="140" cy="170" rx="14" ry="18" fill="#f59e0b" />
        <ellipse cx="140" cy="170" rx="8" ry="18" fill="#d97706" />
        <line x1="140" y1="188" x2="140" y2="204" stroke="#dc2626" strokeWidth="2" />
      </g>

      {/* HÀNG CHÒI TRE DÂN GIAN (3 CHÒI ĐẠI DIỆN TRONG KHÔNG GIAN HỘI) */}
      {/* Chòi 1 (Bên trái xa) */}
      <g id="choi-trai" opacity="0.9">
        {/* 4 Cột chòi tre */}
        <line x1="60" y1="280" x2="55" y2="410" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
        <line x1="110" y1="280" x2="105" y2="410" stroke="#92400e" strokeWidth="6" strokeLinecap="round" />
        <line x1="150" y1="275" x2="145" y2="405" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
        {/* Sàn chòi */}
        <polygon points="45,340 160,340 150,355 35,355" fill="#b45309" stroke="#78350f" strokeWidth="2" />
        {/* Lan can tre */}
        <line x1="45" y1="320" x2="155" y2="320" stroke="#d97706" strokeWidth="3" />
        <line x1="65" y1="320" x2="65" y2="340" stroke="#d97706" strokeWidth="2" />
        <line x1="95" y1="320" x2="95" y2="340" stroke="#d97706" strokeWidth="2" />
        <line x1="125" y1="320" x2="125" y2="340" stroke="#d97706" strokeWidth="2" />
        {/* Mái lá rạ nhọn */}
        <polygon points="100,225 180,285 20,285" fill="url(#choiRoofGrad)" stroke="#78350f" strokeWidth="2" />
        <line x1="100" y1="225" x2="100" y2="200" stroke="#dc2626" strokeWidth="3" />
        <polygon points="100,200 120,210 100,220" fill="#f59e0b" />
      </g>

      {/* Chòi 2 (Bên trái gần giữa) */}
      <g id="choi-giua" opacity="0.95">
        <line x1="210" y1="260" x2="205" y2="415" stroke="#78350f" strokeWidth="7" strokeLinecap="round" />
        <line x1="270" y1="260" x2="265" y2="415" stroke="#92400e" strokeWidth="7" strokeLinecap="round" />
        <line x1="320" y1="255" x2="315" y2="410" stroke="#78350f" strokeWidth="7" strokeLinecap="round" />
        {/* Sàn chòi */}
        <polygon points="195,330 330,330 320,348 185,348" fill="#b45309" stroke="#78350f" strokeWidth="2" />
        {/* Lan can chòi */}
        <line x1="195" y1="310" x2="325" y2="310" stroke="#fbbf24" strokeWidth="3.5" />
        {/* Người chơi ló mặt vui tươi trong chòi (vector cách điệu) */}
        <circle cx="255" cy="290" r="14" fill="#fed7aa" />
        <path d="M 245 278 Q 255 270 265 278" stroke="#1c1917" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="255" cy="318" rx="20" ry="14" fill="#047857" />
        {/* Ống bài cắm trên vách chòi */}
        <rect x="310" y="295" width="8" height="24" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="1" />
        {/* Mái lá chòi dốc */}
        <polygon points="260,195 350,265 170,265" fill="url(#choiRoofGrad)" stroke="#78350f" strokeWidth="2.5" />
        <line x1="260" y1="195" x2="260" y2="165" stroke="#dc2626" strokeWidth="3" />
        <polygon points="260,165 285,178 260,190" fill="#dc2626" />
      </g>

      {/* Trống hội Bài chòi lớn bên trái giữa sân */}
      <g id="trong-hoi">
        {/* Giá đỡ trống bằng gỗ */}
        <line x1="365" y1="360" x2="350" y2="445" stroke="#451a03" strokeWidth="6" strokeLinecap="round" />
        <line x1="425" y1="360" x2="440" y2="445" stroke="#451a03" strokeWidth="6" strokeLinecap="round" />
        <line x1="350" y1="410" x2="440" y2="410" stroke="#78350f" strokeWidth="4" />
        {/* Thân trống gỗ son đỏ */}
        <ellipse cx="395" cy="375" rx="42" ry="48" fill="#991b1b" stroke="#7f1d1d" strokeWidth="3" />
        <ellipse cx="395" cy="375" rx="36" ry="42" fill="#b91c1c" />
        {/* Mặt da trâu trống màu vàng đất viền đinh tán */}
        <ellipse cx="370" cy="375" rx="14" ry="40" fill="#f59e0b" stroke="#b45309" strokeWidth="3" />
        {/* Đinh tán đồng */}
        <circle cx="370" cy="345" r="2.5" fill="#78350f" />
        <circle cx="366" cy="360" r="2.5" fill="#78350f" />
        <circle cx="365" cy="375" r="2.5" fill="#78350f" />
        <circle cx="366" cy="390" r="2.5" fill="#78350f" />
        <circle cx="370" cy="405" r="2.5" fill="#78350f" />
        {/* Dùi trống gỗ sơn đỏ */}
        <line x1="415" y1="340" x2="445" y2="310" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
        <circle cx="445" cy="310" r="7" fill="#dc2626" />
      </g>

      {/* CÁC QUÂN BÀI CHÒI TRUYỀN THỐNG KHỔ LỚN CÁCH ĐIỆU CẮM Ở GIỮA */}
      <g id="the-bai-choi" transform="translate(480, 250)">
        {/* Thẻ 1: Ông Ầm */}
        <g transform="rotate(-12, 20, 100)">
          <rect x="0" y="0" width="38" height="135" rx="6" fill="url(#cardBambooGrad)" stroke="#78350f" strokeWidth="2.5" />
          <circle cx="19" cy="24" r="13" fill="#991b1b" />
          {/* Họa tiết khắc gỗ dân gian trên thẻ */}
          <circle cx="19" cy="24" r="9" fill="#fef3c7" />
          <path d="M 15 24 Q 19 18 23 24 Q 19 30 15 24" fill="#991b1b" />
          <rect x="8" y="46" width="22" height="4" rx="2" fill="#b45309" />
          <rect x="11" y="56" width="16" height="4" rx="2" fill="#b45309" />
          <path d="M 12 75 C 12 70, 26 70, 26 75 C 26 90, 12 90, 12 105 L 26 105" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>

        {/* Thẻ 2: Tứ Tượng */}
        <g transform="translate(30, -10)">
          <rect x="0" y="0" width="40" height="145" rx="6" fill="url(#cardBambooGrad)" stroke="#78350f" strokeWidth="2.5" />
          <circle cx="20" cy="26" r="14" fill="#15803d" />
          <circle cx="20" cy="26" r="9" fill="#fef3c7" />
          <polygon points="20,19 25,29 15,29" fill="#15803d" />
          {/* Họa tiết tượng/voi cách điệu khắc gỗ */}
          <path d="M 12 55 Q 20 48 28 55 T 20 75 Z" fill="#78350f" opacity="0.75" />
          <rect x="10" y="85" width="20" height="3" fill="#b45309" />
          <rect x="10" y="93" width="20" height="3" fill="#b45309" />
          <rect x="10" y="101" width="20" height="3" fill="#b45309" />
          <rect x="10" y="109" width="20" height="3" fill="#b45309" />
        </g>

        {/* Thẻ 3: Bạch Tuyết */}
        <g transform="translate(68, 5) rotate(14, 20, 100)">
          <rect x="0" y="0" width="38" height="135" rx="6" fill="url(#cardBambooGrad)" stroke="#78350f" strokeWidth="2.5" />
          <circle cx="19" cy="24" r="13" fill="#dc2626" />
          <circle cx="19" cy="24" r="8" fill="#fef3c7" />
          {/* Biểu tượng hoa tuyết mộc */}
          <path d="M 19 18 L 19 30 M 13 24 L 25 24" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
          <circle cx="19" cy="70" r="8" fill="#92400e" opacity="0.6" />
          <line x1="12" y1="90" x2="26" y2="90" stroke="#78350f" strokeWidth="2" />
          <line x1="15" y1="100" x2="23" y2="100" stroke="#78350f" strokeWidth="2" />
        </g>
      </g>

      {/* NHÂN VẬT TRỌNG TÂM: ANH HIỆU BÀI CHÒI XỨ QUẢNG (BÊN PHẢI) */}
      <g id="anh-hieu-nhan-vat">
        {/* Bóng dưới chân */}
        <ellipse cx="780" cy="445" rx="85" ry="18" fill="#451a03" opacity="0.4" />

        {/* Ống bài tre (ống cắm xăm bài) đeo bên hông */}
        <g transform="translate(695, 305) rotate(-15)">
          <rect x="0" y="0" width="24" height="75" rx="6" fill="#b45309" stroke="#78350f" strokeWidth="2.5" />
          <rect x="4" y="6" width="16" height="63" rx="4" fill="#d97706" />
          {/* Những thanh thẻ bài nhô lên khỏi ống */}
          <rect x="4" y="-30" width="6" height="32" rx="2" fill="#fde68a" stroke="#78350f" strokeWidth="1.5" />
          <rect x="12" y="-40" width="6" height="42" rx="2" fill="#fef3c7" stroke="#78350f" strokeWidth="1.5" />
          {/* Tua rua đỏ may mắn */}
          <line x1="12" y1="75" x2="12" y2="100" stroke="#dc2626" strokeWidth="3" />
          <polygon points="7,100 17,100 12,118" fill="#dc2626" />
        </g>

        {/* Tà áo dài truyền thống ngũ thân nam màu đỏ nâu rực rỡ */}
        {/* Quần lụa trắng kem */}
        <path d="M 740 370 L 730 435 L 755 438 L 768 375 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <path d="M 785 370 L 795 435 L 820 432 L 810 375 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        {/* Guốc mộc dân gian */}
        <ellipse cx="742" cy="438" rx="16" ry="6" fill="#78350f" />
        <ellipse cx="808" cy="435" rx="16" ry="6" fill="#78350f" />

        {/* Tà áo dài gấm đỏ ngũ thân */}
        <path 
          d="M 735 225 Q 700 280 690 385 Q 770 405 845 385 Q 840 280 810 225 Z" 
          fill="url(#tunicGrad)" 
          stroke="#581c1c" 
          strokeWidth="3" 
        />
        {/* Khuy áo chéo truyền thống và viền thêu vàng */}
        <path d="M 770 205 Q 795 215 810 245 Q 815 280 810 310" stroke="#fbbf24" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <circle cx="780" cy="212" r="3.5" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
        <circle cx="795" cy="225" r="3.5" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
        <circle cx="807" cy="245" r="3.5" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
        <circle cx="813" cy="270" r="3.5" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
        {/* Khăn đai lưng lụa màu vàng đất (thắt lưng) */}
        <path d="M 718 290 Q 770 305 825 290 L 826 312 Q 770 327 717 312 Z" fill="#d97706" stroke="#92400e" strokeWidth="2" />
        {/* Mối thắt đai buông thõng */}
        <path d="M 745 305 L 738 365 L 755 365 L 760 305 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />

        {/* Cánh tay trái cầm CẶP SONG LOAN (gõ nhịp) */}
        <g id="tay-trai">
          <path d="M 735 230 Q 675 250 645 285 Q 660 305 685 275" fill="#991b1b" stroke="#7f1d1d" strokeWidth="2" />
          {/* Bàn tay */}
          <circle cx="640" cy="290" r="13" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
          {/* Song loan gỗ gõ nhịp chan chát */}
          <g transform="translate(620, 275) rotate(-20)">
            <ellipse cx="14" cy="14" rx="14" ry="10" fill="#78350f" stroke="#451a03" strokeWidth="2" />
            <ellipse cx="14" cy="14" rx="9" ry="6" fill="#b45309" />
            <path d="M 2 14 C 2 2, 26 2, 26 14" stroke="#d97706" strokeWidth="2.5" fill="none" />
            <circle cx="14" cy="4" r="4.5" fill="#f59e0b" />
          </g>
        </g>

        {/* Cánh tay phải vươn cao, cầm THẺ BÀI CHÒI hô vang */}
        <g id="tay-phai">
          <path d="M 805 230 Q 865 220 885 165 Q 865 150 830 195" fill="#991b1b" stroke="#7f1d1d" strokeWidth="2" />
          {/* Bàn tay cầm thẻ */}
          <ellipse cx="888" cy="155" rx="12" ry="14" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
          
          {/* Thẻ bài trên tay Anh Hiệu giơ cao đắc thắng */}
          <g transform="translate(880, 75) rotate(15)">
            <rect x="0" y="0" width="32" height="105" rx="5" fill="url(#cardBambooGrad)" stroke="#78350f" strokeWidth="2.5" />
            {/* Vòng ấn đỏ son */}
            <circle cx="16" cy="20" r="11" fill="#dc2626" />
            <circle cx="16" cy="20" r="7" fill="#fef3c7" />
            {/* Chữ / hoa văn quân bài */}
            <path d="M 12 18 Q 16 13 20 18 Q 16 23 12 18" fill="#dc2626" />
            <line x1="8" y1="42" x2="24" y2="42" stroke="#78350f" strokeWidth="2" />
            <circle cx="16" cy="60" r="5" fill="#b45309" />
            <path d="M 10 75 L 22 75 L 16 88 Z" fill="#78350f" />
            {/* Vệt hào quang lấp lánh quanh thẻ bài */}
            <path d="M -10 15 L -2 15 M 34 15 L 42 15 M 16 -10 L 16 -2" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            <polygon points="36,4 40,12 32,10" fill="#f59e0b" />
          </g>
        </g>

        {/* Cổ áo & cổ */}
        <rect x="760" y="190" width="26" height="25" fill="#fed7aa" rx="4" />

        {/* Khuôn mặt Anh Hiệu tươi cười, mộc mạc, hóm hỉnh */}
        <g id="khuon-mat">
          {/* Đầu/mặt */}
          <ellipse cx="773" cy="165" rx="28" ry="32" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
          {/* Tai */}
          <ellipse cx="744" cy="168" rx="5" ry="9" fill="#fed7aa" />
          <ellipse cx="802" cy="168" rx="5" ry="9" fill="#fed7aa" />
          {/* Mắt cười rạng rỡ (nét cong cung trăng híp mí thân thiện) */}
          <path d="M 756 160 Q 764 154 770 160" stroke="#451a03" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 778 160 Q 784 154 792 160" stroke="#451a03" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Chân mày rậm cương nghị nhưng đôn hậu */}
          <path d="M 753 151 Q 763 146 771 152" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 777 152 Q 785 146 795 151" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Mũi tròn mộc mạc */}
          <path d="M 773 160 L 773 171 Q 770 174 767 172" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Miệng cười tươi đang hô câu hát */}
          <path d="M 761 178 Q 774 195 787 178 Z" fill="#991b1b" stroke="#7f1d1d" strokeWidth="1.5" />
          <path d="M 765 180 Q 774 186 783 180" fill="#ffffff" />
          {/* Gò má hồng ửng hăng say */}
          <circle cx="754" cy="172" r="6" fill="#f87171" opacity="0.45" />
          <circle cx="792" cy="172" r="6" fill="#f87171" opacity="0.45" />
        </g>

        {/* Khăn đóng (khăn xếp) truyền thống xứ Quảng màu vàng đất viền đỏ nâu */}
        <g id="khan-xep">
          {/* Các lớp nếp khăn quấn */}
          <path d="M 743 145 Q 773 130 803 145 Q 806 130 773 125 Q 740 130 743 145 Z" fill="#b45309" stroke="#78350f" strokeWidth="2" />
          <path d="M 742 140 Q 773 125 804 140 Q 807 120 773 115 Q 739 120 742 140 Z" fill="#d97706" stroke="#92400e" strokeWidth="2" />
          <path d="M 744 132 Q 773 118 802 132 Q 805 110 773 105 Q 741 110 744 132 Z" fill="#b45309" stroke="#78350f" strokeWidth="2" />
          {/* Chóp khăn xếp */}
          <ellipse cx="773" cy="115" rx="26" ry="12" fill="#78350f" />
          <ellipse cx="773" cy="115" rx="18" ry="8" fill="#92400e" />
          {/* Điểm nhấn ngọc/nút cài trên trán */}
          <polygon points="773,128 777,133 773,138 769,133" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
        </g>
      </g>

      {/* CÁC NỐT NHẠC VÀ LỜI HÔ DU DƯƠNG BAY TRONG KHÔNG GIAN HỘI */}
      <g opacity="0.75" fill="#c2410c">
        <path d="M 830 110 Q 845 90 860 100" stroke="#ea580c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="830" cy="112" rx="5" ry="4" transform="rotate(-15, 830, 112)" />
        
        <path d="M 680 180 Q 695 160 710 170" stroke="#ea580c" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="680" cy="182" rx="4" ry="3" />

        <circle cx="650" cy="130" r="3" fill="#f59e0b" />
        <circle cx="890" cy="60" r="3.5" fill="#f59e0b" />
        <circle cx="490" cy="190" r="2.5" fill="#f59e0b" />
      </g>
    </svg>
  );
};

/**
 * 2. AVATAR CHÂN DUNG ANH HIỆU BÀI CHÒI (VUÔNG 1:1)
 * Rất thích hợp cho Trợ lý AI, Modal Chat, Thẻ nhân vật
 */
export const AnhHieuAvatarIllustration: React.FC<IllustrationProps> = ({
  className = "w-full h-auto",
  width = "100%",
  height = "100%"
}) => {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      aria-label="Chân dung Anh Hiệu Bài chòi"
    >
      <defs>
        <radialGradient id="avatarBg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="70%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </radialGradient>
        <linearGradient id="tunicAva" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b91c1c" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>
      </defs>

      {/* Khung tròn nền kem vàng ấm */}
      <circle cx="120" cy="120" r="114" fill="url(#avatarBg)" stroke="#b45309" strokeWidth="4" />
      <circle cx="120" cy="120" r="106" fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* Áo dài đỏ truyền thống ngũ thân */}
      <path 
        d="M 60 215 Q 85 170 120 170 Q 155 170 180 215 Q 120 235 60 215 Z" 
        fill="url(#tunicAva)" 
        stroke="#581c1c" 
        strokeWidth="2.5" 
      />
      {/* Khuy áo vàng thêu chữ V */}
      <path d="M 120 170 L 140 195 L 140 225" stroke="#fbbf24" strokeWidth="2.5" fill="none" />
      <circle cx="128" cy="180" r="2.5" fill="#fbbf24" />
      <circle cx="138" cy="195" r="2.5" fill="#fbbf24" />

      {/* Cổ áo */}
      <rect x="108" y="152" width="24" height="20" fill="#fed7aa" rx="3" />

      {/* Mặt Anh Hiệu */}
      <ellipse cx="120" cy="126" rx="36" ry="40" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
      {/* Tai */}
      <ellipse cx="82" cy="128" rx="6" ry="10" fill="#fed7aa" />
      <ellipse cx="158" cy="128" rx="6" ry="10" fill="#fed7aa" />

      {/* Chân mày & mắt cười */}
      <path d="M 96 110 Q 106 103 116 109" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 124 109 Q 134 103 144 110" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" fill="none" />

      <path d="M 98 122 Q 108 114 116 122" stroke="#451a03" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M 124 122 Q 132 114 142 122" stroke="#451a03" strokeWidth="3.5" strokeLinecap="round" fill="none" />

      {/* Má hồng */}
      <circle cx="95" cy="134" r="7" fill="#f87171" opacity="0.4" />
      <circle cx="145" cy="134" r="7" fill="#f87171" opacity="0.4" />

      {/* Mũi */}
      <path d="M 120 120 L 120 134 Q 116 137 113 135" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Nụ cười vui tươi */}
      <path d="M 106 142 Q 120 160 134 142 Z" fill="#991b1b" stroke="#7f1d1d" strokeWidth="1.5" />
      <path d="M 110 144 Q 120 150 130 144" fill="#ffffff" />

      {/* Khăn xếp nam truyền thống xứ Quảng */}
      <path d="M 82 102 Q 120 86 158 102 Q 162 82 120 76 Q 78 82 82 102 Z" fill="#b45309" stroke="#78350f" strokeWidth="2.5" />
      <path d="M 84 94 Q 120 78 156 94 Q 160 74 120 68 Q 80 74 84 94 Z" fill="#d97706" stroke="#92400e" strokeWidth="2" />
      <ellipse cx="120" cy="68" rx="30" ry="12" fill="#78350f" />
      {/* Ngọc đính khăn */}
      <polygon points="120,83 124,88 120,93 116,88" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />

      {/* Thẻ bài trên tay Anh Hiệu giơ bên góc */}
      <g transform="translate(162, 110) rotate(15)">
        <rect x="0" y="0" width="22" height="70" rx="3" fill="#fef3c7" stroke="#78350f" strokeWidth="2" />
        <circle cx="11" cy="14" r="7" fill="#dc2626" />
        <circle cx="11" cy="14" r="4" fill="#fef3c7" />
        <line x1="5" y1="28" x2="17" y2="28" stroke="#78350f" strokeWidth="1.5" />
        <rect x="6" y="34" width="10" height="20" fill="#b45309" rx="2" />
      </g>
    </svg>
  );
};

/**
 * 3. MINH HỌA BỘ BÀI VÀ KHÔNG GIAN DIỄN XƯỚNG BÀI CHÒI (4:3)
 * Thể hiện: Ống bài tre, thẻ bài 3 Pho (Văn - Vạn - Sách), song loan và cờ thưởng
 */
export const BaiChoiCardsIllustration: React.FC<IllustrationProps> = ({
  className = "w-full h-auto",
  width = "100%",
  height = "100%"
}) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      aria-label="Minh họa các quân bài và dụng cụ Bài chòi"
    >
      <defs>
        <linearGradient id="matGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="100%" stopColor="#fed7aa" />
        </linearGradient>
      </defs>

      {/* Chiếu cói hoa văn dân gian */}
      <rect width="400" height="300" rx="16" fill="url(#matGrad)" stroke="#fcd34d" strokeWidth="2" />
      
      {/* Vành hoa văn viền chiếu */}
      <rect x="12" y="12" width="376" height="276" rx="10" fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />

      {/* Dây cờ hội ngũ sắc nhỏ góc trên */}
      <g opacity="0.8">
        <path d="M 20 30 Q 200 65 380 30" stroke="#78350f" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
        <polygon points="50,38 68,42 59,62" fill="#dc2626" />
        <polygon points="90,46 108,50 99,70" fill="#f59e0b" />
        <polygon points="130,52 148,54 139,74" fill="#15803d" />
        <polygon points="170,55 188,55 179,75" fill="#2563eb" />
        <polygon points="210,55 228,55 219,75" fill="#ea580c" />
        <polygon points="250,53 268,51 259,71" fill="#dc2626" />
        <polygon points="290,49 308,45 299,67" fill="#f59e0b" />
        <polygon points="330,42 348,38 339,58" fill="#15803d" />
      </g>

      {/* Chiếc đĩa đồng cổ hoặc mâm bồng đựng bài */}
      <ellipse cx="200" cy="220" rx="160" ry="45" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
      <ellipse cx="200" cy="220" rx="145" ry="38" fill="#fffbeb" />

      {/* Ống bài tre (ống đựng thẻ bài) */}
      <g transform="translate(60, 100)">
        <rect x="0" y="0" width="45" height="110" rx="8" fill="#b45309" stroke="#78350f" strokeWidth="2.5" />
        <rect x="6" y="8" width="33" height="94" rx="4" fill="#d97706" />
        {/* Các đốt tre */}
        <line x1="0" y1="40" x2="45" y2="40" stroke="#78350f" strokeWidth="3" />
        <line x1="0" y1="75" x2="45" y2="75" stroke="#78350f" strokeWidth="3" />
        {/* Miệng ống mở và các đầu thẻ bài nhô lên */}
        <rect x="10" y="-35" width="8" height="40" rx="2" fill="#fde68a" stroke="#78350f" strokeWidth="1.5" />
        <rect x="22" y="-45" width="8" height="50" rx="2" fill="#fef3c7" stroke="#78350f" strokeWidth="1.5" />
        <rect x="30" y="-30" width="8" height="35" rx="2" fill="#fed7aa" stroke="#78350f" strokeWidth="1.5" />
      </g>

      {/* BA QUÂN BÀI ĐẠI DIỆN 3 PHO (VĂN - VẠN - SÁCH) */}
      {/* 1. Thẻ Pho Văn: Quân Ông Ầm */}
      <g transform="translate(130, 95) rotate(-10)">
        <rect x="0" y="0" width="42" height="120" rx="5" fill="#fef3c7" stroke="#78350f" strokeWidth="2.5" />
        <circle cx="21" cy="22" r="12" fill="#991b1b" />
        <circle cx="21" cy="22" r="7" fill="#fffbeb" />
        <polygon points="21,17 26,26 16,26" fill="#991b1b" />
        {/* Khắc nét dân gian */}
        <line x1="8" y1="42" x2="34" y2="42" stroke="#b45309" strokeWidth="2" />
        <rect x="11" y="50" width="20" height="40" rx="3" fill="#fed7aa" />
        <circle cx="21" cy="70" r="6" fill="#78350f" />
        <line x1="12" y1="102" x2="30" y2="102" stroke="#78350f" strokeWidth="2" />
      </g>

      {/* 2. Thẻ Pho Vạn: Quân Ba Bụng */}
      <g transform="translate(195, 80)">
        <rect x="0" y="0" width="45" height="130" rx="6" fill="#fffbeb" stroke="#78350f" strokeWidth="2.5" />
        <circle cx="22.5" cy="24" r="13" fill="#15803d" />
        <circle cx="22.5" cy="24" r="8" fill="#fef3c7" />
        <circle cx="22.5" cy="24" r="4" fill="#15803d" />
        {/* Hình tượng bụng to hóm hỉnh */}
        <line x1="8" y1="46" x2="37" y2="46" stroke="#b45309" strokeWidth="2" />
        <ellipse cx="22.5" cy="75" rx="14" ry="18" fill="#fed7aa" stroke="#b45309" strokeWidth="1.5" />
        <path d="M 14 75 Q 22.5 85 31 75" stroke="#78350f" strokeWidth="2" fill="none" />
        <line x1="12" y1="110" x2="33" y2="110" stroke="#78350f" strokeWidth="2" />
      </g>

      {/* 3. Thẻ Pho Sách: Quân Tứ Tượng */}
      <g transform="translate(265, 95) rotate(10)">
        <rect x="0" y="0" width="42" height="120" rx="5" fill="#fef3c7" stroke="#78350f" strokeWidth="2.5" />
        <circle cx="21" cy="22" r="12" fill="#c2410c" />
        <circle cx="21" cy="22" r="7" fill="#fffbeb" />
        <rect x="18" y="17" width="6" height="10" fill="#c2410c" />
        {/* Khắc 4 chân voi */}
        <line x1="8" y1="42" x2="34" y2="42" stroke="#b45309" strokeWidth="2" />
        <rect x="11" y="55" width="4" height="25" rx="2" fill="#78350f" />
        <rect x="17" y="55" width="4" height="25" rx="2" fill="#78350f" />
        <rect x="23" y="55" width="4" height="25" rx="2" fill="#78350f" />
        <rect x="29" y="55" width="4" height="25" rx="2" fill="#78350f" />
        <line x1="12" y1="102" x2="30" y2="102" stroke="#78350f" strokeWidth="2" />
      </g>

      {/* Song Loan bằng gỗ gõ nhịp (nhạc cụ đặc trưng) */}
      <g transform="translate(315, 195) rotate(-15)">
        <ellipse cx="22" cy="20" rx="22" ry="16" fill="#78350f" stroke="#451a03" strokeWidth="2.5" />
        <ellipse cx="22" cy="20" rx="15" ry="10" fill="#b45309" />
        <path d="M 4 20 C 4 2, 40 2, 40 20" stroke="#fbbf24" strokeWidth="3" fill="none" />
        <circle cx="22" cy="6" r="6" fill="#dc2626" />
      </g>

      {/* Cờ đuôi nheo cắm thưởng khi chòi "Tới" (trúng bài) */}
      <g transform="translate(30, 160)">
        <line x1="10" y1="0" x2="10" y2="90" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
        <polygon points="10,5 50,22 10,40" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
        <circle cx="22" cy="22" r="5" fill="#fde68a" />
      </g>
    </svg>
  );
};
