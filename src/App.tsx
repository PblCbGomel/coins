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
import { CoinNotification } from "./components/coin-notification/coin-notification";
import { Notification } from "./components/notification/notification";

export const UserContext = createContext<{
  user: UserInfo | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
  changeCoinNotif: Function;
  notifText: Function;
}>({
  user: undefined,
  setUser: () => {},
  changeCoinNotif: () => {},
  notifText: () => {},
});

export const tg = window.Telegram.WebApp;

function App() {
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
            setIsCoinsNotif(!isCoinsNotif);
            setTimeout(() => {
              setIsCoinsNotif(false);
            }, 3400);
          },
          notifText: (text: string) => {
            setNotifText(text);
            setTimeout(() => {
              setNotifText("");
            }, 3400);
          },
        }}
      >
        <div className="app">
          {isCoinsNotif && <CoinNotification />}
          {notifText && <Notification text={notifText} />}
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

export default App;
