export const loadFileData = (filePath) => {
  return fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load file: ${response.statusText}`);
      }
      return response.text();
    });
};
//mock
export const mockCSV = `VIN (1-10),County,Make,Model,Model Year,Electric Range,Electric Vehicle Type
5YJSA1E2,King,TESLA,MODEL S,2016,210,Battery Electric Vehicle (BEV)
1G1FZ6S0,Snohomish,CHEVROLET,BOLT EV,2020,259,Battery Electric Vehicle (BEV)`;
