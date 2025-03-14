import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ArrowUp from '../../svgs/ArrowUp'
// import AntDesign from '@expo/vector-icons/AntDesign';

const PromptCard = ({ prompt, handleSend }) => {
    return (
        <TouchableOpacity onPress={() => handleSend(prompt)} style={styles.card}>
            <Text style={styles.header}>{prompt.header}</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Text style={styles.subHeader}>{prompt.subHeader}</Text>
                <ArrowUp width={12} height={12} color='gray' />
                {/* <AntDesign name="arrowup" size={12} color="gray" /> */}

            </View>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 200,
        height: 100,
        backgroundColor: "#f4f4f4",
        borderRadius: 12,
        padding: 10,
        marginRight: 10,
        justifyContent: "space-between",
    },
    header: {
        color: "black",
        fontSize: 14,
        fontWeight: "medium",
    },
    subHeader: {
        color: "gray",
        fontSize: 14,
    },
});

export default PromptCard;
