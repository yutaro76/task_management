import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import './App.css'

import Home from "./components/Home";
import User from "./components/User";
import Project from "./components/Project";
import NotFound from "./components/NotFound";

function App() {
  return (
      <BrowserRouter>
        <nav>
          <div className="logo">
            <Link to="/">Project Management</Link>
          </div>
          <ul className="nav-links">
            <Link to="/user">User</Link>
            <Link to="/project">Project</Link>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/project" element={<Project />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default App
