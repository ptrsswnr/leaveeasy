// ─────────────────────────────────────────────────────────────
// js/ai-test.js — หน้าทดสอบเล็ก ๆ สำหรับต่อ AI ผ่าน OpenRouter (สัปดาห์ที่ 8)
// อ่านคีย์จาก window.OPENROUTER_CONFIG (js/openrouter-config.local.js — ไม่ push ขึ้น GitHub)
// ─────────────────────────────────────────────────────────────

(function () {
  var ปุ่ม = document.getElementById("ปุ่มส่งข้อความ");
  var ช่องข้อความ = document.getElementById("ช่องข้อความ");
  var กล่องเตือน = document.getElementById("ข้อความเตือน");
  var กล่องคำตอบ = document.getElementById("กล่องคำตอบ");

  ปุ่ม.addEventListener("click", async function () {
    var ข้อความ = ช่องข้อความ.value.trim();

    if (!ข้อความ) {
      เตือน("พิมพ์ข้อความก่อนกดส่ง");
      return;
    }

    ซ่อนเตือน();
    กล่องคำตอบ.classList.add("hidden");
    ปุ่ม.disabled = true;
    ปุ่ม.textContent = "กำลังส่ง...";

    try {
      var คำตอบ = await เรียกAI(ข้อความ);
      กล่องคำตอบ.textContent = คำตอบ;
      กล่องคำตอบ.classList.remove("hidden");
    } catch (err) {
      เตือน("ส่งข้อความไม่สำเร็จ: " + err.message);
    } finally {
      ปุ่ม.disabled = false;
      ปุ่ม.textContent = "ส่งข้อความ";
    }
  });

  function เตือน(ข้อความ) {
    กล่องเตือน.textContent = "⚠️ " + ข้อความ;
    กล่องเตือน.classList.remove("hidden");
  }

  function ซ่อนเตือน() {
    กล่องเตือน.classList.add("hidden");
  }
})();
