import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useChat } from "../../context/ChatContext";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';

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
            <View style={{
                // width: '100%',
                marginTop: 6,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <TouchableOpacity
                    disabled={true}
                    onPress={() => { }}>
                    <Feather name="paperclip" size={24} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity

                    onPress={handleSend}>
                    <FontAwesome5 name="arrow-circle-up" size={24} color={message?.length > 0 ? "black" : "gray"} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        //justifyContent: "flex-end", // Align the TextInput at the bottom
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#f4f4f4",
    },
    input: {
        //flex: 1, // Make the TextInput take up all available space
        width: '100%', // Ensure it spans the full width
        height: 40, // Set the height, or use flex if needed for dynamic height
        textAlignVertical: 'bottom',
        // borderWidth: 1, // Set border width for visibility
        // borderColor: 'red'

    },
    inputFocused: {
        backgroundColor: "#f4f4f4",  // Transparent background when focused
        borderColor: '#f4f4f4', // Set red border when focused
    },
    inputUnfocused: {
        backgroundColor: "#f4f4f4", // White background when not focused
        borderColor: "#f4f4f4",  // Light gray border when not focused
    },
});

export default ChatInput;
