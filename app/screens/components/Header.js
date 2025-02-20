import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ title }) => {
    return (
        <View style={styles.header}>
            <Ionicons name="megaphone" size={20} color="white" />
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
    },
    title: {
        fontSize: 20,
        color: "white",
        marginLeft: 10,
    },
});

export default Header;
