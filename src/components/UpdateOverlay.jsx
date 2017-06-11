import React from 'react';
import PropTypes from 'prop-types';

const UpdateOverlay = props => (
    <div className="update-box">
        <div className="update-message">There is a new version of Razer Paint!</div>
        <div className="update-button-ok" onClick={props.close}>OK</div>
    </div>
);

UpdateOverlay.propTypes = {
    close: PropTypes.func.isRequired
};

export default UpdateOverlay;