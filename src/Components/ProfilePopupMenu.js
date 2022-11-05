import { supabase } from "../utils/supabase_api";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";

export function ProfilePopUpMenu(props) {
  const setMode = props.setMode;

  const LogOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (error !== null) {
      console.log(`User tried to log out but ${error}`);
    } else {
      console.log("User succesfully logged out!");
      setMode("not-connected");
    }
  };
  return (
    <>
      <Button onClick={LogOutHandler} variant="link">
        Profile
      </Button>
      <NavDropdown.Divider />
      <Button onClick={LogOutHandler} variant="link">
        Logout
      </Button>
    </>
  );
}
