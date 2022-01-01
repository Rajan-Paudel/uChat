import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, FlatList, Image, Modal, StyleSheet, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ColorPallets from '../config/ColorPallets';
import useStatusBar from '../config/useStatusBar'
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import * as Animatable from 'react-native-animatable';
import { Fonts } from '../config/Fonts';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Chats({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [loginModal, setloginModal] = useState(false);

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  useStatusBar(ColorPallets.statusBar);



  useEffect(() => {

    const subscriber = firestore()
      .collection('userData')
      .where('userid', 'in', userInfo.connection)
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
    setFilteredDataSource(users);
    setMasterDataSource(users);
    return () => subscriber();
  });



  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);

    }
  };


  function ItemView({ item }) {
    return (
      <TouchableOpacity onPress={() => {
        // setmodalSearch(false);
        // navigation.navigate('MessageScreen', item);
      }}>
        <Animatable.View
          animation="slideInRight"
          duration={500}
          style={styles.SearchView}>
          <View style={{flexDirection:'row'}}>
            <Image source={{uri:`https://firebasestorage.googleapis.com/v0/b/uchat-f217f.appspot.com/o/${item.userid}?alt=media&token=dae5c037-babf-4f76-8fe5-3ba408937396`}} style={{width:40, height:40, borderRadius:20,}}/>
            <View style={{ marginHorizontal:10, flex:1,}}>
              <Text style={styles.itemStyle}>{item.username}</Text>
              <Text style={styles.subitemStyle}>{item.userid}</Text>
            </View>
            <TouchableOpacity onPress={() => setloginModal(false)} style={{  borderRadius: 25, width: 50, height: 50, margin: 0, justifyContent: 'center', alignItems: 'center' }} >
                <Icon name="bubble" size={30} color={ColorPallets.textColor} />
              </TouchableOpacity>
          </View>
        </Animatable.View>
      </TouchableOpacity>
    );
  };
  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: ColorPallets.borderSecondary,
          marginHorizontal: 10,
        }}
      />
    );
  };



  if (loading) {
    return <ActivityIndicator style={{ paddingVertical: 100, flex: 1, backgroundColor: ColorPallets.backgroundSecondary }} />;
  }


  return (
    <>
      <Modal
        transparent={true}
        visible={loginModal}
        onRequestClose={() => {
          setloginModal(!loginModal);
        }}
      >
        <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: ColorPallets.backgroundPrimary, }}>
          <Animatable.View animation="zoomInUp" duration={500} delay={0}
            style={{ flex: 1, }}>
            <View style={{ flexDirection: 'row', backgroundColor: ColorPallets.backgroundSecondary, borderRadius: 25, overflow: 'hidden' }}>
              <TextInput
                onChangeText={text => searchFilterFunction(text)}
                value={search}
                underlineColorAndroid="transparent"
                style={{ flex: 1, paddingHorizontal: 20 }}
                placeholder="search here" />
              <TouchableOpacity onPress={() => setloginModal(false)} style={{ backgroundColor: ColorPallets.borderSecondary, borderRadius: 25, width: 50, height: 50, margin: 0, justifyContent: 'center', alignItems: 'center' }} >
                <Icon name="close" size={30} color={ColorPallets.textColor} />
              </TouchableOpacity>



            </View>
            <FlatList
              data={filteredDataSource}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ItemView}
            />
          </Animatable.View>
        </SafeAreaView>



      </Modal>
      <View style={{ backgroundColor: ColorPallets.backgroundPrimary, paddingHorizontal: 10, flex: 1, paddingTop: 30, overflow: 'hidden' }}>
        <StatusBar translucent backgroundColor="transparent" />


        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: ColorPallets.textColor, fontFamily: Fonts.Heading, fontSize: 24, padding: 10, flex: 1, }}>Connections </Text>

          <TouchableOpacity onPress={() => setloginModal(true)} style={{ justifyContent: 'center', backgroundColor: ColorPallets.borderSecondary, paddingVertical: 10, paddingHorizontal: 15, margin: 5, borderRadius: 30, flexDirection: 'row' }}>
            <Icon name="user" size={25} color={ColorPallets.textColor} />
            <Icon name="plus" size={10} color={ColorPallets.textColor} />
          </TouchableOpacity>


        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={users}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('ChatScreen', item);
              }}
              style={{ overflow: 'hidden' }}
            >
              <View style={{ borderColor: ColorPallets.borderPrimary, backgroundColor: ColorPallets.borderSecondary, borderRadius: 10, flex: 1, overflow: 'hidden', marginVertical: 5, padding: 15, flexDirection: 'row' }}>

                <View style={{ borderRadius: 50, overflow: 'hidden' }}>

                  <Image source={{ uri: `https://firebasestorage.googleapis.com/v0/b/uchat-f217f.appspot.com/o/${item.userid}?alt=media&token=dae5c037-babf-4f76-8fe5-3ba408937396` }} style={{ width: 50, height: 50, }} />

                </View>
                <Text style={{ color: ColorPallets.textColor, fontFamily: Fonts.Heading, marginHorizontal: 10, }} > {item.username} </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  SearchView: {
    paddingVertical:10,

  },
  itemStyle: {
    padding: 0,
    fontFamily: Fonts.Heading
  },
  subitemStyle: {
    fontSize: 10,
    color: "#aaa",
    fontFamily: Fonts.Default

  },
})
