
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from "firebase/firestore";

// 注意：在实际生产环境中，以下配置应通过 process.env 获取
// 如果您没有提供具体的配置，应用将退回到本地存储模式
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForArchitecture",
  authDomain: "master-numerology.firebaseapp.com",
  projectId: "master-numerology",
  storageBucket: "master-numerology.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

let db: any = null;
try {
  // 仅在有配置时初始化
  if (firebaseConfig.apiKey !== "AIzaSyDummyKeyForArchitecture") {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
} catch (e) {
  console.warn("Firebase 初始化失败，将仅使用本地存储。");
}

export const logToCloud = async (data: {
  input: {
    phone: string;
    bazi: string;
    gender: string;
    job: string;
    req: string;
  };
  output: {
    score: number;
    recommendedNumbers: string[];
    fullText: string;
  };
}) => {
  if (!db) return null;

  try {
    const docRef = await addDoc(collection(db, "analysis_logs"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (e) {
    console.error("上传云端日志失败:", e);
    return null;
  }
};

export const fetchCloudLogs = async () => {
  if (!db) return [];
  try {
    const q = query(collection(db, "analysis_logs"), orderBy("createdAt", "desc"), limit(20));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("获取云端日志失败:", e);
    return [];
  }
};

export const isFirebaseEnabled = () => db !== null;
