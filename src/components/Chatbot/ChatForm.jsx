import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "กำลังคิด..." },
      ]);

      generateBotResponse([
        ...chatHistory,
        {
          role: "user",
          text: `คุณคือแชตบอทของระบบ HealthQueue  เรียกผู้ใช้ว่า 'คุณ' ทุกครั้ง ห้ามใช้คำว่าลูกค้า สวัสดีตอนที่เริ่มสนทนาแค่ครั้งเดียว ให้คำแนะนำด้านสุขภาพ คุณไม่สามารถจองคิวให้userได้ ไม่สามารถดูเวลาและวันที่ที่แพทย์ว่างได้ คุณทำได้แต่แนะนำคนไข้ว่าต้องนัดคิวกับแพทย์แผนกใด ใช้คำลงท้ายว่า ครับ: ${userMessage}`,
        },
      ]);
    }, 600);
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="พิมพ์ข้อความ..."
        className="message-input"
        required
      />
      <button>
        <i className="bi bi-arrow-up"></i>
      </button>
    </form>
  );
};

export default ChatForm;
