window.addEventListener('load', async (event) => {
    const searchBar = document.querySelector('.bar')
    // console.log(searchBar)
    searchBar.addEventListener('input', async (e) => {
        let inputValue = e.target.value;

        const res = await fetch(`/search`, {
            method: "POST",
            body: JSON.stringify({ enteredName: inputValue }),
            headers: { 'Content-Type': 'application/json' }
        })
        const response = await res.json()


        if (response.message === "Success") {
            console.log(response.searchResult)
            const dropDown = document.querySelector('#my_drop_down');
            const aTag = document.createElement('a');
            response.searchResult.forEach(result => {
                aTag.innerText = result.name;
                aTag.setAttribute('href', `/movies/${result.id}`)
                dropDown.appendChild(aTag);
            })
            dropDown.classList.add('show');



        } else {
            console.log("no, you dummy")
        }
        // if (response.searchResult === inputValue) {

        // }
    })
})
