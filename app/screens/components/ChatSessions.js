import { useChat } from "@/app/context/ChatContext"
import React from "react"
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'

const ChatSessions = () => {

    const { removeAllSessions, chatSessions } = useChat()

    const _deleteAllSessions = async () => {
        try {
            await removeAllSessions()
        } catch (error) {

        }
    }

    const _renderItem = ({ item }) => {
        return (
            <TouchableOpacity>
                <Text style={styles.title}>
                    hellow
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.heading}>
                    Chat history
                </Text>
                <TouchableOpacity onPress={_deleteAllSessions} style={styles.deleteBtn}>
                    <Text style={styles.deletetext}>
                        Delete
                    </Text>
                </TouchableOpacity>
            </View>


            <FlatList
                renderItem={_renderItem}
                data={chatSessions}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 10 }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "15%",
        paddingVertical: 10,
        borderWidth: 1,
        borderRightColor: 'gray'
    },
    heading: {
        fontWeight: "heavy",
        color: 'white',
        fontSize: 18,

    },
    title: {
        fontWeight: "light",
        color: 'white',
        fontSize: 15,
        paddingVertical: 10
    },
    deletetext: {
        fontWeight: "bold",
        color: 'red',
        fontSize: 13,
    },
    deleteBtn: {
        padding: 10
    }
})

export default ChatSessions