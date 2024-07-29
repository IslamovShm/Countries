import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Countries from "./components/Countries"
import Country from "./components/Country";

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Countries />} />
        <Route path="/countries/:name" element={<Country />} />
      </Routes>
    </Router>
  )
}

export default App
