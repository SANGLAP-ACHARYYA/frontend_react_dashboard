import React, { useState } from 'react';
import PropTypes from 'prop-types';

//import YearLineChart from './charts/YearLineChart';

//import { Bar } from 'recharts';

const VehicleTable = ({ data }) => 
  {
  const [sortConfig, setSortConfig] = useState({ key: 'Model Year', direction: 'desc' });

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key === 'Electric Range' || sortConfig.key === 'Model Year') {
      const aValue = parseFloat(a[sortConfig.key]) || 0;
      const bValue = parseFloat(b[sortConfig.key]) || 0;
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    const aValue = a[sortConfig.key] || '';
    
    
    const bvalue = b[sortConfig.key] || '';
    return sortConfig.direction === 'asc' ? aValue.localeCompare(bvalue) : bvalue.localeCompare(aValue);
  });

  const requestSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };



  const handleKeyDown = (key, event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      requestSort(key);
    }
  };

  const headers = [
    'VIN (1-10)',
    'County',


    'Make',
    'Model',
    'Model Year',
    'Electric Range',
    'Electric Vehicle Type'
  ];

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover table-sm">
        <thead className="sticky-top bg-light">
          <tr>
           
           
            {headers.map((header) => (
             
          <th
     key={header}
                scope="col"
                className="cursor-pointer text-nowrap"
         style={{ maxWidth: '150px', padding: '8px' }}
        onClick={() => requestSort(header)}
                onKeyDown={(e) => handleKeyDown(header, e)}
           role="columnheader"
                aria-sort={sortConfig.key === header ? sortConfig.direction : 'none'}
            tabIndex={0}
              >
              {header} {sortConfig.key === header ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
      </th>
            ))}
                </tr>
        
        
        
        </thead>
  <tbody>
          {sortedData.length === 0 ? (
            <tr>
      <td colSpan={headers.length} className="text-center py-3">
                No vehicles match your search.
              </td>
            </tr>
          ) : (
            sortedData.map((row, index) => (
       <tr key={index}>
                <td style={{ maxWidth: '100px', padding: '8px' }}>{row['VIN (1-10)']}

                </td>
                
                
                <td style={{ maxWidth: '120px', padding: '8px' }}>{row['County']}</td>
                
              <td style={{ maxWidth: '100px', padding: '8px' }}>{row['Make']}</td>
            <td style={{ maxWidth: '120px', padding: '8px' }}>{row['Model']}</td>
              
              
              
                <td style={{ maxWidth: '100px', padding: '8px' }}>{row['Model Year']}</td>
         <td style={{ maxWidth: '100px', padding: '8px' }}>{row['Electric Range']}</td>
               
   <td style={{ maxWidth: '150px', padding: '8px' }}>{row['Electric Vehicle Type']}</td>
              
              
              
              
              </tr>
           
          
          
          ))
          )}
</tbody>
     
     
  </table>
    
    
    </div>
  );
};

VehicleTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default VehicleTable;
