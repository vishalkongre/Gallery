import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import globalStyles from '../styles/global';
import { Colors } from '../constants';
import CustomButton from '../components/CustomButton';
import Tasks from '../components/Tasks';
import { getTasks } from '../store/actions/taskActions';
import { setActiveListId } from '../store/actions/listAction';
import Favorites from '../components/Favorites';

const FavoriteScreen = () => {
    const [loading, setLoading] = useState(true);
    return (
        <View>
            <Favorites />
        </View>
    )
}

export default FavoriteScreen

const styles = StyleSheet.create({})
