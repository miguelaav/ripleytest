import React from 'react';
import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
    <Link className="navbar-brand" to="/">
        HOME
      </Link>
      <Link className="navbar-brand" to="/detail/CL">
        SANTIAGO
      </Link>
      <Link className="navbar-brand" to="/detail/CH">
        ZURICH
      </Link>
      <Link className="navbar-brand" to="/detail/NZ">
        AUCKLAND
      </Link>
      <Link className="navbar-brand" to="/detail/AU">
        SIDNEY
      </Link>
      <Link className="navbar-brand" to="/detail/UK">
        LONDRES
      </Link>
      <Link className="navbar-brand" to="/detail/USA">
        GEORGIA
      </Link>
    </nav>
  );
}

export default NavBar;