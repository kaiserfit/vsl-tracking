
import React, { useState, useEffect } from "react";
import axios from "axios";
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import Chart from "./Chart";
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

  const url = 'http://localhost/apiv3/index.php/report/range?limit=100&vid=1';

  var labelx = [];
  var datax = [];
  var plays, landings, totalMinsPlayed = 0;
  axios.get(url, {
           
          })
          .then(function (response) {
           
            if (response.status === 200){
            
                plays = response.data.plays;
                landings = response.data.landings;
               const stats = response.data.vslStats;         
              totalMinsPlayed = response.data.vslMinutes;
                    
                stats.forEach((val, key)=>{
                    datax.push(String(val.count));
                    labelx.push((String(val.minutes)+"mins")); 
                  
                });
              
         
             
                
            }
          })
          .catch(function (error) {
            console.log(error);
          });



          export const options = {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Vsl Watch Statistics Over Time Progression',
              },
            },
            scales:{
                x: {
                    display: false
                },
                y: {
                    ticks: { color: 'black', beginAtZero: true }
                  },

            }
          };
      
          
          export const data = {
            labels: labelx,
            datasets: [
              {
                label: 'Watchers',
                data: datax,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                
              },
            //   {
            //     label: 'Dataset 2',
            //     data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            //     borderColor: 'rgb(53, 162, 235)',
            //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
            //   },
            ],
          };

const Main = () => {

    const [dataLoaded, setDataLoaded] = useState(false);
    const [vslPlays, setVslPlays]= useState(0)
    const [vslLands, setVslLands]= useState(0)
    const [engagementRate, setEngagementRate] = useState(0);
    const [minsPlayed, setMinsPlayed] = useState(0);
    
    const vslLength = 2957;
  
    useEffect(()=>{
        if (plays !== 0){
          setVslPlays(plays)
          setVslLands(landings)
          const t1 = plays * vslLength;
          setMinsPlayed(totalMinsPlayed);
          const eg = minsPlayed / t1;
          setEngagementRate(eg.toFixed(2))
          setDataLoaded(true)
        }

     
    }, [plays , minsPlayed, dataLoaded])



    
    const LoadingMessage = () => {
      return(
        <h1 className="text-center text-3xl inline-flex mt-4">
          Fetching Data..<AiOutlineLoading3Quarters className="spinner" />
        </h1>
      )
    }
    function DataSection() {
      return (
        <div className="grid grid-rows-2 grid-flow-col gap-4 mt-10 justify-items-center">
        <div className="text-2xl">Landings:  {vslLands}</div>
        <div className="text-2xl">Plays: {vslPlays}</div>
        <div className="text-2xl">Play Rate: <span className="text-green-600">{((vslPlays/vslLands)*100).toFixed(2) + '%'}</span></div>
        <div className="text-2xl">Total Minutes Played: {minsPlayed / 60} mins</div>
        <div className="text-2xl">Engagement Rate: <span className="text-green-600">{engagementRate}%</span></div>
        <div className="text-2xl">VSL Duration: {(vslLength / 60).toFixed(2)} mins</div>

          </div>
      )
    }
    function VslChart(){ 

              return (  
                <>
              <div className="container h-auto p-4 w-3/4 mx-auto mt-5 align-middle rounded-2xl bg-gradient-to-r from-indigo-500">
            
                  <Line options={options} data={data} className="h-auto w-auto object-contain" />
              </div>
          
                {(dataLoaded===true)  ? <DataSection /> : <LoadingMessage />}
          
                </>
              );


        
    }
    return (
        <>
        <Chart />
        <VslChart />
        </>
    );
}

export default Main