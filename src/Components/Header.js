import "../CSS/header.css";
import icon from "../assets/favicon.ico";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ConnectionPopupMenu } from "./LoginSystem";
import { ProfilePopUpMenu } from "./ProfilePopupMenu";
import { supabase } from "../utils/supabase_api";

export function SearchBar() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleSearch = (e) => {
    if (e.which === 13) {
      console.log(searchInput);
      navigate(`/search-results/${searchInput}`);
      window.location.reload();
    }
  };

  return (
    <input
      id="searchBar"
      type="text"
      placeholder="Search on jisho..."
      onKeyPress={handleSearch}
      onChange={handleChange}
      value={searchInput}
      autoComplete="off"
    />
  );
}

export function ProfileClick() {
  document.querySelector(".profilePopUp").classList.toggle("hidden");
}

export function Header() {
  const [mode, setMode] = useState();
  const [username, setUsername] = useState();

  supabase.auth.onAuthStateChange((event, session) => {
    if (session === null) {
      setMode("not-connected");
      setUsername("N/A");
    } else {
      setMode("connected");
      setUsername(session.user.user_metadata.username);
    }
  });

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUsername(
        user?.user_metadata?.username === undefined
          ? "N/A"
          : user?.user_metadata?.username
      );
      user !== null ? setMode("connected") : setMode("not-connected");
    };
    fetchCurrentUser();
  }, []);

  return (
    <header>
      <div id="logo">
        <Link to="/">
          <div class="inner-logo">
            <img class="hvr-shrink logo-item" src={icon} alt="" />
            <div class="hvr-shrink logo-item" id="name">
              NihonGogombre
            </div>
          </div>
        </Link>
      </div>
      <div class="onglets">
        <ul>
          <li>
            <Link to="/training">Training</Link>
          </li>
          <li>
            <Link to="/converter">Converter</Link>
          </li>
          <li>
            <Link to="/translation">Translator</Link>
          </li>
        </ul>
      </div>
      <SearchBar />
      <div>
        <button class="profileToggleBtn" onClick={ProfileClick}>
          {username !== undefined ? username : "N/A"}
        </button>
      </div>

      <div class="profilePopUp">
        {mode === "not-connected" ? (
          <ConnectionPopupMenu setUsername={setUsername} />
        ) : (
          <ProfilePopUpMenu setMode={setMode} />
        )}
      </div>
    </header>
  );
}
