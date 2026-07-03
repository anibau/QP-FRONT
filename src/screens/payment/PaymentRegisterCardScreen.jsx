import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, Text, View, Dimensions, Keyboard} from 'react-native';
import {AppBar} from '../../ui/general/AppBar';
import {texts} from '../../utils/styles';
import CreditCard from '../../ui/creditcard/CardView';
import {CustomTextInput} from '../../ui/general/CustomTextInput';
import {Divider} from '../../ui/general/Divider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {FixedButton} from '../../ui/general/FixedButton';
import { MaterialIcons } from '@expo/vector-icons';
import { useCards } from '../../hooks/useCards';
import { Info } from '../../ui/modal/Info';
import { validateCVV, validateCardNumber, validateExpicyDate, validateNoEmptyInput } from '../../utils/validator';
import { detectCardType } from '../../utils/cardDetector';
import { SuccessBottomSheet } from '../../ui/general/SuccessBottomSheet';
import { store } from '../../redux/store/store';

const screenWidth = Dimensions.get('window').width;

export const PaymentRegisterCardScreen = ({navigation}) => {

    const keyboardDidShowListener = useRef();
    const keyboardDidHideListener = useRef();

    const [successVisible, setSuccessVisible] = useState(false);

    const [creditCardState, setCreditCardState] = useState({
        number: "",
        firstName: "",
        lastName: "",
        expire: "",
        cvv: "",
        focused: "number"
    });

    const [dataError, setDataError] = useState({
        number: "",
        firstName: "",
        lastName: "",
        expire: "",
        cvv: "",
        focused: "number"
    });

    const [keyboardState, setKeyboardState] = useState(false);

    const [cvvEnabled, setCVVEnabled] = useState(false);

    const handleCardNumberChange = (input) => {
        // Remove any non-numeric characters
        const formattedInput = input.replace(/\D/g, '');
        
        // Format the card number with spaces
        const formattedCardNumber = formattedInput
          .replace(/(\d{4})/g, '$1 ')
          .trim();

        setCreditCardState({
            ...creditCardState,
            number: formattedCardNumber
        })
    
    };

    const handleCVVChange = (input) => {
        // Remove any non-numeric characters
        const formattedInput = input.replace(/\D/g, '');

        // Format the CVV with a slash (e.g., 02/28)
        const formattedCVV = formattedInput
            .replace(/^(\d{2})/, '$1/')
            .substr(0, 5); // Limit to 5 characters (e.g., 02/28)

        setCreditCardState({
            ...creditCardState,
            expire: formattedCVV
        })
    };

    const {
        createUserCard,
        loadingState
    } = useCards({
        navigation: navigation,
        withFetch: false
    });

    useEffect(() => {
        keyboardDidShowListener.current = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardState(true);
            }
            );
            keyboardDidHideListener.current = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardState(false);
            }
        );
        return () => {
            if(keyboardDidShowListener.current !== undefined){
                keyboardDidShowListener.current.remove();
            }
            if(keyboardDidHideListener.current !== undefined){
                keyboardDidHideListener.current.remove();
            }
        }
    }, []);
    
    const cleanedNumber = creditCardState.number.replace(/\s/g, '');
    const brand = detectCardType(cleanedNumber);

    return (
        <>
            <SafeAreaView>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator
                    contentContainerStyle={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                    enableOnAndroid
                >
                    <AppBar
                        title = "Agregar tarjeta"
                        onPress = {()=>{
                            navigation.pop();
                        }}
                    />
                    <View
                        style={{
                            width: "100%",
                        }}
                    >
                        <Text style={{...texts.titleSection, paddingHorizontal: "5%", marginVertical: "5%", textAlign: "left"}}>
                            Datos de la tarjeta
                        </Text>
                    </View>
                    <CreditCard
                        name = {creditCardState.firstName + " " + creditCardState.lastName}
                        number = {creditCardState.number}
                        expiry = {creditCardState.expire}
                        cvc = {creditCardState.cvv}
                        focused = {creditCardState.focused}
                        brand={brand}
                    />
                    <Divider
                        height = {0}
                        marginVertical = "3%"
                    />
                    <CustomTextInput
                        keyboardType = "numeric"
                        value = {creditCardState.number}
                        onChange = {handleCardNumberChange}
                        title = "Número de tarjeta"
                        placeholder = "**** **** **** ****"
                        placeholderTextColor = "#adadad"
                        errorMessage={dataError.number}
                        maxLength={19}
                        trailingEnabled = {false}
                        onFocus={() => setDataError({
                            ...dataError,
                            number: '',
                            focused: ""
                        })}
                    />
                    <CustomTextInput
                        value={creditCardState.firstName}
                        onChange={(newValue) => {
                            setCreditCardState({
                                ...creditCardState,
                                firstName: newValue.toUpperCase()
                            })
                        }}
                        autoCorrect = {false}
                        errorMessage={dataError.firstName}
                        maxLength={50}
                        keyboardType="visible-password"
                        title = "Nombre del titular"
                        trailingEnabled = {false}
                        onFocus={() => setDataError({
                            ...dataError,
                            firstName: '',
                            focused: ""
                        })}
                        autoComplete = "off"
                    />
                    <CustomTextInput
                        value={creditCardState.lastName}
                        onChange={(newValue) => {
                            setCreditCardState({
                                ...creditCardState,
                                lastName: newValue.toUpperCase()
                            })
                        }}
                        autoCorrect = {false}
                        errorMessage={dataError.lastName}
                        maxLength={50}
                        keyboardType="visible-password"
                        title = "Apellidos del titular"
                        trailingEnabled = {false}
                        onFocus={() => setDataError({
                            ...dataError,
                            lastName: '',
                            focused: ""
                        })}
                        autoComplete = "off"
                    />
                    <View
                        style = {{
                            width: "90%",
                            marginHorizontal: "5%",
                            flexDirection: "row",
                            justifyContent: 'space-between'
                        }}
                    >
                        <View
                            style = {{
                                width: screenWidth * 0.6,
                            }}
                        >
                            <CustomTextInput
                                width = "100%"
                                keyboardType = "numeric"
                                value = {creditCardState.expire}
                                onChange = {handleCVVChange}
                                maxLength={5}
                                placeholder="MM/YY"
                                errorMessage={dataError.expire}
                                placeholderTextColor = "#adadad"
                                title = "Fecha de expiración"
                                trailingEnabled = {false}
                                onFocus={() => setDataError({
                                    ...dataError,
                                    expire: '',
                                    focused: ""
                                })}
                            />
                        </View>
                        <View
                            style = {{
                                width: "30%",
                                marginBottom: "5%"
                            }}
                        >
                            <CustomTextInput
                                width = "100%"
                                keyboardType = "numeric"
                                value={creditCardState.cvv}
                                onChange={(newValue) => {
                                    setCreditCardState({
                                        ...creditCardState,
                                        cvv: newValue
                                    })
                                }}
                                placeholder = "000"
                                placeholderTextColor = "#adadad"
                                title = "CVV"
                                maxLength={3}
                                errorMessage={dataError.cvv}
                                trailingEnabled = {false}
                                onFocus={() => {
                                    setDataError({
                                        ...dataError,
                                        cvv: '',
                                    });
                                    setCreditCardState({
                                        ...creditCardState,
                                        focused: "cvc"
                                    });
                                }}
                                onBlur={()=>{
                                    setCreditCardState({
                                        ...creditCardState,
                                        focused: ""
                                    });
                                }}
                            />
                        </View>
                    </View>
                    {/* <CheckBanner
                        state = {cvvEnabled}
                        marginBottom = {"3%"}
                        atEnd = {false}
                        titleBold = {false}
                        label = "Cuento con CVV Dinámico"
                        onPress = {(newValue) => {
                            setCVVEnabled(newValue);

                        }}
                    /> */}
                    <View
                        style = {{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            width: "90%",
                            paddingLeft: "1%",
                            alignItems: "center"
                        }}
                    >
                        <View
                            style = {{
                                marginRight: "3%"
                            }}
                        >
                            <MaterialIcons name="security" color="#32BA7C" size={24} />
                        </View>
                        <Text style={texts.subtitleSection}>
                            Todos tus datos están protegidos
                        </Text>
                    </View>
                    <Divider
                        height = {0}
                        marginVertical = "15%"
                    />
                    <Info
                        loading={loadingState.loading}
                        info={loadingState.info}
                        display={loadingState.display}
                    />
                </KeyboardAwareScrollView>
            </SafeAreaView>
            {!keyboardState && <FixedButton
                active
                activeBgColor = "#32BA7C"
                activeTextColor = "white"
                onPress={async () => {
                    const cardNumberErrorMessage = validateCardNumber(creditCardState.number);
                    const firstNameErrorMessage = validateNoEmptyInput(creditCardState.firstName);
                    const lastNameErrorMessage = validateNoEmptyInput(creditCardState.lastName);
                    const expicyDataErrorMessage = validateExpicyDate(creditCardState.expire);
                    const cvvErrorMessage = validateCVV(creditCardState.cvv)
                    if(
                        cardNumberErrorMessage.length > 0 || 
                        firstNameErrorMessage.length > 0 || 
                        lastNameErrorMessage.length > 0 || 
                        expicyDataErrorMessage.length > 0 || 
                        cvvErrorMessage.length > 0
                      ){
                        setDataError({
                            number: cardNumberErrorMessage,
                            firstName: firstNameErrorMessage,
                            lastName: lastNameErrorMessage,
                            expire: expicyDataErrorMessage,
                            cvv: cvvErrorMessage,
                        });
                        return;
                      }
                    const user = store.getState().auth.user;
                    const newCard = {
                        "user_id": user.id,
                        "card_number": cleanedNumber,
                        "card_name": creditCardState.firstName,
                        "card_lastname": creditCardState.lastName,
                        "card_expiry_date": creditCardState.expire,
                        "card_cvv": creditCardState.cvv
                    }
                    const success = await createUserCard(newCard);
                    if(success){
                        setSuccessVisible(true);
                    }
                }}
                title = "Finalizar"
            />}
            <SuccessBottomSheet
                title = "Tarjeta agregada"
                buttonText = "Cerrar"
                visible = {successVisible}
                changeVisible = {(value) => {
                    setSuccessVisible(false);
                    navigation.pop();
                }}
            />
            {/* <RequestSheet
                sheetRef={sheetRef}
                title = "Importante"
                subtitle = "El CVV será requerido al momento que quiera realizar un pago"
                buttonText = "Cerrar"
                image = {
                <CustomImage
                    source={require("../../assets/images/alert-circle.png")}
                    width={RFValue(100)}
                    resizeMode="contain"
                    height={RFValue(100)}
                />
                }
                onClose={()=>{
                    if(sheetRef.current) sheetRef.current.snapTo(1);
                }}
                onActivate={()=>{
                    if(sheetRef.current) sheetRef.current.snapTo(1);
                }}
            /> */}
        </>
  );
};
