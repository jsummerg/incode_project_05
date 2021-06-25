// Front end validation. Regex stuff



// Validate fields so that they must require data

document.addEventListener("DOMContentLoaded", () => {
    
    const formButton = document.querySelector("form")
    const formName = document.querySelector("#name");
    const formSurname = document.querySelector("#surname");
    const formEmail = document.querySelector("#email");

    formButton.onsubmit = (e) => {
        e.preventDefault()
        
        console.log("Validation Start")

        //name validation
    const nameValid = /^[A-Za-zÀ-ÖØ-öø-ÿ \-']+$/i.test(formName.value)
        if (nameValid === true) { 
            console.log("Name is valid!")
        } else {
            console.log("That's not a valid name")
        }
    
    const surnameValid = /^[A-Za-zÀ-ÖØ-öø-ÿ \-']+$/i.test(formSurname.value)
        if (surnameValid === true) { 
            console.log("Name is valid!")
        } else {
            console.log("That's not a valid name")
        }

        //email validation
    const emailValid = /^[a-zA-Z0-9\-_]+[a-zA-Z0-9\-_\.]*@[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_\.]+$/.test(formEmail.value)

        if (emailValid === true) { 
            console.log("Email is valid!")
        } else {
            console.log("That's not a valid email")
        }

        //validation test, if all are valid, present requested info
        if (nameValid && surnameValid && emailValid) {
            console.log({
                Name: formName.value,
                Surname: formSurname.value,
                Email: formEmail.value
            })
        } else {
            console.log("Something is not valid")
        }
    }
})

