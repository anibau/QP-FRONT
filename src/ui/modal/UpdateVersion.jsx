import React from 'react'
import { TouchableOpacity, View, Text, Dimensions, Image, StyleSheet } from 'react-native';
import _ from 'lodash';
import Modal from 'react-native-modal';

export const UpdateVersion = (props) => {
    return (
        <Modal
            style={{ margin: 0 }}
            isVisible={props.visible}>
            <View style={styles.container}>
                <View style={styles.containerModal}>
                    {/* <View style={{ width: 100, height: 100 }}> */}
                    <Image style={{ height: 100, width: 100 }} resizeMode='contain' source={require("../../assets/images/logo.png")} />
                    {/* </View> */}

                    <Text style={styles.title}>{"Nueva actualización"}</Text>
                    <Text style={styles.message}>{props.message}</Text>
                    <View style={{ flexDirection: "row", marginHorizontal: 20, width: Dimensions.get('window').width * 0.8, justifyContent: "center", alignItems: "center" }}>

                        <TouchableOpacity onPress={props.handleOk} style={[styles.containerButton, { marginRight: (props.isCancelable) ? 20 : 0 }]}>
                            <Text style={styles.textButton}>Aceptar</Text>
                        </TouchableOpacity>
                        {
                            props.isCancelable &&
                            <TouchableOpacity onPress={props.handleCancel} style={[styles.containerButton]}>
                                <Text style={styles.textButton}>Cancelar</Text>
                            </TouchableOpacity>
                        }

                    </View>

                </View>
            </View>

        </Modal>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    containerModal: {
        width: Dimensions.get('window').width * 0.8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        color: "#121212",
        fontFamily: "roboto-bold",
        fontSize: 16,
        // marginBottom: 10,
        marginTop:30,
    },
    message: {
        color: "#666666",
        fontFamily: "roboto-medium",
        textAlign:"center",
        fontSize: 14,
        marginVertical: 20
    },
    containerButton: {
        height: 40,
        backgroundColor: "#C22525",
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get('window').width * 0.4 - 30
    },
    textButton: {
        fontSize: 16,
        color: "#fff",
        fontFamily: "roboto-medium",

    }
});

export default UpdateVersion;

