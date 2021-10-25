import React, { useRef, useState, useEffect } from "react";
import $ from "jquery";
import { supabase } from "../../assets/apis/supabaseClient";
import { useAuth } from "../../contexts/Auth";

import "./index.scss";

function IdeaPopup(props) {
  const { user, signOut } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState();
  const titleRef = useRef();
  const contentRef = useRef();
  const categoryRef = useRef();

  const handleSaveIdea = async (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const content = contentRef.current.value;
    const category = categoryRef.current.value;

    const { data, error } = await supabase.from("ideas").insert({
      title: title,
      content_idea: content,
      category: category,
      owner_idea: props.user[0].user_id,
    });

    if (error) {
      setMessage("Have a problem when trying to save your idea!");
    } else {
      setMessage("your idea was saved with success!!");
      setTimeout(() => {
        $("#idea_popup").addClass("hidden");
        titleRef.current.value = "";
        contentRef.current.value = "";
        setMessage("");
      }, 3000);
    }
  };

  const closePopup = (e) => {
    $("#idea_popup").addClass("hidden");
  };

  useEffect(async () => {
    $("#idea_popup").addClass("hidden");
    const { data, error } = await supabase
      .from("categories")
      .select()
      .eq("owner_category", props.user[0].user_id);
    setCategories(data);
  }, []);

  return (
    <div id="idea_popup">
      <h3>Add idea</h3>
      <form onSubmit={handleSaveIdea} className="idea-data">
        <label htmlFor="idea-data__title">Title</label>
        <input
          className="idea-data__title"
          type="text"
          placeholder="title"
          ref={titleRef}
        />
        <label htmlFor="idea-data__content">Resume</label>
        <textarea
          className="idea-data__content"
          type="text"
          placeholder="your idea"
          ref={contentRef}
        />
        <select name="categories" id="categories" ref={categoryRef}>
          <option defaultValue="" disabled selected hidden>
            Select category
          </option>
          {categories &&
            categories.map((category, index) => {
              return (
                <option value={category.category} key={index}>
                  {category.category}
                </option>
              );
            })}
        </select>
        <button type="submit" className={"button block"} disabled={loading}>
          {loading ? <span>Loading</span> : <span>save idea</span>}
        </button>
        <span class="function-return">{message}</span>
      </form>

      <div className="background" onClick={closePopup} />
    </div>
  );
}

export default IdeaPopup;
