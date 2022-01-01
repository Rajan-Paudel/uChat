import React,{useState, useEffect} from 'react';
import { Text,TouchableOpacity, StatusBar, View, Image, StyleSheet , FlatList, ActivityIndicator, Dimensions} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import firestore from '@react-native-firebase/firestore';
import ColorPallets from '../config/ColorPallets';
import useStatusBar from '../config/useStatusBar'
import { Fonts } from '../config/Fonts';
const windowWidth = Dimensions.get('window').width;
function UserProfile({navigation}) {
  useStatusBar(ColorPallets.statusBar);
  const [userImage, setuserImage] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [users, setUsers] = useState([]); 


    
      useEffect(() => {

        
    if(userImage == null){
      firestore().collection('userData')
      .where("userid", "==", uid).get()
      .then(querySnapshot => {
        if(querySnapshot.docs[0]){
        setuserImage(querySnapshot.docs[0].data().imageUrl);
        }
        });
      }

    const subscriber = firestore()
      .collection('Posts')
      .where("postSender", "==", uid)
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
         <SafeAreaView style={{padding:10, backgroundColor:ColorPallets.backgroundPrimary, flex:1,}}>
            <StatusBar translucent backgroundColor="transparent" />


            <View>
             
            <View style={{ flexDirection:'row', alignItems:'flex-start', padding:10,}}>
           <TouchableOpacity onPress={ ()=>
               navigation.navigate('ManageProfile')} style={{backgroundColor:ColorPallets.borderSecondary, padding:10,borderRadius:10, alignItems:'center'}}>
            <Image source={{uri:userInfo.imageUrl}} style={styles.userPic}/>
            <Text style={{ color:ColorPallets.textColor, fontFamily:Fonts.Heading, marginTop:10}}>
            {userInfo.username}
           </Text>  
              
             </TouchableOpacity>
           
           
          
            <View style={{ paddingHorizontal:20, flex:1}}>
            <Text style={{color:"#777", fontSize:10, fontFamily:Fonts.Default}}>
               {uid} 
             </Text> 
             <Text style={{color:"#777", fontSize:10, fontFamily:Fonts.Default,}}>
               +91 {userInfo.phone} 
             </Text> 
             <View style={{flexDirection:'row', paddingTop:5, }}>
                <View style= {styles.card}>
                  <Text style={{color:ColorPallets.textColor, fontWeight:"900", fontSize:30}}>
                    {userInfo.connection.length}
                    </Text>
                  <Text style={{color:ColorPallets.subTextColor, fontFamily:Fonts.Heading, fontSize:12}}>Connections</Text>
                </View>
                <View style= {styles.card}>
                <Text style={{color:ColorPallets.textColor, fontWeight:"900", fontSize:30}}>{userInfo.likedPosts.length}</Text>
                  <Text style={{color:ColorPallets.subTextColor, fontFamily:Fonts.Heading, fontSize:12}}>Favourites</Text>
                </View>
                
              </View> 
            </View>

            <TouchableOpacity onPress={ ()=> navigation.navigate('SettingScreen')} style={{ marginHorizontal:10,}}>
              <Icon name="options-vertical" size={25} color={ColorPallets.textColor} />
              </TouchableOpacity>
            </View> 
            </View>


           <View style={{ flexDirection:'row', alignItems:'flex-end', paddingVertical:10,}}>
             
              <Text style={{color:ColorPallets.textColor, fontFamily:Fonts.Heading, flex:1, borderBottomWidth:2, paddingVertical:5, margin:5, borderColor:ColorPallets.borderSecondary, fontFamily:Fonts.MomCake}}>
                Your Posts
              </Text>   
          
            </View>






             <FlatList
        data={users}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'column',
              margin:2,
            }}>
              <TouchableOpacity onPress={()=> navigation.navigate('UserPost', item)}>
            <Image
              style={styles.imageThumbnail}
              source={{uri: item.imageUrl}}
            />
            </TouchableOpacity>

          </View>
        )}
     
        numColumns={3}
        keyExtractor={(item, index) => index}
      /> 


       




        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    userPic:{
        width:60,height:60,
        justifyContent:'center', alignItems:'center',
        borderRadius:30
    },
    imageThumbnail:{

      width:(windowWidth/3) -6,
      height: (windowWidth/3) -6,
    },
    card:{
     marginRight:5, paddingVertical:10, width:"50%", borderRadius:10, justifyContent:'center', alignItems:'center'
    }
})

export default UserProfile;
