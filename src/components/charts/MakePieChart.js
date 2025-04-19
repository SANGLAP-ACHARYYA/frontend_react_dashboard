import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
const COLORS = ['#4682b4', '#ff8c00', '#dc3545', '#6c757d', '#28a745', '#ffc107'];

const MakePieChart = ({ data }) => (
  <div className="card mb-3">
    <div className="card-body">
      <h2 className="card-title h5">Vehicle Make Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="make"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#4682b4"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

MakePieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      make: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    })
  ).isRequired
};

export default MakePieChart;