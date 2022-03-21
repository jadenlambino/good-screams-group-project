async function deleteBtn() {
  const deleteBtn = document.querySelectorAll(".deletebtn");

  for (let i = 0; i < deleteBtn.length; i++) {
    const delBtn = deleteBtn[i];
    const reviewsDiv = document.getElementsByClassName(
      "reviews_description"
    )[0];

    delBtn.addEventListener("click", async (e) => {
      const reviewsId = e.target.id.split("-")[2];
      const res = await fetch(`/reviews/${reviewsId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.message === "Success") {
        const container = document.getElementById(`div-reviewId-${reviewsId}`);
        container.remove();
      } else {
        const pTag = document.createElement("p");
        pTag.innerText = "Error";
        pTag.style.color = "red";
        reviewsDiv.appendChild(pTag);
      }
    });
  }
}

async function editBtn() {
  const editsBtn = document.querySelectorAll(".editbtn");
  const submitEditBtn = document.querySelectorAll(".submitEditBtn");

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

  for (let i = 0; i < submitEditBtn.length; i++) {
    const editbtn = submitEditBtn[i];

    editbtn.addEventListener("click", async (event) => {
      event.preventDefault();
      const reviewId = event.target.id.split("-")[2];

      const currentTextarea = document.querySelector(
        `.edit-content-reviewId-${reviewId}`
      );
      const content = currentTextarea.value;

      const reviewID = currentTextarea.classList[2].split("-")[1];

      const reviewContainerError = document.querySelector(
        `#div-reviewId-${reviewID}`
      );
      const errorMessage = document.querySelector(".ErrorMessageForEditReview");
      if (errorMessage) {
        errorMessage.remove();
      }

      if (content) {
        const res = await fetch(`/reviews/${reviewId}`, {
          method: "PATCH",
          body: JSON.stringify({ content: content }),
          headers: { "Content-Type": "application/json" },
        });

        const final = await res.json();
        const form = document.querySelector(`.edit-form-reviewId-${reviewId}`);
        if (final.message === "Review has been updated") {
          const review = document.getElementById(`reviewId-${reviewId}`);
          review.innerHTML = final.review.content;
          form.classList.add("hidden");
          currentTextarea.value = "";
        }
      } else {
        const pTag = document.createElement("p");
        pTag.innerText = "Review can not be empty";
        pTag.style.color = "red";
        pTag.classList.add("ErrorMessageForEditReview");
        reviewContainerError.appendChild(pTag);
      }
    });
  }
}

async function dropDownList(movieId) {
  const myListBtn = document.querySelector(".drop_btn");
  myListBtn.addEventListener("click", async (event) => {
    const listContainer = document.getElementById("my_drop_down");
    const className = listContainer.className.split(" ")[1];
    if (className !== "show") {
      listContainer.classList.add("show");
    } else {
      listContainer.classList.remove("show");
    }
  });

  const listNames = document.querySelectorAll(".add_to_list_name");
  for (let i = 0; i < listNames.length; i++) {
    const listName = listNames[i];
    listName.addEventListener("click", async (event) => {
      const listId = event.target.id.split("_")[3];
      ``;
      const res = await fetch(`/movies/${movieId}/add`, {
        method: "POST",
        body: JSON.stringify({ listId }),
        headers: { "Content-Type": "application/json" },
      });

      const response = await res.json();
      if (response.message === "Success") {
        const listContainer = document.getElementById("my_drop_down");
        listContainer.classList.remove("show");
      }
    });
  }
}

async function makeReview(movieId) {
  const reviewBtn = document.querySelector(".add_review_btn");
  const newReviewForm = document.querySelector("#new-review");

  reviewBtn.addEventListener("click", async (e) => {
    if (newReviewForm.className === "hidden") {
      newReviewForm.classList.remove("hidden");
    } else {
      newReviewForm.classList.add("hidden");
    }
  });

  const submitbtn = document.getElementById("submit-review");

  submitbtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const errorMessage = document.querySelector(".ErrorMessageForMakingReview");
    if (errorMessage) {
      errorMessage.remove();
    }

    const textContentButton = document.getElementById("textarea");

    if (textContentButton.value) {
      const res = await fetch(`/reviews/new/movies/${movieId}`, {
        method: "POST",
        body: JSON.stringify({ content: textContentButton.value }),
        headers: { "Content-Type": "application/json" },
      });

      const response = await res.json();

      if (response.message === "Success") {
        textContentButton.value = "";
        newReviewForm.classList.add("hidden");
        editBtn();
        deleteBtn();
        window.location.reload();
      }
    } else {
      const errorPostContainer = document.querySelector(
        ".submit_review_container"
      );

      const pTag = document.createElement("p");
      pTag.innerText = "Review can not be empty";
      pTag.style.color = "red";
      pTag.style.paddingLeft = "8px";
      pTag.classList.add("ErrorMessageForMakingReview");
      errorPostContainer.appendChild(pTag);
    }
  });
}

