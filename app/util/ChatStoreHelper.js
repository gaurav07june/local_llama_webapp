import AsyncStorage from "@react-native-async-storage/async-storage";

export const createNewChatSession = async (thread_id) => {
    try {

        const storedSessions = await AsyncStorage.getItem("chat_sessions");
        const chatSessions = storedSessions ? JSON.parse(storedSessions) : [];

        const newSession = { thread_id, msgData: [] };
        chatSessions.unshift(newSession);

        await AsyncStorage.setItem("chat_sessions", JSON.stringify(chatSessions));

        return thread_id;
    } catch (error) {
        console.error("Error creating new chat session", error);
    }
};

export const getAllChatSessions = async () => {
    try {
        const storedSessions = await AsyncStorage.getItem("chat_sessions");
        return storedSessions ? JSON.parse(storedSessions) : [];
    } catch (error) {
        console.error("Error fetching chat sessions", error);
    }
};

export const saveMessageToThread = async (thread_id, message) => {
    try {

        const storedSessions = await AsyncStorage.getItem("chat_sessions");
        let chatSessions = storedSessions ? JSON.parse(storedSessions) : [];

        const sessionIndex = chatSessions.findIndex(session => session.thread_id === thread_id);
        // console.log("session index", sessionIndex)
        // console.log("dat to be pushed to ", JSON.stringify(chatSessions[sessionIndex]))

        if (sessionIndex !== -1) {
            chatSessions[sessionIndex].msgData.push(message);
            await AsyncStorage.setItem("chat_sessions", JSON.stringify(chatSessions));
        }
    } catch (error) {
        console.error("Error saving message", error);
    }
};

export const getMessagesForThread = async (thread_id) => {
    try {
        const storedSessions = await AsyncStorage.getItem("chat_sessions");
        const chatSessions = storedSessions ? JSON.parse(storedSessions) : [];

        const chatSession = chatSessions.find(session => session.thread_id === thread_id);
        return chatSession ? chatSession.msgData : [];
    } catch (error) {
        console.error("Error loading messages", error);
    }
};

export const deleteAllSession = async () => {
    try {
        await AsyncStorage.removeItem("chat_sessions")
    } catch (error) {
        console.log("Error deleteing sessions")
    }
}

export const deleteThreadChats = async (threadId) => {
    try {
        const storedSessions = await AsyncStorage.getItem("chat_sessions");
        let chatSessions = storedSessions ? JSON.parse(storedSessions) : [];

        const sessionIndex = chatSessions.findIndex(session => session.thread_id === threadId);
        console.log("session index", sessionIndex)
        console.log("thread to be deleted ", JSON.stringify(chatSessions[sessionIndex]))

        if (sessionIndex !== -1) {
            chatSessions.splice(sessionIndex, 1);
            await AsyncStorage.setItem("chat_sessions", JSON.stringify(chatSessions));
        }
    } catch (error) {

    }
}