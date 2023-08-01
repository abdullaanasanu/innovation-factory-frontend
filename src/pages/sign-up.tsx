import Config from "@/utils/config";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/router';

export default function SignUp() {
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>();

    const onSubmit: SubmitHandler<any> = data => {
        console.log(data)
        axios.post(Config.BACKEND_API + "users/sign-up", data).then((res) => {
            console.log(res);
            toast.success("Account Created!");
            router.push('/'); 
        }).catch(err => {
            toast.error("Something went wrong")
        })
    };

    return (
        <main className="flex justify-center items-center h-screen bg-slate-500">

            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-1/3" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="text-center text-xl font-bold mb-3">Sign Up</h3>
                <div className="mb-4">
                    <label
                        className="block text-grey-darker text-sm font-bold mb-2"
                        htmlFor="username"
                    >
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        id="username"
                        type="text"
                        placeholder="Name"
                        {...register("name", { required: true })}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-grey-darker text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        id="email"
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: true })}
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-grey-darker text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                        id="password"
                        type="password"
                        placeholder="******************"
                        {...register("password", { required: true })}
                    />

                </div>
                <div className="flex items-center justify-between w-full">
                    <button
                        className="bg-red-700 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </div>
                <div className="flex items-center justify-between w-full">
                    <button
                        className="bg-red-100 hover:bg-blue-dark text-red-700 font-bold py-2 px-4 rounded w-full mt-3"
                        type="button"
                    >
                        Sign In
                    </button>
                </div>
            </form>


        </main>
    )
}
