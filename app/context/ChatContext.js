import React, { createContext, useState, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { createNewChatSession, deleteAllSession, getAllChatSessions, saveMessageToThread, getMessagesForThread } from '../util/ChatStoreHelper'

const BackendServerUrl = 'https://dev-ws-subscription.kogo.ai';
const RelayServerUrl = "https://kogollmrelaysocket.parikshithv.in";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [prompts] = useState([
        { id: 1, header: "Show me market analysis of the power sector in metros", subHeader: "Send Prompt" },
        { id: 2, header: "Show me renewable energy growth analysis", subHeader: "Send Prompt" },
        { id: 3, header: "What are the current trends in EV market?", subHeader: "Send Prompt" },
        { id: 4, header: "Analyze stock trends of energy companies", subHeader: "Send Prompt" },
    ]);

    const [chatSessions, setChatSessions] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [backendSocket, setBackendSocket] = useState(null);
    const [relayServerSocket, setRelayServerSocket] = useState(null)

    var shouldCreateNewSession = false


    useEffect(() => {
        shouldCreateNewSession = true

        const newBackendSocket = io(BackendServerUrl, { transports: ['websocket'], });
        // const newRelayServerSocket = io(RelayServerUrl)

        newBackendSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
            joinChatRoom(newBackendSocket)
        });

        newBackendSocket.on('message', (msg) => {
            // console.log("msg received ", JSON.stringify(msg))
            console.log("should create new session ", shouldCreateNewSession)
            if (shouldCreateNewSession) {
                _createNewChatSession(msg)
            } else {
                _storeMesssage(msg.thread_id, msg)
            }
            if (msg.is_boat_reply == "yes") {

                setChatMessages((prev) => [...prev, msg]);
            }
        });

        newBackendSocket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        setBackendSocket(newBackendSocket);

        _fetchChatSessions()

        // newRelayServerSocket.on('connect', () => {
        //     console.log('Connected to Relayserver server');
        //     newRelayServerSocket.on("roomId", (roomId) => {
        //         console.log("Received room ID:", roomId);

        //         // Store the room ID for future use
        //         // For example, you can use it in your API requests
        //     });
        // });

        // newRelayServerSocket.on('disconnect', () => {
        //     console.log('Disconnected from relay server');
        // });

        // setRelayServerSocket(newRelayServerSocket)

        return () => {
            newBackendSocket.disconnect();
            // newRelayServerSocket.disconnect()
        };
    }, []);

    const _fetchChatSessions = async () => {
        console.log('fetching all chat sesions')
        const sessions = await getAllChatSessions();
        console.log("all sessions ", JSON.stringify(sessions))
        setChatSessions(sessions);
    };

    const _createNewChatSession = async (msgData) => {
        try {
            console.log('creating new chat session with thread id ', msgData.thread_id)
            const threadId = await createNewChatSession(msgData.thread_id);
            console.log("chat session created with thread id ", threadId)
            shouldCreateNewSession = false
            await _storeMesssage(threadId, msgData)
            await _fetchChatSessions()
        } catch (error) {

        }
    }

    const _storeMesssage = async (thread_id, message) => {
        try {
            console.log("storing messga to thread ", thread_id)
            let data = await saveMessageToThread(thread_id, message)
        } catch (error) {

        }
    }

    const removeAllSessions = async () => {
        try {
            await deleteAllSession()
            _fetchChatSessions()
        } catch (error) {
            console.log("Error deleting all sessions")
        }
    }

    const retrieveTheadChat = async (threadId) => {
        try {
            let msgData = await getMessagesForThread(threadId)
            setChatMessages(msgData)
        } catch (error) {

        }
    }

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
        setChatMessages((prev) => [...prev, { is_boat_reply: "no", message: msgTxt }]);

        const messagePayload = {
            message: msgTxt,
            callback: (err) => () => {
                console.log("chat_new error", err);
            },
            sender: "parikshit",
            guest_sender: "kogo",
            guest_name: "Bharat Mobility",
            thread_id: chatMessages.length > 1 ? chatMessages[1].thread_id : "",
            deployment_id: "6772400f68158be76262b2a3",
            kogo_swarm_id: null,
        };
        console.log("Sending message:", messagePayload);
        backendSocket.emit("chat_kogoos", messagePayload, (response) => {
            console.log("chat_kogoos response:", response);

        });
    };


    return (
        <ChatContext.Provider value={{ backendSocket, prompts, chatMessages, sendMessage, chatSessions, removeAllSessions, retrieveTheadChat }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
