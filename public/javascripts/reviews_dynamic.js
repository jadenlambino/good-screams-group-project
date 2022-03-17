window.addEventListener("load", async (event) => {
  const currentMovieId = window.location.href.split("/");

  const addReview = document.getElementsByClassName("add_review_btn")[0];
  const reviewsDiv = document.getElementsByClassName("reviews_description")[0];

  const reviewsData = await fetch(
    `/reviews/${currentMovieId[currentMovieId.length - 1]}`
  );
  const jsonReviewsData = JSON.parse(await reviewsData.json());
  const { reviews, userId } = jsonReviewsData;

  for (let el of reviews) {
    const pTag = document.createElement("p");
    const liTag = document.createElement("li");

    const deleteBtn = document.createElement("button");

    const editBtn = document.createElement("button");
    const editForm = document.createElement('form');
    const reviewTextarea = document.createElement('textarea');
    const submitEditBtn = document.createElement('button');

    pTag.className = `reviews-content userid-${el.userId} reviewId-${el.id}`;
    pTag.setAttribute("id", `reviewId-${el.id}`);
    pTag.innerText = el.content;

    liTag.className = `reviews-owner userid-${el.userId} reviewId-${el.id}`;
    liTag.innerText = `By: ${el.User.firstName} ${el.User.lastName}`;

    editForm.className = `edit-form hidden edit-form-reviewId-${el.id} reviewId-${el.id}`
    editForm.action = `/reviews/${el.id}`
    editForm.method = `patch`

    reviewTextarea.className = `reviews-edit-content edit-content-reviewId-${el.id} reviewId-${el.id}`;
    reviewTextarea.name = 'content'

    submitEditBtn.className = `submitEditBtn editBtn-reviewId-${el.id} reviewId-${el.id}`
    submitEditBtn.innerText = `Update Review`

    editBtn.className = `editbtn userid-${el.userId} reviewId-${el.id}`;
    editBtn.innerText = "Edit";
    editBtn.setAttribute('id', `editbtn-reviewId-${el.id}-${el.userId}`);

    editForm.appendChild(reviewTextarea)
    editForm.appendChild(submitEditBtn)

    deleteBtn.className = `deletebtn userid-${el.userId} reviewId-${el.id}`;
    deleteBtn.setAttribute("id", `deletebtn-reviewId-${el.id}`);
    deleteBtn.innerText = "Delete";

    pTag.appendChild(liTag);
    pTag.appendChild(editForm);

    if (userId === el.userId) {
      pTag.appendChild(editBtn);
      pTag.appendChild(deleteBtn);
    }

    reviewsDiv.appendChild(pTag);
  }

  addReview.addEventListener("click", async () => {
    const res = await fetch("/reviews", {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({ test: "test" }),
    });
  });

  const reviewsDescription = document.querySelector(".reviews_description");
  reviewsDescription.addEventListener("click", async (e) => {
    const deletebtn = e.target.id.split("-")[0];
    if (deletebtn === "deletebtn") {
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
    }

    const clickedBtn = e.target.className.split(' ')[0];
    const reviewId = e.target.className.split(' ')[2].split('-')[1]

    if (clickedBtn === "editbtn") {
      const form = document.querySelector(`.edit-form-reviewId-${reviewId}`)

      if (form.classList.contains('hidden')) {
        form.classList.remove('hidden')
      } else {
        form.classList.add('hidden')
      }
    }

    if (clickedBtn === 'submitEditBtn') {
      const currentEditBtn = document.querySelector(`.editBtn-reviewId-${reviewId}`)
      console.log(currentEditBtn)
      currentEditBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        const currentTextarea = document.querySelector(`.edit-content-reviewId-${reviewId}`)
        const content = currentTextarea.value;
        console.log(content)

        const res = await fetch(`/reviews/${reviewId}`, {
          method: 'PATCH',
          body: JSON.stringify({ content: content }),
          headers: { 'Content-Type': 'application/json' }
        })

        const final = await res.json();

        if (final.message === 'Review has been updated') {
          const review = document.getElementById('form')
          review.innerHTML = final.review.content
          form.classList.add('hidden')
        }
      })
    }
  });
});
