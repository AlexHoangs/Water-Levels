import React, { useEffect, useState } from "react";
import './App.css';
import MonthPicker from './MonthPicker';
import sendData from './Data';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

function App() {
    // chart stuff
  function ReservoirChart(props) {
  const reservoir = new Map();
  reservoir.set(0, 'Shasta');
  reservoir.set(1, 'Oroville');
  reservoir.set(2, 'Trinity Lake');
  reservoir.set(3, 'New Melones');
  reservoir.set(4, 'San Luis');
  reservoir.set(5, 'Don Pedro');
  reservoir.set(6, 'Berryessa');

  //let holdWaterLevel = sendData();
  
  let reservoirCapacity = {
    label: "capacity", 
    data:[4552000, 3537577, 2447650, 2400000, 2041000, 2030000, 1602000],
    backgroundColor: ["rgb(120, 199, 227)"],
    order: 2
  }
    
  let reservoirCurrent = {
    label: "current",
    data: data, 
    backgroundColor: ["rgb(66, 145, 152)"],
    order: 1
  }

  let userData = {}; 
  userData.labels = ['Shasta', 'Oroville', 'Trinity Lake', 'New Melones','San Luis', 'Don Pedro', 'Berryessa'];
  userData.datasets = [reservoirCapacity, reservoirCurrent];
  
  console.log(userData);  
  let options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Reservoir Levels',
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero:true,
        grid: {
          display: true
        },
      },
    }
  };
    return (
      <div id="chart-container">
        <Bar options={options} data={userData}/>
      </div>
    )
}

function ReservoirDisplay() {

  console.log("in ReservoirDisplay");
  
  const [reservoirs, setReservoirs] = useState([]);
  
  return (
    <main>
      <ReservoirChart reservoirs={reservoirs}> </ReservoirChart>
    </main>
  )
}

  // DATA 
  const [data, setData] = useState([1808220, 1916629, 766349, 922382, 593055, 1289131, 996052]);
  // month stuff
  const [date, setDate] = useState({month: 4, year: 2022 });
  useEffect(()=>{console.log(date);},[date]);

  async function yearChange(newYear) {
    let m = date.month;
    setDate({year: newYear, month: m });
    let tempData = await sendData(m, newYear);
      setData(tempData);
  }

  async function monthChange(newMonth){
    let y = date.year;
      setDate({month: newMonth, year: y});
    
      console.log("updatted", date.month);
      let tempData = await sendData(newMonth, y);
      console.log(tempData);
      setData(tempData);
  }
  
  const [display, updateDisplay] = useState(0);
  return (
      <main>
        <div id="titleDiv">
            <h1 id="title">Water storage in California reservoirs</h1>
        </div>
          <div id="bodyDiv">
              <div id="text">
                <p>
                    California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential. Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity.
                </p>
                <p>
                  California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
                </p>
                  {display
                    ?
                    <button id="seeButton" onClick={function () {updateDisplay(!display);}}>
                      See less
                    </button>
                    : 
                    <button id="seeButton" onClick={function () {updateDisplay(!display);}}>
                      See more
                    </button>
                  }
              </div>
            <div id="photo">
              <img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg"/>
                  Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.
            </div>
            </div>
          {display
                  ? 
                  <div id="hidden">
                    <div className="chart">
                      <ReservoirDisplay />
                    </div>
                  <div id="hiddenText">
                      <p>
                        Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html"> California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
                      </p>
                      <p id="changeMonth">Change month:</p>
                      <MonthPicker  
                        // props 
                        date = {date}
                        yearFun = {yearChange}
                        monthFun = {monthChange}
                      />
                    </div>
                  </div>
                : null
              }
      </main>
  );
}

export default App;