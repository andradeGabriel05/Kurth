import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import "./style.scss";
import { BASE_URL } from "../../utils/system";
import { Client } from "@stomp/stompjs";
import { MessageDTO } from "../../models/message";

//https://medium.com/@deshanipalliyaguruge2000/sending-broadcast-notifications-with-websocket-spring-boot-react-stomp-and-sockjs-50d99352c5bb
export default function Message() {
  const [message, setMessage] = useState<MessageDTO[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const clientRef = useRef<Client | null>(null);
  useEffect(() => {
    const socket = new SockJS(`${BASE_URL}/websocket`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => {
        console.log("STOMP: " + str);
      },
      onConnect: () => {
        console.log("Connected to WebSocket");
        client.subscribe("/topic/public", (response) => {
          const body: MessageDTO = JSON.parse(response.body);
          setMessage((prevMessages) => [...prevMessages, body]);
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error: " + error);
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
      },
    });

    client.activate();
    clientRef.current = client;
    console.log("Message component mounted");
    return () => {
      client.deactivate();
    };
  }, []);

  const id: string = localStorage.getItem("user_id") || "";
  function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const client = clientRef.current;
    if (client && client.connected) {
      client.publish({
        destination: "/app/chat.send",
        body: JSON.stringify({
          message: inputMessage,
          sentByUser: {
            id: id,
          },
          sentToUser: {
            id: "b7801ae5-debf-4243-bb03-1d0b53293bb1",
          },
        }),
      });
      console.log(
        "Message sent:",
        JSON.stringify({
          message: inputMessage,
          sentByUser: {
            id: id,
          },
          sentToUser: {
            id: "b7801ae5-debf-4243-bb03-1d0b53293bb1",
          },
        })
      );
      setInputMessage("");
    } else {
      console.error("WebSocket is not connected");
    }
  }

  return (
    <div className="message-container">
      <input
        type="text"
        placeholder="message"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      {message.map((msg, index) => (
        <div key={index} className="message">
          {msg.sentByUser.id === id ? (
            <p className="sent-message">eu: {msg.message}</p>
          ) : (
            <p className="received-message">outro: {msg.message}</p>
          )}
        </div>
      ))}
    </div>
  );
}
