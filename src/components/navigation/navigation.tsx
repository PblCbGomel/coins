import { NavLink } from "react-router-dom";
import "./navigation.css";

const Routing = [
  { icon: "../navigation/home.svg", text: "Home", url: "/main" },
  // { icon: "../navigation/upgrade.svg", text: "Upgrade", url: "/upgrades" },
  // { icon: "../navigation/road.png", text: "Road", url: "/road" },
  { icon: "../navigation/tasks.svg", text: "Tasks", url: "/tasks" },
  { icon: "../navigation/friends.svg", text: "Friends", url: "/friends" },
];

export function NavigationMenu() {
  return (
    <nav>
      {Routing.map((route) => {
        return (
          <NavLink
            key={route.url}
            to={route.url}
            className={({ isActive }) => (isActive ? "active" : "innactive")}
          >
            <div className="btn">
              <img
                alt={route.text}
                src={route.icon}
                width={25}
                height={25}
                className={route.text.toLowerCase()}
              />
              <div className="text">{route.text}</div>
            </div>
          </NavLink>
        );
      })}
    </nav>
  );
}
