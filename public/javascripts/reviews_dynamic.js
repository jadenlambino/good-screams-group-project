// const db = require('../../db/models');

window.addEventListener("load", async (event) => {
    const currentMovieId = window.location.href.split("/");

    const addReview = document.getElementsByClassName("add_review_btn")[0];
    const reviewsDiv = document.getElementsByClassName("reviews_description")[0];

    const reviewsData = await fetch(
        `/reviews/${currentMovieId[currentMovieId.length - 1]}`
    );
    const jsonReviewsData = JSON.parse(await reviewsData.json());
    console.log(jsonReviewsData);

    for (let el of jsonReviewsData) {
        const pTag = document.createElement("p");
        const liTag = document.createElement("li");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        pTag.className = `reviews-content userid-${el.userId}`;
        pTag.setAttribute("id", `reviewId-${el.id}`);
        pTag.innerText = el.content;
        liTag.className = `reviews-owner userid-${el.userId}`;
        liTag.innerText = `By: ${el.User.firstName} ${el.User.lastName}`;
        editBtn.className = `editbtn userid-${el.userId}`;
        editBtn.innerText = "Edit";
        deleteBtn.className = `deletebtn userid-${el.userId}`;
        deleteBtn.innerText = "Delete";
        pTag.appendChild(liTag);
        pTag.appendChild(editBtn);
        pTag.appendChild(deleteBtn);
        reviewsDiv.appendChild(pTag);
    }

    addReview.addEventListener("click", async () => {
        const res = await fetch("/reviews", {
            method: "POST",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify({ test: "test" }),
        });
    });

    // const editButton = document.getElementsByClassName('reviews')[0].querySelector('button')
    // console.log(editButton)
    // editButton.addEventListener('click', event => {
    //     // const reviewId = event.target.id
    //     console.log(reviewId)
    //     editButton.setAttribute("id", `edit-review`)

    // })


});
