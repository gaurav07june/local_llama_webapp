import React, { useEffect, useRef } from "react";
import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useChat } from "@/app/context/ChatContext";

const ChatView = ({ messages }) => {

    const flatListRef = useRef(null);

    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const _renderItem = ({ item, index }) => {
        return (
            <View style={item.isUserChat ? styles.userMessage : styles.aiMessage}>
                <Text style={styles.text}>{item.message}</Text>
                {!item.isUserChat &&
                    <View style={styles.iconsContainer}>
                        <FontAwesome name="edit" size={15} color="#808080" />
                        <View style={styles.spacer} />
                        <SimpleLineIcons name="dislike" size={15} color="#808080" />
                        <View style={styles.spacer} />
                        <SimpleLineIcons name="like" size={15} color="#808080" />
                        <View style={styles.spacer} />
                        <Feather name="copy" size={15} color="#808080" />


                    </View>
                }
            </View>
        )
    }

    return (

        <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderItem}
            contentContainerStyle={{ paddingBottom: 10 }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    userMessage: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 10,
        marginBottom: 5,
        alignSelf: "flex-end",
    },
    aiMessage: {
        padding: 10,
        marginBottom: 5,
        alignSelf: "flex-start",
    },
    text: {
        color: "white",
    },
    iconsContainer: {
        flexDirection: 'row-reverse',
        marginTop: 5,
        alignItems: 'center',
    },
    spacer: {
        width: 10
    }
});

export default ChatView;
