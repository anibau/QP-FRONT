import React from 'react';
import {Text, View, TouchableOpacity, Share, Dimensions} from 'react-native';
import Container from '../../ui/container/Container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {AppBar} from '../../ui/general/AppBar';
import {texts} from '../../utils/styles';
import {ReceiptListElement} from '../../ui/pages/categories/ReceiptListElement';
import {Divider} from '../../ui/general/Divider';
import {downloadIcon, shareIcon} from '../../utils/icons';
import { SvgXml } from 'react-native-svg';
import { RFValue } from 'react-native-responsive-fontsize';
import {Spacer} from '../../ui/general/Spacer';
import {downloadPdfFile} from '../../utils/utils';
import {emptyBuy} from '../../utils/icons';
import useHistory from '../../hooks/useHistory';
import {LoadingView} from '../../ui/general/LoadingView';
import {ErrorView} from '../../ui/general/ErrorView';
import { baseUrl } from "../../config/constants";
import {NetworkImage} from '../../ui/general/NetworkImage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const HistoryDetailsPage = ({navigation, route}) => {

    const {
        lastBuy = false,
        invoice,
        shopName = ''
    } = route.params;

    const {
        historyItemDetails,
        historyItemDetailsLoading,
        historyItemDetailsError,
    } = useHistory({
        lastBuy: lastBuy,
        navigation: navigation,
        withFetch: false,
        historyItem: invoice
    });

    return (<>
            <Container>
                <KeyboardAwareScrollView
                    contentContainerStyle={{
                        justifyContent: 'flex-start',
                        alignContent: 'center',
                        alignItems: 'flex-start',
                    }}
                    enableOnAndroid
                >
                    <AppBar
                        title = {shopName}
                        onPress = {()=>{
                            navigation.pop();
                        }}
                        trailing ={
                            <View
                                style = {{
                                    flexDirection: "row"
                                }}
                            >   
                                {Boolean(historyItemDetails.det.length) && <TouchableOpacity
                                    onPress = { async()=>{
                                        if(lastBuy){
                                            Share.share({
                                                message: `${baseUrl}/general/download/invoice/${historyItemDetails.det[0].id}`,
                                            });
                                        }else{
                                            Share.share({
                                                message: `${baseUrl}/general/download/invoice/${invoice.id}`,
                                            });
                                        }
                                    }}
                                >
                                    <SvgXml 
                                        xml = {shareIcon} 
                                        width = {RFValue(20)}
                                        height = {RFValue(20)}
                                    />
                                </TouchableOpacity>}
                                <Spacer
                                    width = {20}
                                />
                                {Boolean(historyItemDetails.det.length) && <TouchableOpacity
                                    onPress = {()=>{
                                        if(lastBuy){
                                            downloadPdfFile(historyItemDetails.det[0]);
                                        }else{
                                            downloadPdfFile(invoice);
                                        }
                                    }}
                                >
                                    <SvgXml 
                                        xml = {downloadIcon} 
                                        width = {RFValue(20)}
                                        height = {RFValue(20)}
                                    />
                                </TouchableOpacity>}
                            </View>
                        }
                    />
                    <Text style={{...texts.titleSection, marginBottom: "5%", paddingHorizontal: "5%", marginTop: "5%"}}>
                        {lastBuy ? "Tu última compra" : "Tu compra"}
                    </Text>
                    {
                        historyItemDetailsLoading && !historyItemDetailsError ? <LoadingView
                            heightPercentage = {60}
                        /> : null
                    }
                    {
                        !historyItemDetailsLoading && historyItemDetailsError ? <ErrorView
                            heightPercentage = {60}
                        /> : null
                    }
                    {
                        !historyItemDetailsLoading && !historyItemDetailsError && !Boolean(historyItemDetails.det.length) ? <View
                            style = {{
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: screenHeight * 0.6
                            }}
                        >
                            <SvgXml 
                                xml = {emptyBuy} 
                                width = {screenWidth * 0.4}
                                height = {screenWidth * 0.4}
                            />
                            <View
                                style = {{
                                    height: screenHeight * 0.025
                                }}
                            />
                            <Text style={texts.simpleText}>No cuenta con productos registrados</Text>
                        </View> : null
                    }
                    {
                        !historyItemDetailsLoading && !historyItemDetailsError && Boolean(historyItemDetails.det.length) ? historyItemDetails.det.map((element, index) => (
                            <View
                                key={element.id}
                            >
                                <ReceiptListElement
                                    product = {element}
                                />
                                <Divider
                                />
                            </View>
                        )) : null
                    }
                    {invoice && !historyItemDetailsLoading && !historyItemDetailsError ? <>
                        <Text style={{...texts.generalHighlighTextBold, marginBottom: "7%", marginLeft: "5%"}}>Código QR de venta</Text>
                        <Text style={{...texts.titleSection, marginBottom: "7%", textAlign: "center", width: "100%"}}>¡ Gracias por tu compra!</Text>
                        <View
                            style={{
                                width: "100%",
                                justifyContent: "center",
                                flexDirection: "row"
                            }}
                        >
                            <NetworkImage
                                url={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${invoice.id}`}
                                width={screenWidth * 0.5}
                                resizeMode="contain"
                                height={screenWidth * 0.5}
                                borderRadius={0}
                            />
                        </View>
                    </> : null}
                    {historyItemDetails &&!historyItemDetailsLoading && !historyItemDetailsError && !invoice && historyItemDetails.det.length > 0 ?  <>
                        <Text style={{...texts.generalHighlighTextBold, marginBottom: "7%", marginLeft: "5%"}}>Código QR de venta</Text>
                        <Text style={{...texts.titleSection, marginBottom: "7%", textAlign: "center", width: "100%"}}>¡ Gracias por tu compra!</Text>
                        <View
                            style={{
                                width: "100%",
                                justifyContent: "center",
                                flexDirection: "row"
                            }}
                        >
                            <NetworkImage
                                url={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${historyItemDetails.id}`}
                                width={screenWidth * 0.5}
                                resizeMode="contain"
                                height={screenWidth * 0.5}
                                borderRadius={0}
                            />
                        </View>
                    </> : null}
                    <Spacer 
                    height = {screenHeight * 0.1}
                />
                </KeyboardAwareScrollView>
            </Container>
        </>);
};
