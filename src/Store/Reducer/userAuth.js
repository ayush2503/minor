import { ADD_PROBLEMS, AUTH_LOADER, IS_USER_AUTHENTICATED, USER_DETAILS } from "../Types/authTypes"

const userAuthDetails={
    isAuthenticated:false,
    userDetails:{},
    authLoader:false
}

 export const authDetails=(state=userAuthDetails,action)=>{

    switch(action.type){
        case IS_USER_AUTHENTICATED:
            return ({
                ...state,
                isAuthenticated:action.ifAuthenticated
            })
        case USER_DETAILS:
                return ({
                    ...state,
                    userDetails: action.userDetails
                })
        case AUTH_LOADER:
            return ({
                ...state,
                authLoader:action.authLoader
            })
        case ADD_PROBLEMS:
            return ({
                ...state,
                userDetails:{...state.userDetails,myProblems:action.myProblems}
            })
        default:
            return({
                ...state
            })
    }
}