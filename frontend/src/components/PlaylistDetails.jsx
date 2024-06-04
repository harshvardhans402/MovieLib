import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";
import axios from "axios";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,

} from "@material-tailwind/react";


const PlaylistDetails = () => {
    const [playlistId, setPlaylistId] = useState(useParams().playlistId);
    const [isLoading, setIsLoading] = useState(false);
    const [playlistData, setPlaylistData] = useState(null);
    const user = useSelector((state) => state.user);
    const location = useLocation();
    const prevLocation = useRef(location);
    const navigate = useNavigate();
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);


    const fetchPlaylist = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(`/api/playlists/${playlistId}`, {
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

        navigate('/login');

    }

    // Re-run effect on navigate object change

    // Conditional Rendering with Loading Indicator and Error Handling
    return (
        <>  <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Link to='/home#'>
                    <Typography
                        as="a"
                        variant="h3"
                        color="blue"

                        className="mr-4 cursor-pointer py-1.5 font-medium"
                    >
                        Movie Hub
                    </Typography>
                </Link>
                <div className="flex items-center gap-4">
                    <div className="mr-4 hidden lg:block"></div>
                    <div className="flex items-center gap-x-1">

                        <Button
                            variant="gradient"
                            size="sm"
                            className="hidden lg:inline-block"
                            onClick={handleLogout}
                        >
                            <span>Log Out</span>
                        </Button>
                    </div>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
            </div>
            <Collapse open={openNav}>

                <div className="flex items-center gap-x-1">

                    <Button fullWidth variant="gradient" size="sm" className="" onClick={handleLogout}>
                        <span>Log Out</span>
                    </Button>
                </div>
            </Collapse>
        </Navbar>
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

        </>
    );
};

export default PlaylistDetails;
