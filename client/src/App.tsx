import React from 'react';
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import './App.scss';
import "./../node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss";
import "./../node_modules/@fortawesome/fontawesome-free/scss/solid.scss";
import { getJSONData } from "./Tools/Toolkit";
import { JSONData, Technology } from "./Tools/data.model";

import Error from "./Error/Error";
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";
import List from "./List/List";
import Tech from "./Tech/Tech";

// const RETRIEVE_SCRIPT:string = "http://localhost:8080/get";
const RETRIEVE_SCRIPT:string = "/get";

function App() {
  // ---------------------------------------------- history
  

  // ---------------------------------------------- event handlers
  const onResponse = (result:JSONData) => {
    setTechnologies(result.technologies);
    console.log(result.technologies);
    setLoading(false);
  };

  const onError = () => console.log("*** Error has occured during AJAX data transmission");

  // ---------------------------------------------- lifecycle hooks
  React.useEffect(() => {
    getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
  }, []);

  // --------------------------------------------- state setup
  const [technologies, setTechnologies] = React.useState<Technology[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true); 

  return (
    <div className="main">
      <LoadingOverlay bgColor="#a72f57" spinnerColor="#FFFFFF" enabled={loading} />

      <div className="header">_Technology Roster</div>

      {(technologies.length > 0) ?
      <Switch>
        <Route
          path="/"
          render={() => <List technologies={technologies} />}
          exact />

        <Route
          path="/list"
          render={() => <List technologies={technologies} />}
          />
        
        <Route
          path="/tech/:id"
          render={() => <Tech technologies={technologies} />}
          />

        <Route render={() => <Error />} />
      </Switch>
      :
      <div>There are currently no technologies in the database :(</div>}

      <div className="footer">Technology descriptions by <a href="https://wikipedia.com" target="_blank" rel="noopener noreferrer">wikipedia</a></div>
    </div>
  );
}

export default App;
