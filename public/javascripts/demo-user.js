window.addEventListener("load", async (event) => {
    const demoBtn = document.getElementById('demo-button')
    demoBtn.addEventListener('click', async (e) => {
        document.getElementById('email').value= "Demo@example.com"
        document.getElementById('hashedPassword').value = "Password1@";
        document.forms[0].submit()
    })
})


