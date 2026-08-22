import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  runTransaction,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const COLLECTIONS={
  rollplay:"leaderboards_rollplay",
  "3000":"leaderboards_3000",
  "9000":"leaderboards_9000"
};

window.BNP_FIREBASE_STATUS="local";

function emitStatus(status,error=null){
  window.BNP_FIREBASE_STATUS=status;
  window.dispatchEvent(new CustomEvent("bnp-firebase-status",{
    detail:{status,error:error?String(error):null}
  }));
}

function configLooksReady(cfg){
  if(!cfg || typeof cfg!=="object")return false;
  const required=["apiKey","authDomain","projectId","appId"];
  return required.every(key=>{
    const value=String(cfg[key]||"");
    return value && !value.includes("PASTE_") && !value.includes("PASTE_PROJECT");
  });
}

async function ensureAnonymousUser(auth){
  if(auth.currentUser)return auth.currentUser;

  return await new Promise((resolve,reject)=>{
    let settled=false;
    const unsubscribe=onAuthStateChanged(auth,async user=>{
      if(settled)return;
      settled=true;
      unsubscribe();

      if(user){
        resolve(user);
        return;
      }

      try{
        const cred=await signInAnonymously(auth);
        resolve(cred.user);
      }catch(e){
        reject(e);
      }
    },reject);
  });
}

try{
  const cfg=window.BNP_FIREBASE_CONFIG;

  if(!configLooksReady(cfg)){
    emitStatus("local");
  }else{
    const app=initializeApp(cfg);
    const auth=getAuth(app);
    const db=getFirestore(app);
    const user=await ensureAnonymousUser(auth);

    window.firebaseLeaderboardFetch=async function(mode){
      const collectionName=COLLECTIONS[mode];
      if(!collectionName)throw new Error("Unknown leaderboard mode.");

      const q=query(
        collection(db,collectionName),
        orderBy("score","desc"),
        limit(20)
      );

      const snap=await getDocs(q);
      return snap.docs.map(d=>{
        const data=d.data()||{};
        return{
          id:d.id,
          name:String(data.name||"PLAYER").slice(0,13),
          score:Number(data.score||0),
          uid:String(data.uid||"")
        };
      }).filter(row=>Number.isFinite(row.score));
    };

    window.firebaseLeaderboardSubmit=async function(mode,name,score){
      const collectionName=COLLECTIONS[mode];
      if(!collectionName)throw new Error("Unknown leaderboard mode.");

      const cleanName=String(name||"PLAYER").slice(0,13);
      const cleanScore=Math.max(0,Math.floor(Number(score)||0));
      const ref=doc(db,collectionName,user.uid);

      return await runTransaction(db,async transaction=>{
        const current=await transaction.get(ref);

        if(current.exists()){
          const oldScore=Number(current.data()?.score||0);
          if(cleanScore<oldScore){
            return{saved:false,best:oldScore};
          }
        }

        transaction.set(ref,{
          uid:user.uid,
          name:cleanName,
          score:cleanScore,
          mode,
          updatedAt:serverTimestamp()
        });

        return{saved:true,best:cleanScore};
      });
    };

    emitStatus("online");
  }
}catch(error){
  console.error("BNP Firebase leaderboard setup failed:",error);
  emitStatus("error",error);
}
