import "./appNavBar.css";

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { newPostBttnClicked } from "../../../features/posts/postSlice";

export function AppNavBar() {
   const dispatch = useDispatch();

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
               <div>
                  <button onClick={() => dispatch(newPostBttnClicked())}>
                     <span>Post</span>
                  </button>
               </div>
               <NavLink end to="/login" activeClassName="active-page">
                  <span>Login</span>
                  {/* <i className="fa fa-user fa-lg" aria-hidden="true"></i> */}
               </NavLink>
            </div>
         </nav>
      </>
   );
}
