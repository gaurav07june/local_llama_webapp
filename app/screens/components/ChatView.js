import React, { useEffect, useRef } from "react";
import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useChat } from "../../context/ChatContext"
import Copy from '../../svgs/Copy'
import ThumbsUp from '../../svgs/ThumbsUp'
import ThubsDown from '../../svgs/ThumbsDown'
import Edit from '../../svgs/Edit'


const ChatView = () => {

    const flatListRef = useRef(null);

    const { isLoading, chatMessages } = useChat();

    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [chatMessages]);

    const _renderItem = ({ item, index }) => {
        return (
            <View>
                <View style={item.is_boat_reply == "no" ? styles.userMessage : styles.aiMessage}>
                    <Text style={styles.text}>{item.message}</Text>
                    {item.is_boat_reply == "yes" &&
                        <View style={styles.iconsContainer}>
                            <Edit width={14} height={14} color="#808080" />
                            {/* <FontAwesome name="edit" size={15} color="#808080" /> */}
                            <View style={styles.spacer} />
                            <ThubsDown width={14} height={14} color="#808080" />
                            {/* <SimpleLineIcons name="dislike" size={15} color="#808080" /> */}
                            <View style={styles.spacer} />
                            <ThumbsUp width={14} height={14} color="#808080" />
                            {/* <SimpleLineIcons name="like" size={15} color="#808080" /> */}
                            <View style={styles.spacer} />
                            <Edit width={14} height={14} color="#808080" />
                            {/* <Feather name="copy" size={15} color="#808080" /> */}


                        </View>
                    }

                </View >
                {(isLoading && index == chatMessages.length - 1) && < Text style={styles.loaderText}>Agent Working...</Text>}
            </View>

        )
    }

    return (

        <FlatList
            ref={flatListRef}
            data={chatMessages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderItem}
            contentContainerStyle={{ paddingBottom: 200 }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    userMessage: {
        backgroundColor: "#f4f4f4",
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
        color: "#000000",
    },
    iconsContainer: {
        flexDirection: 'row-reverse',
        marginTop: 5,
        alignItems: 'center',
    },
    spacer: {
        width: 10
    },
    loaderText: {
        fontWeight: "thin",
        color: "black",
        fontSize: 13,
        padding: 10,

    }
});

export default ChatView;
