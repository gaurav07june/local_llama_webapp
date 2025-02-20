import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PromptCard = ({ prompt }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.header}>{prompt.header}</Text>
            <Text style={styles.subHeader}>{prompt.subHeader}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 200,
        height: 100,
        backgroundColor: "#333",
        borderRadius: 12,
        padding: 10,
        marginRight: 10,
        justifyContent: "space-between",
    },
    header: {
        color: "white",
        fontSize: 14,
        fontWeight: "medium",
    },
    subHeader: {
        color: "gray",
        fontSize: 14,
    },
});

export default PromptCard;
