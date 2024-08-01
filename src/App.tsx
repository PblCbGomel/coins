import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "./pages/main/main";
import { FriendsPage } from "./pages/friends/friends";
import { UpgradesPage } from "./pages/upgrades/upgrades";
import { TasksPage } from "./pages/tasks/tasks";
import { NavigationMenu } from "./components/navigation/navigation";
import { postEvent } from "@tma.js/sdk";
import { RoadPage } from "./pages/road/road";
import { FriendsListPage } from "./pages/friends/friends-list";

export const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();
    tg.expand();
    postEvent("web_app_set_header_color", { color: "#f3f3f3" });
  });

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
    </BrowserRouter>
  );
}

export default App;
