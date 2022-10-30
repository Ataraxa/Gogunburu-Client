import "../CSS/header.css";
import icon from "../assets/favicon.ico";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ConnectionPopupMenu } from "./LoginSystem";
import { ProfilePopUpMenu } from "./ProfilePopupMenu";
import { supabase } from "../utils/supabase_api";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";

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
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

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

  const changeInput = ({ target: { value } }) => {
    setSearchInput(value);
  };

  const handleSearch = () => {
    console.log("Hello world");
    navigate(`/search-results/${searchInput}`);
  };

  const handleKeyPress = (target) => {
    if (target.charCode === 13) {
      navigate(`/search-results/${searchInput}`);
    }
  };

  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="#FFFFFF"
        variant="dark"
        style={{ width: "100%" }}
      >
        <Container className="mx-5 justify-content-end">
          <Link to="/">
            <Navbar.Brand href="#home">
              <img class="hvr-shrink logo-item" src={icon} alt="" />
              <span class="hvr-shrink logo-item" id="name">
                NihonGogombre
              </span>
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">
              <Link className="mx-3 nav-link" to="/converter">
                Converter
              </Link>
              <Link className="mx-3 nav-link" to="/translation">
                Translator
              </Link>

              <NavDropdown
                title="Kanji"
                className="mx-3"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">
                  Add Kanji
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.1">Reading</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Writing</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Meaning</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Enter a word..."
                className="me-2"
                aria-label="Search"
                onChange={changeInput}
                value={searchInput}
                onKeyPress={handleKeyPress}
              />
              <Button variant="outline-light" onClick={handleSearch}>
                Search
              </Button>
            </Form>
            <Nav>
              <NavDropdown
                title={username}
                className="mx-3"
                id="collasible-nav-dropdown"
                align="end"
              >
                {/* <div>
                  <button class="profileToggleBtn" onClick={ProfileClick}>
                    {username !== undefined ? username : "N/A"}
                  </button>
                </div> */}

                <NavDropdown.Item>
                  {mode === "not-connected" ? (
                    <ConnectionPopupMenu setUsername={setUsername} />
                  ) : (
                    <ProfilePopUpMenu setMode={setMode} />
                  )}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
