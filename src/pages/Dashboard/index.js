import { useState, useEffect } from "react";
import { supabase } from "../../assets/apis/supabaseClient";

import { useHistory } from "react-router";
import { useAuth } from "../../contexts/Auth";

export default function Dashboard({ session }) {
  const { user, signOut } = useAuth();

  const history = useHistory();

  async function handleSignOut() {
    // Ends user session
    await signOut();

    // Redirects the user to Login page
    history.push("/login");
  }

  return (
    <div>
      {/* Change it to display the user ID too 👇*/}
      <p>Welcome, {user?.id}!</p>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
