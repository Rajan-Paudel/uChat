import auth from '@react-native-firebase/auth';

import { Alert } from 'react-native';

const signIn = (email, password) => {
  
  if (email && !password) {
    Alert.alert('Error', 'Please enter Password')
  }
  else if (!email && password) {
    Alert.alert('Error', 'Please enter email')
  }
  else if (!email && !password) {
   Alert.alert('Error', 'Please enter all fields')
  }

  return auth().signInWithEmailAndPassword(email, password)
    .then(() => { })
    .catch(
      err => Alert.alert(err.code, err.message)
    )
}
const signOut = () =>{
  return auth().signOut()

}
const register = (email,password) =>{
  return auth().createUserWithEmailAndPassword(email,password)
}

const Auth = {
  signIn,
  signOut,
  register
}

export default Auth