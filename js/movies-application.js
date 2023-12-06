"use strict";

(() => {
    fetch("http://localhost:3000/movies").then(resp => resp.json()).then(data => console.log(data));

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


    // const createAuthor = async (author) => {
    //     try {
    //         const url = `http://localhost:3000/authors`;
    //         const options = {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(author)
    //         };
    //         const resp = await fetch(url, options);
    //         const newAuthor = await resp.json();
    //         return newAuthor;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

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

    const newBook = {
        "id": 1,
        "title": "Shrek",
        "rating": 5
    }

    // const jimDavis = {
    //     "name": "Jim Davis",
    //     "birthYear": 1945,
    //     "deathYear": null,
    //     "nationality": "American"
    // }

    // editMovie(5, {"Title": 5});

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
        const bookId = e.target.value;
        fetch("http://localhost:3000/books/" + bookId).then(resp => resp.json()).then(book => {
            document.querySelector("#edit-title").value = movie.title;
            document.querySelector("#edit-id").value = movie.id;
            document.querySelector("#edit-rating").value = movie.rating;
            // document.querySelector("#edit-year").value = book.publishedYear;
            // document.querySelector("#edit-summary").value = book.summary;
        })
    });

    document.forms.editForm.addEventListener("submit", e => {
        e.preventDefault();
        // let id = document.querySelector("#edit-select").value;
        let title = document.querySelector("#edit-title").value;
        let id = document.querySelector("#edit-id").value;
        let rating = document.querySelector("#edit-rating").value;
        // let publishedYear = document.querySelector("#edit-year").value;
        // let summary = document.querySelector("#edit-summary").value;
        editMovie(id, {title, rating});
        populateDropDown();
    });

    fetch("http://localhost:3000/movies", {method: "DELETE"});

    // createAuthor(jimDavis);

    // createBook(newBook).then(() => fetch("http://localhost:3000/books")).then(resp => resp.json()).then(data => console.log(data));
})();