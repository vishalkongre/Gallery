import React from 'react'
import { Button, Modal, StyleSheet, Text, View, Keyboard, Alert, ToastAndroid } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { createTask } from '../store/actions/taskActions';
import { useDispatch, useSelector } from 'react-redux';

const ActionModel = (props) => {
    const { show, visible } = props
    const dispatch = useDispatch();
    const { tasks } = useSelector(state => state.task);
    const { activeListId } = useSelector(state => state.list);


    const OpenGallery = () => {
        ImagePicker.openPicker({
            multiple: false
        }).then(image => {
            submitHandler(image)
        });
    }

    const takePicture = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            submitHandler(image)
        });
    }


    const submitHandler = (image) => {

        const name = image.path.replace(/^.*[\\\/]/, '');
        const alreadyExist = tasks.find(t => t.name.toLowerCase() === name.trim().toLowerCase() && t.listId === activeListId);

        if (alreadyExist) {
            return Alert.alert('Validation', 'Image with this name already exist in this list!');
        }

        dispatch(createTask(
            name,
            activeListId,
            image.path,
            () => {
                ToastAndroid.show(`Image "${name}" added!`, ToastAndroid.LONG);
                Keyboard.dismiss();
                show(false)
            },
            () => { ToastAndroid.show('Something went wrong, please try again!', ToastAndroid.LONG); },
        ));
    };
    return (
        <View>
            <Modal animationType="slide"
                visible={visible}>
                <View style={styles.container} >
                    <Text style={styles.headerText}>Add Image</Text>
                    <View style={{ marginVertical: 10 }}>
                        <Button title='camera' onPress={takePicture} />
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <Button title='Gallery' onPress={OpenGallery} />
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <Button title='cancel' onPress={() => show(false)}></Button>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ActionModel

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.36)',
        flex: 1,
        justifyContent: 'center'
    },
    headerText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20
    }
})
