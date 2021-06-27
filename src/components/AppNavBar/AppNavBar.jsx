import "./appNavBar.css";
import "../../App.css";

import { NavLink } from "react-router-dom";

export function AppNavBar() {
   return (
      <>
         <nav className="nav nav-dark">
            <div>
               <NavLink end to="/" activeClassName="active-page">
                  <span>
                     Home <i className="fa fa-user"></i>
                  </span>
                  <i className="fas fa-user"></i>
               </NavLink>
            </div>
            <div className="nav-list">
               <NavLink end to="/profile" activeClassName="active-page">
                  <span>Profile</span>
               </NavLink>
               <NavLink end to="/leaderboard" activeClassName="active-page">
                  <span>Standings</span>
               </NavLink>
               <NavLink end to="/login" activeClassName="active-page">
                  <span>Login</span>
                  {/* <i className="fa fa-user fa-lg" aria-hidden="true"></i> */}
               </NavLink>
            </div>
         </nav>
      </>
   );
}
