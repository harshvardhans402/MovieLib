import React from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "@material-tailwind/react";
const MyList = () => {

    const [playList, setPlayList] = useState('');
    const [isPublic, setIsPublic] = useState('');

    const userId = useSelector((state) => state.user.userId);


    async function handleSubmit(e) {
        e.preventDefault();
        try {

            const response = await axios.post('/api/AddPlayList', {
                userId: userId,
                name: playList,
                isPublic: isPublic,
            }, { withCredentials: true });
            // setMessage(response.data.message);
        } catch (error) {
            // setMessage('Error creating playlist');
            console.error(error);
        }
    };

    return (

        <>


            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"> Create your own collection </h1>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">    </h2>

                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>

                            <div className="mt-2">
                                <input required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => setPlayList(e.target.value)}
                                    placeholder="Enter PlayList Name" />
                            </div>
                        </div>
                        <div className="flex items-center mb-4">
                            <input id="default-radio-1" type="radio" value="" name="visibility" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-600"
                                onClick={(e) => (setIsPublic(false))}
                            />
                            <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 m-3"
                                onClick={(e) => (setIsPublic(false))}>Private</label>
                        </div>
                        <div className="flex items-center">
                            <input id="default-radio-2" type="radio" value="" name="visibility" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-600 mb-3"
                                onClick={(e) => (setIsPublic(true))}
                            />
                            <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 mb-3"
                                onClick={(e) => (setIsPublic(true))}
                            >Public</label>
                        </div>



                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
                        </div>
                    </form>


                </div>
            </div>






        </>

    );

}



export default MyList;