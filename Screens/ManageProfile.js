import React, {useState} from 'react';
import { Alert, ImageBackground,TouchableOpacity, View, Dimensions, StyleSheet , Text,  Modal} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { firebase } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import ColorPallets from '../config/ColorPallets';
import InputText from '../components/InputText';
import ButtonDefault from '../components/ButtonDefault';
import useStatusBar from '../config/useStatusBar'
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import { Fonts } from '../config/Fonts';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ManageProfile({navigation}) {
useStatusBar(ColorPallets.statusBar);

const[userNameChange,setuserNameChange] = useState();

const [updateNameModal, setupdateNameModal] = useState(false);
const [loginModal, setloginModal] = useState(false);
const[image,setImage] = useState();



async function createUser() {
  firestore().collection('userData')
      .where('userid', "==", uid).get()
      .then(querySnapshot => {
          firestore().collection('userData').doc(querySnapshot.docs[0].id).update({ username: userNameChange, timestamp: Date.now()});
        })
   }

 

function pickSingleBase64(){
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      quality: 0.8,
      cropping: true,
      includeBase64: true,
      includeExif: true,
    })
      .then((image) => {
        console.log(image.path);
        setImage(image.path)
      })
      .catch((e) => '');
  }
 
  async function uploadImage() {
    setloginModal(true)
    const storageRef = firebase.storage().ref(uid);
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

  async function submitImage () {
    if(image !== null )
    {
    const ImageUploadedUrl = await uploadImage();
    firestore().collection('userData')
    .where('userid', "==", uid).get()
    .then(querySnapshot => {
        firestore().collection('userData').doc(querySnapshot.docs[0].id).update({ imageUrl: ImageUploadedUrl, timestamp: Date.now()});
      })
    setloginModal(false)
  }
}

    return (
      <View style={{ flex:1, backgroundColor:ColorPallets.backgroundSecondary}}>      








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
            <Text style={{color:"#fff", fontWeight:"bold"}}>Uploading Image</Text>
          </Animatable.View>
    
        </View>
      </Modal>





    <Modal
        transparent={true}
        visible={updateNameModal}
        onRequestClose={() => {
          setupdateNameModal(!updateNameModal);
        }}
      >
        <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
          <Animatable.View animation="fadeInUp" duration={500} delay={0} style={{ padding: 20, height:windowHeight-windowWidth, backgroundColor:ColorPallets.backgroundPrimary, borderTopRightRadius: 10, borderTopLeftRadius: 10, elevation: 100 }}>
          <TouchableOpacity onPress={()=>setupdateNameModal(false)} style={{ backgroundColor:ColorPallets.danger, borderRadius:40, alignSelf:'flex-end', width:50, height:50, margin:10, justifyContent:'center', alignItems:'center'}} >
            <Icon name="close" size={30} color={ColorPallets.buttomTextColor2} />
          </TouchableOpacity>  
            <View style={{ flex:1, justifyContent:'flex-end'}}>
            <Text style={{color:ColorPallets.subTextColor, fontFamily:Fonts.Default, textAlign:'center', fontSize:14}}>Current Name: {userInfo.username}</Text>
            <InputText placeholderText="Username" autoFocus={true} iconName="user"
              textInputColor={ColorPallets.textColor}
              inputBorderColor={ColorPallets.borderSecondary}
              value={userNameChange}
              onChangeText={e => setuserNameChange(e)}
              />
              <ButtonDefault bgColor={ColorPallets.secondary} textColor={ColorPallets.buttomTextColor} buttonText="Update Name" onButtonPress={()=> createUser()}/>
            </View>
           
          </Animatable.View>
        </View>
      </Modal>




        <ImageBackground  source={{ uri:userInfo.imageUrl }} style={{width:windowWidth, height:windowWidth-100,flexDirection:'row' , justifyContent:'center'}} blurRadius={6}>   
          
        <View style={{ flexDirection:'row' , justifyContent:'center', alignItems:'center'}}>
          <TouchableOpacity onPress={() => pickSingleBase64()} style={styles.userPic} >
            { image? <ImageBackground source={{ uri: image }} style={styles.userPic} ><TouchableOpacity onPress={()=> submitImage()}><Icon name="check" size={30} color="#fff" style={{backgroundColor:ColorPallets.primary, padding:20, borderRadius:40, margin:20,}}/></TouchableOpacity></ImageBackground>
              :
              <ImageBackground source={{ uri:userInfo.imageUrl }} style={styles.userPic} ><Icon name="picture" size={30} color="#fff" style={{ padding:20, borderRadius:40, margin:20,}}/></ImageBackground>
              }
          </TouchableOpacity> 
        </View>
        </ImageBackground>

        <TouchableOpacity onPress={()=> navigation.goBack()} style={{ marginTop:40, marginLeft:20, position:'absolute', justifyContent:'center', alignItems:'center', alignSelf:'flex-start', backgroundColor:"rgba(0,0,0,0.5)", width:60, height:60, borderRadius:30,}}>
           <Icon name="arrow-left" size={15} color="#fff" />
           </TouchableOpacity>

          <View style={{padding:10,}}>

          <TouchableOpacity style={{flexDirection:'row', alignItems:'center',}} onPress={()=> setupdateNameModal(true)}>
              <View style={{ padding:10,}}>
                <Text style={{color:ColorPallets.textColor, fontFamily:Fonts.Heading}}>{userInfo.username}</Text>
              </View>
              
              <Icon name="pencil" size={12} color={ColorPallets.textColor}/>
              
          </TouchableOpacity>


          <View style={{flexDirection:'row', }}>
                <View style= {styles.card}>
                  <Text style={{color:ColorPallets.textColor, fontWeight:"900", fontSize:30}}>
                    {userInfo.connection.length}
                    </Text>
                  <Text style={{color:ColorPallets.subTextColor, fontWeight:"900", fontSize:14}}>Connections</Text>
                </View>
                <View style= {styles.card}>
                <Text style={{color:ColorPallets.textColor, fontWeight:"900", fontSize:30}}>{userInfo.likedPosts.length}</Text>
                  <Text style={{color:ColorPallets.subTextColor, fontWeight:"900", fontSize:14}}>Favourites</Text>
                </View>
                
              </View> 
          
              </View>
        </View>
      
      
    );
  }
const styles = StyleSheet.create({
  userPic:{
    height: windowWidth/3, width:windowWidth/3,
    borderRadius: windowWidth/6,
    overflow:'hidden',
    justifyContent:'center', alignItems:'center'
  },
  card:{
    width:windowWidth/2 -20, height:windowWidth/2 -60 , margin:5, backgroundColor: ColorPallets.backgroundPrimary, borderRadius:10, justifyContent:'center', alignItems:'center'
    
  }
})
