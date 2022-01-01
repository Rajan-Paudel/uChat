
import React from 'react';
import { Text, TouchableNativeFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/dist/AntDesign';
import ColorPallets from '../config/ColorPallets';
import { Fonts } from '../config/Fonts';


function ButtonDefault({ iconName, iconColor, optionTitle, textColor, onOptionPress, bgColor}) {
    return (
        <View style={{backgroundColor:bgColor, marginVertical:10, borderRadius:10,}}>
        <TouchableNativeFeedback onPress={onOptionPress} background={TouchableNativeFeedback.Ripple("red",true,)} >
            <View style={{ padding: 20 ,alignItems: 'center', width:'100%', flexDirection:'row' }} >
                    <Icon name={iconName} size={20} color={iconColor}/>
                     <Text style={{ color: textColor, textTransform: 'uppercase', fontFamily:Fonts.Default, letterSpacing: 2 , marginHorizontal:20,}}>
                    {optionTitle}
                </Text>
            </View>
        </TouchableNativeFeedback>
        </View>
    );
}

export default ButtonDefault;