import React, {useState, useEffect} from "react";

import axios from "axios";
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
 
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );



  const Chart = () => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [vslPlays, setVslPlays]= useState(0)
    const [vslLands, setVslLands]= useState(0)
    const [engagementRate, setEngagementRate] = useState(0);
    const [minsPlayed, setMinsPlayed] = useState(0);
    const [chartData, setChartData] = useState(null);
    const [chartLabel, setChartLabel] = useState(null);
    const vslLength = 2957;
 
    useEffect(()=>{
        GetData('', '');
    }, []);

    useEffect(()=>{
        if (dataLoaded){
            console.log(chartData)
            console.log(chartLabel)
        }
    }, [dataLoaded]);
    
    function GetData($from, $to) {

        const url = 'http://localhost/apiv3/index.php/report/range?limit=100&vid=1'

        axios.get(url, {
           
        })
        .then(function (response) {
         
          if (response.status === 200){
          
                 
                setVslPlays(response.data.plays)
                setVslLands(response.data.landings)
                setMinsPlayed(response.data.vslMinutes);
                const stats = response.data.vslStats;         
                var labelx = [];
                var datax = [];
                stats.forEach((val, key)=>{
                  datax.push(String(val.count));
                  labelx.push((String(val.minutes)+" mins")); 
       
                });
                setChartData(datax);
                setChartLabel(labelx);
          setDataLoaded(true)
                
              
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }


    return (
        <>
        <div className="container w-1/2 mx-auto">

            <h1 className="text-2xl font-bold">Filter Dates: </h1>
            <div className="grid grid-rows-1 grid-flow-col gap-2 mt-4 justify-items-center">
                <div>
                    From:  <input type="date" className="rounded border-gray border-2"></input>
                </div>
                <div>
                    To:  <input type="date" className="rounded border-gray border-2"></input>
                </div>

                <div>
                    <button className="bg-slate-900 drop-shadow px-4 py-1 text-white rounded">Submit</button>
                </div>
            </div>
        </div>
        </>
    )
  }


  export default Chart