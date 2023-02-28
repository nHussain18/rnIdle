import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import { ms, s, vs } from "react-native-size-matters";

const Search = () => {
    const list = [
        {
            name: 'John Carter',
            mobile: '7233392223',
            address: '12 st. wilfred road, new york'
        },
        {
            name: 'John Cena',
            mobile: '7656768789',
            address: '13 Linkan street, los angeles'
        },
        {
            name: 'Silvester Stalon',
            mobile: '8765435622',
            address: 'Amsterdam'
        },
        {
            name: 'Elon Musk',
            mobile: '2398726564',
            address: 'New York'
        },
        {
            name: 'Jeff Bejos',
            mobile: '9898989898',
            address: '11 st. wilfred road, Washington Dc'
        },
        {
            name: 'John Carter',
            mobile: '7233392223',
            address: '12 st. wilfred road, new york'
        },
        {
            name: 'John Cena',
            mobile: '7656768789',
            address: '13 Linkan street, los angeles'
        },
        {
            name: 'Silvester Stalon',
            mobile: '8765435622',
            address: 'Amsterdam'
        },
        {
            name: 'Elon Musk',
            mobile: '2398726564',
            address: 'New York'
        },
        {
            name: 'Jeff Bejos',
            mobile: '9898989898',
            address: '11 st. wilfred road, Washington Dc'
        },
    ]
    const [text, setText] = useState('');
    const [data, setData] = useState(list);


    const renderItem = ({ item }: object) => {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>{item?.name}</Text>
                <Text style={styles.text}>{item?.mobile}</Text>
                <Text style={styles.text}>{item?.address}</Text>
            </View>
        )
    }
    const ListEmptyComponent = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.title}>Data Not Found!</Text>
            </View>
        )
    }

    const handleChange = (text: string) => {
        let txt = text.toLowerCase()
        setText(text);
        let data = list.filter(item => {
            return item.address.toLowerCase().includes(txt) ||
                item.name.toLowerCase().includes(txt) ||
                item.mobile.includes(txt)
        })
        setData(data)
    }

    return (
        <View style={styles.container}>
            <TextInput placeholder="Search here" style={styles.textInput} value={text} onChangeText={(text) => handleChange(text)} />
            <FlatList
                data={data}
                contentContainerStyle={{ flexGrow: 1 }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={ListEmptyComponent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        paddingHorizontal: s(20)
    },
    title: {
        fontSize: ms(22),
        color: 'black'
    },
    item: {
        padding: ms(10),
        backgroundColor: '#fff',
        borderRadius: ms(8),
        marginTop: vs(10)
    },
    text: {
        fontSize: ms(14),
        color: 'black'
    },
    count: {
        fontSize: ms(30),
        fontWeight: '600',
        color: 'black'
    },
    textInput: {
        marginTop: vs(15),
        height: vs(35),
        color: 'black',
        fontSize: ms(14),
        paddingHorizontal: s(8),
        borderRadius: ms(20),
        borderColor: 'gray',
        borderWidth: 0.5,
        backgroundColor: '#fff'
    }
})
export default Search