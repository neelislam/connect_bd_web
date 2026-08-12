import { collection, addDoc, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "./clientApp";

export const createPost = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const getPostsByDistrict = async (collectionName: string, district: string) => {
  const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  const allPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  // Filter client side due to array/or query limitations in basic firestore setup
  return allPosts.filter((p: any) => 
    p.fromDivision === district || p.toDivision === district || p.district === district
  );
};