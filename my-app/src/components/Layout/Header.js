import Reacr from "react";
import {Link} from "react-router-dom";
import AuthOptions from '../auth/AuthOptions';

export default function Header(){
    return (
        <header id="header">
          <Link to="/">
              <h1 className="title">Event Management App</h1>

              </Link>
            <AuthOptions />
        </header>
    );
}