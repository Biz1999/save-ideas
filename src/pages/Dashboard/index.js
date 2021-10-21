import { useHistory } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { BiPlus, BiSortDown } from "react-icons/bi";
import IdeaCard from "../../components/IdeaCard";

import "react-tabs/style/react-tabs.css";

import { useAuth } from "../../contexts/Auth";
import "./index.scss";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const history = useHistory();

  async function handleSignOut() {
    await signOut();
    history.push("/login");
  }

  return (
    <div id="dashboard">
      <header className="welcome-message">
        <h3 className="title">Save Ideas</h3>
        <p className="user-name">welcome, {user?.email}</p>
        <button onClick={handleSignOut}>Sign out</button>
      </header>
      <main className="dashboard-main">
        <Tabs>
          <TabList>
            <Tab>Title 1</Tab>
            <Tab>Title 2</Tab>
            <button
              onClick={(e) => {
                console.log("clicou");
              }}
            >
              <BiPlus size="1.5em" />
              <p>Add group</p>
            </button>
          </TabList>
          <button
            onClick={(e) => {
              console.log("clicou dnv vei");
            }}
          >
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
          <TabPanel>
            <IdeaCard />
            <IdeaCard />
            <IdeaCard />
            <IdeaCard />
          </TabPanel>
        </Tabs>
      </main>
    </div>
  );
}
