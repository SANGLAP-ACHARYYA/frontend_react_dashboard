import Papa from 'papaparse';

export const parseAndCleanData = (csv) => {
  return new Promise((resolve, reject) => {
    try {
      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false,
        transformHeader: (header) => {
          return header.trim().replace(/^"|"$/g, '');
        },
        transform: (value, header) => {
          let cleaned = value.trim().replace(/^"|"$/g, '');
          if (header === 'Electric Range' || header === 'Model Year') {
            const numberValue = parseFloat(cleaned);
            if (isNaN(numberValue)) {
              return 0;
            }
            return numberValue;
          }
          return cleaned;
        },
        complete: (results) => {
          const data = results.data.filter(row => row['VIN (1-10)']).map(row => {
            return {
              ...row,
              'Electric Range': row['Electric Range'] || 0,
              'Model Year': row['Model Year'] || 0,
            };
          });
          resolve(data);
        },
        error: (err) => {
          reject(err);
        },
      });
    } catch (err) {
      console.log('Error while parsing CSV:', err);
      reject(err);
    }
  });
};

export const aggregateData = (data) => {
  try {
    const countyDataRaw = {};
    data.forEach(row => {
      const county = row['County'] || 'Unknown';
      if (countyDataRaw[county]) {
        countyDataRaw[county]++;
      } else {
        countyDataRaw[county] = 1;
      }
    });

    const countyData = Object.entries(countyDataRaw)
      .map(([county, count]) => ({ county, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const makeDataRaw = {};
    data.forEach(row => {
      const make = row['Make'] || 'Unknown';
      if (makeDataRaw[make]) {
        makeDataRaw[make]++;
      } else {
        makeDataRaw[make] = 1;
      }
    });

    const sortedMakes = Object.entries(makeDataRaw).sort((a, b) => b[1] - a[1]);
    const top5 = sortedMakes.slice(0, 5);
    const others = sortedMakes.slice(5);
    const othersCount = others.reduce((sum, [, count]) => sum + count, 0);

    const makeData = top5.map(([make, count]) => ({ make, count }));
    if (othersCount > 0) {
      makeData.push({ make: 'Others', count: othersCount });
    }

    const yearDataRaw = {};
    data.forEach(row => {
      const year = row['Model Year'];
      if (year >= 2010) {
        if (yearDataRaw[year]) {
          yearDataRaw[year]++;
        } else {
          yearDataRaw[year] = 1;
        }
      }
    });

    const yearData = Object.entries(yearDataRaw)
      .map(([year, count]) => ({ year: parseInt(year), count }))
      .sort((a, b) => a.year - b.year);

    const rangeData = data
      .filter(row => row['Electric Range'] > 0 && row['Model Year'] >= 2010)
      .map(row => {
        return {
          year: row['Model Year'],
          range: row['Electric Range'],
        };
      });

    return { countyData, makeData, yearData, rangeData };
  } catch (err) {
    console.log('Something went wrong in aggregateData:', err);
    throw err;
  }
};
