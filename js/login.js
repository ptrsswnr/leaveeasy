// ─────────────────────────────────────────────────────────────
// js/login.js — หน้าเข้าสู่ระบบ
// สัปดาห์ที่ 7: เข้าสู่ระบบด้วยอีเมล/รหัสผ่านผ่าน Firebase Authentication
// ─────────────────────────────────────────────────────────────

(async function () {
  // ล็อกอินอยู่แล้ว ไม่ต้องมาหน้านี้อีก พาไปหน้ารายการใบลาเลย
  var ผู้ใช้ปัจจุบัน = await รอสถานะล็อกอิน();
  if (ผู้ใช้ปัจจุบัน) {
    location.href = "leave-requests.html";
    return;
  }

  var ฟอร์ม = document.getElementById("ฟอร์มล็อกอิน");
  var กล่องเตือน = document.getElementById("ข้อความเตือน");
  var ปุ่ม = document.getElementById("ปุ่มเข้าสู่ระบบ");

  ฟอร์ม.addEventListener("submit", async function (e) {
    e.preventDefault();

    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value;

    if (!email || !password) {
      เตือน("กรอกอีเมลและรหัสผ่านให้ครบก่อนกดเข้าสู่ระบบ");
      return;
    }

    กล่องเตือน.classList.add("hidden");
    ปุ่ม.disabled = true;

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      location.href = "leave-requests.html";
    } catch (err) {
      เตือน(ข้อความErrorล็อกอิน(err));
      ปุ่ม.disabled = false;
    }
  });

  function เตือน(ข้อความ) {
    กล่องเตือน.textContent = "⚠️ " + ข้อความ;
    กล่องเตือน.classList.remove("hidden");
  }
})();
