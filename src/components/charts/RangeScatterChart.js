import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter
} from 'recharts';

/**
 * Range scatter chart component for Electric Range vs. Model Year
 */
const RangeScatterChart = ({ data }) => (
  <div className="card mb-3">
    <div className="card-body">
      <h2 className="card-title h5">Electric Range vs. Model Year</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
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
            dataKey="range"
            name="Electric Range"
            unit=" mi"
            tick={{ fontSize: 12, fill: '#343a40' }}
            tickLine={{ stroke: '#343a40' }}
            tickFormatter={(value) => value.toLocaleString()}
            domain={[0, (dataMax) => Math.ceil(dataMax / 50) * 50]}
          >
            <text
              x="-50"
              y="50%"
              textAnchor="middle"
              fontSize={14}
              fill="#343a40"
              transform="rotate(-90, 10, 150)"
            >
              Electric Range (miles)
            </text>
          </YAxis>
          <Tooltip
            cursor={{ stroke: '#6c757d', strokeDasharray: '3 3' }}
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #dee2e6' }}
            formatter={(value, name) => [value.toLocaleString(), name]}
          />
          <Scatter
            name="Vehicles"
            data={data}
            fill="#20c997"
            fillOpacity={0.6}
            stroke="#fff"
            strokeWidth={1}
            shape="circle"
            r={5}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  </div>
);

RangeScatterChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number.isRequired,
      range: PropTypes.number.isRequired
    })
  ).isRequired
};

export default RangeScatterChart;