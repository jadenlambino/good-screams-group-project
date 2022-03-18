window.addEventListener("load", async (event) => {
  const currentMovieId = window.location.href.split("/");

  const addReview = document.getElementsByClassName("add_review_btn")[0];
  const reviewsDiv = document.getElementsByClassName("reviews_description")[0];

  const reviewsData = await fetch(
    `/reviews/${currentMovieId[currentMovieId.length - 1]}`
  );
  const jsonReviewsData = JSON.parse(await reviewsData.json());
  const { reviews, userId } = jsonReviewsData;

  for (let el of jsonReviewsData) {
    const div = document.createElement("div");
    const pTag = document.createElement("p");
    const liTag = document.createElement("li");

    const deleteBtn = document.createElement("button");

    const editBtn = document.createElement("button");
    const editForm = document.createElement("form");
    const reviewTextarea = document.createElement("textarea");
    const submitEditBtn = document.createElement("button");

    div.className = `single-review-container div-reviewId-${el.id}`;

    pTag.className = `reviews-content userid-${el.userId} reviewId-${el.id}`;
    pTag.setAttribute("id", `reviewId-${el.id}`);
    pTag.innerText = el.content;

    liTag.className = `reviews-owner userid-${el.userId} reviewId-${el.id}`;
    liTag.innerText = `By: ${el.User.firstName} ${el.User.lastName}`;

    editForm.className = `edit-form hidden edit-form-reviewId-${el.id} reviewId-${el.id}`;
    editForm.action = `/reviews/${el.id}`;
    editForm.method = `patch`;

    reviewTextarea.className = `reviews-edit-content edit-content-reviewId-${el.id} reviewId-${el.id}`;
    reviewTextarea.name = "content";

    submitEditBtn.className = `submitEditBtn editBtn-reviewId-${el.id} reviewId-${el.id}`;
    submitEditBtn.innerText = `Update Review`;
    submitEditBtn.setAttribute("id", `submitEditbtn-reviewId-${el.id}`);

    editBtn.className = `editbtn userid-${el.userId} reviewId-${el.id}`;
    editBtn.innerText = "Edit";
    editBtn.setAttribute("id", `editbtn-reviewId-${el.id}`);

    editForm.appendChild(reviewTextarea);
    editForm.appendChild(submitEditBtn);

    deleteBtn.className = `deletebtn userid-${el.userId} reviewId-${el.id}`;
    deleteBtn.setAttribute("id", `deletebtn-reviewId-${el.id}`);
    deleteBtn.innerText = "Delete";

    div.appendChild(pTag);
    div.appendChild(liTag);
    div.appendChild(editForm);

    if (userId === el.userId) {
      div.appendChild(editBtn);
      div.appendChild(deleteBtn);
    }

    reviewsDiv.appendChild(div);
  }



  const deleteBtn = document.querySelectorAll(".deletebtn");

  for (let i = 0; i < deleteBtn.length; i++) {
    const delBtn = deleteBtn[i];

    delBtn.addEventListener("click", async (e) => {
      const reviewsId = e.target.id.split("-")[2];
      const res = await fetch(`/reviews/${reviewsId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.message === "Success") {
        const container = document.getElementById(`reviewId-${reviewsId}`);
        container.remove();
      } else {
        const pTag = document.createElement("p");
        pTag.innerText = "Error";
        reviewsDiv.appendChild(pTag);
      }
    });
  }

  const editsBtn = document.querySelectorAll(".editbtn");

  for (let i = 0; i < editsBtn.length; i++) {
    const editBtn = editsBtn[i];

    editBtn.addEventListener("click", (e) => {
      const reviewId = e.target.id.split("-")[2];
      const form = document.querySelector(`.edit-form-reviewId-${reviewId}`);

      if (form.classList.contains("hidden")) {
        form.classList.remove("hidden");
      } else {
        form.classList.add("hidden");
      }
    });
  }

  const submitEditBtn = document.querySelectorAll(".submitEditBtn");

  for (let i = 0; i < submitEditBtn.length; i++) {
    const editbtn = submitEditBtn[i];

    editbtn.addEventListener("click", async (event) => {
      event.preventDefault();
      const reviewId = event.target.id.split("-")[2];

      const currentTextarea = document.querySelector(
        `.edit-content-reviewId-${reviewId}`
      );
      const content = currentTextarea.value;
      console.log(content);

      const res = await fetch(`/reviews/${reviewId}`, {
        method: "PATCH",
        body: JSON.stringify({ content: content }),
        headers: { "Content-Type": "application/json" },
      });

      const final = await res.json();
      const form = document.querySelector(`.edit-form-reviewId-${reviewId}`);
      console.log(final);
      if (final.message === "Review has been updated") {
        const review = document.getElementById(`reviewId-${reviewId}`);
        review.innerHTML = final.review.content;
        form.classList.add("hidden");
      }
    });
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
  revButton.addEventListener('click', async(event) => {
    event.preventDefault();
    event.stopPropagation();
    //revButton.classList.add = `submit-button-userId-${}`
    const textContentButton = document.getElementById('textarea')
    const desc = document.getElementById('textarea').value
    console.log(desc)

    const res = await fetch(`/reviews/new/movies/${currentMovieId[currentMovieId.length - 1]}`, {
      method: "POST",
      body: JSON.stringify({ content: desc }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await res.json();

    if (response.message === "Success") {
      revButton.classList.add('hidden');
      textContentButton.classList.add('hidden');
    }
  })

});
