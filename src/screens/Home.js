import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux';
import { getList } from '../store/actions/listAction';
import Lists from '../components/Lists';
import { Colors } from '../constants';
import globalStyles from '../styles/global';
import CustomButton from '../components/CustomButton';
import { useFocusEffect } from '@react-navigation/native';


const Home = ({ navigation }) => {

    const [loading, setloading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getList(() => setloading(false)))
    }, [dispatch])

    if (loading) {
        return <ActivityIndicator color={Colors.primary} size={'large'} style={globalStyles.loader} />
    }


    return (
        <View style={styles.container}>
            <Lists navigation={navigation} />
            <CustomButton text="Add new Category" icon="add" iconColor="#fff" onPress={() => navigation.navigate('Add Category')} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
