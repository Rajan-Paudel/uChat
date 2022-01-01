import React from 'react';
import { Text, StatusBar, View,Dimensions, Image,StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import useStatusBar from '../config/useStatusBar';
import LottieView from 'lottie-react-native';
import ColorPallets from '../config/ColorPallets';
import ButtonDefault from '../components/ButtonDefault';
import { Fonts } from '../config/Fonts';

const windowWidth = Dimensions.get('window').width;
function OnBoardingScreen({navigation}) {
    
    useStatusBar('light-content');
    return (
        <View style={{flex:1}}>
            <StatusBar translucent backgroundColor="transparent" />
            <LinearGradient colors={[ColorPallets.primary, ColorPallets.backgroundSecondary]} style={styles.linearGradient}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', }}>
                    <View style={{flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
                    <Text style={{ color:ColorPallets.buttomTextColor2, fontSize:20, fontFamily:Fonts.Heading}}>
                        Welcome to uChat
                    </Text>
                    <Image source={require('../assets/Images/Logo/chat.png')} style={{width:40,height:40, marginHorizontal:10,}}/>
                    </View>
                    <LottieView source={require('../assets/Images/animated/onBoarding.json')} autoPlay loop={false}  style={{width:windowWidth-20, marginVertical:10,}}/>
            </View>
            <View style={{ }}>
             <Text style={{fontFamily:Fonts.Default, color:"#aaa", fontSize:14, alignSelf:'center'}}>
                        Thankyou for Joining us!
                    </Text>
                    <ButtonDefault buttonText="Get Start" bgColor={ColorPallets.primary} textColor={ColorPallets.buttomTextColor} onButtonPress={()=>navigation.replace('SignedOutScreen')}/>
          
            </View>
            </LinearGradient>
        </View>
    );
}
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom:20,
        borderRadius: 5
      },
})
export default OnBoardingScreen;