import { combineReducers } from "redux";
import { searched_problemsReducer } from "./fetchUserProblems";
import { userReducer } from "./userReducer";

const rootReducer=combineReducers(
    {user: userReducer,
     fetchedProblem: searched_problemsReducer
    }
)

export default rootReducer;