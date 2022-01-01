import React from 'react';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { View, TextInput } from 'react-native'

function InputText({iconName,placeholderText, inputBorderColor, textInputColor, ...otherProps}) {
    return (
        <View style={{
          borderRadius: 40, borderWidth: 2, borderColor: inputBorderColor, marginVertical:10,
        flexDirection:'row', width:"100%",
        alignItems:'center', paddingHorizontal:10,
        }}>
        <Icon name={iconName} size={15} color="#aaa" />
        <TextInput style={{ 
          flex:1, paddingHorizontal:10,
        color: textInputColor,
        }} placeholderTextColor="#aaa" placeholder={placeholderText} {...otherProps}/>
        </View>
    );
}

export default InputText;