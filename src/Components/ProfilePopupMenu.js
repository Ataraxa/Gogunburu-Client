import { supabase } from "../utils/supabase_api";

export function ProfilePopUpMenu() {
  const LogOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (error !== null) {
      console.log(`User tried to log out but ${error}`);
    } else {
      console.log("User succesfully logged out!");
    }
  };
  return (
    <>
      <button onClick={LogOutHandler}>Logout</button>
    </>
  );
}
