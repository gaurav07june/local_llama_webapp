import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { createNewChatSession, deleteAllSession, getAllChatSessions, saveMessageToThread, getMessagesForThread, deleteThreadChats } from '../util/ChatStoreHelper'

const BackendServerUrl = 'https://dev-ws-subscription.kogo.ai';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [prompts] = useState([
        { id: 1, header: "Show me market analysis of the power sector in metros", subHeader: "Send Prompt" },
        { id: 2, header: "Show me renewable energy growth analysis", subHeader: "Send Prompt" },
        // { id: 3, header: "What are the current trends in EV market?", subHeader: "Send Prompt" },
        // { id: 4, header: "Analyze stock trends of energy companies", subHeader: "Send Prompt" },
    ]);

    const [chatSessions, setChatSessions] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [backendSocket, setBackendSocket] = useState(null);

    const [isLoading, setIsLoading] = useState(false)

    let shouldCreateNewSession = useRef(false)
    let roomIdRef = useRef("kogo_room_id")

    useEffect(() => {

        window.addEventListener("message", (event) => {
            if (event.data?.roomId) {
                roomIdRef.current = event.data.roomId
                console.log("Received Room ID:", roomIdRef.current);
            }
        });
        shouldCreateNewSession.current = true

        const newBackendSocket = io(BackendServerUrl, { transports: ['websocket'], });

        newBackendSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
            joinChatRoom(newBackendSocket)
        });

        newBackendSocket.on('message', (msg) => {
            console.log("msg received ", JSON.stringify(msg))
            console.log("should create new session ", shouldCreateNewSession.current)
            if (shouldCreateNewSession.current) {
                _createNewChatSession(msg)
            } else {
                _storeMesssage(msg.thread_id, msg)
            }
            if (msg.is_boat_reply == "yes") {
                setIsLoading(false)
                setChatMessages((prev) => [...prev, msg]);
            }

        });

        newBackendSocket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        setBackendSocket(newBackendSocket);

        _fetchChatSessions()

        return () => {
            newBackendSocket.disconnect();
        };
    }, []);

    const _fetchChatSessions = async () => {
        // console.log('fetching all chat sesions')
        const sessions = await getAllChatSessions();
        // console.log("all sessions ", JSON.stringify(sessions))
        setChatSessions(sessions);
    };

    const _createNewChatSession = async (msgData) => {
        try {
            console.log('creating new chat session with thread id ', msgData.thread_id)
            const threadId = await createNewChatSession(msgData.thread_id);
            console.log("chat session created with thread id ", threadId)
            shouldCreateNewSession.current = false
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

    const deleteThread = async (threadId) => {
        try {
            await deleteThreadChats(threadId)
            _fetchChatSessions()
        } catch (error) {

        }
    }

    const onCreateNewThread = () => {
        shouldCreateNewSession.current = true
        console.log("shold create new s ", shouldCreateNewSession.current)
        setChatMessages([])
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
        if (!backendSocket) return;

        setChatMessages((prev) => [...prev, { is_boat_reply: "no", message: msgTxt }]);
        setIsLoading(true)


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
            app_room_id: roomIdRef.current
        };
        console.log("Sending message:", messagePayload);
        backendSocket.emit("chat_kogoos", messagePayload, (response) => {
            console.log("chat_kogoos response:", response);
        });
    };


    return (
        <ChatContext.Provider value={{
            backendSocket, prompts, chatMessages, sendMessage,
            chatSessions, removeAllSessions, retrieveTheadChat,
            deleteThread, onCreateNewThread, isLoading
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
