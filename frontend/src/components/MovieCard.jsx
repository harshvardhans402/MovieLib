import React, { useState } from 'react';
import AddToList from './AddToList.jsx'
const MovieCard = ({ movie, playList }) => {





    return (<>




        <div className="  bg-white rounded-lg shadow  text-center m-5 shadow-xl  w-80  overflow-hidden ">


            <img className="rounded-t-lg  w-full transition-transform   hover:scale-105  overflow-auto h-80" src={movie.Poster} alt="" />


            <div className="p-2">

                <p className="mt-1 text-1xl font-bold tracking-tight text-gray-900 text-balance">{movie.Title}</p>


                <p className=" text-gray-700 dark:text-gray-700"> {movie.Type + " " + movie.Year}</p>


            </div>



            <AddToList playList={playList} movie={movie} />
        </div>
    </>

    );
};

export default MovieCard;
