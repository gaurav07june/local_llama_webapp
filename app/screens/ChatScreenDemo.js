import { Ionicons } from "@expo/vector-icons"

import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import colors from '../utills/colors'
import LeftPage from './components/LeftPage'
import { useRef, useState } from "react";







const ChatScreenDemo = () => {
    const [isLeftBtn, setIsLeftBtn] = useState(true);
    const flatListRef = useRef(null);
    const [massageData, setMassageData] = useState([])

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
            massageData: [{
                id: '1',
                massage: 'massage 1 1',
            },
            {
                id: '2',
                massage: 'massage1 2',
            }
            ]
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
            massageData: [{
                id: '1',
                massage: 'massage 2 1',
            },
            {
                id: '2',
                massage: 'massage 2 2',
            }
            ]
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
            massageData: [{
                id: '1',
                massage: 'massage 3 1',
            },
            {
                id: '2',
                massage: 'massage 3 2',
            }
            ]
        },
    ];
    const handleLeftBtn = () => {
        setIsLeftBtn(!isLeftBtn)
    }
    const _onLeftPageSelectedListItem = (item) => {

        if (item.massageData) {
            setMassageData(item.massageData)
        }

    }
    const _renderItem = ({ item, index }) => {
        return (
            <View style={styles.listCardUpper}>
                <View
                    style={styles.listCard}>
                    <Text>{item.massage}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={{
            flex: 1,
            flexDirection: "row"
        }}>

            {isLeftBtn ?
                <View style={{ flex: .30 }}>
                    <LeftPage
                        handleLeftBtn={() => handleLeftBtn()}
                        onSelectedListItem={(data) => _onLeftPageSelectedListItem(data)}
                    />
                </View>
                : null
            }
            <View style={{
                flex: isLeftBtn ? .70 : 1,
                backgroundColor: "#EA8529",
                flexDirection: "row"
            }} >
                <Text>Right Page </Text>
                <TouchableOpacity onPress={() => handleLeftBtn()}>
                    <Ionicons name="send" size={24} color="black" />
                </TouchableOpacity>
                <FlatList
                    ref={flatListRef}
                    data={massageData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={_renderItem}
                    contentContainerStyle={{ paddingBottom: 10 }}
                />
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    listCardUpper: {
        marginHorizontal: 5,
        marginTop: 5,
    },
    listCard: {
        maxWidth: 150,
        backgroundColor: "#EBEBEB",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
        marginTop: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',

        // marginRight: 5,
        //justifyContent: "space-between",
    },

})
export default ChatScreenDemo;