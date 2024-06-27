import { NavLink } from "react-router-dom";
import "./navigation.css";

const Routing = [
  { icon: "./navigation/home.png", text: "Home", url: "/main" },
  { icon: "./navigation/upgrade.png", text: "Upgrade", url: "/upgrades" },
  { icon: "./navigation/tasks.png", text: "Tasks", url: "/tasks" },
  { icon: "./navigation/friends.png", text: "Friends", url: "/friends" },
];

export function NavigationMenu() {
  return (
    <nav>
      {Routing.map((route) => {
        return (
          <NavLink
            to={route.url}
            className={({ isActive }) => (isActive ? "active" : "innactive")}
          >
            <div className="btn">
              <img src={route.icon} />
              <div className="text">{route.text}</div>
            </div>
          </NavLink>
        );
      })}
    </nav>
  );
}
