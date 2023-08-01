import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Config from '@/utils/config'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setServices, setStatistics } from '@/store/reducers/serviceSlice';
import { Bar } from 'react-chartjs-2';
import { BarController, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';

const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

Chart.register(CategoryScale, LinearScale, BarController, BarElement);

export default function Statistics() {
    const router = useRouter();
    const [data, setData] = useState<any>(null)
    const dispatch = useDispatch();
    const service = useSelector((state: RootState) => state.service);

    useEffect(() => {
        fetchStatistics()
    }, [])

    const fetchStatistics = () => {
        axios.get(Config.BACKEND_API + "statistics").then(res => {
            const statisticsData = {
                labels: res.data.statistics.map((service: any) => service.name),
                datasets: [
                    {
                        label: 'Completed Subscription',
                        data: res.data.statistics.map((service: any) => service.completedSubscription),
                        backgroundColor: 'rgba(25, 102, 192, 0.2)',
                        borderColor: 'rgba(25, 102, 192, 1)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Pending Subscription',
                        data: res.data.statistics.map((service: any) => service.pendingSubscription),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            }
            setData(statisticsData)
            dispatch(setStatistics(res.data.statistics))

        }).catch(err => {
            console.log(err);

        })
    }

    // const handleSubscription = (type: any, service: any ) => {
    //     toast("You subscription is processing")
    //     axios.post(Config.BACKEND_API + "subscription/" + type , {

    //             service: service.id,
    //             partner: service.partnerId

    //     }, {
    //         headers: {
    //             Authorization: "Bearer " + auth.token
    //         }
    //     }).then(() => {
    //         fetchServices();
    //         toast.success("You have " + type)
    //     }).catch(() => {
    //         toast.error("Something went wrong")
    //     })
    // }

    console.log("dddd ", data);
    

    return (
        <section className="mt-4 px-8">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">Top Services</h3>

            </div>

            <div className="grid grid-cols-2 max-lg:grid-cols-2 max-md:grid-cols-1 gap-3 mt-4">
                <div className=" bg-white border border-gray-200 rounded-lg shadow bg-gray-100 border-gray-100 p-4 w-full">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Pending Subscription</th>
                                <th>Completed Subscription</th>
                            </tr>
                        </thead>
                        <tbody>
                            {service.statistics.map(service => (
                                <tr>
                                    <td>{service.name}</td>
                                    <td className='text-center'>{service.pendingSubscription}</td>
                                    <td className='text-center'>{service.completedSubscription}</td>
                                </tr>
                            ))}


                        </tbody>
                    </table>

                </div>

                <div className=" bg-white border border-gray-200 rounded-lg shadow bg-gray-100 border-gray-100 p-4 w-full">
                    {data && (
                        <Bar data={data} options={options} />
                    )}
                </div>

            </div>
        </section>
    )
}
