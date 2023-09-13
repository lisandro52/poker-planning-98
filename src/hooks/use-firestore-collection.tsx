import { useCallback, useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import firebaseDB from '../firebase';

interface IFirebaseHandlers {
  addDoc: (data: any) => void;
  setDoc: (id: string, data: any) => void;
  deleteDoc: (id: string) => void;
}

const useFirestoreCollection = (
  collectionName: string
): [any[], IFirebaseHandlers] => {
  const [coll, setColl] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(firebaseDB, collectionName),
      (snapshot) => {
        const dbVotes: any[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          value: doc.data().value,
        }));
        setColl(dbVotes);
      }
    );
    return () => {
      unsub();
    };
  }, [collectionName]);

  const handlers: IFirebaseHandlers = {
    addDoc: useCallback(
      async (data: any) => {
        await addDoc(collection(firebaseDB, collectionName), data);
      },
      [collectionName]
    ),
    setDoc: useCallback(
      async (id: string, data: any) => {
        await setDoc(doc(firebaseDB, collectionName, id), data);
      },
      [collectionName]
    ),
    deleteDoc: useCallback(
      async (id: string) => {
        await deleteDoc(doc(firebaseDB, collectionName, id));
      },
      [collectionName]
    ),
  };

  return [coll, handlers];
};

export default useFirestoreCollection;
