import React, { useEffect, useState } from 'react';
// import { Input, Button, Row, Col, message } from 'antd';
import fetchData from '../features/apiService.js';
import AddToList from './AddToList.jsx'
import MovieCard from './MovieCard.jsx';
import { useSelector } from 'react-redux';
import MyList from './MyList.jsx'
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import Navigation from './Navbar.jsx';




const SearchComponent = () => {
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState([
        {
            "Title": "Batman: The Killing Joke",
            "Year": "2016",
            "imdbID": "tt4853102",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTdjZTliODYtNWExMi00NjQ1LWIzN2MtN2Q5NTg5NTk3NzliL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
        },
        {
            "Title": "Batman: Under the Red Hood",
            "Year": "2010",
            "imdbID": "tt1569923",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNmY4ZDZjY2UtOWFiYy00MjhjLThmMjctOTQ2NjYxZGRjYmNlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
        },
        {
            "Title": "Batman: Mask of the Phantasm",
            "Year": "1993",
            "imdbID": "tt0106364",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYTRiMWM3MGItNjAxZC00M2E3LThhODgtM2QwOGNmZGU4OWZhXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg"
        },
        {
            "Title": "Batman: The Dark Knight Returns, Part 1",
            "Year": "2012",
            "imdbID": "tt2313197",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg"
        },
        {
            "Title": "Batman: The Dark Knight Returns, Part 2",
            "Year": "2013",
            "imdbID": "tt2166834",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYTEzMmE0ZDYtYWNmYi00ZWM4LWJjOTUtYTE0ZmQyYWM3ZjA0XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
        },
        {
            "Title": "Batman: The Movie",
            "Year": "1966",
            "imdbID": "tt0060153",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZTAxNWNmMTEtNGNmNi00MWU4LWI0NmItMjM3Y2Q3YTUyZTg2XkEyXkFqcGdeQXVyNjc5NjEzNA@@._V1_SX300.jpg"
        },
        {
            "Title": "Batman: Year One",
            "Year": "2011",
            "imdbID": "tt1672723",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNTJjMmVkZjctNjNjMS00ZmI2LTlmYWEtOWNiYmQxYjY0YWVhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
        },
        {
            "Title": "Batman: Assault on Arkham",
            "Year": "2014",
            "imdbID": "tt3139086",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZDU1ZGRiY2YtYmZjMi00ZDQwLWJjMWMtNzUwNDMwYjQ4ZTVhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
        },
        {
            "Title": "Son of Batman",
            "Year": "2014",
            "imdbID": "tt3139072",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYjdkZWFhNzctYmNhNy00NGM5LTg0Y2YtZWM4NmU2MWQ3ODVkXkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg"
        },
        {
            "Title": "Batman Beyond",
            "Year": "1999–2001",
            "imdbID": "tt0147746",
            "Type": "series",
            "Poster": "https://m.media-amazon.com/images/M/MV5BOWVlM2I2MjctYzk0My00MTEzLWJkZjYtY2JlZTA4MDQ1ZWI1XkEyXkFqcGdeQXVyODA4OTIyMzY@._V1_SX300.jpg"
        }
    ]);
    // const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    // const userId = useSelector((state) => state.user.userId);
    const [playList, setPlayList] = useState([]);

    useEffect(() => {
        if (search)
            fetchDataFromAPi(0);

    }, [page]);

    const handleSearch = async (e) => {
        e.preventDefault();

        fetchDataFromAPi(1);

    };

    const user = useSelector((state) => state.user);
    // const userId = useSelector((state) => state.user.userId);
    if (!user.isLoggedIn) {
        navigate('/');
    }
    const fetchPlaylists = async () => {
        try {
            const response = await axios.get('/api/userPlaylists', {
                headers: {
                    Authorization: `${user.userId.token}`,
                },
            });
            setPlayList(response.data);
        } catch (err) {
            console.log(err)

            // setError(err.response ? err.response.data.message : 'Error fetching playlists');
        }
    }

    useEffect(() => {

        fetchPlaylists();
    }, [user])



    // console.log(playList)

    // console.log(userId)

    const fetchDataFromAPi = async (p) => {
        let data = {}

        if (!searchTerm) {
            message.error('Please enter a movie title');
            return;
        }

        try {
            if (p == 1) {
                data = await fetchData(searchTerm, p);
            }
            else {

                data = await fetchData(search, page);

            }

            if (data.Response === "False") {
                // setError(data.Error);

                message.error(data.Error);
                setSearch('')
            } else {
                setMovieData(data.Search);
                // setError('');
            }
        } catch (err) {
            // setError(err.message);
            setMovieData(null);
            message.error('Failed to fetch data');
        }

    }

    // console.log(playList)
    // console.log("sdfsdf")

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Public', dataIndex: 'isPublic', key: 'isPublic', render: (text) => text ? 'Yes' : 'No' }, // Custom rendering for boolean
        { title: 'Movie Count', dataIndex: 'movies', key: 'movies', render: (movies) => movies.length }, // Use movies array length
        {
            title: 'Link',
            key: '_id',
            // dataIndex: 'link', // Assuming you have a 'link' property in your data object
            render: (playlist) => (
                <Link to={`/playlists/${playlist._id}`} >
                    Visit
                </Link>
            ),
        },
    ];
    console.log(playList)


    return (
        <div className=' text-center' >
            <Navigation />
            <section id="Home">
                <h1 className='text-4xl font-bold m-5 '>Movies</h1>
                <form className="flex items-center max-w-sm mx-auto" onSubmit={handleSearch}>
                    <div className="relative w-full">
                        <input type="text"
                            id="simple-search"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className=" 0 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  z-0"
                            placeholder="Search movie by title" required />
                    </div>
                    <button type="submit" className="bg-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium      text-sm px-5 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 z-10 rounded-lg m-2"
                        onClick={(e) => (setSearch(searchTerm))} >
                        Search
                    </button>
                </form>


                <div className='flex flex-wrap place-content-center'>
                    {
                        movieData.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie} />
                        )
                        )
                    }
                </div>
                <div className="flex place-content-center m-10 ">

                    <button className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700  dark:border-gray-700 dark:text-gray-900 dark:bg-blue-700 "
                        onClick={(e) => (setPage(page - 1))}
                        disabled={page > 1 ? false : true}
                    >
                        Previous Page
                    </button>

                    <button className="flex items-center justify-center px-4 h-10 ms-3 text-base font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-blue-700"
                        onClick={(e) => (setPage(page + 1))}
                    >

                        Next Page
                    </button>
                </div>
            </section >

            <section className='bg-indigo-300 pt-40 pb-40' id='Create' >

                <MyList setPlayList={setPlayList} />
            </section>




            <section className='pt-40 pb-40' id='Collection' >
                <h1 className='text-4xl font-bold text-zinc-500'>My Collection</h1>
                <button className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80 mt-5 mb-5" onClick={fetchPlaylists}>
                    <svg className="w-5 h-5 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>

                    <span className="">Refresh</span>
                </button>
                <Table columns={columns} dataSource={playList} style={{ background: 'transparent' }} />





            </section>





        </div >

    );
};

export default SearchComponent;
