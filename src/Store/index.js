import React from "react";
import { createStore ,applyMiddleware,compose} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootreducer from "./Reducer";

const store=createStore(rootreducer,composeWithDevTools())
export default store




