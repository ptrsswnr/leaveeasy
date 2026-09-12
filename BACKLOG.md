# Backlog

## Sprint 2

- [ ] ย้ายคีย์ AI ไปไว้ฝั่งที่ผู้ใช้แตะไม่ได้
      — ตอนนี้คีย์ OpenRouter อยู่ใน `js/openrouter-config.local.js` ฝั่ง client เปิด F12 บนเว็บที่ deploy แล้วเห็นได้ตรง ๆ
      ทางแก้จริงคือย้ายการเรียก AI ไปทำฝั่งเซิร์ฟเวอร์ (เช่น Cloud Function) แล้วให้หน้าเว็บเรียกเซิร์ฟเวอร์ของเราแทนที่จะเรียก OpenRouter ตรง ๆ
