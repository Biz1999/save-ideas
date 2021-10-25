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
  const [user_data, setUser_data] = useState();
  const history = useHistory();
  const [categories, setCategories] = useState();
  const [ideas, setIdeas] = useState();

  async function handleSignOut() {
    await signOut();
    history.push("/login");
  }

  async function getUserData() {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("email", user.email);
    setUser_data(data);
  }

  async function getCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select()
      .eq("owner_category", user_data[0].user_id);
    setCategories(data);
  }

  async function getIdeas() {
    categories.map(async (category) => {
      const { data, error } = await supabase
        .from("ideas")
        .select()
        .eq("owner_idea", user_data[0].user_id)
        .eq("category", category.category);
      setIdeas((oldAa) => [...ideas, data]);
    });
  }

  useEffect(async () => {
    getUserData();
  }, []);

  useEffect(async () => {
    user_data && getCategories();
  }, [user_data]);

  useEffect(async () => {
    categories && getIdeas();
  }, [categories]);

  const openPopupIdea = () => {
    $("#idea_popup").removeClass("hidden");
  };
  const openPopupCategory = () => {
    $("#category_popup").removeClass("hidden");
  };

  return (
    <div id="dashboard">
      {user_data && <IdeaPopup user={user_data} />}
      {user_data && <CategoryPopup user={user_data} />}
      <header className="welcome-message">
        <h3 className="title">Save Ideas</h3>
        {user_data ? (
          <p className="user-name">welcome, {user_data[0].name}</p>
        ) : (
          <p></p>
        )}
        <button onClick={handleSignOut}>Sign out</button>
      </header>
      <main className="dashboard-main">
        <Tabs>
          <TabList>
            <Tab>All Ideas</Tab>
            {categories &&
              categories.map((category, index) => {
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
            <IdeaCard />
            <IdeaCard />
            <IdeaCard />
          </TabPanel>
          {ideas &&
            categories.map((category, index) => {
              // console.log(ideas[index]);
              return (
                <TabPanel>
                  {/* {ideas[index].map((idea) => {
                    <IdeaCard />;
                  })} */}
                </TabPanel>
              );
            })}
          {/* {ideas &&
            ideas.map((category) => {
              return (
                <TabPanel>
                  <IdeaCard />
                </TabPanel>
              );
            })} */}
        </Tabs>
      </main>
    </div>
  );
}
