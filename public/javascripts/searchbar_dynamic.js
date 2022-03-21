window.addEventListener("load", async (event) => {
  const searchBar = document.querySelector(".bar");

  searchBar.addEventListener("input", async (e) => {
    const clearDropDown = document.querySelectorAll(".Sresult-drop-down");
    clearDropDown.forEach((results) => {
      results.remove();
    });
    let inputValue = e.target.value;

    if (inputValue) {
      const res = await fetch(`/search`, {
        method: "POST",
        body: JSON.stringify({ enteredName: inputValue }),
        headers: { "Content-Type": "application/json" },
      });
      const response = await res.json();

      if (response.message === "Success") {
        const dropDown = document.querySelector("#Smy_drop_down");

        const noResultsFound = document.querySelector(".no-results-found");

        if (noResultsFound) {
          noResultsFound.remove();
        }
        if (!response.searchResult.length) {
          const aTag = document.createElement("a");
          aTag.innerText = "No Results Found";
          // aTag.setAttribute("href", `/movies/${result.id}`);
          aTag.setAttribute("class", "no-results-found");
          dropDown.appendChild(aTag);
          dropDown.classList.add("show");
        } else {
          response.searchResult.forEach((result) => {
            const aTag = document.createElement("a");
            aTag.innerText = result.name;
            aTag.setAttribute("href", `/movies/${result.id}`);
            aTag.setAttribute("class", "Sresult-drop-down");
            dropDown.appendChild(aTag);
          });
          dropDown.classList.add("show");
        }
      }
    }
  });
});
