import * as React from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import GlobalStyle from './theme/Global';
import {Notification} from "./context/Notification";
import Popup from "./components/Notification/Popup";

import Homepage from './pages/Homepage'
import Game from './pages/Game'
import MissingPage from './pages/404'

function App() {
  return (<>
        <Notification>
          <Router>
            <GlobalStyle/>
            <Popup/>
            <Routes>
              <Route path="/" element={<Homepage/>}/>
              <Route path="/game" element={<Game/>}/>
              <Route element={<MissingPage/>}/>
            </Routes>
          </Router>
        </Notification>
      </>
  );
}

export default App;
