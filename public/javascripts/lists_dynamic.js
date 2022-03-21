function addMovieDynamic(divContainer, movies, listId) {
  divContainer.innerHTML += `
    <div class= "movie_container"  id = "remove-btn-moiveId-${movies.id}">
      <div class="remove_container">
        <img src="/svg/noun-delete-16504.svg" id = "removeIconsvg" class ="remove_icon_btn remove_icon_btn_movieId_${movies.id} remove_icon_btn_listId_${listId}">
        <img class = posterImg src = ${movies.posterImg}>
        </div>
        <a href="/movies/${movies.id}" class="movie_title">${movies.name}</a>
     </div>`;
}

function emptyListText(divContainer) {
  divContainer.innerHTML = `
  <div class="movie_container" style="width:560px">
    <p style="color:white">Empty List....</p>
    <p style="color:white">Go to a Movie Description to Add to a List by</p><a href="/movies" style="font-family: Creepster ;color:red; font-size:45px ">Movies Tab</a>
    <p style="color:white">or Search Bar</p>
  </div>`;
}

function reloadGenreTableText() {
  const listsNames = document.querySelectorAll(".list-names");

  listsNames[0].style.fontWeight = "bolder";
  listsNames[0].style.fontSize = "20px";
  listsNames[0].style.color = "red";
}

async function dynamicClick() {
  const listsNames = document.querySelectorAll(".list-names");

  for (let i = 0; i < listsNames.length; i++) {
    const listName = listsNames[i];

    listName.addEventListener("click", async (e) => {
      const title = document.getElementById("list_title");
      const listId = listName.className.split(" ")[1].split("-")[3];

      const moviesContainer = document.getElementById("dynamic_container");

      const delBtn = document.getElementById("delete_btn");
      const renameBtn = document.getElementById("rename_btn");

      listsNames.forEach((lN) => {
        lN.style.fontWeight = "normal";
        lN.style.fontSize = "16px";
        lN.style.color = "white";
      });

      listName.style.fontWeight = "bolder";
      listName.style.fontSize = "20px";
      listName.style.color = "red";
      title.innerText = listName.innerText;

      renameBtn.removeAttribute("class");
      renameBtn.setAttribute("class", `input-listid-${listId}`);
      delBtn.removeAttribute("class");
      delBtn.setAttribute("class", `delete-button-listid-${listId}`);

      const res = await fetch("/mylists/update");
      const response = await res.json();

      moviesContainer.innerHTML = "";
      response.lists.forEach((ele) => {
        if (ele.name === listName.innerText) {
          if (!ele.Movies.length) {
            emptyListText(moviesContainer);
          } else {
            ele.Movies.forEach((el) => {
              addMovieDynamic(moviesContainer, el, listId);
            });
          }
        }
      });
      deleteMovieFromList();
    });
  }
}

async function addToList() {
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
    const inputContent = document.getElementById("input_content");
    const form = document.querySelector(".add_form");

    const res = await fetch("/mylists/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: inputContent.value }),
    });
    const response = await res.json();

    if (response.message === "List was added") {
      const listContainer = document.getElementById("list_container");
      const lDiv = document.createElement("div");
      const aTag = document.createElement("a");
      aTag.innerText = inputContent.value;
      aTag.classList.add("list-names");
      aTag.classList.add(`a-tag-list-${response.listId}`);
      aTag.classList.add(".hovergenreText");
      lDiv.appendChild(aTag);
      listContainer.appendChild(lDiv);
      form.setAttribute("id", "hidden");
      inputContent.value = "";
      dynamicClick();
    }
  });
}

async function renameList() {
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
}

async function deleteList() {
  const deleteBtn = document.getElementById("delete_btn");

  deleteBtn.addEventListener("click", async (e) => {
    const modelDeletebutton = document.querySelector(".deletebtn");
    const deleteMessage = document.querySelector(".delete_message");
    const modelPopUp = document.querySelector("#id01");
    const modelTitle = document.querySelector(".delete_title");
    const listId = deleteBtn.className.split("-")[3];
    modelPopUp.style.display = "block";
    modelTitle.innerText = "Delete List";
    deleteMessage.innerText = "Are you sure you want to delete?";
    modelDeletebutton.setAttribute("class", "deletebtn");
    modelDeletebutton.classList.add(`delete-button-listid-${listId}`);
  });
}

async function deleteBtnModel() {
  const deleteBtn = document.querySelector(".deletebtn");

  deleteBtn.addEventListener("click", async (e) => {
    const listId = deleteBtn.className.split("-")[3];

    const deleteMessage = document.querySelector(".delete_message");
    const res = await fetch(`/mylists/${listId}`, { method: "DELETE" });
    const response = await res.json();
    if (response.message === "success") {
      window.location.reload();
    } else if (response.message === 'Cannot Delete "Want to Watch"') {
      // console.log(response.message);
      deleteMessage.innerText = response.message;
    }
  });
}

function closeModel() {
  const modelPopUp = document.querySelector("#id01");
  const confirmModel = document.querySelector(".cancelbtn");

  confirmModel.addEventListener("click", (e) => {
    modelPopUp.style.display = "none";
  });
}

async function deleteMovieFromList() {
  const movieContainerIcon = document.querySelectorAll(".remove_icon_btn");

  for (let i = 0; i < movieContainerIcon.length; i++) {
    const movieContainer = movieContainerIcon[i];

    movieContainer.addEventListener("click", async (e) => {
      const movieId = movieContainer.classList[1].split("_")[4];
      const listId = movieContainer.classList[2].split("_")[4];

      const res = await fetch(`/movies/${movieId}/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listId: listId }),
      });

      const response = await res.json();
      if (response.message === "Successful") {
        const removeContainer = document.querySelector(
          `#remove-btn-moiveId-${movieId}`
        );
        removeContainer.remove();
        const dynamicMovieContainer =
          document.querySelector(".movies_container");

        if (!dynamicMovieContainer.childNodes.length) {
          console.log("last movie deleted");
          emptyListText(dynamicMovieContainer);
        }
      }
    });
  }
}

window.addEventListener("load", async (event) => {
  reloadGenreTableText();
  deleteMovieFromList();
  deleteBtnModel();
  addToList();
  dynamicClick();
  renameList();
  deleteList();
});
