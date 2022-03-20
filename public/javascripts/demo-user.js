window.addEventListener("load", async (event) => {
    const demoBtn = document.getElementById('demo-button')
    demoBtn.addEventListener('click', async (e) => {
        document.getElementById('email').value= "Demo@example.com"
        document.getElementById('hashedPassword').value = "Password1@";
        document.forms[0].submit()
    })
})

// const demoBtn = document.getElementById('demo')

// demoBtn.addEventListener('click', autoFill())
// const autoFill = () => {
//     document.getElementById('email').value= "Demo@example.com"
//     document.getElementById('hashedPassword').value = "Password1@";
//     document.forms[0].submit();
//     return
// }

// function autoFill() {
//     document.getElementById('email').value= "Demo@example.com"
//     document.getElementById('hashedPassword').value = "Password1@";
//     document.forms[0].submit();
// }
