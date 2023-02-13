import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth'

import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'

import { authentication as auth, db } from '../../firebase.config'

export const FacebookOAuth = async () => {
  const provider = new FacebookAuthProvider()
  provider.addScope('user_link')
  provider.addScope('public_profile')
  provider.addScope('user_location')
  provider.addScope('user_hometown')
  provider.addScope('email')
  provider.addScope('user_birthday')
  provider.addScope('user_friends')
  provider.addScope('user_likes')
  provider.addScope('user_photos')
  provider.addScope('user_videos')
  provider.addScope('user_posts')

  const result = await signInWithPopup(auth, provider)
  const user = result.user

  // Check for user
  const docRef = doc(db, 'users', user.uid)
  const docSnap = await getDoc(docRef)

  // If ∄(user)
  if (!docSnap.exists()) {
    await setDoc(doc(db, 'users', user.uid), {
      name: user.displayName,
      email: user.email,
      timestamp: serverTimestamp(),
    })
  }
}
