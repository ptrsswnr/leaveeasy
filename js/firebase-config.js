// ─────────────────────────────────────────────────────────────
// js/firebase-config.js — ตั้งค่าการเชื่อมต่อ Firebase (โปรเจกต์ leaveeasy-puttaraksa)
// ใช้ Firebase JS SDK แบบ "compat" (โหลดด้วย <script> ธรรมดา ไม่ใช่ module)
// เพราะเว็บนี้เปิดตรงจากไฟล์ (file://) ได้ — เบราว์เซอร์บล็อก type="module" บน file://
// apiKey ของเว็บแอปไม่ใช่ความลับ — ความปลอดภัยจริงมาจาก Firestore Security Rules
// ต้องโหลดหลัง firebase-app-compat.js และ firebase-firestore-compat.js เท่านั้น
// ─────────────────────────────────────────────────────────────

var firebaseConfig = {
  apiKey: "AIzaSyCWcjrk8FXCCa7AAgdu_55ne9kwBfsc_F4",
  authDomain: "leaveeasy-puttaraksa.firebaseapp.com",
  projectId: "leaveeasy-puttaraksa",
  storageBucket: "leaveeasy-puttaraksa.firebasestorage.app",
  messagingSenderId: "598336099311",
  appId: "1:598336099311:web:5243187fec6e0a9e451c1a",
  measurementId: "G-LE4M0DGFSS"
};

firebase.initializeApp(firebaseConfig);
window.db = firebase.firestore();
