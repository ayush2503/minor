import { Code } from "@mui/icons-material";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../helpers/firebase.js";
import store from "../index.js";
import { FETCH_PROBLEMS, PROB_LOADER, SAVED_PROB_LIST } from "../Types/fetchData";
import "../../helpers/firebase"
export const fetchProblems = async (payload)=>{
    store.dispatch({
        type:PROB_LOADER,
        probLoader:true
    })
    axios.get(`https://codeforces.com/api/user.status?handle=${payload}`)
    .then((res)=>{
        const s = new Set();
        const dis=res.data.result
        let arr = [];  
        let counter =0;
        dis.filter((data) => {
            
            
            let Problems = data.problem.name;
            if (!s.has(Problems)) {
            let ContestID = data.problem.contestId;
            let code = data.problem.index;
            let Rating = data.problem.rating;
            let tags = data.problem.tags;
            let link =`https://codeforces.com/contest/${ContestID}/problem/${code}`
            ++counter
              s.add(Problems);
              arr.push({ Problems, ContestID, Rating,id:counter ,tags, uri:link});
              
            }
          }); 
        //   console.log("arr",arr);    
          store.dispatch({
            type:FETCH_PROBLEMS,
            problems:arr
        
        })
        store.dispatch({
            type:PROB_LOADER,
            probLoader:false
    
        })

    })
}

export const fetchSavedProbList =async (userRef)=>{
    console.log(userRef)
    const dataref=doc(db,"users",userRef)
    const ref = await getDoc(dataref)
    store.dispatch({
        type:SAVED_PROB_LIST,
        savedProbList:ref.data().myProblems
    })
    console.log(ref.data().myProblems);
}