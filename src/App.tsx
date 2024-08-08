import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "./pages/main/main";
import { FriendsPage } from "./pages/friends/friends";
import { UpgradesPage } from "./pages/upgrades/upgrades";
import { TasksPage } from "./pages/tasks/tasks";
import { NavigationMenu } from "./components/navigation/navigation";
import { postEvent } from "@tma.js/sdk";
import { RoadPage } from "./pages/road/road";
import { FriendsListPage } from "./pages/friends/friends-list";
import { createContext } from "react";
import { GetFetch } from "./functions/fetch";
import { UserInfo } from "./interfaces/user";

export const UserContext = createContext<{
  user: UserInfo | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
}>({ user: undefined, setUser: () => {} });

export const tg = window.Telegram.WebApp;

function App() {
  const [user, setUser] = useState<UserInfo | undefined>();

  useEffect(() => {
    tg.ready();
    tg.expand();
    GetFetch({
      path: "/api/user",
      query: { id: tg?.initDataUnsafe?.user?.id || "123456789" },
    }).then((result) => {
      setUser(result);
    });
    //postEvent("web_app_set_header_color", { color: "#f3f3f3" });
  });

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="app">
          <Routes>
            <Route path="/main" element={<MainPage />} />
            <Route path="/upgrades" element={<UpgradesPage />} />
            <Route path="/road" element={<RoadPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route
              path="friends"
              children={[
                <Route key={"main-fiends"} path="" element={<FriendsPage />} />,
                <Route
                  key={"list-fiends"}
                  path="list"
                  element={<FriendsListPage />}
                />,
              ]}
            />
            <Route path="*" element={<Navigate to="/main" replace />} />
          </Routes>

          <NavigationMenu />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
