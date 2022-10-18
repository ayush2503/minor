import { FETCH_PROBLEMS, MY_PROB_LOADER, PROB_LOADER, SAVED_PROB_LIST } from "../Types/fetchData"

const searched_problems ={
    prob:[],
    probLoader:false,
    savedProbList:[],
    myProbLoader:false
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
        case MY_PROB_LOADER:
            return {
                ...state,
                myProbLoader:action.myProbLoader
            }
        case SAVED_PROB_LIST:
            return {
                ...state,
                savedProbList:action.savedProbList
            }
        default:
            return state;

    }
}