window.addEventListener("load", async (event) => {
  const addBtn = document.getElementById("add-list-btn");

  addBtn.addEventListener("click", async (e) => {
    const form = document.querySelector(".add_form");

    if (form.id === "hidden") {
      form.removeAttribute("id");
    } else {
      form.setAttribute("id", "hidden");
    }
  });

  const confirmBtn = document.getElementById("confirm_btn");

  confirmBtn.addEventListener("click", async (e) => {
    const inputContent = document.getElementById("input_content").value;
    const form = document.querySelector(".add_form");

    const res = await fetch("/mylists/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: inputContent }),
    });
    const response = await res.json();

    if (response.message === "List was added") {
      const listContainer = document.getElementById("list_container");
      const aTag = document.createElement("a");
      aTag.innerText = inputContent;
      listContainer.appendChild(aTag);
      form.setAttribute("id", "hidden");
    }
  });

  const listsNames = document.querySelectorAll(".list-names");

  for (let i = 0; i < listsNames.length; i++) {
    const listName = listsNames[i];

    listName.addEventListener("click", async (e) => {
      const title = document.getElementById("list_title");
      title.innerText = listName.innerText;
      const listId = listName.className.split(" ")[1].split("-")[3];

      console.log(listId);

      const moviesContainer = document.getElementById("dynamic_container");

      const renameBtn = document.getElementById("rename_btn");
      renameBtn.removeAttribute("class");
      renameBtn.setAttribute("class", `input-listid-${listId}`);

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

  const editBtn = document.getElementById("edit_btn");

  editBtn.addEventListener("click", async (e) => {
    const renameForm = document.querySelector(".rename_container");
    if (renameForm.id === "hidden") {
      renameForm.removeAttribute("id");
    } else {
      renameForm.setAttribute("id", "hidden");
    }
  });

  const renameBtn = document.getElementById("rename_btn");

  renameBtn.addEventListener("click", async (e) => {
    const listId = renameBtn.className.split("-")[2];

    const renameInput = document.getElementById("rename_input").value;
    const renameForm = document.querySelector(".rename_container");
    const title = document.getElementById("list_title");
    const listTableName = document.querySelector(`.a-tag-list-${listId}`);
    console.log(listTableName);

    const res = await fetch(`/mylists/${listId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: renameInput }),
    });

    const response = await res.json();

    if (response.message === "Successful") {
      title.innerText = renameInput;
      renameForm.setAttribute("id", "hidden");
      listTableName.innerText = renameInput;
    }
  });
});
