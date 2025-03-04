import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import AntDesign from '@expo/vector-icons/AntDesign';
import MagicWand from '../../svgs/MaginWand'


const Header = ({ title }) => {
    return (
        <View style={styles.header}>
            {/* <AntDesign name="home" size={24} color="black" /> */}
            <MagicWand width={22} height={22} color='black' />
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
        color: "black",
        marginLeft: 10,
    },
});

export default Header;
