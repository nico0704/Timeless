import React from "react";
import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { getCurrentProfile } from "../../actions/profile";

const Navbar = ({
  auth: { isAuthenticated, loading },
  logout,
  getCurrentProfile,
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const authLinks = (
    <ul>
      {profile !== null ? (
        <li>
          <Link to="/add-experience">
            <i className="fas fa-plus-circle"></i>{" "}
            <span className="hide-sm">Add Experience</span>
          </Link>
        </li>
      ) : (
        <li>
          <Link to="/create-profile">
            <i className="fas fa-user-plus"></i>{" "}
            <span className="hide-sm">Create Profile</span>
          </Link>
        </li>
      )}
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="/">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-infinity"></i> Timeless
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { logout, getCurrentProfile })(Navbar);
