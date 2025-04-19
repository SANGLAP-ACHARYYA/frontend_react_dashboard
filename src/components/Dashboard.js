import MetricCard from "./MetricCard";
import CountyBarChart from "./charts/CountyBarChart";
//import YearLineChart from './charts/YearLineChart';

//import { Bar } from 'recharts';

import VehicleTable from "./VehicleTable";
import Footer from "./footer";
import MakePieChart from "./charts/MakePieChart";
//import YearLineChart from './charts/YearLineChart';
//import RangeScatterChart from './charts/RangeScatterChart';
import { parseAndCleanData, aggregateData } from "../utils/dataProcessor";
import YearLineChart from "./charts/YearLineChart";

import { loadFileData, mockCSV } from "../utils/dataLoader";
import RangeScatterChart from "./charts/RangeScatterChart";
import React, { useState, useEffect } from "react";

import { FaHome, FaChartBar, FaTable, FaCar, FaUndo } from "react-icons/fa";
//todo
const Dashboard = () => {
  const [all_DATA, Set_all_DATA] = useState(null);
  const [FILTEREDDATA, set_FILTEREDDATA] = useState(null);
  const [ChartData, setChartData] = useState(null);
  const [error_message, set_error_message] = useState(null);
  const [searchtext, setSearchtext] = useState("");
  const [ROWCOUNT, setROWCOUNT] = useState(10);

  const [is_user_logged_in, set_is_user_logged_in] = useState(false);

/*const Dashboard=()=>{
  const[all_DATA,Set_all_DATA]=useState(null);
  const[filterdata,setFILTEREDDATA]=useState(null);
  const[chartdata,setchartdata]=useState(null);
  const[errormessage,seterrormessage]=useState(null);
  const[searchtext,setsearchtext]=useState("");
  const [rowcount,setrowcount]=useState(10);
  const[isuserlogededin,setisuserloggedin]=useState(false);*/


  useEffect(() => {
    loadFileData("/Electric_Vehicle_Population_Data.csv")
      .then((csv) => parseAndCleanData(csv))
      .catch(() => {
        set_error_message("Could not load file, using sample data.");
        return mockCSV;
      })
      .then((cleaned) => {
        Set_all_DATA(cleaned);

        set_FILTEREDDATA(cleaned);
        setChartData(aggregateData(cleaned));
      })
      .catch(() => set_error_message("Processing error."));
  }, []);
  /*useEffect(()=>
  {
    loadFileData("/Electric_Vehicle_Population_Data.csv").then((csv)=>parseAndCleanData(csv)).catch(()=>{
      seterrormessage("cant load file");
      return mockCSV;
    }).then((cleaned)=>{
      Set_all_DATA(cleaned);
      setFILTEREDDATA(cleaned);
      setchartdata(aggregateData(cleaned));
    }).catch(()=>seterrormessage("Processing err..."));
  },[]);*/

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchtext(value);
    if (!value) {
      set_FILTEREDDATA(all_DATA);
      return;
    }
    const filtered = all_DATA.filter(
      (x) =>
        x["Make"].toLowerCase().includes(value) ||
        x["Model"].toLowerCase().includes(value) ||
        x["County"].toLowerCase().includes(value)
    );
    set_FILTEREDDATA(filtered);
  };

  const ExportCSV = () => {
    if (!FILTEREDDATA) return;
    const FIELDS = [
      "VIN (1-10)",
      "County",
      "Make",
      "Model",
      "Model Year",
      "Electric Range",
      "Electric Vehicle Type",
    ];

    const ROWS = FILTEREDDATA.map((item) =>
      FIELDS.map((f) => `"${item[f] || ""}"`).join(",")
    );

    const FINALCSV_From_DataSet = [FIELDS.join(","), ...ROWS].join("\n");
    const FILE = new Blob([FINALCSV_From_DataSet], {
      type: "text/csv;charset=utf-8;",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(FILE);
    a.download = "ev_dashboard_data.csv";
    a.click();
  };

  //  const scrollTo = (id) => {
  //  const el = document.getElementById(id);
  // if (el) el.scrollIntoView({ behavior: 'smooth' });
  // };
  const scrollTo = (id) => {
    const el = document.getElementById(id);

    if (el)
      el.scrollIntoView({
        behavior: "smooth",
      });
  };

  const filter_tesla = () => {
    const filtered = all_DATA.filter((x) => x["Make"] === "TESLA");

    set_FILTEREDDATA(filtered);

    setSearchtext("");
    setROWCOUNT(10);
  };

  const resetVIEW = () => {
    set_FILTEREDDATA(all_DATA);

    setSearchtext("");

    setROWCOUNT(10);
  };

  const LOGIN_handler = () => set_is_user_logged_in(true);

  if (error_message && is_user_logged_in) {
    return (
      <div className="bg_error">
        <div className="container p-4">
          <div className="alert alert-danger">
            {error_message}
            <button
              className="btn btn-primary ms-3"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    );
  }
  /*  const LOGIN_handler = () => set_is_user_logged_in(true);

  if (error_message && is_user_logged_in) {
    return (
      <div className="bg_error">
        <div className="container p-4">
          
            </button>
          </div>
        </div>
      </div>
    );
  }*/
  //log in na holle
  if (!is_user_logged_in) {
    return (
      <div className="login_screen">
        <header className="bg-light py-3">
          <div className="container d-flex justify-content-between align-items-center">
            <h2>EV Dashboard</h2>
            <button className="btn btn-primary" onClick={LOGIN_handler}>
              Log In
            </button>
          </div>
        </header>
        <div className="container mt-4">
          <div class="alert alert-info">
            Please log in to access the dashboard.
          </div>
        </div>
      </div>
    );
  }

  if (!all_DATA || !FILTEREDDATA || !ChartData) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-2">Loading data...</p>
      </div>
    );
  }

  const vehicle_total = all_DATA.length;
  const uniqueMakes = new Set(all_DATA.map((v) => v["Make"])).size;
  const AVG_RANGE = Math.round(
    all_DATA.reduce((SUM, car) => SUM + (car["Electric Range"] || 0), 0) /
      vehicle_total
  );
  const latest_model_year = Math.max(...all_DATA.map((c) => c["Model Year"]));
  const TESLA_COUNT = all_DATA.filter((c) => c["Make"] === "TESLA").length;
  const teslaRatio = ((TESLA_COUNT / vehicle_total) * 100).toFixed(1);

  return (
    <div className="MAIN_CONTAINER">
      <header className="bg-light py-3 border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <h2 className="h5">EV Dashboard</h2>
          <nav>
            <ul className="nav">
              <li>
                <button
                  onClick={() => scrollTo("overview")}
                  className="btn btn-link"
                >
                  <FaHome className="me-2" />
                  Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("charts")}
                  className="btn btn-link"
                >
                  <FaChartBar className="me-2" />
                  Charts
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("table")}
                  className="btn btn-link"
                >
                  <FaTable className="me-2" />
                  Table
                </button>
              </li>
              <li>
                <button onClick={filter_tesla} className="btn btn-link">
                  <FaCar className="me-2" />
                  Tesla Only
                </button>
              </li>
              <li>
                <button onClick={resetVIEW} className="btn btn-link">
                  <FaUndo className="me-2" />
                  Reset
                </button>
              </li>
            </ul>
          </nav>
          <button className="btn btn-primary" disabled>
            Logged In
          </button>
        </div>
      </header>

      <div className="container mt-4">
        <h1
          className="text-center mb-4 text-white py-2 px-3 rounded"
          style={{ backgroundColor: "#1e3a8a" }}
          id="overview"
        >
          Electric Vehicle Info Dashboard
        </h1>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4">
          <MetricCard
            title="All Vehicles"
            value={vehicle_total}
            bgColor="bg-primary"
          />
          <MetricCard
            title="Different Makes"
            value={uniqueMakes}
            bgColor="bg-success"
          />
          <MetricCard
            title="Average Range"
            value={`${AVG_RANGE} mi`}
            bgColor="bg-warning"
          />
          <MetricCard
            title="Newest Year"
            value={latest_model_year}
            bgColor="bg-info"
          />
        </div>

        <div className="alert alert-info bg-white bg-opacity-90">
          <h4 className="alert-heading">Tesla Stat</h4>
          <p>
            Tesla vehicles make up <strong>{teslaRatio}%</strong> of the
            dataset.
          </p>
        </div>

        <div className="row row-cols-1 row-cols-lg-2 g-4 mb-4" id="charts">
          <CountyBarChart data={ChartData.countyData} />
          <MakePieChart data={ChartData.makeData} />

          <YearLineChart data={ChartData.yearData} />
          <RangeScatterChart data={ChartData.rangeData} />
        </div>

        <div className="card mb-3 bg-white bg-opacity-90" id="table">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h5 mb-0">More Vehicle Data</h2>
              <div>
                <input
                  className="form-control d-inline-block me-2"
                  style={{ width: "200px" }}
                  placeholder="Search make/model/county"
                  value={searchtext}
                  onChange={handleSearch}
                />
                <button
                  className="btn btn-primary"
                  onClick={ExportCSV}
                  disabled={FILTEREDDATA.length === 0}
                >
                  {" "}
                  Download CSV
                </button>
              </div>
            </div>
            <VehicleTable
              data={FILTEREDDATA.slice(0, ROWCOUNT)}
              searchTerm={searchtext}
            />
            {FILTEREDDATA.length > ROWCOUNT && (
              <button
                className="btn btn-secondary mt-3"
                onClick={() => setROWCOUNT(ROWCOUNT + 10)}
              >
                Load 10 more rows
              </button>
            )}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
