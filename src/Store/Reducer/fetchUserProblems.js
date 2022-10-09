import { FETCH_PROBLEMS, PROB_LOADER } from "../Types/fetchData"

const searched_problems ={
    prob:[],
    probLoader:false
}

export const searched_problemsReducer=(state=searched_problems,action)=>{
    switch(action.type){
        case FETCH_PROBLEMS:
            console.log("reducer",action.problems);
            return {
                ...state,
                prob:action.problems
            }
        case PROB_LOADER:
            return {
                ...state,
                probLoader:action.probLoader
            }
        default:
            return state;

    }
}