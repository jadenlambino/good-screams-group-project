// const db = require('../../db/models');

window.addEventListener("load", async (event) => {
    const addReview = document.getElementsByClassName('add_review_btn')[0]
    const div = document.getElementsByClassName('reviews_description')[0]
    const data = await fetch('http://localhost:8081/reviews')
    const jsonData = await data.json()

    const parse = JSON.parse(jsonData)


    for (let el of parse) {
        const pTag = document.createElement('p');
        pTag.innerText = el.content
        div.appendChild(pTag)
    }

    addReview.addEventListener('click', async () => {
        const res = await fetch('http://localhost:8081/reviews', { method: 'POST', header: { 'Content-Type': 'application/json' }, body: JSON.stringify({ "test": "test" }) });
    })
})
