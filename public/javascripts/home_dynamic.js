window.addEventListener("load", async (event) => {
  const editBtn = document.querySelector("#edit_favgenre_btn");

  editBtn.addEventListener("click", (e) => {
    const editForm = document.querySelector(".edit_favgenre_form");

    if (editForm.id === "hidden") {
      editForm.removeAttribute("id");
    } else {
      editForm.setAttribute("id", "hidden");
    }
  });
});
