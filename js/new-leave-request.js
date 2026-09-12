// ─────────────────────────────────────────────────────────────
// js/new-leave-request.js — หน้าที่ 2 ยื่นใบลาใหม่
// สัปดาห์ที่ 7: กดบันทึกแล้วเขียนใบลาใหม่ลง Firestore จริง (โฟลเดอร์ leaveRequests)
// requesterId/requesterName มาจากผู้ใช้ที่ล็อกอินอยู่จริง
// ─────────────────────────────────────────────────────────────

(async function () {
  var ผู้ใช้ปัจจุบัน = await ต้องล็อกอินก่อน();
  if (!ผู้ใช้ปัจจุบัน) return;

  var ฟอร์ม = document.getElementById("ฟอร์มใบลา");
  var ช่องประเภท = document.getElementById("leaveTypeId");
  var กล่องเตือน = document.getElementById("ข้อความเตือน");
  var ปุ่มบันทึก = document.getElementById("ปุ่มบันทึก");
  var ช่องเหตุผล = document.getElementById("reason");
  var ปุ่มAI = document.getElementById("ปุ่มAIจัดประเภท");
  var กล่องเตือนAI = document.getElementById("เตือนAI");
  var ป้ายAI = document.getElementById("ป้ายAI");
  var ช่องหัวข้อ = document.getElementById("title");
  var ป้ายAIหัวข้อ = document.getElementById("ป้ายAIหัวข้อ");

  // เติมรายการเลื่อนลงด้วยประเภทการลาที่มีอยู่
  window.LEAVE_DATA.leaveTypes.forEach(function (ประเภท) {
    var ตัวเลือก = document.createElement("option");
    ตัวเลือก.value = ประเภท.id;
    ตัวเลือก.textContent = ประเภท.name;
    ช่องประเภท.appendChild(ตัวเลือก);
  });

  // ผู้ใช้แก้ประเภท/หัวข้อเองเมื่อไหร่ ป้าย "ข้อเสนอจาก AI" ก็ไม่ตรงกับความจริงอีกต่อไป ซ่อนทิ้ง
  ช่องประเภท.addEventListener("change", function () {
    ป้ายAI.classList.add("hidden");
  });
  ช่องหัวข้อ.addEventListener("input", function () {
    ป้ายAIหัวข้อ.classList.add("hidden");
  });

  ปุ่มAI.addEventListener("click", async function () {
    var เหตุผล = ช่องเหตุผล.value.trim();

    กล่องเตือนAI.classList.add("hidden");
    ป้ายAI.classList.add("hidden");
    ป้ายAIหัวข้อ.classList.add("hidden");

    if (!เหตุผล) {
      เตือนAI("พิมพ์เหตุผลการลาก่อน จึงจะให้ AI ช่วยจัดประเภทได้");
      return;
    }

    var คำอธิบายประเภท = {
      "ลาพักร้อน": "ไปพักผ่อน ท่องเที่ยว ไม่มีธุระจำเป็นเฉพาะหน้า",
      "ลาป่วย": "เจ็บป่วยจริง ไม่สบายจนทำงานไม่ไหว ต้องพบแพทย์หรือพักรักษาตัว",
      "ลากิจ": "มีธุระส่วนตัวที่จำเป็นต้องทำ เช่น งานเอกสารราชการ งานครอบครัว"
    };
    var รายชื่อประเภท = window.LEAVE_DATA.leaveTypes.map(function (t) {
      return "- " + t.name + (คำอธิบายประเภท[t.name] ? " (" + คำอธิบายประเภท[t.name] + ")" : "");
    });

    var คำสั่ง =
      "คุณคือผู้ช่วยจัดประเภทการลาให้พนักงาน ตัดสินอย่างเข้มงวด ห้ามเดาหรือขยายความจากคำสั้น ๆ ที่คลุมเครือ\n\n" +
      "รายชื่อประเภทการลาที่มีอยู่ในระบบตอนนี้ (เลือกได้เฉพาะรายการนี้เท่านั้น):\n" +
      รายชื่อประเภท.join("\n") + "\n\n" +
      "ตัวอย่างการตัดสิน:\n" +
      '- เหตุผล "ปวดหัว เป็นไข้ ต้องไปหาหมอ" → ลาป่วย\n' +
      '- เหตุผล "พาครอบครัวไปเที่ยวทะเล" → ลาพักร้อน\n' +
      '- เหตุผล "ไปทำบัตรประชาชนที่อำเภอ" → ลากิจ\n' +
      '- เหตุผล "ง่วง" → ไม่พบ (แค่ง่วงไม่ใช่การเจ็บป่วยหรือธุระจำเป็น ยังไม่ชัดเจนพอ)\n' +
      '- เหตุผล "เบื่องาน" → ไม่พบ\n\n' +
      'เหตุผลการลาของพนักงาน: "' + เหตุผล + '"\n\n' +
      "พิจารณาว่าเหตุผลนี้เข้าข่ายประเภทใดข้างต้นจริงหรือไม่ ถ้าเหตุผลคลุมเครือ สั้นเกินไป หรือไม่ใช่เหตุผลการลาที่สมเหตุสมผล " +
      "ให้ตอบว่า ไม่พบ ทันที ห้ามเลือกประเภทที่ใกล้เคียงที่สุดแบบเดา\n\n" +
      "นอกจากนี้ ให้ช่วยตั้งหัวข้อใบลาสั้น ๆ (ไม่เกิน 8 คำ) สรุปใจความจากเหตุผลการลาด้วย\n\n" +
      "ตอบกลับตามรูปแบบนี้เป๊ะ 2 บรรทัด ห้ามมีข้อความอื่นปนมา:\n" +
      "ประเภท: <ชื่อประเภทจากรายชื่อ หรือ ไม่พบ>\n" +
      "หัวข้อ: <หัวข้อสั้น ๆ ที่ตั้งให้>";

    ปุ่มAI.disabled = true;
    ปุ่มAI.textContent = "กำลังทำงาน...";

    try {
      var คำตอบดิบ = await เรียกAI(คำสั่ง);

      var แถวประเภท = คำตอบดิบ.match(/ประเภท\s*[:：]\s*(.+)/);
      var แถวหัวข้อ = คำตอบดิบ.match(/หัวข้อ\s*[:：]\s*(.+)/);

      var ประเภทที่ตอบ = แถวประเภท ? แถวประเภท[1].trim().replace(/^["'“”]+|["'“”]+$/g, "") : "";
      var หัวข้อที่ตอบ = แถวหัวข้อ ? แถวหัวข้อ[1].trim().replace(/^["'“”]+|["'“”]+$/g, "") : "";

      var ประเภทที่ตรง = window.LEAVE_DATA.leaveTypes.find(function (t) { return t.name === ประเภทที่ตอบ; });

      if (ประเภทที่ตรง) {
        ช่องประเภท.value = ประเภทที่ตรง.id;
        ป้ายAI.classList.remove("hidden");
      } else {
        เตือนAI("เหตุผลนี้ไม่เข้าข่ายประเภทการลาใดในระบบ — กรุณาเลือกประเภทการลาเอง หรือแก้เหตุผลให้ชัดเจนขึ้น");
      }

      // เติมหัวข้อให้เฉพาะตอนที่ผู้ใช้ยังไม่ได้พิมพ์เอง — ไม่เขียนทับสิ่งที่ผู้ใช้กรอกไว้แล้ว
      if (หัวข้อที่ตอบ && !ช่องหัวข้อ.value.trim()) {
        ช่องหัวข้อ.value = หัวข้อที่ตอบ;
        ป้ายAIหัวข้อ.classList.remove("hidden");
      }
    } catch (err) {
      เตือนAI("AI จัดประเภทให้ไม่ได้: " + err.message);
    } finally {
      ปุ่มAI.disabled = false;
      ปุ่มAI.textContent = "🤖 ให้ AI ช่วยจัดประเภทการลา";
    }
  });

  function เตือนAI(ข้อความ) {
    กล่องเตือนAI.textContent = "⚠️ " + ข้อความ;
    กล่องเตือนAI.classList.remove("hidden");
  }

  ฟอร์ม.addEventListener("submit", async function (e) {
    e.preventDefault();

    var ค่า = {
      title: document.getElementById("title").value.trim(),
      reason: document.getElementById("reason").value.trim(),
      leaveTypeId: ช่องประเภท.value,
      startDate: document.getElementById("startDate").value,
      endDate: document.getElementById("endDate").value
    };

    // ตรวจว่ากรอกครบก่อนบันทึก
    if (!ค่า.title || !ค่า.reason || !ค่า.leaveTypeId || !ค่า.startDate || !ค่า.endDate) {
      เตือน("กรอกไม่ครบ — ต้องกรอกทุกช่องก่อนกดบันทึก");
      return;
    }
    if (ค่า.endDate < ค่า.startDate) {
      เตือน("วันที่สิ้นสุดต้องไม่มาก่อนวันที่เริ่มลา");
      return;
    }

    var ประเภท = window.LEAVE_DATA.leaveTypes.find(function (t) { return t.id === ค่า.leaveTypeId; });

    var ใบใหม่ = {
      title: ค่า.title,
      reason: ค่า.reason,
      status: "รอพิจารณา",                       // ใบใหม่เริ่มที่ รอพิจารณา เสมอ
      requesterId: ผู้ใช้ปัจจุบัน.uid,
      requesterName: ผู้ใช้ปัจจุบัน.displayName || ผู้ใช้ปัจจุบัน.email,
      approverId: "",      approverName: "",
      leaveTypeId: ประเภท.id, leaveTypeName: ประเภท.name,
      startDate: ค่า.startDate,
      endDate: ค่า.endDate,
      createdAt: เวลาตอนนี้()
    };

    ปุ่มบันทึก.disabled = true;
    กล่องเตือน.classList.add("hidden");

    try {
      await db.collection("leaveRequests").add(ใบใหม่);
      location.href = "leave-requests.html";
    } catch (err) {
      เตือน("บันทึกลง Firestore ไม่สำเร็จ: " + err.message);
      ปุ่มบันทึก.disabled = false;
    }
  });

  function เตือน(ข้อความ) {
    กล่องเตือน.textContent = "⚠️ " + ข้อความ;
    กล่องเตือน.classList.remove("hidden");
  }
})();
