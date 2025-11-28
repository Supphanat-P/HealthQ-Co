import { ChatbotIcon } from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import "./Chatbot.css";
import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useRef } from "react";
import buildSymptomsIntro from "../../symptomsList";
import { useData } from "../../Context/DataContext";

const Chatbot = () => {
  // 1. ดึงข้อมูลรวม จาก DataContext
  const { specialties, hospitals, doctors, doctorsSchedule, symptomsListData } =
    useData();

  // 2. State เก็บประวัติแชท (เริ่มต้นด้วย role: model)
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true, // ซ่อนไม่ให้userเห็น
      role: "model",
      text: "กำลังเตรียมข้อมูล...",
    },
  ]);

  // State ควบคุมการเปิด/ปิดหน้าต่างแชท
  const [showChatbot, setShowChatbot] = useState(false);

  // Ref เอาไว้สั่ง Scroll ลงล่างสุด
  const chatBodyRef = useRef();

  // 3. ฟังก์ชันหลัก: ส่งข้อความไปหา AI และรับคำตอบ
  const generateBotResponse = async (history) => {
    // ฟังก์ชันย่อย: อัปเดตข้อความในหน้าจอ (ถ้า text เข้ามาคือโชว์เลย, ถ้า error ก็โชว์ error)
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => {
        const updated = [...prev];
        // ลบข้อความ "กำลังคิด..." ออกก่อนใส่คำตอบจริง
        if (
          updated.length &&
          updated[updated.length - 1].text === "กำลังคิด..."
        ) {
          updated.pop();
        }
        return [...updated, { role: "model", text, isError }];
      });
    };

    // จัดรูปแบบข้อมูลให้ตรงกับที่ API ต้องการ
    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    // ยิง API ไปหา Server (AI)
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Something went wrong!");
      }

      // แกะคำตอบจาก AI และลบเครื่องหมาย ** ออก (เพื่อให้ข้อความสวยงาม)
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1 ")
        .trim();

      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  // 4. Auto-Scroll: เมื่อมีข้อความใหม่ ให้เลื่อนลงล่างสุดเสมอ
  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  // 5. Context Loading: เมื่อข้อมูลแพทย์/รพ. โหลดเสร็จ ให้สร้าง Prompt ไปบอก AI
  useEffect(() => {
    const haveData =
      (specialties && specialties.length) ||
      (hospitals && hospitals.length) ||
      (doctors && doctors.length) ||
      (doctorsSchedule && doctorsSchedule.length) ||
      (symptomsListData && symptomsListData.length);

    if (haveData) {
      // สร้างข้อความแนะนำตัวระบบ (System Prompt)
      const intro = buildSymptomsIntro({
        specialties,
        hospitals,
        doctors,
        doctorsSchedule,
        symptomsListData,
      });

      // แอบยัดใส่ history ตัวแรกสุด (User ไม่เห็น แต่ AI รู้ข้อมูลนี้)
      setChatHistory((prev) => {
        const updated = [...prev];
        if (updated.length && updated[0]?.hideInChat) {
          updated[0] = { hideInChat: true, role: "model", text: intro };
        } else if (!updated.length) {
          updated.unshift({ hideInChat: true, role: "model", text: intro });
        }
        return updated;
      });
    }
  }, [specialties, hospitals, doctors, doctorsSchedule, symptomsListData]);

  return (
    <div className="chatbot-all">
      <div className={`chatbot-container ${showChatbot ? "show-chatbot" : ""}`}>
        {/* กดเพื่อ เปิด/ปิด แชท */}
        <button
          onClick={() => setShowChatbot((prev) => !prev)}
          id="chatbot-toggler"
        >
          <span>
            <i className="bi bi-chat-right-fill"></i>
          </span>
          <span>
            <i className="bi bi-x-lg"></i>
          </span>
        </button>

        {/* ตัวหน้าต่างแชท */}
        <div className="chatbot-popup">
          {/* ส่วนหัว Header */}
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIcon />
              <h2 className="logo-text">แชทบอท</h2>
            </div>
            <button onClick={() => setShowChatbot((prev) => !prev)}>
              <i className="bi bi-chevron-down"></i>
            </button>
          </div>

          {/* ส่วนเนื้อหาแชท Body */}
          <div ref={chatBodyRef} className="chat-body">
            {/* ข้อความต้อนรับเริ่มต้น (Hardcode ไว้) */}
            <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text">
                สวัสดีครับ <br /> มีอะไรให้ช่วยไหมครับ?
              </p>
            </div>

            {/* วนลูปแสดงข้อความแชท (ChatMessage) */}
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          {/* Footer */}
          <div className="chat-footer">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
