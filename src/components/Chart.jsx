import React, {useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
import { type } from "@testing-library/user-event/dist/type";
 
  
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
    const [chartOptions, setChartOptions] = useState(null);
    const [chartConfigData, setChartConfigData] = useState(null);
    const vslLength = (2962.2 / 60) / 60;
    
    //dates
    const [filterError, setFilterError] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const options = {
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

      const data = {
        labels: chartLabel,
        datasets: [
          {
            label: 'Watchers',
            data: chartData,
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
    useEffect(()=>{
      var t = endDate.getFullYear()+'-'+(endDate.getMonth()+1) +'-'+endDate.getDate()
        GetData('1989-01-01', t);
    }, []);
    
    useEffect(()=>{
        if (dataLoaded){
            const t1 = vslPlays * vslLength;
          
            const mp = (minsPlayed / 60) / 60;
            console.log("hours played: "+mp , "minutes played: "+minsPlayed);
            const eg = (mp / t1) * 100;
            setEngagementRate(eg.toFixed(2))
        }
    }, [dataLoaded]);
    
    function GetData($from, $to) {
        setDataLoaded(false)
        // const url = 'http://localhost/apiv3/index.php/report/range?limit=100&vid=1&from='+$from+'&to='+$to
        const url = 'https://queenformula.net/apiv3/index.php?limit=100&vid=1&from='+$from+'&to='+$to

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

    function DataSection() {
        return (
          <div className="grid grid-rows-2 grid-flow-col gap-2 mt-10 justify-items-center">
          <div className="text-2xl">Landings:  {vslLands}</div>
          <div className="text-2xl">Plays: {vslPlays}</div>
          <div className="text-2xl">Play Rate: <span className="text-green-600">{((vslPlays/vslLands)*100).toFixed(2) + '%'}</span></div>
          <div className="text-2xl">Total Minutes Played: {minsPlayed / 60} mins</div>
          <div className="text-2xl">Engagement Rate: <span className="text-green-600">{engagementRate}%</span></div>
          <div className="text-2xl">VSL Duration: {(vslLength / 60).toFixed(2)} mins</div>
  
            </div>
        )
      }
    const LoadingMessage = () => {
        return(
          <h1 className="text-center text-3xl inline-flex mt-4">
            Fetching Data..<AiOutlineLoading3Quarters className="spinner" />
          </h1>
        )
      }


    function VslChart(){ 

        return (  
          <>
        <div className="container h-auto p-4 w-3/5 mx-auto mt-5 align-middle rounded-2xl bg-gradient-to-r from-indigo-500">
      
            <Line options={options} data={data} className="h-auto w-auto object-contain" />
        </div>
    
          {(dataLoaded===true)  ? <DataSection /> : <LoadingMessage />}
    
          </>
        );


  
}


  const SubmitFilters=()=>{
    // console.log(startDate, endDate);
    setFilterError(false);
    if (endDate.getTime() < startDate.getTime()){
      setFilterError(true);
      console.log('fa')
    } else {
      
      var f = startDate.getFullYear()+'-'+(startDate.getMonth()+1) +'-'+startDate.getDate()
      var t = endDate.getFullYear()+'-'+(endDate.getMonth()+1) +'-'+endDate.getDate()
      GetData(f,t)
    }
    
  }
  const FilterDates = () => {


    return (
      <div className="container w-1/2 mx-auto">

      <h1 className="text-2xl font-bold">Filter Dates: </h1>
      <h1 className={`text-sm text-red-600 ${(filterError===true) ? "visible" : "invisible" }`}>Invalid Date Range</h1>
    
      <div className="grid grid-rows-1 grid-flow-col gap-2 mt-4 justify-items-center">
          <div>
              From:  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
          <div>
              To:  <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
          </div>

          <div>
              <button className="bg-slate-900 drop-shadow px-4 py-1 text-white rounded" onClick={SubmitFilters}>Submit</button>
          </div>
      </div>
    </div>
    )
  }

    return (
        <>
     
      <FilterDates />
        <VslChart />
        </>
    )
  }


  export default Chart