// ─────────────────────────────────────────────────────────────
// js/leave-requests.js — หน้าที่ 1 รายการใบลา
// สัปดาห์ที่ 6: อ่านใบลาจาก Firestore จริง (โฟลเดอร์ leaveRequests)
// ─────────────────────────────────────────────────────────────

(async function () {
  var ผู้ใช้ปัจจุบัน = await ต้องล็อกอินก่อน();
  if (!ผู้ใช้ปัจจุบัน) return;

  var กล่อง = document.getElementById("ผลลัพธ์");

  var ใบลาจากFirestore;
  try {
    var snapshot = await db.collection("leaveRequests").get();
    ใบลาจากFirestore = snapshot.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); });
  } catch (err) {
    กล่อง.innerHTML = "<p>⚠️ อ่านข้อมูลจาก Firestore ไม่สำเร็จ: " + esc(err.message) + "</p>";
    return;
  }

  // พนักงาน (employee) เห็นเฉพาะใบลาของตัวเอง · ผู้อนุมัติ/ฝ่ายบุคคลเห็นทุกใบ ตาม ACL.md
  var role = await บทบาทผู้ใช้ปัจจุบัน(ผู้ใช้ปัจจุบัน.uid);
  var ใบลาทั้งหมด = role === "employee"
    ? ใบลาจากFirestore.filter(function (ใบ) { return ใบ.requesterId === ผู้ใช้ปัจจุบัน.uid; })
    : ใบลาจากFirestore;

  // บรรทัด "ทั้งหมด N ใบ" บนสุดของหน้า — นับรวมทุกใบ ไม่ว่าจะกรองสถานะไว้หรือไม่
  document.getElementById("จำนวนทั้งหมด").textContent = "ทั้งหมด " + ใบลาทั้งหมด.length + " ใบ";

  // ถ้ามีสถานะติดมาท้าย URL ให้กรองเฉพาะสถานะนั้น
  var สถานะที่กรอง = ค่าจากURL("status");
  if (สถานะที่กรอง) {
    ใบลาทั้งหมด = ใบลาทั้งหมด.filter(function (ใบ) { return ใบ.status === สถานะที่กรอง; });
    document.querySelector(".subtitle").textContent =
      "กำลังแสดงเฉพาะใบลาที่สถานะ " + สถานะที่กรอง + " · กดเมนู รายการใบลา เพื่อดูทั้งหมด";
  }

  แสดงตาราง(ใบลาทั้งหมด);

  function แสดงตาราง(รายการ) {
    if (รายการ.length === 0) {
      กล่อง.innerHTML = "<p>ยังไม่มีใบขอลาในระบบ</p>";
      return;
    }

    var html =
      "<table><thead><tr>" +
      "<th>หัวข้อ</th>" +
      "<th>ประเภทการลา</th>" +
      "<th>สถานะ</th>" +
      '<th class="hide-mobile">ผู้ขอลา</th>' +
      '<th class="hide-mobile">วันที่ลา</th>' +
      "</tr></thead><tbody>";

    รายการ.forEach(function (ใบ) {
      html +=
        '<tr class="clickable" data-id="' + esc(ใบ.id) + '">' +
        "<td>" + esc(ใบ.title) + "</td>" +
        "<td>" + esc(ใบ.leaveTypeName) + "</td>" +
        "<td>" + ป้ายสถานะ(ใบ.status) + "</td>" +
        '<td class="hide-mobile">' + esc(ใบ.requesterName) + "</td>" +
        '<td class="hide-mobile">' + esc(ใบ.startDate) + " ถึง " + esc(ใบ.endDate) + "</td>" +
        "</tr>";
    });

    html += "</tbody></table>";
    กล่อง.innerHTML = html;

    // กดที่แถวไหน ไปหน้ารายละเอียดของใบนั้น
    กล่อง.querySelectorAll("tr.clickable").forEach(function (แถว) {
      แถว.addEventListener("click", function () {
        location.href = "leave-request-detail.html?id=" + แถว.dataset.id;
      });
    });
  }
})();
