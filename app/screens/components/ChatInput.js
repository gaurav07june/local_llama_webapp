import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
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
        setMessage("");
        sendMessage(message);

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
                marginTop: 6,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>

                <TouchableOpacity
                    onPress={handleSend}>
                    <CircleSolid width={30} height={30} color={message?.length > 0 ? "black" : "gray"} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { }}>
                    <PaperClip width={20} height={20} color="gray" />
                </TouchableOpacity>



            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#f4f4f4",
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