// function addReviewDynamic(newReview, userInfo) {
//   const reviewContainer = document.querySelector(".reviews_description");
//   const divEle = document.createElement("div");
//   const pEle = document.createElement("p");
//   const liEle = document.createElement("li");
//   const editFormEle = document.createElement("div");
//   const formEle = document.createElement("form");
//   const submitBtnEle = document.createElement("div");
//   const textareaEle = document.createElement("textarea");
//   const buttonform = document.createElement("button");
//   const buttonedit = document.createElement("button");
//   const buttondelete = document.createElement("button");

//   divEle.classList.add("single-review-container");
//   divEle.setAttribute("id", `div-reviewId-${newReview.id}`);

//   pEle.classList.add(
//     `reviews-content`,
//     `userid-${newReview.userId}`,
//     `reviewId-${newReview.id}`
//   );
//   pEle.setAttribute("id", `reviewId-${newReview.id}`);
//   pEle.innerText = newReview.content;

//   liEle.classList.add(
//     `reviews-owner`,
//     `userid-${newReview.userId}`,
//     `reviewId-${newReview.id}`
//   );
//   liEle.innerText = `By: ${userInfo.firstName} ${userInfo.lastName}`;

//   editFormEle.classList.add("edit_form_container");

//   formEle.classList.add(
//     `edit-form`,
//     `hidden`,
//     `edit-form-reviewId-${newReview.id}`,
//     `reviewId-${newReview.id}`
//   );

//   submitBtnEle.classList.add("submitEditBtn_container");

//   textareaEle.classList.add(
//     `reviews-edit-content`,
//     `edit-content-reviewId-${newReview.id}`,
//     `reviewId-${newReview.id}`
//   );
//   textareaEle.setAttribute("name", "content");
//   textareaEle.placeholder = "Edit Review Here";

//   buttonform.classList.add(
//     `submitEditBtn`,
//     `editBtn-reviewId-${newReview.id}`,
//     `reviewId-${newReview.id}`
//   );
//   buttonform.setAttribute("id", `submitEditbtn-reviewId-${newReview.id}`);
//   buttonform.innerText = "Update Review";

//   buttonedit.classList.add(
//     `editbtn`,
//     `userid-${newReview.userId}`,
//     `reviewId-${newReview.id}`
//   );
//   buttonedit.setAttribute("id", `editbtn-reviewId-${newReview.id}`);
//   buttonedit.innerText = "Edit";

//   buttondelete.classList.add(
//     `deletebtn`,
//     `userid-${newReview.userId}`,
//     `reviewId-${newReview.id}`
//   );
//   buttondelete.setAttribute("id", `deletebtn-reviewId-${newReview.id}`);
//   buttondelete.innerText = "Delete";

//   submitBtnEle.appendChild(textareaEle);
//   submitBtnEle.appendChild(buttonform);

//   formEle.appendChild(submitBtnEle);

//   editFormEle.appendChild(formEle);

//   divEle.appendChild(pEle);
//   divEle.appendChild(liEle);
//   divEle.appendChild(editFormEle);

//   divEle.appendChild(buttonedit);
//   divEle.appendChild(buttondelete);

//   // formEle.appendChild(textareaEle);
//   // formEle.appendChild(buttonform);

//   // divEle.appendChild(pEle);
//   // divEle.appendChild(liEle);
//   // divEle.appendChild(formEle);
//   reviewContainer.prepend(divEle);
// }

window.addEventListener("load", async (event) => {
  const pathArr = window.location.href.split("/");
  const currentMovieId = pathArr[pathArr.length - 1];

  dropDownList(currentMovieId);

  deleteBtn();
  editBtn();
  makeReview(currentMovieId);
});
