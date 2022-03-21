async function addToFavGenre() {
  const editBtn = document.querySelector("#edit_favgenre_btn");

  editBtn.addEventListener("click", (e) => {
    const editForm = document.querySelector(".edit_favgenre_form");
    const deleteConnection = document.querySelectorAll(".delete_from_db");

    if (editForm.id === "hidden") {
      editForm.removeAttribute("id");

      deleteConnection.forEach((ele) => {
        ele.removeAttribute("id");
      });
    } else {
      editForm.setAttribute("id", "hidden");

      deleteConnection.forEach((ele) => {
        ele.setAttribute("id", "hidden");
      });
    }
  });

  const updateBtn = document.querySelector(".update_btn_edit_form ");

  updateBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const select = document.querySelector(".select_option_list");
    let sameName = false;

    const grabAllFaveGenreName = document.querySelectorAll(".delete_from_db");

    grabAllFaveGenreName.forEach((ele) => {
      if (ele.classList[1].split("_")[3] === select.value) {
        sameName = true;
      }
    });
    if (!sameName) {
      const res = await fetch(`/home`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subGenreId: select.value }),
      });

      const response = await res.json();
      if (response.message === "Successful") {
        window.location.reload();
      }
    } else {
    }
  });
}

async function deleteFavGenre() {
  const deleteConnection = document.querySelectorAll(".delete_from_db");

  deleteConnection.forEach((delBtn) => {
    delBtn.addEventListener("click", async (e) => {
      const genreId = delBtn.className.split(" ")[1].split("_")[3];

      const res = await fetch(`/home`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subGenreId: genreId }),
      });

      const response = await res.json();
      if (response.message === "Successful") {
        window.location.reload();
      }
    });
  });
}

window.addEventListener("load", async (event) => {
  addToFavGenre();
  deleteFavGenre();
});
