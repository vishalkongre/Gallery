import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import globalStyles from '../styles/global';
import { Colors } from '../constants';
import CustomButton from '../components/CustomButton';
import Tasks from '../components/Tasks';
import { getTasks } from '../store/actions/taskActions';
import { setActiveListId } from '../store/actions/listAction';
import ActionModel from '../components/ActionModel';
const CategoryScreen = ({ navigation, route }) => {
    const [loading, setLoading] = useState(true);
    const [visible, setvisible] = useState(false)
    const { id } = route.params;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasks(() => setLoading(false)));
    }, [dispatch]);

    useEffect(() => {
        dispatch(setActiveListId(id));
    }, [dispatch, id]);

    if (loading) {
        return <ActivityIndicator color={Colors.primary} size="large" style={globalStyles.loader} />;
    }

    const taskClickHandler = () => {
        setvisible(true)
    };


    return (
        <View style={styles.container}>
            <ActionModel show={(res) => setvisible(res)} visible={visible} />
            <Tasks navigation={navigation} listId={id} show={(res) => setvisible(res)} visible={visible} />
            <CustomButton text="Add new Image" icon="add" iconColor="#fff" onPress={taskClickHandler} />
        </View>
    );
};




export default CategoryScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
});
