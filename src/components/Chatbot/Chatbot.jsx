import { ChatbotIcon } from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import "./Chatbot.css";
import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useRef } from "react";
import buildSymptomsIntro from "../../symptomsList";
import { useData } from "../../Context/DataContext";

const Chatbot = () => {
  const { specialties, hospitals, doctors, doctorsSchedule, symptomsListData } =
    useData();

  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: "กำลังเตรียมข้อมูล...",
    },
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => {
        const updated = [...prev];
        if (
          updated.length &&
          updated[updated.length - 1].text === "กำลังคิด..."
        ) {
          updated.pop();
        }
        return [...updated, { role: "model", text, isError }];
      });
    };

    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Something went wrong!");
      }

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1 ")
        .trim();

      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  useEffect(() => {
    const haveData =
      (specialties && specialties.length) ||
      (hospitals && hospitals.length) ||
      (doctors && doctors.length) ||
      (doctorsSchedule && doctorsSchedule.length) ||
      (symptomsListData && symptomsListData.length);

    if (haveData) {
      const intro = buildSymptomsIntro({
        specialties,
        hospitals,
        doctors,
        doctorsSchedule,
        symptomsListData,
      });

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

        <div className="chatbot-popup">
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIcon />
              <h2 className="logo-text">Chatbot</h2>
            </div>
            <button onClick={() => setShowChatbot((prev) => !prev)}>
              <i className="bi bi-chevron-down"></i>
            </button>
          </div>

          <div ref={chatBodyRef} className="chat-body">
            <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text">
                สวัสดีครับ <br /> มีอะไรให้ช่วยไหมครับ?
              </p>
            </div>
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

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
