import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useChat } from "../context/ChatContext";
import Header from './components/Header'
import PromptCard from "./components/PromptCard";
import ChatView from "./components/ChatView";
import ChatInput from "./components/ChatInput";
import ChatSessions from './components/ChatSessions'

const ChatScreen = () => {
    const { backendSocket, prompts, chatMessages } = useChat();

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <ChatSessions />
                <View style={{ width: "85%", paddingLeft: 10 }}>
                    <Header title="Marketing" />

                    {chatMessages.length == 0 &&
                        <View>
                            <Text style={styles.title}>You can ask</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promptContainer}>
                                {prompts.map((prompt) => (
                                    <PromptCard key={prompt.id} prompt={prompt} />
                                ))}
                            </ScrollView>
                        </View>
                    }
                    <ChatView messages={chatMessages} />

                    <ChatInput />

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 14,
        fontWeight: 'light',
        color: "#FFF",
        marginTop: 16,
    },
    promptContainer: {
        marginTop: 10,
        paddingBottom: 10,
    },
});

export default ChatScreen;
