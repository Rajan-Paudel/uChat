import React from 'react';
import { Text, TouchableNativeFeedback, View } from 'react-native'
import { Fonts } from '../config/Fonts';

function ButtonDefault({ bgColor, textColor, buttonText, onButtonPress }) {
    return (
        <View style={{backgroundColor:bgColor ,  elevation: 10, marginVertical: 10,borderRadius: 40,}}>
        <TouchableNativeFeedback onPress={onButtonPress} background={TouchableNativeFeedback.Ripple("red",true,)} >
            <View style={{ padding: 20 ,alignItems: 'center',   width:'100%' }} >
                <Text style={{ color: textColor, textTransform: 'uppercase', letterSpacing: 2, fontFamily:Fonts.Heading }}>
                    {buttonText}
                </Text>
            </View>
        </TouchableNativeFeedback>
        </View>
    );
}

export default ButtonDefault;