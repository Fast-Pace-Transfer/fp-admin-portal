
/*
0.
*/ 
import style from '../../styles/graph.module.css'
import { genRandCode } from '../../utils';
import Select from '../resuables/Select';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS,CategoryScale,BarElement,Title,Tooltip,Legend,LinearScale} from 'chart.js';
import { useState } from 'react';
// import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(CategoryScale,BarElement,Title,Tooltip,Legend,LinearScale)

let selects =[
    {
        value:'last 7 months',
        title:'Last 7 months'
        
    },
    {
        value:'last 5 months',
        title:'Last 5 months'
        
    },
    {
        value:'last 12 months',
        title:'Last 12 months'
        
    }
]

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display:false
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
      scales:{
        x: {
            grid: {
                drawBorder: false, 
                color:`#ffffff30`
            }
          },
          y: {
            grid: {
                drawBorder: false, 
                color:`#ffffff30`
            }
          }
        }
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [200,211,124,556,575,768,600],
        backgroundColor: '#4953B2',
        borderRadius: 5,
      }
    ],
  };

const Graph=()=>{

    const [current,setCurrent] = useState<string>('this month')


    return(
        <div className='card'>
            <div className="row">
                <div style={{justifySelf:'flex-start'}}>
                    <div className={style.title}>
                        Individual Transaction
                    </div>
                    <div className={style.time}>
                        Avg.50,446
                    </div>
                </div>
                <div style={{justifySelf:'flex-end'}}>
                
                   <Select value={current} color={{boxShadow:'0.5px 0.5px 1px 0.5px #0202024d'}}options={selects} onChange={(e)=>setCurrent(e.target.value)}/>
                
                </div>
                
            </div>
            <div style={{padding:'3%'}}>
                <Bar key={genRandCode(4)} options={options} data={data} />
            </div>
            
        </div>
    )
}

export default Graph