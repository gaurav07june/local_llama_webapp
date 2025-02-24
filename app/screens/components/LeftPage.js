
import { useRef } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const LeftPage = ({
    handleLeftBtn, onSelectedListItem,
    isLeftBtn
}) => {

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
    const onCreateNewMassage = () => {

    }
    const onShareDelete = () => {

    }
    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => onSelectedListItem(item)}
                style={styles.listCard}>
                <Text numberOfLines={1}
                    style={{}}>{item.title}</Text>
            </TouchableOpacity>
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
                    <Octicons name="sidebar-expand" size={24} color="black" />
                    : <Octicons name="sidebar-collapse" size={24} color="black" />
                }
            </TouchableOpacity>
            {isLeftBtn ?
                <>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: 'center',

                        }}>
                            <TouchableOpacity
                                onPress={() => onCreateNewMassage()}>
                                <Ionicons name="add" size={20} color="black" />
                            </TouchableOpacity>
                            <View style={{ width: 6 }} />
                            <Text style={styles.listHeader}>
                                New Chat
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => onShareDelete()}>
                            <FontAwesome6 name="ellipsis" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 12 }} />
                    <FlatList
                        ref={flatListRef}
                        data={DATA}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={_renderItem}
                    // contentContainerStyle={{ paddingBottom: 10 }} 
                    />
                </>

                : null
            }
        </View>

    )
}
const styles = StyleSheet.create({

    listCard: {
        maxWidth: 500,
        backgroundColor: "#EBEBEB",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',

        // marginRight: 5,
        //justifyContent: "space-between",
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

export default LeftPage;
