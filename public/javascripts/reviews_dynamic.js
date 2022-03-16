// const db = require('../../db/models');

window.addEventListener("load", async (event) => {
  const addReview = document.getElementsByClassName("add_review_btn")[0];
  const reviewsDiv = document.getElementsByClassName("reviews_description")[0];
  const reviewsData = await fetch("/reviews");
  const jsonReviewsData = JSON.parse(await reviewsData.json());

  for (let el of jsonReviewsData) {
    const pTag = document.createElement("p");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    pTag.className = `reviews user-${el.userId}`;
    pTag.innerText = el.content;
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";
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
});
