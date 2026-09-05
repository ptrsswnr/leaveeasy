// ─────────────────────────────────────────────────────────────
// js/auth.js — ตัวช่วยเรื่องสถานะล็อกอิน ใช้ร่วมกันหลายหน้า
// ต้องโหลดหลัง firebase-auth-compat.js และ firebase-config.js
// ─────────────────────────────────────────────────────────────

// รอจน Firebase บอกสถานะล็อกอินที่แน่ชัดครั้งแรก (login แล้วหรือยัง)
function รอสถานะล็อกอิน() {
  return new Promise(function (resolve) {
    var เลิกฟัง = firebase.auth().onAuthStateChanged(function (user) {
      เลิกฟัง();
      resolve(user);
    });
  });
}

// เรียกตอนต้นของหน้าที่ต้องล็อกอินก่อนถึงจะใช้ได้
// ถ้ายังไม่ได้ล็อกอิน เด้งไปหน้า login ให้อัตโนมัติ แล้วคืนค่า null
async function ต้องล็อกอินก่อน() {
  var user = await รอสถานะล็อกอิน();
  if (!user) {
    location.href = "login.html";
    return null;
  }
  return user;
}

// อ่านบทบาท (role) ของผู้ใช้จากโฟลเดอร์ users — ถ้าไม่เจอเอกสารหรือไม่มีช่อง role
// ให้ถือเป็น employee ไว้ก่อน (สิทธิ์น้อยสุด กันพลาดไปทางเปิดกว้างเกิน)
async function บทบาทผู้ใช้ปัจจุบัน(uid) {
  try {
    var เอกสาร = await db.collection("users").doc(uid).get();
    return (เอกสาร.exists && เอกสาร.data().role) || "employee";
  } catch (err) {
    return "employee";
  }
}

// แปลรหัส error ของ Firebase Auth เป็นข้อความไทยที่อ่านเข้าใจง่าย
function ข้อความErrorล็อกอิน(err) {
  var ตาราง = {
    "auth/invalid-email": "รูปแบบอีเมลไม่ถูกต้อง",
    "auth/user-not-found": "ไม่พบบัญชีนี้ในระบบ",
    "auth/wrong-password": "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
    "auth/invalid-credential": "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
    "auth/email-already-in-use": "อีเมลนี้มีผู้สมัครแล้ว",
    "auth/weak-password": "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
    "auth/too-many-requests": "ลองผิดหลายครั้งเกินไป กรุณารอสักครู่แล้วลองใหม่"
  };
  return ตาราง[err.code] || err.message;
}
