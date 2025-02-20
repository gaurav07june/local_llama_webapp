import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useChat } from "../../context/ChatContext";

const ChatInput = () => {
    const [message, setMessage] = useState("");
    const { sendMessage } = useChat();

    const handleSend = () => {
        sendMessage(message);
        setMessage("");
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Ask KOGO or @mention an agent"
                placeholderTextColor="gray"
                value={message}
                onChangeText={setMessage}
                multiline
                returnKeyType="send"
                onSubmitEditing={handleSend}
            />
            <TouchableOpacity onPress={handleSend}>
                <Ionicons name="send" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#333",
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
    input: {
        flex: 1,
        color: "white",
        paddingHorizontal: 10,
    },
});

export default ChatInput;
