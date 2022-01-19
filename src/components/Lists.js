import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert, ScrollView } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux'
import globalStyles from '../styles/global'
import { AntDesign } from '@expo/vector-icons';
import { deleteList } from '../store/actions/listAction';


const Lists = (props) => {
    const { navigation } = props
    const { lists } = useSelector(state => state.list)
    const dispatch = useDispatch();
    console.log(lists);

    const itemClickHandler = (item) => {
        navigation.navigate('Category', { name: item.name, id: item.id });
    };

    const deleteCategoryClickHandler = (id) => {
        Alert.alert(
            'Delete Image',
            'Are you sure you want to delete this Image?',
            [{ text: 'Cancel' }, { text: 'Delete', onPress: () => deleteListHandler(id) }]
        );
    };

    const deleteListHandler = (id) => {
        dispatch(deleteList(id, () => {
            ToastAndroid.show('List successfully deleted!', ToastAndroid.LONG);
        }));
    };




    const renderItem = ({ item }) => (
        <TouchableOpacity style={globalStyles.listItem} onPress={() => itemClickHandler(item)}>
            <Text style={styles.itemText}>{item.name}</Text>
            <TouchableOpacity onPress={() => deleteCategoryClickHandler(item.id)}>
                <AntDesign name="delete" size={24} color="red" /></TouchableOpacity>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container} >
            <View style={globalStyles.listContainer}>
                <TouchableOpacity style={globalStyles.listItem} onPress={() => { navigation.navigate('Favorite', { name: "Favorite", }); }}>
                    <Text style={styles.itemText}>Favorite</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.listItem} onPress={() => { navigation.navigate('Category', { name: 'Landscape', id: 'def001' }); }}>
                    <Text style={styles.itemText}>Landscape</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.listItem} onPress={() => { navigation.navigate('Category', { name: 'Abstract', id: 'def002' }); }}>
                    <Text style={styles.itemText}>Abstract</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.listItem} onPress={() => { navigation.navigate('Category', { name: 'Portrait', id: 'def003' }); }}>
                    <Text style={styles.itemText}>Portrait</Text>
                </TouchableOpacity>
            </View>
            {lists.length > 0 ? <FlatList data={lists} keyExtractor={item => item.id} contentContainerStyle={globalStyles.listContainer} renderItem={renderItem} /> : null}
        </View>
    )
}

export default Lists

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        flex: 1
    },
    itemText: {
        fontFamily: 'b612',
        fontSize: 16,
        color: 'black'
    }
})
