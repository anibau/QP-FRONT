import React from 'react';
import {Dimensions} from 'react-native';
import Container from '../../ui/container/Container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AUTH_ASYNCSTORAGE_KEY} from '../../config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signOutGoogle} from '../../controllers/auth_controller';
import { store } from '../../redux/store/store';
import { ActionUserClearData} from "../../redux/actions";
import {CustomButton} from '../../ui/general/CustomButton';

const screenHeight = Dimensions.get('window').height;

export const ProfileGuardPage = ({navigation}) => {

    return (
        <>
            <Container>
                <KeyboardAwareScrollView
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'flex-start',
                    }}
                    enableOnAndroid
                >
                    <CustomButton
                        title={"Cerrar sesión"}
                        marginHorizontal='10%'
                        marginTop = {screenHeight * 0.02}
                        marginBottom = {screenHeight * 0.05}
                        color='#262626'
                        onPress={async() => {
                            await AsyncStorage.setItem(AUTH_ASYNCSTORAGE_KEY,"");
                            await signOutGoogle();
                            store.dispatch(ActionUserClearData());
                        }}
                    />
                </KeyboardAwareScrollView>
            </Container>
        </>
    )           
}
