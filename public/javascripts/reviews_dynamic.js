// const db = require('../../db/models');

window.addEventListener("load", (event) => {
    const addReview = document.querySelector('.add_review_btn')
    addReview.addEventListener('click', async () => {
        const res = await fetch('http://localhost:8081/reviews', { method: 'POST', header: { 'Content-Type': 'application/json' }, body: JSON.stringify({ "test": "test" }) });
    })
})
