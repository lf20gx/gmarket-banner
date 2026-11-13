export default function handler(req, res) {
  // 1. 한국 시간(KST) 기준 현재 날짜 계산
  const now = new Date();
  const kstTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const today = kstTime.toISOString().split('T')[0]; // 예: "2026-11-14"

  // 2. 노출할 날짜 지정 (내일: 2026년 11월 14일 토요일)
  const targetDate = "2026-11-14";

  // 브라우저가 옛날 상태를 기억(캐시)하지 않도록 설정
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  if (today === targetDate) {
    // [내일일 때] 카페24에 올린 진짜 배너 이미지로 연결
    res.redirect(302, "https://doorins.cafe24.com/Event/real_banner.jpg");
  } else {
    // [내일이 아닐 때] 높이 1px짜리 투명 GIF 반환 (공간 최소화)
    const transparentGif = Buffer.from(
      "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      "base64"
    );
    res.setHeader("Content-Type", "image/gif");
    res.status(200).send(transparentGif);
  }
}
