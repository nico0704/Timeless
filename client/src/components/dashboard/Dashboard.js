import React from "react";
import { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import Timeline from "./Timeline";

const Dashboard = ({
  auth: { user },
  getCurrentProfile,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading === true && profile === null ? (
    <Spinner />
  ) : profile !== null ? (
    <Fragment>
      {profile.experience.length === 0 ? (
        <Fragment>
          <p>You have not yet added any experiences.</p>
          <Link to="/add-experience" className="btn btn-primary my-1">
            Add Experiences
          </Link>
        </Fragment>
      ) : (
        <Timeline experience={profile.experience} />
      )}
    </Fragment>
  ) : (
    <Fragment>
      <p>You have not yet setup a Timeline, please add some info</p>
      <Link to="/create-profile" className="btn btn-primary my-1">
        Create Profile
      </Link>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
