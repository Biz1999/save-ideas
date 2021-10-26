import React, { useRef, useState, useEffect } from "react";
import $ from "jquery";
import { supabase } from "../../assets/apis/supabaseClient";
import { useAuth } from "../../contexts/Auth";

import "./index.scss";

function CategoryPopup(props) {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const categoryRef = useRef();

  const handleSaveIdea = async (e) => {
    e.preventDefault();

    const category = categoryRef.current.value;

    const { data, error } = await supabase.from("categories").insert({
      category: category,
      owner_id: user.id,
    });

    if (error) {
      console.log(error);
      setMessage("Have a problem when trying to save your idea!");
    } else {
      setMessage("your categorie was created with success!!");
      setTimeout(() => {
        $("#category_popup").addClass("hidden");
        categoryRef.current.value = "";
        setMessage("");
      }, 3000);
    }
  };

  const closePopup = (e) => {
    $("#category_popup").addClass("hidden");
  };

  useEffect(() => {
    $("#category_popup").addClass("hidden");
  }, []);

  return (
    <div id="category_popup">
      <h3>Add category</h3>
      <form onSubmit={handleSaveIdea} className="idea-data">
        <label htmlFor="idea-data__title">Title</label>
        <input
          className="idea-data__title"
          type="text"
          placeholder="title"
          ref={categoryRef}
        />
        <button type="submit" className={"button block"} disabled={loading}>
          {loading ? <span>Loading</span> : <span>create category</span>}
        </button>
        <span class="function-return">{message}</span>
      </form>

      <div className="background" onClick={closePopup} />
    </div>
  );
}

export default CategoryPopup;
