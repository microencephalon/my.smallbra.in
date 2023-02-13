

import {  signInWithPopup,
  OAuthProvider,
} from 'firebase/auth'

import {  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp} from 'firebase/firestore'

import { authentication as auth, db } from '../../firebase.config'


export const MicrosoftOAuth = async () => {
  
const provider = new OAuthProvider('microsoft.com')
provider.setCustomParameters({ prompt: 'consent' });


const result = await signInWithPopup(auth, provider)
const user = result.user;

// Check for user
const docRef = doc(db, 'users', user.uid)
const docSnap = await getDoc(docRef)

// If ∄(user)
if(!docSnap.exists()) {
await setDoc(doc(db, 'users', user.uid), {
name: user.displayName,
email: user.email,
timestamp: serverTimestamp()
})
}

}