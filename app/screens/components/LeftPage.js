import { Ionicons } from "@expo/vector-icons"
import { useRef } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"


const LeftPage = ({ handleLeftBtn, onSelectedListItem }) => {

    const flatListRef = useRef(null);
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

    const _renderItem = ({ item, index }) => {
        return (
            <View style={styles.listCardUpper}>
                <TouchableOpacity onPress={() => onSelectedListItem(item)}
                    style={styles.listCard}>
                    <Text numberOfLines={1}
                        style={{}}>{item.title}</Text>
                </TouchableOpacity>


            </View>

        )
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#55C1FF",
        }} >
            <View style={{
                backgroundColor: "#55C1FF",
                flexDirection: "row"

            }} >
                <Text>Left</Text>
                <TouchableOpacity onPress={() => handleLeftBtn()}>
                    <Ionicons name="send" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <FlatList
                ref={flatListRef}
                data={DATA}
                keyExtractor={(item, index) => index.toString()}
                renderItem={_renderItem}
                contentContainerStyle={{ paddingBottom: 10 }}
            />
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

export default LeftPage;
