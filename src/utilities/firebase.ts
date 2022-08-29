import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  UserCredential,
  Unsubscribe,
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
  where,
} from 'firebase/firestore';
import { EmployeeInterface, ReviewInterface } from '../interfaces';

const firebaseConfig = {
  apiKey: 'AIzaSyAJclbrG41E62p1kydlqEOladkahvUA5Tw',
  authDomain: 'feedback-app-97086.firebaseapp.com',
  projectId: 'feedback-app-97086',
  storageBucket: 'feedback-app-97086.appspot.com',
  messagingSenderId: '394916244987',
  appId: '1:394916244987:web:1139c4eff80f05a9956f5e',
};

initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();

// Auth
export const createAuthUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential | undefined> => {
  if (email === '' || password === '') return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUser = async (email: string, password: string): Promise<UserCredential | undefined> => {
  if (email === '' || password === '') return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const onAuthStateChangedListener = (callback: Function): Unsubscribe =>
  onAuthStateChanged(auth, callback as NextOrObserver<User>);

export const signOutUser = async (): Promise<void> => await signOut(auth);

// User Api

// TODO replace for getCollectionApi
export const getUsersApi = async (): Promise<EmployeeInterface[]> => {
  const collectionRef = collection(db, 'users');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const usersMap = querySnapshot.docs.reduce(
    (acc: EmployeeInterface[], docSnapshot, index) => {
      const data = docSnapshot.data() as EmployeeInterface;
      data.id = docSnapshot.id;
      data.createdAt = JSON.stringify(data.createdAt); //* to review!
      acc[index] = data;
      return acc;
    },
    []
  );

  return usersMap;
};

// TODO replace for getDocApi
export const getUserApi = async (id: string): Promise<EmployeeInterface> => {
  const docRef = doc(db, 'users', id);

  const docSnapshot = await getDoc(docRef);

  const data = docSnapshot.data() as EmployeeInterface;
  data.id = docSnapshot.id;
  data.createdAt = JSON.stringify(data.createdAt); //* to review!

  return data;
};

export const addUserApi = async (id: string, additionalInformation: object): Promise<void> => {
  const docRef = doc(db, 'users', id);
  const createdAt = new Date();

  await setDoc(docRef, {
    createdAt,
    reviews: [],
    admin: false,
    ...additionalInformation,
  });

};

// TODO replace for updateDocApi
export const updateUserApi = async (id: string, updateParams: object): Promise<void> => {
  const docRef = doc(db, 'users', id);

  await updateDoc(docRef, { ...updateParams });

};

export const deleteUserApi = async (id: string): Promise<void> => {
  const docRef = doc(db, 'users', id);

  await deleteDoc(docRef);


};

// Review Api

// TODO replace for getCollectionApi
export const getReviewsApi = async (admin: boolean, email: string): Promise<ReviewInterface[]> => {
  const collectionRef = collection(db, 'reviews');
  const q = admin
    ? query(collectionRef)
    : query(collectionRef, where('reviewerEmail', '==', email));

  const querySnapshot = await getDocs(q);

  const reviewsMap = querySnapshot.docs.reduce(
    (acc: ReviewInterface[], docSnapshot, index) => {
      const data = docSnapshot.data() as ReviewInterface;
      data.id = docSnapshot.id;
      data.createdAt = JSON.stringify(data.createdAt);
      acc[index] = data;
      return acc;
    },
    []
  );

  return reviewsMap;
};

// TODO replace for getDocApi
export const getReviewApi = async (id: string): Promise<ReviewInterface> => {
  const docRef = doc(db, 'reviews', id);

  const docSnapshot = await getDoc(docRef);

  const data = docSnapshot.data() as ReviewInterface;
  data.id = docSnapshot.id;
  data.createdAt = JSON.stringify(data.createdAt);

  return data;
};

// TODO replace for updateDocApi
export const updateReviewApi = async (id: string, updateParams: object): Promise<void> => {
  const docRef = doc(db, 'reviews', id);

  await updateDoc(docRef, { ...updateParams });
};

export const createReviewApi = async (employee: EmployeeInterface, reviewer: EmployeeInterface): Promise<string> => {
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

  return response.id;
};
