import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import SignedIn from './SignedIn'
import SignedOut from './SignedOut';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnBoarding from './OnBoarding';
import firestore from '@react-native-firebase/firestore';

 
export default App= () => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [isFirstLaunch, setIsFirstLaunch] = useState();


 
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }


  useEffect( () => {
    
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    AsyncStorage.getItem('AlreadyLaunched').then(value =>{
      if(value==null){
        AsyncStorage.setItem('AlreadyLaunched','true');
        setIsFirstLaunch(true);
      }
      else{
        setIsFirstLaunch(false);
      }
    })
    return subscriber; 
    
  }, []);

  if (initializing) return null;
  
  if (user) {
    uid = user.email;  
    if(uid){
          firestore().collection('userData')
            .where("userid", "==", uid).get()
            .then(querySnapshot => {
              if(querySnapshot.docs[0]){
                userInfo = querySnapshot.docs[0].data();
              }
              });            
      }

      return(
        <SignedIn/>
      )
    }
  else {
    if( isFirstLaunch == null)
    {
      return null;
    }
 else if (isFirstLaunch == true) {
  return(
    <OnBoarding/>
  )
    }
    else{
      return(
        <SignedOut/> 
      )
    }
    
}
}

