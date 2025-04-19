import React from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

/**
 * Bar chart component for vehicle count by county
 */
const CountyBarChart = ({ data }) => (
  <div className="card mb-3">
    <div className="card-body">
      <h2 className="card-title h5">Vehicles by County</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
          <CartesianGrid stroke="#e9ecef" strokeDasharray="none" />
          <XAxis
            dataKey="county"
            name="County"
            tick={{ fontSize: 12, fill: '#343a40' }}
            tickLine={{ stroke: '#343a40' }}
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
          >
            <text x="50%" y="90" textAnchor="middle" fontSize={14} fill="#343a40">
              County
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
            cursor={{ fill: '#f8f9fa' }}
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #dee2e6' }}
            formatter={(value) => [value.toLocaleString(), 'Vehicles']}
          />
          <Bar dataKey="count" name="Vehicles" fill="#4682b4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

CountyBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      county: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    })
  ).isRequired
};

export default CountyBarChart;