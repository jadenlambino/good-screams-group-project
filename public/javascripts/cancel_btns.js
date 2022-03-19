window.addEventListener("load", (event) => {
    const cancelBtn = document.getElementById('cancel-button')
    cancelBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const splitter = window.location.href.split('/')
        window.location.replace(`${splitter[0]}/${splitter[1]}/${splitter[2]}/`)
    })
});
