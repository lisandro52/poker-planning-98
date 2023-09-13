import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import firebaseDB from '../firebase';

export interface IConfig {
  canVote?: boolean;
  showVotes?: boolean;
}

const usePokerConfig = (team: 'Dev' | 'QA'): [IConfig | undefined, (newConf: IConfig) => void] => {
  const [config, setConfig] = useState<IConfig>();

  useEffect(() => {
    const unsub = onSnapshot(doc(firebaseDB, 'config', `${team}config`), (doc) => {
      setConfig({
        canVote: doc.data()?.canVote,
        showVotes: doc.data()?.showVotes,
      });
    });
    return () => {
      unsub();
    };
  }, [team]);

  const setFirebaseConfig = useCallback(
    async (newConf: IConfig) => {
      await setDoc(doc(firebaseDB, 'config', `${team}config`), {
        ...config,
        ...newConf,
      });
    },
    [config, team]
  );

  return [config, setFirebaseConfig];
};

export default usePokerConfig;
