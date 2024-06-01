import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";
import axios from "axios";

const PlaylistDetails = () => {
    const [playlistId, setPlaylistId] = useState(useParams().playlistId);
    const [isLoading, setIsLoading] = useState(false);
    const [playlistData, setPlaylistData] = useState(null);
    const user = useSelector((state) => state.user);
    const location = useLocation();
    const prevLocation = useRef(location);
    const navigate = useNavigate();


    const fetchPlaylist = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(`https://movielib-4ebh.onrender.com/api/playlists/${playlistId}`, {
                headers: {
                    Authorization: `${user.userId.token}`,
                },
            });

            console.log(playlistId)
            console.log(response.data)
            setPlaylistData(response.data);
        } catch (err) {
            console.log(err);
            // Handle errors (e.g., display error message to user)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPlaylist();
    }, [playlistId]); // Re-run effect on playlistId change

    useEffect(() => {
        if (location.pathname !== prevLocation.current.pathname) {
            const playlistId = useParams().playlistId;
            setPlaylistId(playlistId);

            prevLocation.current = location;
        }
    }, [location]);


    function handleLogout() {


        localStorage.removeItem('token');
        localStorage.removeItem('reduxState')

        navigate('/');

    }

    // Re-run effect on navigate object change

    // Conditional Rendering with Loading Indicator and Error Handling
    return (
        <><div className="   " >
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">


                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleLogout}>Log out</button>


                    <div className="items-center     " id="navbar-sticky">
                        <ul className="flex flex-col p-0 md:p-0 mt-0 font-medium  rounded-lg  md:space-x-8 md:mt-0 dark:bg-gray-900  ">
                            <li>
                                <Link to="/home" className=" py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 " aria-current="page">Home</Link>
                            </li>


                        </ul>
                    </div>
                </div>
            </nav>
            <div className="text-center">
                <h1 className="text-4xl font-bold pt-40 pb-15 text-zinc-800">
                    {playlistData ? "Playlist: " + playlistData.name : "No such Playlist"}
                </h1>
                {isLoading && <h1 className="text-4xl font-bold m-5">Loading</h1>}
                {playlistData && !isLoading && ( // Display error if data fetching fails
                    <div className="flex flex-wrap place-content-center">
                        {playlistData.movies.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie} />
                        ))}
                    </div>
                )}
                {!playlistData && !isLoading && ( // Display error if data fetching fails
                    <h1 className="text-4xl font-bold m-5">Error fetching playlist</h1>
                )}
            </div>
        </div>
        </>
    );
};

export default PlaylistDetails;
