import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import AddCategoryScreen from './src/screens/AddCategoryScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from './src/constants';
import deleteList from './src/store/actions/listAction'
import FavoriteScreen from './src/screens/FavoriteScreen';



const stack = createStackNavigator()
const stackScreens = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.task);

  const deleteListClickHandler = (id, navigation) => {
    const listHasTasks = tasks.find(t => t.listId === id);

    if (listHasTasks) {
      return Alert.alert('Cannot delete', 'List cannot be deleted because it is not empty. First delete tasks in this list!');
    }

    Alert.alert(
      'Delete list',
      'Are you sure you want to delete this list ?',
      [
        { text: 'Cancel' },
        { text: 'Delete', onPress: () => deleteListHandler(id, navigation) },
      ]
    );
  };

  const deleteListHandler = (id, navigation) => {
    dispatch(deleteList(id, () => {
      navigation.goBack();
      ToastAndroid.show('List successfully deleted!', ToastAndroid.LONG);
    }));
  };
  return (
    <stack.Navigator >
      <stack.Screen name="Home" component={Home} options={{ headerStyle: { backgroundColor: "#0063bf" }, title: "Home", headerTitleAlign: 'center', headerTintColor: 'white', headerTitleStyle: { fontFamily: 'Halvetica' } }} />
      <stack.Screen name='Add Category' component={AddCategoryScreen} />
      <stack.Screen name='Category' component={CategoryScreen} />
      <stack.Screen name='Favorite' component={FavoriteScreen} />
    </stack.Navigator>)
}


const RootStack = createNativeStackNavigator();
const RootStackScreens = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="App" component={stackScreens} />
    </RootStack.Navigator>)
}





export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchfonts = () => {
    return Font.loadAsync({
      b612: require("./assets/fonts/B612-Regular.ttf"),
      Helvetica: require("./assets/fonts/Helvetica.ttf"),
    });
  };
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchfonts}
        onFinish={() => setDataLoaded(true)}
        onError={console.warn}
      />
    );
  }
  return (

    <NavigationContainer>
      <RootStackScreens />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
