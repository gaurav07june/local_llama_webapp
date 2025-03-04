import React, { useRef } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useChat } from "../../context/ChatContext";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import SquareMinimize from '../../svgs/SquareMinimize'
import SquareMaximize from '../../svgs/SquareMaximize'
import Plus from '../../svgs/Plus'
import Trash from '../../svgs/Trash'

const ChatSessions = ({
    handleLeftBtn, isLeftBtn, selectedIndex, onUpdatIndex
}) => {

    const { removeAllSessions, chatSessions, retrieveTheadChat, deleteThread, onCreateNewThread } = useChat();

    const _deleteAllSessions = async () => {
        try {
            await removeAllSessions()
        } catch (error) {

        }
    }
    const _onThreadClick = (threadId, index) => {
        console.log("fetching thread id ", threadId)
        retrieveTheadChat(threadId)
        onUpdatIndex(index)
    }

    const _onTheadDelete = (threadId) => {
        console.log('deleting thread ', threadId)
        deleteThread(threadId)
    }
    const onCreateNewMassage = () => {
        onCreateNewThread()
        onUpdatIndex(-1)
    }

    const _renderItem = ({ item, index }) => {
        return (
            <View style={styles.listCard} >
                <TouchableOpacity
                    style={{ flex: .80, alignItems: 'flex-start' }}
                    onPress={() => _onThreadClick(item.thread_id, index)}>
                    <Text style={{ color: selectedIndex == index ? "#ea3389" : "#aaaaaa" }}
                        numberOfLines={1}>
                        {item.msgData[0]?.thread_title}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: .20, alignItems: 'flex-end' }}
                    onPress={() => _onTheadDelete(item.thread_id)}>
                    <Trash width={12} height={12} color="gray" />
                    {/* <EvilIcons name="trash" size={18} color="black" /> */}
                </TouchableOpacity>


            </View>

        )
    }

    return (
        <View style={{
            flex: 1,
            paddingVertical: 12,
            paddingHorizontal: 12,
            backgroundColor: AppColor.appbgcolor,
            borderRightWidth: 3,
            borderRightColor: AppColor.border
        }} >
            <TouchableOpacity
                style={{
                    marginBottom: 12
                }}
                onPress={() => handleLeftBtn()}>
                {isLeftBtn ?
                    <SquareMinimize width={24} height={24} color="black" /> :
                    // <Octicons name="sidebar-expand" size={24} color="black" />
                    <SquareMaximize width={24} height={24} color="black" />
                    // : <Octicons name="sidebar-collapse" size={24} color="black" />
                }
            </TouchableOpacity>
            {isLeftBtn ?
                <>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',

                    }}>
                        <TouchableOpacity
                            onPress={() => onCreateNewMassage()}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: 'center',

                            }}>
                                <Plus width={18} height={18} color="black" />
                                {/* <Ionicons name="add" size={20} color="black" /> */}

                                <View style={{ width: 6 }} />
                                <Text style={styles.listHeader}>
                                    New Chat
                                </Text>


                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => _deleteAllSessions()}>
                            <Trash width={20} height={20} color="black" />
                            {/* <EvilIcons name="trash" size={24} color="black" /> */}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 12 }} />
                    <FlatList

                        data={chatSessions}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={_renderItem}
                    // contentContainerStyle={{ paddingBottom: 10 }} 
                    />
                </>

                : null
            }

            <Text style={{ fontSize: 12, color: 'gray', fontWeight: "thin" }}>
                Version : 0.0.1
            </Text>
        </View>

    )
}
const styles = StyleSheet.create({

    listCard: {
        flex: 1,
        flexDirection: 'row',
        maxWidth: 500,
        // paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',

        // marginRight: 5,

    },
    listHeader: {
        color: "black",
        fontSize: 14,
        fontWeight: "bold",
        alignSelf: 'center'
    }

})

const AppColor = {
    appbgcolor: "#ffffff",
    border: "#dae2ee"
}

export default ChatSessions;
