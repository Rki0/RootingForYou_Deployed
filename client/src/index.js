import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleWare from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "./_reducers";

const createStoreWithMiddleWare = applyMiddleware(
  promiseMiddleWare,
  ReduxThunk
)(createStore);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {/* <BrowserRouter basename={process.env.NODE_ENV}> */}
      <Provider
        store={createStoreWithMiddleWare(
          Reducer,
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
      >
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
