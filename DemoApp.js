import React from 'react';
import { View,Text } from 'react-native'
import ColorPallets from './config/ColorPallets';

function DemoApp(props) {
    return (
        <View>
            <Text style={{color: ColorPallets.danger}}>
                hello
            </Text>
        </View>
    );
}

export default DemoApp;