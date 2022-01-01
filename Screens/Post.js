import React, { useState, useEffect, useRef } from 'react';
import { View, StatusBar, ImageBackground, Dimensions, TouchableOpacity, Image, Text, StyleSheet, Pressable, TextInput, Keyboard,FlatList } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
const windowWidth = Dimensions.get('window').width;
import firestore from '@react-native-firebase/firestore';
import ColorPallets from '../config/ColorPallets';
import useStatusBar from '../config/useStatusBar'
import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";
import { Fonts } from '../config/Fonts';
import LottieView from 'lottie-react-native';
import { firebase } from '@react-native-firebase/database'
function Post({ route, navigation }) {
    const listing = route.params;
    useStatusBar(ColorPallets.statusBar);
    const [userImage, setuserImage] = useState(null);
    const [checkConnection, setcheckConnection] = useState();
    const [checkLiked, setcheckLiked] = useState();
    const [message, setmessage] = useState();
    const [messageList, setmessageList] = useState([]);



    const homeAnimation = useRef();
    const playAnimation = () => {
        homeAnimation.current.play(20, 132);
    }
    const pressAnimation = () => {
        homeAnimation.current.play(0, 0);
    }

    useEffect(() => {


        if (!userImage) {
            firestore().collection('userData')
                .where('userid', "==", listing.postSender).get()
                .then(querySnapshot => {
                    setuserImage(querySnapshot.docs[0].data().imageUrl);
                });
        }



        if (!checkLiked) {
            firestore().collection('userData')
                .where('userid', "==", uid).get()
                .then(querySnapshot => {
                    for (var i = 0; i < querySnapshot.docs[0].data().likedPosts.length; i++) {
                        if (querySnapshot.docs[0].data().likedPosts[i] === listing.timeStamp) {
                            setcheckLiked(listing.timeStamp);
                        }
                    }

                });
        }

        if (!checkConnection) {
            firestore().collection('userData')
                .where('userid', "==", uid).get()
                .then(querySnapshot => {
                    for (var i = 0; i < querySnapshot.docs[0].data().connection.length; i++) {
                        if (querySnapshot.docs[0].data().connection[i] === listing.postSender) {
                            setcheckConnection(listing.postSender);
                        }
                    }

                });
        }


        firebase.database().ref('comments').child(`${listing.timeStamp}`)
            .on('child_added', (value) => {
                setmessageList((prevState) => {
                    return (
                        [...prevState, value.val()]
                    )
                })
            })

    }, []);

    function followUser() {

        firestore().collection('userData')
            .where("userid", "==", uid).get()
            .then(querySnapshot => {
                firestore().collection('userData').doc(querySnapshot.docs[0].id).update({ connection: firebase.firestore.FieldValue.arrayUnion(listing.postSender) });
            })
        setcheckConnection(listing.postSender);
    }


    function likePost() {
        firestore().collection('userData')
            .where("userid", "==", uid).get()
            .then(querySnapshot => {
                firestore().collection('userData').doc(querySnapshot.docs[0].id).update({ likedPosts: firebase.firestore.FieldValue.arrayUnion(listing.timeStamp) });
            })
        setcheckLiked(listing.timeStamp);
    }






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


    return (
        <View style={{ flex: 1, backgroundColor: ColorPallets.backgroundSecondary }}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={{ flex: 1 }} >
                <ImageBackground source={{ uri: listing.imageUrl }} style={{ width: windowWidth, height: windowWidth }}>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 40, marginLeft: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(0,0,0,0.5)", width: 60, height: 60, borderRadius: 30, }}>
                        <Icon name="arrow-left" size={15} color="#fff" />
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 10, }}>
                        {checkLiked ?
                            <TouchableOpacity style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPallets.danger, width: 60, height: 60, borderRadius: 30, }}>
                                <Icon name="heart" size={15} color="#fff" />
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => likePost()} style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(0,0,0,0.5)", width: 60, height: 60, borderRadius: 30, }}>
                                <Icon name="heart" size={15} color="#fff" />
                            </TouchableOpacity>
                        }
                    </View>
                </ImageBackground>
               
                    

              
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                    <View style={{flex: 1,}}>
                    <Text style={{ color: ColorPallets.primary, fontFamily: Fonts.Heading,}}>{listing.senderName}</Text>
                    <Text style={{ color: ColorPallets.textColor, fontSize: 14, fontFamily: Fonts.Default, fontSize: 12, lineHeight: 18, alignSelf: 'flex-start' }}>{listing.description}</Text>
                    <Text style={{ color: ColorPallets.subTextColor, fontSize: 12, fontFamily: Fonts.Default, textAlignVertical: "top" }}>{listing.messageDate.substr(0, 15)}</Text>
                    </View>

                    <View style={{ backgroundColor: ColorPallets.borderSecondary, flexDirection: 'row', borderRadius: 25, marginHorizontal: 10, alignSelf:'flex-start' }}>
                        {!checkConnection ?
                            <TouchableOpacity onPress={() => followUser()} style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPallets.borderSecondary }} >
                                <Icon name="plus" size={20} color={ColorPallets.textColor} />
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => followUser()} style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPallets.borderSecondary }} >
                                <Icon name="user-following" size={20} color={ColorPallets.textColor} />
                            </TouchableOpacity>
                        }
                        <Image source={{ uri: userImage }} style={styles.userIcon} />
                    </View>

                </View>




                <AutoScrollFlatList
                    inverted
                    showsVerticalScrollIndicator={false}
                    threshold={20}
                    data={messageList}
                    renderItem={renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
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
    );
}
const styles = StyleSheet.create({
    userIcon: {
        width: 40, height: 40, borderRadius: 20,
    }
})

export default Post;