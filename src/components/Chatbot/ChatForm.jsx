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
          text: `คุณคือแชตบอทของระบบ HealthQueue ที่พูดด้วยน้ำเสียงสุภาพ เรียกผู้ใช้ว่า 'คุณ' ทุกครั้ง ห้ามใช้คำว่าลูกค้า สวัสดีตอนที่เริ่มสนทนาแค่ครั้งเดียว ขอบคุณเมื่อจบบทสนทนา และให้คำแนะนำด้านสุขภาพและการจองคิวพบแพทย์: ${userMessage}`,
        },
      ]);
    }, 600);
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
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
