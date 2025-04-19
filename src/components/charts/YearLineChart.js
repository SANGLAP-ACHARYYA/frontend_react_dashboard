


import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

/**
 * Line chart component for vehicle count by model year
 */
const YearLineChart = ({ data }) => (
  <div className="card mb-3">
    <div className="card-body">
      <h2 className="card-title h5">Vehicles by Model Year</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
          <CartesianGrid stroke="#e9ecef" strokeDasharray="none" />
          <XAxis
            dataKey="year"
            name="Model Year"
            type="number"
            tick={{ fontSize: 12, fill: '#343a40' }}
            tickLine={{ stroke: '#343a40' }}
            tickFormatter={(value) => Math.floor(value)}
            domain={['dataMin', 'dataMax']}
          >
            <text x="50%" y="90" textAnchor="middle" fontSize={14} fill="#343a40">
              Model Year
            </text>
          </XAxis>
          <YAxis
            name="Number of Vehicles"
            tick={{ fontSize: 12, fill: '#343a40' }}
            tickLine={{ stroke: '#343a40' }}
            tickFormatter={(value) => value.toLocaleString()}
            domain={[0, (dataMax) => Math.ceil(dataMax / 1000) * 1000]}
          >
            <text
              x="-50"
              y="50%"
              textAnchor="middle"
              fontSize={14}
              fill="#343a40"
              transform="rotate(-90, 10, 150)"
            >
              Number of Vehicles
            </text>
          </YAxis>
          <Tooltip
            cursor={{ stroke: '#6c757d', strokeDasharray: '3 3' }}
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #dee2e6' }}
            formatter={(value) => [value.toLocaleString(), 'Vehicles']}
          />
          <Line
            type="monotone"
            dataKey="count"
            name="Vehicles"
            stroke="#28a745"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

YearLineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired
    })
  ).isRequired
};

export default YearLineChart;