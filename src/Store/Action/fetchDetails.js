import { Code } from "@mui/icons-material";
import axios from "axios";
import store from "../index.js";
import { FETCH_PROBLEMS, PROB_LOADER } from "../Types/fetchData";

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
            let ContestID = data.problem.contestId;
            let code = data.problem.index;
            let link =`https://codeforces.com/contest/${ContestID}/problem/${code}`
        
            if (!s.has(Problems)) {
                ++counter
              s.add(Problems);
              arr.push({ Problems, ContestID, code,id:counter , uri:link});
              
            }
          }); 
          console.log("arr",arr);    
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