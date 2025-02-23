import { auth, db } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { loginStart, loginSuccess, loginFailure, logout } from '../redux/slices/authSlice';

const signUp = (name, email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      uid: userCredential.user.uid,
      name,
      email,
      profilePicture: '',
      bio: '',
      
    });
    dispatch(loginSuccess(userCredential.user)); // 🔥 Save to Redux and AsyncStorage
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

const signIn = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(loginSuccess(userCredential.user)); // 🔥 Save to Redux and AsyncStorage
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logout()); // 🔥 Clear user from Redux and AsyncStorage
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export { signUp, signIn, logoutUser };
