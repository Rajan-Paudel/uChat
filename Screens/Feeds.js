import React, { useState, useEffect } from 'react';
import { ActivityIndicator , View, Text, FlatList, Image, Dimensions, StatusBar,TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/AntDesign';
import {  TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ColorPallets from '../config/ColorPallets';
import useStatusBar from '../config/useStatusBar'
import { Fonts } from '../config/Fonts';

const windowWidth = Dimensions.get('window').width;
export default function Feeds( {navigation}) {
  const [loading, setLoading] = useState(true); 
  const [users, setUsers] = useState([]);
  useStatusBar(ColorPallets.statusBar);
  useEffect(() => {
    const subscriber = firestore()
      .collection('Posts')
      .where("postSender", "!=", uid)
      .onSnapshot(querySnapshot => {
        const users = [];
  
        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        setUsers(users);
        setLoading(false);
      });
  
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ paddingVertical:100, flex:1, backgroundColor: ColorPallets.backgroundSecondary}}/>;
  }
 
   return (
    <View style={{backgroundColor: ColorPallets.backgroundPrimary, paddingHorizontal:10, flex:1,  overflow:'hidden', paddingTop:25}}>
           <StatusBar translucent backgroundColor="transparent" />
           <View style={{flexDirection:'row'}}>
           <Text style={{color:ColorPallets.textColor, fontFamily:Fonts.Heading, fontSize:24, padding:10, flex:1,}}>Explore </Text>
           
           <TouchableOpacity onPress={()=> console.log("search")} style={{ justifyContent:'center',  backgroundColor: ColorPallets.borderSecondary, paddingVertical:10, paddingHorizontal:15, margin:5, borderRadius:30, flexDirection:'row'}}>
                    <Icon name="search1" size={20} color={ColorPallets.textColor} />
                    </TouchableOpacity>


           </View>
    <FlatList
    showsVerticalScrollIndicator={false}
      data={users}
      renderItem={({ item }) => (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Post', item);
          }}
          style={{overflow:'hidden'}}
          >
        <View style={{ borderWidth:1, borderColor:ColorPallets.borderPrimary, backgroundColor:ColorPallets.backgroundSecondary, borderRadius:10, flex: 1, overflow:'hidden', justifyContent: 'center', marginBottom:20,}}>
               <Image source={{uri:item.imageUrl}} style={{ width: windowWidth -20, height:(windowWidth/2)+100, }}/>
            <View style={{padding:10, flexDirection:'row', alignItems:'center'}}>
            <Icon name="message1" size={22} color={ColorPallets.textColor}/><Text numberOfLines={2} style={{color:ColorPallets.textColor, flex:1, marginHorizontal:10, fontFamily:Fonts.heading, fontSize:12 }}>{item.description}</Text>
                <Image source={{uri:`https://firebasestorage.googleapis.com/v0/b/uchat-f217f.appspot.com/o/${item.postSender}?alt=media&token=d1be559e-a3bf-4a3a-876c-ada92bb9016d`}} style={{ width: 30, height:30, borderRadius:15}}/>
            </View>
        </View>
        </TouchableWithoutFeedback>
      )}
    />
    </View>
  );
}
