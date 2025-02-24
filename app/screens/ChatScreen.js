import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useChat } from "../context/ChatContext";
import Header from './components/Header'
import PromptCard from "./components/PromptCard";
import ChatView from "./components/ChatView";
import ChatInput from "./components/ChatInput";
import LeftPage from "./components/LeftPage";

const ChatScreen = () => {
    const { backendSocket, prompts, chatMessages } = useChat();
    const [isLeftBtn, setIsLeftBtn] = useState(true);
    const [massageData, setMassageData] = useState([])

    // hook 
    const { sendMessage } = useChat();

    const handleLeftBtn = () => {
        setIsLeftBtn(!isLeftBtn)
    }
    const _onLeftPageSelectedListItem = (item) => {
        if (item.massageData) {
            setMassageData(item.massageData)
        }
    }
    const _handleSend = (data) => {
        if (data?.header) {
            sendMessage(data?.header);
        }

    };



    return (
        <View style={styles.container}>
            <View style={{ flex: isLeftBtn ? .30 : .035 }}>
                <LeftPage
                    isLeftBtn={isLeftBtn}
                    handleLeftBtn={() => handleLeftBtn()}
                    onSelectedListItem={(data) => _onLeftPageSelectedListItem(data)} />
            </View>
            <View style={{
                flex: isLeftBtn ? .70 : .965,
                backgroundColor: "#ffffff",
                paddingHorizontal: 16,
            }} >
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

                    <ChatView messages={chatMessages} />

                </View>
                <ChatInput />
                <View style={{ height: 20 }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        //  paddingHorizontal: 16,
        flexDirection: "row",

    },
    title: {
        fontSize: 14,
        fontWeight: 'light',
        color: "#000000",
        marginTop: 16,
    },
    promptContainer: {
        marginTop: 10,
        paddingBottom: 10,
    },
});
const AppColor = {
    appbgcolor: "#ffffff",
    border: "#dae2ee",
    textColor: "#000000"
}

export default ChatScreen;
