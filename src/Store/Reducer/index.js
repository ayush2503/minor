import { combineReducers } from "redux";
import { searched_problemsReducer } from "./fetchUserProblems";
import { authDetails } from "./userAuth";
// import { userReducer } from "./userReducer";

const rootReducer=combineReducers(
    {
        // user: userReducer,
     fetchedProblem: searched_problemsReducer,
     authDetails:authDetails
    }
)

export default rootReducer;