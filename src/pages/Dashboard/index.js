import { useHistory } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { BiPlus } from "react-icons/bi";
import "react-tabs/style/react-tabs.css";

import { useAuth } from "../../contexts/Auth";

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
              <BiPlus />
              Add group
            </button>
          </TabList>
          <button
            onClick={(e) => {
              console.log("clicou dnv vei");
            }}
          >
            <BiPlus />
            Add idea
          </button>
          <TabPanel>
            <h2>Any content 1</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
            <h2>Any content 3</h2>
          </TabPanel>
        </Tabs>
      </main>
    </div>
  );
}
