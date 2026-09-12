// ─────────────────────────────────────────────────────────────
// js/ai.js — ตัวช่วยเรียก AI ผ่าน OpenRouter ใช้ร่วมกันหลายหน้า (สัปดาห์ที่ 8)
// อ่านคีย์จาก window.OPENROUTER_CONFIG (js/openrouter-config.local.js — ไม่ push ขึ้น GitHub)
// ─────────────────────────────────────────────────────────────

async function เรียกAI(ข้อความ, ตัวเลือก) {
  ตัวเลือก = ตัวเลือก || {};
  var หมดเวลาใน = ตัวเลือก.หมดเวลาใน || 15000;

  if (!window.OPENROUTER_CONFIG || !window.OPENROUTER_CONFIG.apiKey) {
    throw new Error("ไม่พบคีย์ OpenRouter — ตรวจว่ามีไฟล์ js/openrouter-config.local.js อยู่หรือไม่");
  }

  var ตัวยกเลิก = new AbortController();
  var ตัวจับเวลา = setTimeout(function () { ตัวยกเลิก.abort(); }, หมดเวลาใน);

  try {
    var res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + window.OPENROUTER_CONFIG.apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: window.OPENROUTER_CONFIG.model,
        messages: [{ role: "user", content: ข้อความ }]
      }),
      signal: ตัวยกเลิก.signal
    });

    var ข้อมูล = await res.json();

    if (!res.ok) {
      throw new Error((ข้อมูล.error && ข้อมูล.error.message) || ("HTTP " + res.status));
    }

    return ข้อมูล.choices[0].message.content;
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("หมดเวลารอคำตอบจาก AI");
    }
    throw err;
  } finally {
    clearTimeout(ตัวจับเวลา);
  }
}
