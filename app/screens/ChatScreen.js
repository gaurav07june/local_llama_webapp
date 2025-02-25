import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useChat } from "../context/ChatContext";
import Header from './components/Header'
import PromptCard from "./components/PromptCard";
import ChatView from "./components/ChatView";
import ChatInput from "./components/ChatInput";
import ChatSessions from './components/ChatSessions'
//import LeftPage from './components/LeftPage'

const ChatScreen = () => {
    // hook
    const { backendSocket, prompts, chatMessages, sendMessage, isLoading } = useChat();

    const [isLeftBtn, setIsLeftBtn] = useState(true);
    const [selectedIndex, SetSelectedIndex] = useState(-1);


    const handleLeftBtn = () => {
        setIsLeftBtn(!isLeftBtn)
    }
    const _onUpdatIndex = (index) => {
        SetSelectedIndex(index)
    }

    const _handleSend = (data) => {
        if (data?.header) {
            sendMessage(data?.header);
        }

    };


    return (
        <View style={styles.container}>
            <View style={{ flex: isLeftBtn ? .30 : .035 }}>
                <ChatSessions
                    isLeftBtn={isLeftBtn}
                    selectedIndex={selectedIndex}
                    onUpdatIndex={(data) => _onUpdatIndex(data)}
                    handleLeftBtn={() => handleLeftBtn()} />
            </View>
            <View style={{
                flex: isLeftBtn ? .70 : .965,
                backgroundColor: "#ffffff",
                paddingHorizontal: 16,
            }}>

                <View style={{ flex: 1 }}>
                    <Header title="Real Estate Enquiry" />

                    {chatMessages.length == 0 &&
                        <View>
                            <Text style={styles.title}>Any queries related to your current or future real estate plans, ask.</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promptContainer}>
                                {prompts.map((prompt) => (
                                    <PromptCard key={prompt.id}
                                        handleSend={(data) => _handleSend(data)}
                                        prompt={prompt} />
                                ))}
                            </ScrollView>
                        </View>
                    }
                    <ChatView />

                </View>
                <ChatInput />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        //paddingHorizontal: 16,
        flexDirection: "row",
    },
    title: {
        fontSize: 14,
        fontWeight: 'light',
        color: "#000",
        marginTop: 16,
    },
    promptContainer: {
        marginTop: 10,
        paddingBottom: 10,
    },
});

export default ChatScreen;
