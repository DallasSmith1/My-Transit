import React, { useState } from "react";
import Nav from "./Nav";
import Home from "./Home";
import Schedule from "./Schedule";
import Stations from "./Stations";
import Presets from "./Presets";
import TripDetails from "./TripDetails";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App()
{
    const [json, setJSON] = useState({});
    //const [json2, setJSON2] = useState({});


    return(
        <div id="app">
            <Nav />
            <div className="container">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/schedule">
                        <Schedule setJSON={setJSON} />
                    </Route>
                    <Route exact path="/stations">
                        <Stations/>
                    </Route>
                    <Route exact path="/presets">
                        <Presets setJSON={setJSON}/>
                    </Route>
                    <Route exact path="/tripdetails">
                        <TripDetails json={json}/>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default App;