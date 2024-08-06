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
import { GetFetch } from "./functions/fetch";
import { UserInfo } from "./interfaces/user";

export const tg = window.Telegram.WebApp;

function App() {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>();

  useEffect(() => {
    tg.ready();
    tg.expand();
    //postEvent("web_app_set_header_color", { color: "#f3f3f3" });
  });

  useEffect(() => {
    GetFetch({
      path: "/api/user",
      query: { id: userInfo?.tgId || "123456789" },
    }).then((result: UserInfo) => {
      setUserInfo(result);
    });
  }, [tg]);

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/upgrades" element={<UpgradesPage />} />
          <Route path="/road" element={<RoadPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route
            path="friends"
            children={[
              <Route
                key={"main-fiends"}
                path=""
                element={<FriendsPage userInfo={userInfo} />}
              />,
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
    </BrowserRouter>
  );
}

export default App;
