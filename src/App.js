import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Routing from "./Components/Routing";



 const App = () => {
  return (  
    <BrowserRouter>
    <Switch>    
      <Route path="/admin" exact component={Login} />
      <Routing />
    </Switch>
    </BrowserRouter>
  )
}

export default App;