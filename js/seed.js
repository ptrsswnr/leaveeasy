// ─────────────────────────────────────────────────────────────
// js/seed.js — ใส่ข้อมูลตัวอย่างจาก js/data.js ลง Firestore (ใช้ครั้งเดียว)
// ใช้ .set() กับ id เดิมของแต่ละรายการ (ไม่ใช่ .add()) เพื่อให้กดซ้ำได้อย่างปลอดภัย
// กดกี่ครั้งก็ได้ ข้อมูลจะถูกเขียนทับด้วยชุดเดิม ไม่มีรายการซ้ำ
// ─────────────────────────────────────────────────────────────

var ปุ่ม = document.getElementById("ปุ่มใส่ข้อมูล");
var กล่องผล = document.getElementById("ผลลัพธ์การใส่ข้อมูล");

ปุ่ม.addEventListener("click", ใส่ข้อมูลตัวอย่าง);

async function ใส่ข้อมูลตัวอย่าง() {
  ปุ่ม.disabled = true;
  แสดงผล("กำลังใส่ข้อมูล…");

  try {
    var data = window.LEAVE_DATA;

    for (var u of data.users) {
      var { id, ...ฟิลด์ } = u;
      await db.collection("users").doc(id).set(ฟิลด์);
    }

    for (var lt of data.leaveTypes) {
      var { id, ...ฟิลด์ } = lt;
      await db.collection("leaveTypes").doc(id).set(ฟิลด์);
    }

    for (var lr of data.leaveRequests) {
      var { id, ...ฟิลด์ } = lr;
      await db.collection("leaveRequests").doc(id).set(ฟิลด์);
    }

    for (var ap of data.approvals) {
      var { id, requestId, ...ฟิลด์ } = ap;
      await db.collection("leaveRequests").doc(requestId).collection("approvals").doc(id).set(ฟิลด์);
    }

    แสดงผล(
      "✅ ใส่ข้อมูลตัวอย่างเสร็จแล้ว — users " + data.users.length +
      " · leaveTypes " + data.leaveTypes.length +
      " · leaveRequests " + data.leaveRequests.length +
      " · approvals " + data.approvals.length +
      "\n\nเปิด Firebase Console ตรวจดูได้เลย"
    );
  } catch (err) {
    แสดงผล("❌ ใส่ข้อมูลไม่สำเร็จ: " + err.message + "\n\n(เช็ค Firestore Rules ว่าเปิดให้เขียนได้หรือยัง)");
  } finally {
    ปุ่ม.disabled = false;
  }
}

function แสดงผล(ข้อความ) {
  กล่องผล.textContent = ข้อความ;
}
