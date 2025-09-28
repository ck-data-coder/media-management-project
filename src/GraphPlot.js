import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraphPlot = () => {
    const token = localStorage.getItem('token');
    const [data,setData]=useState();
    const [maxValue,setMaxValue]=useState(0)
    useEffect(()=>{
  const getData=async()=>{
 await axios.get('http://localhost:8080/getgraphdata', {
    headers: {
        'Authorization': `Bearer ${token}`,
    }
  
  })
 .then(async(res)=>{
    console.log(res.data)
    setData(res.data)

 })
  }
  getData();
    },[])

    useEffect(() => {
        if (data) {
          const max = Math.max(
            ...Object.values(data).flatMap(obj => Object.values(obj || {}))
          );
          setMaxValue(max);
        }
      }, [data]);

    const colors = {
        videosAddData: "#8884d8",
        videosUpdateData: "#82ca9d",
        videosDeleteData: "#ffc658",
        categoryAddData: "#ff7300"
      };

 

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allows custom height
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1, // Ensures the difference is always 1
              precision: 0 // Ensures only whole numbers
            },
            suggestedMax:maxValue!=0?maxValue+1:10,
          }
        },
        plugins: {
          legend: { display: false },
          title: { display: true }
        }
      };

  return (<>
 {data?
   <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "1fr 1fr" }}>
      {Object.entries(data).map(([key, value]) => (
        <div  key={key} style={{ width: "70%", textAlign: "center", height: "400px", marginTop:'40px'  }}>
          <h3>{key}</h3>
          <Bar
            data={{
              labels: Object.keys(value), // ['1D', '1W', '1M', '6M']
              datasets: [
                {
                  label: key,
                  data: Object.values(value), // [1, 2, 2, 2]
                  backgroundColor: colors[key]
                }
              ]
            }}
            options={{ ...options, plugins: { ...options.plugins, title: { text: key } } }}
          //  height={500} // Explicitly set height in pixels
        />
        </div>
      ))}
    </div>
    :null}
  </>
  )
}
export default GraphPlot;