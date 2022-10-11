import { ADD_PROBLEMS, AUTH_LOADER, IS_USER_AUTHENTICATED, USER_DETAILS } from "../Types/authTypes";
import store from "../index.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import "../../helpers/firebase"
import { toast } from "react-toastify";
import { collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../helpers/firebase";
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const check=(payload)=>{
    if(auth.currentUser){
       return store.dispatch({
            type:IS_USER_AUTHENTICATED,
            ifAuthenticated:true
        })
    }
    else{
   store.dispatch({
    type:IS_USER_AUTHENTICATED,
    ifAuthenticated:false
   })}
}

export const reinitialiseStates=async (email)=>{
    console.log("here");
    const q = query(collection(db, "users"), where("email", "==", email));
    const queryResult = await getDocs(q)
    // store.dispatch({
    //     type:USER_DETAILS,
    //     userDetails:{accessToken,displayName,email,photoURL,uid,ref,myProblems:[]}
    // })
    queryResult.forEach((doc)=>
     store.dispatch({
        type:USER_DETAILS,
        userDetails:{...doc.data(),ref:doc.id}
    })
    
    )
    // console.log(queryResult)
}
export const loginAction= async ()=>{
    store.dispatch({
        type:AUTH_LOADER,
        authLoader:true
    })
    signInWithPopup(auth, provider)
  .then(async (result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const {accessToken,displayName,email,photoURL,uid} = result.user;
    // console.log(user);
    const q = query(collection(db, "users"), where("email", "==", email));
    const queryResult = await getDocs(q)
    let ref;
    console.log("ch",queryResult.docs.length);
    // console.log(queryResult)
    if(!queryResult.docs.length){
    const docref = await addDoc(collection(db, "users"), {
        accessToken,
        displayName,
        email,
        photoURL,
        uid,
        myProblems:[]
      });
      ref=docref.id
      console.log(docref);

      store.dispatch({
          type:USER_DETAILS,
          userDetails:{accessToken,displayName,email,photoURL,uid,ref,myProblems:[]}
      })
    }
    else{
        reinitialiseStates(email)
    }
    store.dispatch({
        type:IS_USER_AUTHENTICATED,
        ifAuthenticated:true
       })
    store.dispatch({
        type:AUTH_LOADER,
        authLoader:false
    })
    toast.success("Successfully Logged in !!")
    console.log(auth.currentUser)
    // ...
  }).catch((error) => {
    store.dispatch({
        type:IS_USER_AUTHENTICATED,
        ifAuthenticated:false
       })
    store.dispatch({
        type:AUTH_LOADER,
        authLoader:false
    })
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error("Error , Please try login after some time")
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
    
    

}

export const logoutAction= async ()=>{
    store.dispatch({
        type:AUTH_LOADER,
        authLoader:true
    })
    signOut(auth).then(() => {
        // Sign-out successful.
        if(!auth.currentUser){
            store.dispatch({
                type:USER_DETAILS,
                userDetails:{}
            })
        
        store.dispatch({
            type:IS_USER_AUTHENTICATED,
            ifAuthenticated:false
           })

           toast.success("Successfully Logged out !!")
        }
        console.log(auth.currentUser);
        store.dispatch({
            type:AUTH_LOADER,
            authLoader:false
        })
      }).catch((error) => {
        store.dispatch({
            type:AUTH_LOADER,
            authLoader:false
        })
        // An error happened.
       
      });
   
}


export const checkRef=async ()=>{
    // console.log((doc('9dB0gugcBvl3k93CfjXq'));
    const dataref=doc(db,"users","9dB0gugcBvl3k93CfjXq")
   
    await updateDoc(dataref, {
        myProblems: [1,2,3]
      });
    const ref = await getDoc(dataref)
    console.log(ref.data());
}


export const addProblems=async ({selection,current,ref})=>{
    console.log("action+++",ref);

    const dataref=doc(db,"users",ref)
    store.dispatch({
        type:AUTH_LOADER,
        authLoader:true
    })
    if(current.length===0){
        await updateDoc(dataref, {
            myProblems: selection
          });
        store.dispatch({
            type : ADD_PROBLEMS,
            myProblems:selection 
        })

    }
    else{
      const s = new Set();
      let arr=current
    //   let counter=current.length
      current.forEach((elem)=>s.add(elem.Problems))
      selection.forEach((elem)=>{
          if(!s.has(elem.Problems)){
            // ++counter;
            s.add(elem.Problems)
            arr.push(elem)
          }
      })
      await updateDoc(dataref, {
        myProblems: arr
      });
      store.dispatch({
        type : ADD_PROBLEMS,
        myProblems:arr 
    })

    }
    store.dispatch({
        type:AUTH_LOADER,
        authLoader:false
    })
    toast.success("Selected Problems added to the list.")
    
    // store.dispatch({
    //         type : ADD_PROBLEMS,
    //         myProblems:payload
        
    // })
}