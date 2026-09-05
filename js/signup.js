// ─────────────────────────────────────────────────────────────
// js/signup.js — หน้าสมัครสมาชิก
// สัปดาห์ที่ 7: สมัครด้วยอีเมล/รหัสผ่านผ่าน Firebase Authentication
// สมัครสำเร็จแล้วสร้างไฟล์คู่กันในโฟลเดอร์ users ทันที ค่า role เริ่มต้นเป็น employee
// ─────────────────────────────────────────────────────────────

(async function () {
  // ล็อกอินอยู่แล้ว ไม่ต้องมาหน้านี้อีก พาไปหน้ารายการใบลาเลย
  var ผู้ใช้ปัจจุบัน = await รอสถานะล็อกอิน();
  if (ผู้ใช้ปัจจุบัน) {
    location.href = "leave-requests.html";
    return;
  }

  var ฟอร์ม = document.getElementById("ฟอร์มสมัครสมาชิก");
  var กล่องเตือน = document.getElementById("ข้อความเตือน");
  var ปุ่ม = document.getElementById("ปุ่มสมัครสมาชิก");

  ฟอร์ม.addEventListener("submit", async function (e) {
    e.preventDefault();

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value;

    if (!name || !email || !password) {
      เตือน("กรอกชื่อ อีเมล และรหัสผ่านให้ครบก่อนกดสมัครสมาชิก");
      return;
    }
    if (password.length < 6) {
      เตือน("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      return;
    }

    กล่องเตือน.classList.add("hidden");
    ปุ่ม.disabled = true;

    try {
      var ข้อมูลรับรอง = await firebase.auth().createUserWithEmailAndPassword(email, password);
      var ผู้ใช้ = ข้อมูลรับรอง.user;
      await ผู้ใช้.updateProfile({ displayName: name });
      await db.collection("users").doc(ผู้ใช้.uid).set({ name: name, email: email, role: "employee" });
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
