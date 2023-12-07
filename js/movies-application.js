"use strict";

(() => {
    fetch("http://localhost:3000/movies").then(resp => resp.json()).then(data => console.log(data));

// This is the edit movie function

    const editMovie = async (id, movie) => {
        try {
            const url = `http://localhost:3000/movies/${id}`;
            const options = {
                method: "PATCH", // or PUT, but that will replace the ENTIRE object.
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

document.querySelector("#editForm").addEventListener("submit", async (e)=>{
    e.preventDefault()
    editMovie("id", {"title":document.querySelector("#edit-select").value})
})



    // This is the dropdown for the list of movies

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
    }

    populateDropDown();

    document.querySelector("#edit-select").addEventListener("change", (e) => {
        const movieId = e.target.value;
        fetch("http://localhost:3000/movies/" + movieId).then(resp => resp.json()).then(book => {
            document.querySelector("#edit-title").value = movie.title;
            document.querySelector("#edit-id").value = movie.id;
            document.querySelector("#edit-rating").value = movie.rating;
            // document.querySelector("#edit-year").value = book.publishedYear;
            // document.querySelector("#edit-summary").value = book.summary;
        })
    });

    document.forms.editForm.addEventListener("submit", e => {
        e.preventDefault();
        let id = document.querySelector("#edit-select").value;
        let title = document.querySelector("#edit-title").value;
        // let id = document.querySelector("#edit-id").value;
        let rating = document.querySelector("#edit-rating").value;
        // let publishedYear = document.querySelector("#edit-year").value;
        // let summary = document.querySelector("#edit-summary").value;
        editMovie(id, {title, rating});
        populateDropDown();
    });


// This is the beginning of the DELETE functionality

    //fetch("http://localhost:3000/movies", {method: "DELETE"});




// This is the function to create the New Movie Object
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
            return movie;
        } catch (error) {
            console.error(error);
        }
    }

    //This is the add movie function

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

    document.querySelector("#movieChoice").innerHTML = document.querySelector("#editForm").value

})();

