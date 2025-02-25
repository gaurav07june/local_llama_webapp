import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useChat } from "../../context/ChatContext";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import CircleSolid from '../../svgs/CircleSolid'
import PaperClip from '../../svgs/PaperClip'

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
                    {/* <Feather name="paperclip" size={24} color="gray" /> */}
                    <PaperClip width={20} height={20} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={message?.length == 0 ? true : false}
                    onPress={handleSend}>
                    <CircleSolid width={30} height={30} color={message?.length > 0 ? "black" : "gray"} />
                    {/* <FontAwesome5 name="arrow-circle-up" size={24} color={message?.length > 0 ? "black" : "gray"} /> */}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#f4f4f4",
        marginBottom: 30
    },
    input: {
        width: '100%',
        height: 40,
        textAlignVertical: 'bottom',
    },
    inputFocused: {
        backgroundColor: "transparent",
        borderColor: '#f4f4f4',
    },
    inputUnfocused: {
        backgroundColor: "#f4f4f4",
        borderColor: "#f4f4f4",
    },
});

export default ChatInput;
