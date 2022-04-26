import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.css';
import "./App.css";

import Movies from "./components/Movies";
import {MOVIE_TITLE} from "./generics/constants/movie";
import AddMovie from "./components/AddMovie";
import AddClient from "./components/AddClient";
import {CLIENT_TITLE} from "./generics/constants/client";
import Clients from "./components/Clients";
import Rentals from "./components/Rentals";
import AddRental from "./components/AddRental";
import {RENTAL_TITLE} from "./generics/constants/rental";
import Reports from "./components/Reports";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/movies"} className="nav-link">
              {MOVIE_TITLE}
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/clients"} className="nav-link">
              {CLIENT_TITLE}
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/rentals"} className="nav-link">
              {RENTAL_TITLE}
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/reports"} className="nav-link">
              Relatórios
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/movies" element={<Movies/>} />
          <Route path="/rentals" element={<Rentals/>} />
          <Route path="/clients" element={<Clients/>} />
          <Route path="/reports" element={<Reports/>} />
          <Route path="/rentals/new" element={<AddRental/>} />
          <Route path="/movies/new" element={<AddMovie/>} />
          <Route path="/clients/new" element={<AddClient/>} />
          <Route path="/clients/:id" element={<AddClient/>} />
          <Route path="/movies/:id" element={<AddMovie/>} />
          <Route path="/rentals/:id" element={<AddRental/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
