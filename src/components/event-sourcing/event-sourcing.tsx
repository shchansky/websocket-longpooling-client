import React, { useState, useEffect } from "react";
import axios from "axios";

type Message = {
  id: string | number;
  message: string;
};

export const EventSourcing = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState("");

  const subscribe = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/get-message");
      setMessages((prev) => [data, ...prev]);
      await subscribe();
    } catch (e) {
      setTimeout(() => {
        subscribe();
      }, 500);
    }
  };

  const sendMessage = async () => {
    await axios.post("http://localhost:5000/new-message", {
      message: value,
      id: Date.now(),
    });
  };

  useEffect(() => {
    subscribe();
  }, []);

  return (
    <div>
      <div className="form">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
        />
        <button
          onClick={() => {
            sendMessage();
            setValue("");
          }}
        >
          Отправить
        </button>
      </div>

      <div className="messages">
        {messages.map((mess) => (
          <div className="message" key={mess.id}>
            {mess.message}
          </div>
        ))}
      </div>
    </div>
  );
};
