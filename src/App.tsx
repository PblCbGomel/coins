import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "./pages/main/main";
import { FriendsPage } from "./pages/friends/friends";
import { UpgradesPage } from "./pages/upgrades/upgrades";
import { TasksPage } from "./pages/tasks/tasks";
import { NavigationMenu } from "./components/navigation/navigation";

export const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();
    tg.expand();
  });

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/upgrades" element={<UpgradesPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="*" element={<Navigate to="/main" replace />} />
        </Routes>

        <NavigationMenu />
      </div>
    </BrowserRouter>
  );
}

export default App;
