import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { 
  getFirestore,
  doc,
  addDoc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  getDocs,
}  from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAJclbrG41E62p1kydlqEOladkahvUA5Tw",
  authDomain: "feedback-app-97086.firebaseapp.com",
  projectId: "feedback-app-97086",
  storageBucket: "feedback-app-97086.appspot.com",
  messagingSenderId: "394916244987",
  appId: "1:394916244987:web:1139c4eff80f05a9956f5e"
};

initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();

// Auth
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUser = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const signOutUser = async () => await signOut(auth);

// User Api

//TODO replace for getCollectionApi
export const getUsersApi = async () => {
  const collectionRef = collection(db, 'users');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const usersMap = querySnapshot.docs.reduce((acc, docSnapshot, index) => {
    const data = docSnapshot.data();
    data.createdAt = data.createdAt.toJSON(); //! issue to fix
    acc[index] = data;
    return acc;
  }, []);

  return usersMap;
};

//TODO replace for getDocApi
export const getUserApi = async (id) => {
  const docRef = doc(db, 'users', id);

  const docSnapshot = await getDoc(docRef);

  const data = docSnapshot.data();
  data.createdAt = data.createdAt.toJSON(); //! issue to fix

  return data;
};

export const addUserApi = async (id, additionalInformation) => {
  const docRef = doc(db, 'users', id); //* remove id from this call
  const createdAt = new Date();

  await setDoc(docRef, {
    id,
    createdAt,
    reviews: [],
    admin: false,
    ...additionalInformation,
  });

  return;
};

//TODO replace for updateDocApi
export const updateUserApi = async (user) => {
  const docRef = doc(db, 'users', user.id);
  delete user.createdAt; //! issue to fix

  await updateDoc(docRef, { ...user });

  return;
};

export const deleteUserApi = async (id) => {
  const docRef = doc(db, 'users', id);

  await deleteDoc(docRef);

  return;
};

// Review Api

//TODO replace for getCollectionApi
export const getReviewsApi = async () => {
  const collectionRef = collection(db, 'reviews');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const reviewsMap = querySnapshot.docs.reduce((acc, docSnapshot, index) => {
    const data = docSnapshot.data();
    data.id = docSnapshot.id;
    data.createdAt = data.createdAt.toJSON();
    acc[index] = data;
    return acc;
  }, []);

  return reviewsMap;
};

//TODO replace for getDocApi
export const getReviewApi = async (id) => {
  const docRef = doc(db, 'reviews', id);

  const docSnapshot = await getDoc(docRef);

  const data = docSnapshot.data();
  data.id = docSnapshot.id;
  data.createdAt = data.createdAt.toJSON(); //! issue to fix

  return data;
};

//TODO replace for updateDocApi
export const updateReviewApi = async (review) => {
  const docRef = doc(db, 'reviews', review.id);
  delete review.createdAt; //! issue to fix

  await updateDoc(docRef, { ...review });

  return;
};

export const createReviewApi = async (employee, reviewer) => {
  const collectionRef = collection(db, 'reviews');
  const createdAt = new Date();

  const response = await addDoc(collectionRef, {
    createdAt,
    employeeName: `${employee.firstName} ${employee.lastName}`,
    employeeJobTitle: employee.jobTitle,
    employeeEmail: employee.email,
    reviewerName: `${reviewer.firstName} ${reviewer.lastName}`,
    reviewerJobTitle: reviewer.jobTitle,
    reviewerEmail: reviewer.email,
    content: '',
    completed: false,
  });

  return response;
};

export const createUserApi = async () => {
  getAuth()
  .createUser({
    email: 'user@example.com',
    emailVerified: false,
    phoneNumber: '+11234567890',
    password: 'secretPassword',
    displayName: 'John Doe',
    photoURL: 'http://www.example.com/12345678/photo.png',
    disabled: false,
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully created new user:', userRecord.uid);
  })
  .catch((error) => {
    console.log('Error creating new user:', error);
  });
}