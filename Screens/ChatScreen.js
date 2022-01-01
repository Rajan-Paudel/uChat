import React, { useRef, useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Pressable, FlatList, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import ColorPallets from '../config/ColorPallets';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import LottieView from 'lottie-react-native';

import { Fonts } from '../config/Fonts';
import { firebase } from '@react-native-firebase/database'
import {AutoScrollFlatList} from "react-native-autoscroll-flatlist";
function ChatScreen({ route, navigation }) {
  const listing = route.params;
  const [message, setmessage] = useState();
  const [messageList, setmessageList] = useState([]);
  const homeAnimation = useRef();
  const playAnimation = () => {
    homeAnimation.current.play(20, 132);
  }
  const pressAnimation = () => {
    homeAnimation.current.play(0, 0);
  }

 function sendMessage() {
    Keyboard.dismiss();
    pressAnimation()
    playAnimation()
    if (message.length > 0) {
      let msgId = firebase.database().ref('messages').child(`${userInfo.phone}`).child(`${listing.phone}`).push().key;
      let updates = {};
      let messageData = {
        messageText: message,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: userInfo.phone,
      }
      updates['messages/' + userInfo.phone + '/' + listing.phone + '/' + msgId] = messageData;
      updates['messages/' + listing.phone + '/' + userInfo.phone + '/' + msgId] = messageData;
      firebase.database().ref().update(updates);
      setmessage(null)
    }
  }

  useEffect(() => {
    firebase.database().ref('messages').child(`${userInfo.phone}`).child(`${listing.phone}`)
      .on('child_added', (value) => {
        setmessageList((prevState) => {
          return (
            [...prevState, value.val()]
          )
        })
      })
  }, []);

  function convertTime (time){
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '')+d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0':'') + d.getMinutes();

    if(c.getDay() !== d.getDay()){
      result = d.getDay() + '/' + d.getMonth()+ '   ' + result;
    } 

    return result;
  }

 var renderRow = ({ item }) => {
    return (
      <View
        style={{
          padding:10,
          maxWidth: '60%',
          alignSelf: item.from === userInfo.phone ? 'flex-end' : 'flex-start',
          backgroundColor: item.from === userInfo.phone ? ColorPallets.primary : ColorPallets.secondary,
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
  
        <Text style={{color: "#fff", fontFamily:Fonts.Default,
      alignSelf: item.from === userInfo.phone ? 'flex-start' : 'flex-end',
      paddingLeft: item.from === userInfo.phone ? 0 : 30,
      paddingRight: item.from === userInfo.phone ? 30 : 0,
      }}>
          {item.messageText}
        </Text>
        <Text style={{
          color: item.from === userInfo.phone ? "#eee" : "#fff",
          alignSelf: item.from === userInfo.phone ? 'flex-end' : 'flex-start',
          fontFamily:Fonts.Default,fontSize:10,
          marginTop:5
        }}>
          {convertTime(item.time)}
        </Text>

      </View>
    )
  }


  return (
    <SafeAreaView style={{ paddingHorizontal: 10, backgroundColor: ColorPallets.backgroundSecondary, flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, }}>



        <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPallets.backgroundPrimary, padding: 15, borderRadius: 30, }}>
          <Icon name="arrow-left" size={15} color={ColorPallets.textColor} />
        </TouchableOpacity>




        <View style={{ flex: 1, alignItems: 'flex-end', marginHorizontal: 10, }}>
          <Text style={{ color: ColorPallets.textColor, fontFamily: Fonts.Heading }}>{listing.username}</Text>
          <Text style={{ color: "#aaa", fontSize: 12, fontFamily: Fonts.Default }} >{listing.userid}</Text>
        </View>
        <View style={{ borderRadius: 25, overflow: 'hidden' }}>

          <Image source={{ uri: `https://firebasestorage.googleapis.com/v0/b/uchat-f217f.appspot.com/o/${listing.userid}?alt=media&token=dae5c037-babf-4f76-8fe5-3ba408937396` }} style={{ width: 50, height: 50, }} />

        </View>

      </View>
      <View style={{ flex: 1 }}>

        <AutoScrollFlatList
        showsVerticalScrollIndicator={false}
        threshold={20}
          data={messageList}
          renderItem={renderRow}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={{ borderWidth: 2, borderColor: ColorPallets.borderSecondary, flexDirection: 'row', alignItems: 'center', backgroundColor: ColorPallets.backgroundPrimary, borderRadius: 50, width: "100%", overflow: 'hidden', marginVertical: 10, }}>
        <TextInput
          multiline={true}
          value={message}
          onChangeText={e => setmessage(e)}
          style={{ flex: 1, paddingHorizontal: 20, color: ColorPallets.textColor, fontFamily: Fonts.Heading }} placeholderTextColor="#aaa" placeholder="Write Message" />

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
    </SafeAreaView>
  );
}

export default ChatScreen;