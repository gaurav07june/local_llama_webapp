import React, { createContext, useState, useContext, useEffect } from "react";
import { io } from "socket.io-client";

const BackendServerUrl = 'https://dev-ws-subscription.kogo.ai';
const RelayServerUrl = "https://kogollmrelaysocket.parikshithv.in";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [prompts] = useState([
        { id: 1, header: "Show me market analysis of the power sector in metros", subHeader: "Send Prompt" },
        { id: 2, header: "Show me renewable energy growth analysis", subHeader: "Send Prompt" },
        // { id: 3, header: "What are the current trends in EV market?", subHeader: "Send Prompt" },
        // { id: 4, header: "Analyze stock trends of energy companies", subHeader: "Send Prompt" },
    ]);

    const [chatMessages, setChatMessages] = useState([]);
    const [backendSocket, setBackendSocket] = useState(null);
    const [relayServerSocket, setRelayServerSocket] = useState(null)


    useEffect(() => {
        const newBackendSocket = io(BackendServerUrl, { transports: ['websocket'], });
        const newRelayServerSocket = io(RelayServerUrl)

        newBackendSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
            joinChatRoom(newBackendSocket)
        });

        newBackendSocket.on('message', (msg) => {
            console.log("msg received ", JSON.stringify(msg))
            if (msg.is_boat_reply == "yes") {
                setChatMessages((prev) => [...prev, { isUserChat: false, message: msg.message }]);
            }
        });

        newBackendSocket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        setBackendSocket(newBackendSocket);

        newRelayServerSocket.on('connect', () => {
            console.log('Connected to Relayserver server');
            newRelayServerSocket.on("roomId", (roomId) => {
                console.log("Received room ID:", roomId);

                // Store the room ID for future use
                // For example, you can use it in your API requests
            });
        });

        newRelayServerSocket.on('disconnect', () => {
            console.log('Disconnected from relay server');
        });

        setRelayServerSocket(newRelayServerSocket)

        return () => {
            newBackendSocket.disconnect();
            newRelayServerSocket.disconnect()
        };
    }, []);

    const joinChatRoom = (newBackendSocket) => {
        console.log("joining chat room");
        newBackendSocket.emit("join_kogoos", {
            guest_sender: "bharat_mobility",
            sender: null,
            reciever: null,
        }, (response) => {
            console.log("join_kogoos response:", response);
        }
        );
    };

    const sendMessage = (msgTxt) => {

        if (msgTxt.trim().length === 0) return;
        if (!backendSocket) return
        setChatMessages((prev) => [...prev, { isUserChat: true, message: msgTxt }]);

        const messagePayload = {
            message: msgTxt,
            callback: (err) => () => {
                console.log("chat_new error", err);
            },
            sender: "parikshit",
            guest_sender: "kogo",
            guest_name: "Bharat Mobility",
            thread_id: "",
            deployment_id: "6772400f68158be76262b2a3",
            kogo_swarm_id: null,
        };
        console.log("Sending message:", messagePayload);
        backendSocket.emit("chat_kogoos", messagePayload, (response) => {
            console.log("chat_kogoos response:", response);

        });
    };


    return (
        <ChatContext.Provider value={{ backendSocket, prompts, chatMessages, sendMessage }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
