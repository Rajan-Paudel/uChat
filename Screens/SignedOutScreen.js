
import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, StatusBar, Modal, Image, TouchableOpacity, Alert, EventEmitter, } from 'react-native'
import ButtonDefault from '../components/ButtonDefault';
import * as Animatable from 'react-native-animatable';
import InputText from '../components/InputText';
import Icon from 'react-native-vector-icons/AntDesign';
import {Auth} from '../services'
import ColorPallets from '../config/ColorPallets';
import firestore from '@react-native-firebase/firestore';
import useStatusBar from '../config/useStatusBar'
import LinearGradient from 'react-native-linear-gradient';

export default function SignedOutScreen() {
  useStatusBar("light-content");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [mail, setmail] = useState();
  const [pass, setpass] = useState(); 
  const [userName, setuserName] = useState();
  const [phone, setPhone] = useState();

  const [loginModal, setloginModal] = useState(false);
  const [signupModal, setsignupModal] = useState(false);


 
  function createDatabase (){
  
    firestore().collection('userData').add(
      {
        username:userName,
        userid: mail.toLowerCase(),
        phone: phone,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/uchat-f217f.appspot.com/o/assets%2Fuser.png?alt=media&token=38109537-6a6d-4a23-b973-b5b2f5085296',
        connection:['assistant@uchat.com'],
        likedPosts:['1635191645619']
      }
      
    )
  }

    const loginToken = () => { 
            Auth.signIn(email.toLowerCase(), password);
    }

    async function signUp () {
    if(phone.length>9){
      createDatabase();
        Auth.register(mail,pass) 
    }
    else{
      console.log("wrong")
    }   
  };
  


  return (
    <>
    <StatusBar translucent backgroundColor="transparent"/>
      <Modal
        transparent={true}
        visible={loginModal}
        onRequestClose={() => {
          setloginModal(!loginModal);
        }}
      >
        <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
          <Animatable.View animation="fadeInUp" duration={500} delay={0} style={{ padding: 20, justifyContent: 'center',  backgroundColor: ColorPallets.backgroundPrimary, borderTopRightRadius: 10, borderTopLeftRadius: 10, elevation: 100 }}>
           
            <View style={{flexDirection: 'column-reverse',}}>
            <Text style={{ alignSelf: 'center', color:"#111"}}>Forgot Password</Text>
              <ButtonDefault textColor={ColorPallets.buttomTextColor} bgColor={ColorPallets.primary} buttonText="Login" onButtonPress={() => loginToken()} />
              <InputText placeholderText="Password" secureTextEntry={true} iconName="lock"
              textInputColor={ColorPallets.textColor}
              inputBorderColor={ColorPallets.borderSecondary}
              value={password}
              onChangeText={e => setPassword(e)}
              />
              <InputText placeholderText="email" autoFocus={true} iconName="envelope" value={email}
                keyboardType='email-address'
                autoCapitalize='none'
            textInputColor={ColorPallets.textColor}
            inputBorderColor={ColorPallets.borderSecondary}
            onChangeText={e => setEmail(e)}/>    
                <Text style={{color:"#111", fontWeight:'bold', color:"#999", alignSelf:'center', marginBottom:20,}}> Login to Your Account.</Text>   
            </View>
          </Animatable.View>
          <TouchableOpacity onPress={()=>setloginModal(false)} >
            <Icon name="close" size={20} color="#fff" style={{ backgroundColor:"#df3b3b", borderRadius:40, alignSelf:'flex-end', padding:10, margin:10,}}/>
          </TouchableOpacity>  
        </View>
      </Modal>




      <Modal
        transparent={true}
        visible={signupModal}
        onRequestClose={() => {
          setsignupModal(!signupModal);
        }}
      >

        <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
          <Animatable.View animation="fadeInUp" duration={500} delay={0} style={{ padding: 20, justifyContent: 'center', backgroundColor: ColorPallets.backgroundPrimary, borderTopRightRadius: 10, borderTopLeftRadius: 10, elevation: 100 }}>
           
            <View style={{flexDirection: 'column-reverse',}}>
              <ButtonDefault  textColor={ColorPallets.buttomTextColor} bgColor={ColorPallets.secondary}  buttonText="Signup" onButtonPress={() => signUp()}  />
              <InputText placeholderText="Password" secureTextEntry={true} iconName="lock"
              textInputColor={ColorPallets.textColor}
              inputBorderColor={ColorPallets.borderSecondary}
              value={pass}
              onChangeText={e => setpass(e)}
              />
              <InputText placeholderText="email" autoFocus={true} iconName="envelope"
             textInputColor={ColorPallets.textColor}
             inputBorderColor={ColorPallets.borderSecondary}
             value={mail}
              onChangeText={e => setmail(e)}   
              />  
              <InputText placeholderText="Username" iconName="user"
              textInputColor={ColorPallets.textColor}
              inputBorderColor={ColorPallets.borderSecondary}
              value={userName}
              onChangeText={e => setuserName(e)}
              />    
              <InputText placeholderText="Phone" iconName="phone"
              textInputColor={ColorPallets.textColor}
              inputBorderColor={ColorPallets.borderSecondary}
              keyboardType="phone-pad"r
              value={phone}
              onChangeText={e => setPhone(e)}
              />    
                <Text style={{color:"#111", fontWeight:'bold', color:"#999", alignSelf:'center', marginBottom:20,}}> Signup for New Account</Text>   
            </View>
          </Animatable.View>
          <TouchableOpacity onPress={()=>setsignupModal(false)} >
            <Icon name="close" size={20} color="#fff" style={{ backgroundColor:"#df3b3b", borderRadius:40, alignSelf:'flex-end', padding:10, margin:10,}}/>
          </TouchableOpacity>  
        </View>
      </Modal>



      <ImageBackground style={{flex:1}} source={{ uri: "https://images.pexels.com/photos/2422292/pexels-photo-2422292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" }}>
      <LinearGradient colors={[ColorPallets.transparentBackground, ColorPallets.transparentBackground,ColorPallets.transparentBackground, ColorPallets.backgroundSecondary]} style={styles.linearGradient}>
        <View style={{alignItems:'flex-end', marginVertical:50, marginRight:30,}}>
            <Image source={require('../assets/Images/Logo/chat.png')} style={{width:50,height:50}}/>
             <Text style={{fontWeight:'900', color:ColorPallets.buttomTextColor2, fontSize:20, marginVertical:10,}}>
                        uChat
                    </Text>
        </View>            
        <View style={styles.bottomArea}>
          <ButtonDefault bgColor={ColorPallets.secondary} textColor="#fff" textColor={ColorPallets.buttomTextColor} buttonText="Register" onButtonPress={() => setsignupModal(true)}  />
          <ButtonDefault bgColor={ColorPallets.primary} textColor="#fff" textColor={ColorPallets.buttomTextColor} buttonText="Login" onButtonPress={() => setloginModal(true)} />
        </View>
        </LinearGradient>
      </ImageBackground>
  
    </>
  );
}
const styles = StyleSheet.create({
  bottomArea: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'column-reverse'  
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom:20,
    borderRadius: 5
  },
})
