"use strict";


(() => {
    // Time out

    const windowLoad = function (){
        document.body.style.visibility = "visible"
        // document.addEventListener("DOMContentLoaded", async (e) => {
        //
        // const movieList = async () => {
        //     try {
        //         const resp = await fetch(`http://localhost:3000/movies/`);
        //         const showMovies = await resp.json();
        //
        //
        //         const moviesListerHtml = showMovies.map(movie => `<div>Title: ${movie.title} &nbsp; Rating: ${movie.rating} &nbsp; ID: ${movie.id}</div>`).join('');
        //
        //         document.querySelector("#movieChoice").innerHTML = moviesListerHtml;
        //     } catch (error) {
        //         console.error('Error fetching movies:', error);
        //         document.querySelector("#movieChoice").innerHTML = 'Failed to load movies.';
        //     }
        // } } )
        };
    window.setTimeout(windowLoad,3000);
    alert('Loading');

    fetch("http://localhost:3000/movies").then(resp => resp.json()).then(data => console.log(data));



    // Show All Movies-----------------------------------------------------------------------

    document.querySelector("#seeAllMovies").addEventListener("click", async (e) => {
        e.preventDefault();

        try {
            const resp = await fetch(`http://localhost:3000/movies/`);
            const showMovies = await resp.json();


            const moviesHtml = showMovies.map(movie => `<div>Title: ${movie.title} &nbsp; Rating: ${movie.rating} &nbsp; ID: ${movie.id}</div>`).join('');

            document.querySelector("#movieChoice").innerHTML = moviesHtml;
        } catch (error) {
            console.error('Error fetching movies:', error);
            document.querySelector("#movieChoice").innerHTML = 'Failed to load movies.';
        }
    });















// This is the edit movie function------------------------------------------------------

    const editMovie = async (id, movie) => {
        try {
            const url = `http://localhost:3000/movies/${id}`;
            const options = {
                method: "PUT", // or PUT, but that will replace the ENTIRE object.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            };
            const resp = await fetch(url, options);
            const newMovie = await resp.json();
            return newMovie;
        } catch (error) {
            console.error(error);
        }
    }

    // Searching The Title-------------------------------------------------------------
    const findMovieIdByTitle = async (title) => {
        const resp = await fetch(`http://localhost:3000/movies/title=${title}`);
        const movies = await resp.json();
        return movies.length > 0 ? movies[0].id : null; // Assuming the first match is what you want
    };

    //Edit Movie Form----------------------------------------------------------------------------

    document.querySelector("#editForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        // Get the selected movie ID from the dropdown
        const selectedMovieId = document.querySelector("#edit-select").value;

        // Get the updated movie data from the form
        const updatedMovieData = {
            title: document.querySelector("#edit-title").value.trim(),
            rating: document.querySelector("#edit-rating").value,
            id: document.querySelector("#edit-select").value,
        };

        // Update the movie details on the server
        const updatedMovie = await editMovie(selectedMovieId, updatedMovieData);

        // Update the "Updated Movie" section with the user-inputted data
        const movieChoiceDiv = document.querySelector("#movieChoice");
        movieChoiceDiv.innerHTML = `
        Updated Movie:
        <p>Title: ${updatedMovie.title}</p>
        <p>Rating: ${updatedMovie.rating}</p>
        <p>ID: ${updatedMovie.id}</p>
    `;

        // Re-populate the dropdown with the updated movie list******************************Fix the updated list
        //populateDropDown();
    });

// This is the dropdown for the list of movies--------------------------------------------------

    function populateDropDown() {
        fetch("http://localhost:3000/movies").then(resp => resp.json()).then(data => {
            console.log(data);
            const dropDown = document.getElementById("edit-select");
            for (let movie of data) {
                const option = document.createElement("option");
                option.value = movie.id;
                option.innerText = movie.title;
                dropDown.appendChild(option);
            }
        })
            .catch(error => {
                console.error('Error populating dropdown:', error);
            });
    }

    // Event listener for dropdown change--------------------------------------------

    const dropDown = document.getElementById("edit-select");
    dropDown.addEventListener("change", (e) => {
        const selectedMovieId = e.target.value;

        // Fetch the details of the selected movie
        fetch(`http://localhost:3000/movies/${selectedMovieId}`)
            .then(resp => resp.json())
            .then(movie => {
                // Update the #movieChoice div with the movie details
                const movieChoiceDiv = document.getElementById("movieChoice");
                movieChoiceDiv.innerHTML = `
                        <p>Title: ${movie.title}</p>
                        <p>ID: ${movie.id}</p>
                        <p>Rating: ${movie.rating}</p>
                    `;
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                document.getElementById("movieChoice").innerText = 'Error loading movie details';
            });
    });



    populateDropDown();

    //edit-select dropdown-------------------------------------------------------------------------

    document.querySelector("#edit-select").addEventListener("change", (e) => {
        const movieId = e.target.value;
        fetch("http://localhost:3000/movies/" + movieId)
            .then(resp => resp.json())
            .then(movie => {
                console.log("Fetched movie details:", movie);  // Log the fetched movie for debugging
            document.querySelector("#edit-title").value = movie.title;
            document.querySelector("#edit-id").value = movie.id;
            document.querySelector("#edit-rating").value = movie.rating;

        })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                // Handle the error, e.g., display an error message
            });
    });



// This is the beginning of the DELETE functionality-------------------------------------------

     document.querySelector("#deleteButton").addEventListener("click", async (e) => {
        e.preventDefault();

        const selectedMovieId = document.querySelector("#edit-select").value; //

        if (!selectedMovieId) {
            alert("Please select a movie to delete.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/movies/${selectedMovieId}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            // Update  after  deletion-----------------------------------------
            alert("Movie deleted successfully.");
            populateDropDown();
            //*************************************Fix Dropdown to only contain updated list.***************************

            document.getElementById("movieChoice").innerHTML = '';

        } catch (error) {
            console.error('Error deleting movie:', error);
            alert("Failed to delete movie.");
        }
    });













// This is the function to create the New Movie Object-------------------------------------------
    const createMovie = async (movie) => {
        try {
            const url = `http://localhost:3000/movies`;
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            };
            const resp = await fetch(url, options);
            const newMovie = await resp.json();
            return newMovie;
        } catch (error) {
            console.error(error);
        }
    }

    //This is the add movie function---------------------------------------

    document.querySelector("#addMovie").addEventListener("submit", async (e)=>{

        const newMovie = {
            "id": document.querySelector("#add-id").value,
            "title": document.querySelector("#add-title").value,
            "rating": document.querySelector("#add-rating").value
        };

        await createMovie(newMovie);
        fetch("http://localhost:3000/movies")
            .then(resp => resp.json())
            .then(data => console.log(data));

    })



})();

