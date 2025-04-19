import React from 'react';
import PropTypes from 'prop-types';
const MetricCard = ({ title, value, bgColor }) => (
  <div className={`card text-white ${bgColor} mb-3`}>
    <div className="card-body">




  <h5 className="card-title">{title}</h5>
      <p className="card-text fs-4">{value}</p>
    </div>
  </div>
);

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,

    bgColor: PropTypes.string.isRequired
};
        export default MetricCard;