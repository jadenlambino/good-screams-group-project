

window.addEventListener("load", async (event) => {
  const currentMovieId = window.location.href.split("/");

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
    deleteBtn.setAttribute('id', `deletebtn-reviewId-${el.id}`)
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




const reviewsDescription = document.querySelector('.reviews_description');
  reviewsDescription.addEventListener('click', async (e) => {

    const btn = e.target.id.split('-')[0];
    if (btn === 'deletebtn') {
      const reviewsId = e.target.id.split('-')[2]
      const res = await fetch(`/reviews/${reviewsId}`, {
        method: 'DELETE'
      });

      const data = await res.json()
      if (data.message === "Success") {
        const container = document.getElementById(`reviewId-${reviewsId}`);
        container.remove();
      } else {
        const pTag = document.createElement("p");
        pTag.innerText = 'Error';
        reviewsDiv.appendChild(pTag);
      }
    }
  });

});
