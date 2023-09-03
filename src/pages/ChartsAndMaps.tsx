import SideBar from "../components/SideBar"
import { Link } from 'react-router-dom'
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
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from "react";
import MapComponent from "../components/MapComponent";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};


const ChartsAndMaps = () => {

    const { isLoading, error, data } = useQuery({
        queryKey: ['allContacts'],
        queryFn: () =>
            fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all').then(
                (res) => res.json(),
            ),
    })

    const [cases, setCases] = useState({})
    const [deaths, setDeaths] = useState({})
    const [recovered, setRecovered] = useState({})

    useEffect(() => {
        if (data?.cases) {
            setCases({ ...data?.cases })
        }
        if (data?.deaths) {
            setDeaths({ ...data?.deaths })
        }
        if (data?.recovered) {
            setRecovered({ ...data?.recovered })
        }

    }, [data])



    const datas = {
        labels: Object.keys(cases),
        datasets: [
            {
                label: 'Cases',
                data: Object.values(cases),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'deaths',
                data: Object.values(deaths),
                borderColor: 'rgb(255, 99, 132) ',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Recovered',
                data: Object.values(recovered),
                borderColor: 'rgb(31, 216, 47)',
                backgroundColor: 'rgba(19, 235, 30, 0.5)',
            },
        ],
    };

    if (isLoading) return "Loading........."

    if (error) return "Error..."

    return (
        <div className='flex min-h-screen flex-col md:flex-row gap-y-10'>
            <SideBar />

            <div className='relative w-full '>
                <Link to="/" className='absolute left-2 top-2'>
                    <button className='bg-black text-white px-2 py-2 rounded-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>
                    </button>
                </Link>
                <h2 className='text-center text-2xl font-bold'>Charts and Maps</h2>
                <div className="w-[90%] mx-auto  border border-black ">

                    <h3 className="text-xl font-bold text-center">Graph data for cases with date</h3>
                    <Line
                        data={datas}
                        options={options}
                    />

                </div>

                <h2 className="mt-10 font-bold text-2xl text-center">Map</h2>
                <MapComponent/>
            </div>
        </div>
    )
}

export default ChartsAndMaps
