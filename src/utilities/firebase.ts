import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
  User,
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
import { EmployeeInterface, ReviewInterface } from '../interfaces';

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
export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUser = async (email: string, password: string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

export const signOutUser = async () => await signOut(auth);

// User Api

//TODO replace for getCollectionApi
export const getUsersApi = async () => {
  const collectionRef = collection(db, 'users');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const usersMap = querySnapshot.docs.reduce((acc: EmployeeInterface[], docSnapshot, index) => {
    const data = docSnapshot.data() as EmployeeInterface;
    data.createdAt = JSON.stringify(data.createdAt); //! issue to fix
    acc[index] = data;
    return acc;
  }, []);

  return usersMap;
};

//TODO replace for getDocApi
export const getUserApi = async (id: string) => {
  const docRef = doc(db, 'users', id);

  const docSnapshot = await getDoc(docRef);

  const data = docSnapshot.data() as EmployeeInterface;
  data.createdAt = JSON.stringify(data.createdAt); //! issue to fix

  return data;
};

export const addUserApi = async (id: string, additionalInformation: Object) => {
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
export const updateUserApi = async (id: string, updateParams: object) => {
  const docRef = doc(db, 'users', id);

  await updateDoc(docRef, { ...updateParams });

  return;
};

export const deleteUserApi = async (id: string) => {
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

  const reviewsMap = querySnapshot.docs.reduce((acc: ReviewInterface[], docSnapshot, index) => {
    const data = docSnapshot.data() as ReviewInterface;
    data.id = docSnapshot.id;
    data.createdAt = JSON.stringify(data.createdAt);
    acc[index] = data;
    return acc;
  }, []);

  return reviewsMap;
};

//TODO replace for getDocApi
export const getReviewApi = async (id: string) => {
  const docRef = doc(db, 'reviews', id);

  const docSnapshot = await getDoc(docRef);

  const data = docSnapshot.data() as ReviewInterface;
  if (data) {
    data.id = docSnapshot.id;
    data.createdAt = JSON.stringify(data.createdAt);
  }

  return data;
};

//TODO replace for updateDocApi
export const updateReviewApi = async (id: string, updateParams: object) => {
  const docRef = doc(db, 'reviews', id);

  await updateDoc(docRef, { ...updateParams });

  return;
};

export const createReviewApi = async (employee: EmployeeInterface, reviewer: EmployeeInterface) => {
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