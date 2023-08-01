import React, { useEffect } from 'react'
import axios from 'axios'
import Config from '@/utils/config'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setServices } from '@/store/reducers/serviceSlice';

export default function Service() {
    const router = useRouter();
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);
    const service = useSelector((state: RootState) => state.service);

    useEffect(() => {
        console.log("aaa ", auth);

        axios.get(Config.BACKEND_API + "users", {
            headers: {
                Authorization: "Bearer " + auth.token
            }
        }).then(res => {
            fetchServices();

        }).catch(err => {
            toast.error("Auth failed")
            console.log(err);
            router.push("/")
        })
    }, [])

    const fetchServices = () => {
        axios.get(Config.BACKEND_API + "partner-service", {
            headers: {
                Authorization: "Bearer " + auth.token
            }
        }).then(res => {
            console.log("rrr ", res.data.services);
            dispatch(setServices(res.data.services))

        }).catch(err => {
            console.log(err);

        })
    }

    const handleSubscription = (type: any, service: any ) => {
        toast("You subscription is processing")
        axios.post(Config.BACKEND_API + "subscription/" + type , {
            
                service: service.id,
                partner: service.partnerId
            
        }, {
            headers: {
                Authorization: "Bearer " + auth.token
            }
        }).then(() => {
            fetchServices();
            toast.success("You have " + type)
        }).catch(() => {
            toast.error("Something went wrong")
        })
    }

    return (
        <section className="mt-4 px-8">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">Top Services</h3>

            </div>

            <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-3 mt-4">
                {service.services.map(item => (
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className="rounded-t-lg" src={item.image} alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {item.name}
                                </h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {item.description}
                            </p>
                            {item.isSubscribed ? (
                                <a
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() => handleSubscription("unsubscribe", item)}
                                >
                                    Unsubscribe
                                </a>
                            ) : (
                                <a
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() => handleSubscription("subscribe", item)}
                                >
                                    Subscribe
                                </a>
                            )}

                        </div>
                    </div>
                ))}


            </div>
        </section>
    )
}
