// const db = require('../../db/models');

// const res = require("express/lib/response");
const currentMovieId = window.location.href.split("/")[4];
window.addEventListener("load", async (event) => {

  console.log (currentMovieId)

  const addReview = document.getElementsByClassName("add_review_btn")[0];
  const reviewsDiv = document.getElementsByClassName("reviews_description")[0];

  const reviewsData = await fetch(
    `/reviews/${currentMovieId[currentMovieId.length - 1]}`
  );
  const jsonReviewsData = JSON.parse(await reviewsData.json());


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

  const movieReviewsContainer = document.querySelector('.review_container')
  movieReviewsContainer.addEventListener('click', e => {
    const reviewButton = e.target.className.split('_')[2]
    const form = document.querySelector('#new-review')

    if (reviewButton === 'btn') {
      form.classList.remove('hidden')
    }
  });

  const revButton = document.getElementById('submit-review')

  revButton.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    const desc = document.getElementById('textarea').value

    fetch(`/movies/${currentMovieId}`, {
      method: "POST",
    })
    .then((res) => console.log(res))

    // if (res) {
      let newEle = document.createElement('p');
      newEle.innerText = `${desc}`;
      movieReviewsContainer.appendChild(newEle);
    // }
  })
});
