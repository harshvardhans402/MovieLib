import {
    Popover,
    PopoverHandler,
    PopoverContent,

    List, ListItem
    ,
} from "@material-tailwind/react";
import { useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";


export default function AddToList(movie) {
    const [list, setList] = useState([]);
    // console.log(movie.movie);
    const user = useSelector((state) => state.user);
    // console.log(user)


    const handlePlay = async () => {
        console.log("helllloooo")
        try {
            const response = await axios.get('https://movielib-4ebh.onrender.com/api/userPlaylists', {
                headers: {
                    Authorization: `${user.userId.token}`,
                },
            });
            console.log(response.data)
            setList(response.data);
        } catch (err) {
            console.log(err)

            // setError(err.response ? err.response.data.message : 'Error fetching playlists');
        }
    }
    const handleclick = async (id, isPublic) => {


        try {
            const response = await axios.post('https://movielib-4ebh.onrender.com/api/AddMovie', {
                userId: user.userId.token,
                playlist_id: id,
                isPublic: isPublic,
                movie: movie.movie
            }, { withCredentials: true });
            console.log(id)
            console.log(response)
            // setMessage(response.data.message);
        } catch (error) {
            // setMessage('Error creating playlist');
            console.error(error);
        }

    }



    return (
        <Popover placement="bottom-end">
            <PopoverHandler onClick={handlePlay}>
                <span className=" focus:outline-none focus:ring-gray-300 font-medium  p-1    text-xs  dark:hover:bg-gray-500  z-10 rounded-xs text-bold"
                >
                    Add to PlayList
                </span>
            </PopoverHandler>
            <PopoverContent className="z-[999]  w-[20rem]  overflow-hidden p-0  text-center " >

                <div className="p-0 text-center">
                    <List className="p-0 flex flex-col text-center  ">
                        <h1>Lists</h1>
                        {list.length != 0 ? list.map((list) => (
                            <span key={list._id}
                                className="text-initial font-medium text-blue-gray-500  dark:hover:bg-gray-500 border p-1"
                                onClick={() => handleclick(list._id, list.isPublic)}
                            >
                                <ListItem  >
                                    {list.name}

                                </ListItem>
                            </span>)) : <span className="text-initial font-medium text-blue-gray-500  dark:hover:bg-gray-500">
                            <ListItem >
                                No PlayList Found

                            </ListItem>
                        </span>
                        }




                    </List>
                </div>
            </PopoverContent>
        </Popover>
    );
}
