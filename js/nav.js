// ─────────────────────────────────────────────────────────────
// js/nav.js — แถบเมนูด้านบนที่ใช้ร่วมกันทุกหน้า
// แก้เมนูที่ไฟล์นี้ที่เดียว ทุกหน้าเปลี่ยนตามพร้อมกัน
//
// วิธีใช้: ทุกหน้ามี <div id="nav"></div> ไว้บนสุดของ body
// ─────────────────────────────────────────────────────────────

(function () {
  // เมนู "ประเภทการลา" สำหรับฝ่ายบุคคล (hr) เท่านั้น — แทรกเข้าไปทีหลังเมื่อรู้ว่า role เป็น hr แล้วเท่านั้น
  // กันไม่ให้เมนูโผล่วาบให้เห็นก่อนถูกซ่อนสำหรับ employee/manager
  var เมนูหลัก = [
    { href: "index.html",             ชื่อ: "หน้าแรก" },
    { href: "leave-requests.html",    ชื่อ: "รายการใบลา" },
    { href: "new-leave-request.html", ชื่อ: "ยื่นใบลาใหม่" }
  ];
  var เมนูฝ่ายบุคคล = { href: "leave-types.html", ชื่อ: "ประเภทการลา" };

  // ชื่อไฟล์ของหน้าที่กำลังเปิดอยู่ เอาไว้ขีดเส้นใต้เมนูที่ตรงกัน
  var หน้าปัจจุบัน = location.pathname.split("/").pop() || "index.html";

  function ลิงก์เมนู(m) {
    var active = m.href === หน้าปัจจุบัน ? ' class="active"' : "";
    return '<a href="' + m.href + '"' + active + ">" + m.ชื่อ + "</a>";
  }

  var html = '<div class="navbar"><span class="brand">🔧 LeaveEasy</span>';
  html += '<span id="navเมนูหลัก">' + เมนูหลัก.map(ลิงก์เมนู).join("") + '</span>';
  html += '<span id="navเมนูฝ่ายบุคคล"></span>';
  html += '<span class="nav-user" id="navUser"></span></div>';

  var ที่วาง = document.getElementById("nav");
  if (ที่วาง) ที่วาง.innerHTML = html;

  // แสดงสถานะล็อกอินในช่อง navUser — ชื่อ+ปุ่มออกจากระบบ หรือลิงก์เข้าสู่ระบบ/สมัครสมาชิก
  // และแทรกเมนู "ประเภทการลา" เฉพาะเมื่อ role เป็น hr
  firebase.auth().onAuthStateChanged(async function (user) {
    var ช่องผู้ใช้ = document.getElementById("navUser");
    var ช่องเมนูฝ่ายบุคคล = document.getElementById("navเมนูฝ่ายบุคคล");
    if (!ช่องผู้ใช้) return;

    if (user) {
      ช่องผู้ใช้.innerHTML =
        esc(user.displayName || user.email) +
        ' <button type="button" id="ปุ่มออกจากระบบ" class="btn-ghost">ออกจากระบบ</button>';
      document.getElementById("ปุ่มออกจากระบบ").addEventListener("click", function () {
        firebase.auth().signOut().then(function () { location.href = "login.html"; });
      });

      if (ช่องเมนูฝ่ายบุคคล) {
        var role = await บทบาทผู้ใช้ปัจจุบัน(user.uid);
        if (role === "hr") ช่องเมนูฝ่ายบุคคล.innerHTML = ลิงก์เมนู(เมนูฝ่ายบุคคล);
      }
    } else {
      ช่องผู้ใช้.innerHTML = '<a href="login.html">เข้าสู่ระบบ</a> · <a href="signup.html">สมัครสมาชิก</a>';
      if (ช่องเมนูฝ่ายบุคคล) ช่องเมนูฝ่ายบุคคล.innerHTML = "";
    }
  });
})();

// แถบเตือนสีเหลือง ใช้ตอนที่ยังไม่ได้ตั้งค่า Firebase
function showConfigWarning(ข้อความ) {
  var กล่อง = document.createElement("div");
  กล่อง.className = "alert alert-warn";
  กล่อง.innerHTML =
    "⚠️ <strong>ยังไม่ได้ตั้งค่า Firebase</strong> — " +
    (ข้อความ || "หน้านี้จึงยังไม่ได้อ่านข้อมูลจากฐานข้อมูลจริง") +
    "<br>วิธีตั้งค่าอยู่ในไฟล์ SETUP.md ขั้นที่ 4";
  var ที่วาง = document.querySelector(".container") || document.body;
  ที่วาง.insertBefore(กล่อง, ที่วาง.firstChild);
}
