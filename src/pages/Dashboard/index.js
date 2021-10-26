import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { BiPlus, BiSortDown } from "react-icons/bi";
import IdeaCard from "../../components/IdeaCard";
import IdeaPopup from "../../components/IdeaPopup";
import CategoryPopup from "../../components/CategoryPopup";
import $ from "jquery";
import "react-tabs/style/react-tabs.css";

import { useAuth } from "../../contexts/Auth";
import { supabase } from "../../assets/apis/supabaseClient";
import "./index.scss";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const history = useHistory();
  const [ideas, setIdeas] = useState([]);
  const [categories, setCategories] = useState([]);

  async function handleSignOut() {
    await signOut();
    history.push("/login");
  }

  async function getUserData() {
    const { data, error } = await supabase
      .from("categories")
      .select(
        `category_id,
        category,
        ideas(
          idea_id,
          title,
          content_idea,
          created_at
        )
        `
      )
      .eq("owner_id", user.id);
    setCategories(data);
    data.forEach((category) => {
      setIdeas((prevState) => [...prevState, ...category.ideas]);
    });
  }

  useEffect(() => {
    getUserData();
  }, []);

  const openPopupIdea = () => {
    $("#idea_popup").removeClass("hidden");
  };
  const openPopupCategory = () => {
    $("#category_popup").removeClass("hidden");
  };

  return (
    <div id="dashboard">
      {<IdeaPopup categories={categories} />}
      {<CategoryPopup />}
      <header className="welcome-message">
        <h3 className="title">Save Ideas</h3>
        {user ? <p className="user-name">welcome, {user.email}</p> : <p></p>}
        <button onClick={handleSignOut}>Sign out</button>
      </header>
      <main className="dashboard-main">
        <Tabs>
          <TabList>
            <Tab>All Ideas</Tab>
            {categories?.map((category, index) => {
              return <Tab key={index}>{category.category}</Tab>;
            })}
            <button onClick={openPopupCategory}>
              <BiPlus size="1.5em" />
              <p>Add group</p>
            </button>
          </TabList>
          <button onClick={openPopupIdea}>
            <BiPlus size="1.5em" />
            <p>Add idea </p>
          </button>
          <button className="sort-button">
            <BiSortDown size="1.5em" />
            <p>Sort </p>
          </button>
          <TabPanel>
            {ideas?.map((idea) => (
              <IdeaCard idea={idea} key={idea.idea_id} />
            ))}
          </TabPanel>
          {categories?.map((category, index) => {
            return (
              <TabPanel>
                {category?.ideas?.map((idea) => (
                  <IdeaCard idea={idea} key={idea.idea_id} />
                ))}
              </TabPanel>
            );
          })}
        </Tabs>
      </main>
    </div>
  );
}
