import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '../../firebase/firestore';

// Create a post in the specified collection
export const createPost = async (collectionName: string, data: any) => {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

// Get posts filtered by district (client-side filter fallback)
export const getPostsByDistrict = async (collectionName: string, district: string) => {
  const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  const allPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return allPosts.filter((p: any) => p.fromDivision === district || p.toDivision === district || p.district === district);
};

// Generic CRUD helpers
export const addDocument = async (collectionName: string, data: any) => {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getDocument = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);
  const snap = await getDoc(docRef);
  if (snap.exists()) return { id: snap.id, ...snap.data() };
  return null;
};

export const updateDocument = async (collectionName: string, id: string, data: any) => {
  await updateDoc(doc(db, collectionName, id), data);
};

export const deleteDocument = async (collectionName: string, id: string) => {
  await deleteDoc(doc(db, collectionName, id));
};

export const queryCollection = async (collectionName: string, constraints: QueryConstraint[]) => {
  const q = query(collection(db, collectionName), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
