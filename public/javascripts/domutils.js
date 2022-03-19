function dynamicClick() {
  const listsNames = document.querySelectorAll(".list-names");

  for (let i = 0; i < listsNames.length; i++) {
    const listName = listsNames[i];

    listName.addEventListener("click", async (e) => {
      console.log(listsNames);
      const title = document.getElementById("list_title");
      title.innerText = listName.innerText;
      const listId = listName.className.split(" ")[1].split("-")[3];

      const moviesContainer = document.getElementById("dynamic_container");

      const delBtn = document.getElementById("delete_btn");
      const renameBtn = document.getElementById("rename_btn");

      renameBtn.removeAttribute("class");
      renameBtn.setAttribute("class", `input-listid-${listId}`);
      delBtn.removeAttribute("class");
      delBtn.setAttribute("class", `delete-button-listid-${listId}`);

      const res = await fetch("/mylists/update");
      const response = await res.json();

      moviesContainer.innerHTML = "";
      response.lists.forEach((ele) => {
        if (ele.name === listName.innerText) {
          ele.Movies.forEach((el) => {
            moviesContainer.innerHTML += `<div class= "movie_container">
                <img class = posterImg src = ${el.posterImg}>
                <a href="/movies/${el.id}" class="movie_title">${el.name}</a>
              </div>`;
          });
        }
      });
    });
  }
}
module.exports = dynamicClick;
