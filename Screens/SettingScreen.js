import React from 'react';
import { TouchableOpacity, Text } from 'react-native'
import { SafeAreaView,} from 'react-native-safe-area-context';
import OptionList from '../components/OptionList';
import ColorPallets from '../config/ColorPallets';
import { Auth } from '../services';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import useStatusBar from '../config/useStatusBar'
import { Fonts } from '../config/Fonts';
function SettingScreen({navigation}) {
  useStatusBar(ColorPallets.statusBar);
  return (
    <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: ColorPallets.backgroundSecondary }}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', flexDirection:'row', alignItems: 'center', alignSelf:'flex-start', backgroundColor: ColorPallets.backgroundPrimary, padding: 15, borderRadius: 30, }}>
        <Icon name="arrow-left" size={14} color={ColorPallets.textColor} />
        <Text style={{marginHorizontal:5, fontFamily:Fonts.Default}}>BACK</Text>
      </TouchableOpacity>
      

      <OptionList bgColor={ColorPallets.backgroundSecondary} iconColor={ColorPallets.textColor} iconName="frown" textColor={ColorPallets.textColor} optionTitle="Report Bug" onOptionPress={() => console.log('pressed')} />
      <OptionList bgColor={ColorPallets.backgroundSecondary} iconColor={ColorPallets.textColor} iconName="star" textColor={ColorPallets.textColor} optionTitle="Rate us" onOptionPress={() => console.log('pressed')} />
      <OptionList bgColor={ColorPallets.backgroundSecondary} iconColor={ColorPallets.textColor} iconName="github" textColor={ColorPallets.textColor} optionTitle="Check Projects" onOptionPress={() => console.log('pressed')} />
      <OptionList bgColor={ColorPallets.backgroundSecondary} iconColor={ColorPallets.textColor} iconName="questioncircle" textColor={ColorPallets.textColor} optionTitle="Need Help" onOptionPress={() => console.log('pressed')} />
      <OptionList bgColor={ColorPallets.secondary} iconColor={ColorPallets.buttomTextColor} iconName="logout" textColor={ColorPallets.buttomTextColor} optionTitle="Logout" onOptionPress={() => Auth.signOut()} />
    </SafeAreaView>
  );
}
export default SettingScreen;