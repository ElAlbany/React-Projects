import { useState, useEffect, useRef } from "react";
import { Chatbot } from "supersimpledev";
import robotImg from "./assets/robot.png";
import userImg from "./assets/user.png";
import "./App.css";

function App() {
  function ChatInput({ chatMessages, setChatMessages, isTyping, setIsTyping }) {
    const [inputText, setInputText] = useState("");

    function saveInputText(event) {
      setInputText(event.target.value);
    }

    function sendMessage() {
      if (!inputText.trim() || isTyping) return;

      const newMessages = [
        ...chatMessages,
        {
          message: inputText,
          sender: "user",
          id: crypto.randomUUID(),
        },
      ];
      setChatMessages(newMessages);
      setInputText("");

      setIsTyping(true);

      setTimeout(() => {
        const response = Chatbot.getResponse(inputText);
        setChatMessages([
          ...newMessages,
          {
            message: response,
            sender: "robot",
            id: crypto.randomUUID(),
          },
        ]);
        setIsTyping(false);
      }, 2000);
    }

    return (
      <div className="chat-input-container">
        <input
          placeholder="Send a message to Chatbot"
          onChange={saveInputText}
          value={inputText}
          className="chat-input"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="send-btn">
          Send
        </button>
      </div>
    );
  }

  function ChatMessage({ message, sender }) {
    return (
      <div
        className={
          sender === "user" ? "chat-message-user" : "chat-message-robot"
        }
      >
        {sender === "robot" && (
          <img src={robotImg} className="chat-message-profile" alt="Robot" />
        )}
        <div className="chat-message-text">{message}</div>
        {sender === "user" && (
          <img src={userImg} className="chat-message-profile" alt="You" />
        )}
      </div>
    );
  }

  function ChatMessages({ chatMessages, isTyping }) {
    const chatMessagesRef = useRef(null);

    useEffect(() => {
      const container = chatMessagesRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, [chatMessages, isTyping]);

    return (
      <div className="chat-messages-container" ref={chatMessagesRef}>
        {chatMessages.map((chatMessage) => (
          <ChatMessage
            key={chatMessage.id}
            message={chatMessage.message}
            sender={chatMessage.sender}
          />
        ))}
        {isTyping && <TypingIndicator />}
      </div>
    );
  }

  function TypingIndicator() {
    return (
      <div className="typing-indicator">
        <img src={robotImg} className="chat-message-profile" alt="Robot" />
        <div className="typing-bubble">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div>
    );
  }

  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputAtBottom, setInputAtBottom] = useState(true);

  return (
    <div className="app-container">
      {!inputAtBottom && (
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          isTyping={isTyping}
          setIsTyping={setIsTyping}
        />
      )}

      <ChatMessages chatMessages={chatMessages} isTyping={isTyping} />

      {inputAtBottom && (
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          isTyping={isTyping}
          setIsTyping={setIsTyping}
        />
      )}

      <div
        className="toggle-text"
        onClick={() => setInputAtBottom(!inputAtBottom)}
      >
        {inputAtBottom
          ? "⬆️ Click here to move the input box to the top"
          : "⬇️ Click here to move the input box to the bottom"}
      </div>
    </div>
  );
}

export default App;
