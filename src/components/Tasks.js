import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { deleteTask, updateTask } from '../store/actions/taskActions';
import { Colors } from '../constants';
import globalStyles from '../styles/global';

const Tasks = ({ navigation, listId, show, visible }) => {
    const { tasks } = useSelector(state => state.task);
    const [tasksLoaded, setTasksLoaded] = useState(false);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (tasks) {
            const copyTasks = [...tasks];
            const filteredTasks = copyTasks.filter(t => t.listId === listId);
            setData(filteredTasks);
            setTasksLoaded(true);
        }
    }, [tasks, listId]);



    const deleteTaskClickHandler = (id) => {
        Alert.alert(
            'Delete Image',
            'Are you sure you want to delete this Image?',
            [{ text: 'Cancel' }, { text: 'Delete', onPress: () => deleteTaskHandler(id) }]
        );
    };

    const deleteTaskHandler = (id) => {
        dispatch(deleteTask(id, () => {
            ToastAndroid.show('Image successfully deleted!', ToastAndroid.LONG);
        }));
    };

    const updateImageHandler = (id, name, favorite) => {
        const taskFound = tasks.find(t => t.id === id);
        console.log(taskFound, favorite, name, id);
        const updatedTask = {
            ...taskFound,
            name,
            favorite,
        };

        dispatch(updateTask(
            updatedTask,
            () => {

                ToastAndroid.show(' Image updated!', ToastAndroid.LONG);
            },
            () => {
                ToastAndroid.show('Something went wrong. Please try again!', ToastAndroid.LONG);
            },
        ));
    };

    const renderItem = ({ item }) => {
        console.log(item.favorite);
        return (
            <View style={globalStyles.listItem}>
                <View style={styles.textWrapper}>
                    <Image source={{ uri: item.path }} style={{ height: 50, width: 50 }} />
                    <Text style={styles.itemText}>{item.name}</Text>
                    <TouchableOpacity onPress={() => updateImageHandler(item.id, item.name, !item.favorite)}>
                        {item.favorite ? <Ionicons name="heart-sharp" size={24} color="red" /> : <Ionicons name="heart-outline" size={24} color="red" />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteTaskClickHandler(item.id)} >
                        <AntDesign name="delete" size={24} color="red" />
                    </TouchableOpacity>
                </View>
            </View>)
    }

    return (
        <View style={styles.container}>
            {data.length > 0 ? <FlatList
                data={data}
                contentContainerStyle={globalStyles.listContainer}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
                : tasksLoaded ? <Text style={globalStyles.noData}>No Images in this list</Text> : null
            }


        </View>
    );
};



export default Tasks

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemCompleted: {
        backgroundColor: Colors.secondary,
    },
    textWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemText: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        paddingRight: 10,
        color: 'black',
        width: "60%"
    },
});
