import React, { useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity, View, Image, Dimensions,Text, Modal, StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonDefault from '../components/ButtonDefault';
import {firebase} from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import ColorPallets from '../config/ColorPallets';
import { Fonts } from '../config/Fonts';
const windowWidth = Dimensions.get('window').width;
function AddPost() {
 const [image, setImage] = useState();
 const [postDescription, setpostDescripotion] = useState();
 
 const [loginModal, setloginModal] = useState(false);

   function pickSingleBase64() {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          quality: 0.7,
          cropping: true,
          includeBase64: true,
          includeExif: true,
        })
          .then(image => {
           setImage(image.path)
          })
          .catch(e => '');
      }
    

  async function uploadImage () {
    const timespamp = Date.now();
    const storageRef = firebase.storage().ref(`postImages/${timespamp}`);
    const task = storageRef.putFile(image);

    try {
      await task;
      const imageTempUrl = await storageRef.getDownloadURL();
      return imageTempUrl;
    } catch (e) {
      console.log(e);
      return null;
    }
  };


  const sendData = async (postDescription) => {
    setloginModal(!loginModal)
    const ImageUploadedUrl = await uploadImage();
      const data = {
        senderName: userInfo.username,
        postSender: uid,
        imageUrl: ImageUploadedUrl,
        description: postDescription,
        messageDate: firebase.firestore.Timestamp.now().toDate().toString(),
        timeStamp: Date.now(),
      };
      firestore().collection('Posts').add(data);
      setImage(null)
      setpostDescripotion(null)
      setloginModal(loginModal)
  };



 
    return (



<>



<Modal
        transparent={true}
        visible={loginModal}
        onRequestClose={() => {
          setloginModal(!loginModal);
        }}
      >
        <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
          <Animatable.View animation="fadeInUp" duration={500} delay={0} style={{ paddingVertical: 100, justifyContent: 'center', alignItems:'center', backgroundColor: "#111", borderTopRightRadius: 10, borderTopLeftRadius: 10, elevation: 100 }}>
            
            <LottieView source={require('../assets/Images/animated/Loading.json')} autoPlay loop  style={{width:100, height:100}}/>
            <Text style={{color:"#fff", fontWeight:"bold"}}>Uploading Post</Text>
          </Animatable.View>
    
        </View>
      </Modal>















        <SafeAreaView style={{backgroundColor:ColorPallets.backgroundPrimary, flex:1, padding:10,}}>
            <Text style={{color:ColorPallets.textColor, alignSelf:'center',  fontSize:24, fontFamily:Fonts.Heading}}>Create a Post </Text>
            
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{flex:1}}>
        <TouchableOpacity onPress={() => pickSingleBase64()} style={{flex:1,}}>
                    {image ? (
                      <Image
                        source={{uri: image}}
                        style={{
                          width: windowWidth-20,
                          borderRadius: 10,
                          height: windowWidth-20 ,
                          marginRight: 5,
                          marginVertical: 20,
                          borderWidth: 1,
                          borderColor: ColorPallets.borderPrimary,
                        }}
                      />
                    ) : (
                      <View
                        style={{backgroundColor:ColorPallets.backgroundSecondary,
                          borderRadius: 10,
                          width: windowWidth - 20,
                          borderRadius: 10,
                          height: windowWidth / 3,
                          marginVertical: 20,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderColor:ColorPallets.borderPrimary, 
                          borderWidth: 1,
                          marginRight: 10,
                        }}>
                        <Icon name="picture" size={30} color={ColorPallets.subTextColor} />
                        <Text style={{color:"#aaa", fontWeight:"bold"}}>Choose Picture</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                        

                  <TextInput
                       multiline={true}
                       value={postDescription}
                       onChangeText={e => setpostDescripotion(e)}
                       placeholderTextColor="#aaa"
                       placeholder="Write Something About your Post"
                       numberOfLines={10}
                       require={true}
                       style={{
                         
                          backgroundColor:ColorPallets.backgroundSecondary,
                          borderWidth: 1,
                          borderColor:ColorPallets.borderPrimary, 
                          borderRadius: 10, padding: 20,
                          color:ColorPallets.textColor,
                          textAlignVertical: 'top',
                         }
                       }

          
                     />
                    
                  </ScrollView>
                  <ButtonDefault bgColor={ColorPallets.primary} buttonText="Submit POST" textColor={ColorPallets.buttomTextColor} onButtonPress={()=> sendData(postDescription)}/>
                  </SafeAreaView>
                  </>
    );
}
const styles = StyleSheet.create({
loader:{
  padding:5
}
})

export default AddPost;