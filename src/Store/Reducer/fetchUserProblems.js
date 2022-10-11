import { FETCH_PROBLEMS, PROB_LOADER, SAVED_PROB_LIST } from "../Types/fetchData"

const searched_problems ={
    prob:[],
    probLoader:false,
    savedProbList:[]
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
        case SAVED_PROB_LIST:
            return {
                ...state,
                savedProbList:action.savedProbList
            }
        default:
            return state;

    }
}