import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase_api";

export function Training() {
  const [user, setUser] = useState();

  // Get user
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user?.id);
    };

    fetchUser();
  }, []);

  // Fetch all words from user
  useEffect(() => {
    const fetchUserWords = async () => {
      const { data, error } = await supabase
        .from("saved_words")
        .select()
        .eq("user_id", user);
      console.log(data);
    };
    fetchUserWords();
  }, []);

  return <>hello WORRRRLD training</>;
}
