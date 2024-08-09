import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "./pages/main/main";
import { FriendsPage } from "./pages/friends/friends";
import { UpgradesPage } from "./pages/upgrades/upgrades";
import { TasksPage } from "./pages/tasks/tasks";
import { NavigationMenu } from "./components/navigation/navigation";
import { RoadPage } from "./pages/road/road";
import { FriendsListPage } from "./pages/friends/friends-list";
import { GetFetch } from "./functions/fetch";
import { UserInfo } from "./interfaces/user";
import { CoinNotification } from "./components/coin-notification/coin-notification";
import { tg, UserContext } from "./App";

export function App() {
  const [user, setUser] = useState<UserInfo | undefined>();

  const [isCoinsNotif, setIsCoinsNotif] = useState(false);
  const [notifText, setNotifText] = useState("");

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
  }, [isCoinsNotif]);

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          user,
          setUser,
          changeCoinNotif: () => {
            setIsCoinsNotif(true);
            setTimeout(() => {
              setIsCoinsNotif(false);
            }, 3400);
          },
        }}
      >
        <div className="app">
          {isCoinsNotif && <CoinNotification />}
          {notifText && <Notification />}
          <Routes>
            <Route path="/main" element={<MainPage />} />
            <Route path="/upgrades" element={<UpgradesPage />} />
            <Route path="/road" element={<RoadPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route
              path="friends"
              children={[
                <Route
                  key={"list-fiends"}
                  path="list"
                  element={<FriendsListPage />}
                />,
                <Route
                  key={"main-fiends"}
                  path=""
                  element={
                    user && user?.refCount > 0 ? (
                      <FriendsListPage />
                    ) : (
                      <FriendsPage />
                    )
                  }
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
