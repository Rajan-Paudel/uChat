import React,{ useState, useEffect, useRef} from 'react';
import { View,StatusBar, ImageBackground , Dimensions, Pressable, Keyboard, Image, TouchableOpacity, TextInput,Modal, Text,StyleSheet} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import firestore from '@react-native-firebase/firestore';
import * as Animatable from 'react-native-animatable';
import ColorPallets from '../config/ColorPallets';
import OptionList from '../components/OptionList';
import useStatusBar from '../config/useStatusBar'
import { Fonts } from '../config/Fonts';
import { firebase } from '@react-native-firebase/database'
import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";
import LottieView from 'lottie-react-native';
function UserPost({ route, navigation }) {

    useStatusBar('light-content');
    const listing = route.params;
    const [postOptionsModal, setpostOptionsModal] = useState(false);
    const [userImage, setuserImage] = useState(null);
    const [message, setmessage] = useState();
    const [messageList, setmessageList] = useState([]);

    const homeAnimation = useRef();
    const playAnimation = () => {
        homeAnimation.current.play(20, 132);
    }
    const pressAnimation = () => {
        homeAnimation.current.play(0, 0);
    }
    
  if(userImage == null){
    firestore().collection('userData')
    .where('userid', "==", uid).get()
    .then(querySnapshot => {
      setuserImage(querySnapshot.docs[0].data().imageUrl);
      });
    }

async function deleteImage(){
    firebase.storage().refFromURL(listing.imageUrl).delete()
}




useEffect(() => {

  firebase.database().ref('comments').child(`${listing.timeStamp}`)
      .on('child_added', (value) => {
          setmessageList((prevState) => {
              return (
                  [...prevState, value.val()]
              )
          })
      })

}, []);


function sendMessage() {
  Keyboard.dismiss();
  pressAnimation()
  playAnimation()
  if (message.length > 0) {
      let msgId = firebase.database().ref('comments').child(`${listing.timeStamp}`).push().key;
      let updates = {};
      let messageData = {
          messageText: message,
          time: firebase.database.ServerValue.TIMESTAMP,
          from: uid,
          username: userInfo.username
      }
      updates['comments/' + listing.timeStamp + '/' + msgId] = messageData;
      firebase.database().ref().update(updates);
      setmessage(null)
  }
}


function convertTime(time) {
  let d = new Date(time);
  let c = new Date();
  let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
  result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();

  if (c.getDay() !== d.getDay()) {
      result = d.getDay() + '/' + d.getMonth() + '   ' + result;
  }

  return result;
}


var renderRow = ({ item }) => {
  return (
      <View
          style={{
              paddingHorizontal: 5,
              paddingBottom: 5,
          }}
      >
          
          <View style={{ flexDirection: 'row', paddingBottom:5,}}>
          <Image source={{uri: `https://firebasestorage.googleapis.com/v0/b/uchat-f217f.appspot.com/o/${item.from}?alt=media&token=3c0040a1-3590-4bb0-a467-173fade1d49c`}} 
          style={{ width:40, height:40, borderRadius:20,}}/>
              <View style={{ marginHorizontal:10}}>
                  <Text style={{
                      fontSize: 16,
                      color: ColorPallets.textColor, fontFamily: Fonts.Default,
                  }}>{item.username}
                  </Text>
                  <Text style={{
                      fontSize: 11,
                      color: ColorPallets.subTextColor,
                  }}>
                       {item.messageText}
                  </Text>
                  <Text style={{
                      fontSize: 10,
                      color: "#aaa",
                  }}>
                      {convertTime(item.time)}
                  </Text>
              </View>
          </View>

      </View>
  )
}







async function deletePost(){
    await deleteImage();
    try{
        firestore().collection('Posts')
        .where('timeStamp', "==", listing.timeStamp).get()
        .then(querySnapshot => {
              firestore().collection('Posts').doc(querySnapshot.docs[0].id).delete();
          })
        }
        catch(e){
        } 
        setpostOptionsModal(false);
        navigation.goBack();
}

    return (
        <>

           
    <Modal
        transparent={true}
        visible={postOptionsModal}
        onRequestClose={() => {
          setpostOptionsModal(!postOptionsModal);
        }}
      >
        <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
          <Animatable.View animation="fadeInUp" duration={500} delay={0} style={{ padding: 20, height:windowHeight-windowWidth,backgroundColor:ColorPallets.backgroundSecondary, borderTopRightRadius: 10, borderTopLeftRadius: 10, elevation: 100 }}>
          <TouchableOpacity onPress={()=>setpostOptionsModal(false)} style={{ backgroundColor:ColorPallets.danger, borderRadius:40, alignSelf:'flex-end', width:50, height:50, margin:10, justifyContent:'center', alignItems:'center'}} >
            <Icon name="close" size={30} color={ColorPallets.buttomTextColor2} />
          </TouchableOpacity>  
            <View style={{flex:1, justifyContent:'flex-end'}}>
            <OptionList bgColor={ColorPallets.danger} iconColor={ColorPallets.buttomTextColor} iconName="delete" textColor={ColorPallets.buttomTextColor} optionTitle="DeletePost" onOptionPress={()=> deletePost()}/>
            </View>
          </Animatable.View>
        </View>
      </Modal>


         <View style={{flex:1, backgroundColor:ColorPallets.backgroundSecondary}}>
            <StatusBar translucent backgroundColor="transparent" />
            <ImageBackground source={{uri:listing.imageUrl}} style={{width:windowWidth, height:windowWidth}}>
           <View style={ {flexDirection:'row', marginVertical:40, marginHorizontal:10,}}>
           <View style={{flex:1,}}>
                    <TouchableOpacity onPress={()=> navigation.goBack()} style={{ justifyContent:'center', alignItems:'center', backgroundColor:"rgba(0,0,0,0.5)", width:60, height:60, borderRadius:30,}}>
                    <Icon name="arrow-left" size={15} color="#fff" />
                    </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=> setpostOptionsModal(true)} style={{ justifyContent:'center', alignItems:'center',  backgroundColor:"rgba(0,0,0,0.2)", width:50, height:50,  borderRadius:25,}}>
            <Icon name="options-vertical" size={20} color="#fff" />

            </TouchableOpacity>
            </View>
            
            <View style={{flex:1, justifyContent:'flex-end', alignItems:'flex-end', padding:10,}}>
            <Text style={{color:"#fff", backgroundColor:'rgba(0,0,0,0.3)', borderRadius:3, fontFamily:Fonts.Default, fontSize:12, paddingHorizontal:10, paddingVertical:5}}>{listing.messageDate.substr(0,15)}</Text>
            </View>
            </ImageBackground>
              
                    <View style={{flex:1, paddingHorizontal:10, padding:10}}>
                        <Text style={{color:ColorPallets.textColor, fontSize:12, fontFamily:Fonts.Default }}>{listing.description}</Text>
                    </View>
          
                    <AutoScrollFlatList
                    inverted
                    showsVerticalScrollIndicator={false}
                    threshold={20}
                    data={messageList}
                    renderItem={renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{ borderTopWidth: 1, backgroundColor: ColorPallets.backgroundSecondary, borderColor: ColorPallets.borderSecondary, flexDirection: 'row', alignItems: 'center', width: "100%", overflow: 'hidden', }}>
                <TextInput
                    multiline={true}
                    value={message}
                    onChangeText={e => setmessage(e)}
                    style={{ flex: 1, paddingHorizontal: 20, color: ColorPallets.textColor, fontFamily: Fonts.Heading }} placeholderTextColor="#aaa" placeholder="Write a comment"
                />

                <Pressable onPress={() => sendMessage()}

                >
                    <LottieView
                        ref={homeAnimation}
                        source={require("../assets/Images/animated/Send.json")}
                        autoPlay={false}
                        loop={false}
                        style={{ height: 60, }}
                        speed={1.5}
                    />
                </Pressable>
            </View>

        </View>
    </>
    );
}
const styles = StyleSheet.create({
    userIcon:{width:50, height:50, borderRadius:25,
    backgroundColor:"#ddd"}
})

export default UserPost;