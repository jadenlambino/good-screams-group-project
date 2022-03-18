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
    }
  });
});
