import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Header } from "./Components/Header";
import { MainTable } from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchResult } from "./Components/SearchResult";
import { Converter } from "./Components/Converter";
import { Training } from "./Components/Training";
import { Translator } from "./Components/Translate";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<MainTable />} />
      <Route path="/search-results/:keyword" exact element={<SearchResult />} />
      {/* <Route path="/search-results" element={<SearchResult />} /> */}
      <Route path="/translation" element={<Translator />} />
      <Route path="/training" element={<Training />} />
      <Route path="/converter" element={<Converter />} />
    </Routes>
  </BrowserRouter>
);
