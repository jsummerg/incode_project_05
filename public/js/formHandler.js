// Front end validation. Regex stuff



// Validate fields so that they must require data

document.addEventListener("DOMContentLoaded", () => {
    
    const formButton = document.querySelector("form")
    const formName = document.querySelector("#name");
    const formSurname = document.querySelector("#surname");
    const formEmail = document.querySelector("#email");

    formButton.onsubmit = (e) => {

        //name validation
    const nameValid = /^[A-Za-zÀ-ÖØ-öø-ÿ \-']+$/i.test(formName.value)
      
    const surnameValid = /^[A-Za-zÀ-ÖØ-öø-ÿ \-']+$/i.test(formSurname.value)

        //email validation
    const emailValid = /^[a-zA-Z0-9\-_]+[a-zA-Z0-9\-_\.]*@[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_\.]+$/.test(formEmail.value)

        //validation test, if all are valid, present requested info
        if (nameValid && surnameValid && emailValid) {
            console.log({
                Name: formName.value,
                Surname: formSurname.value,
                Email: formEmail.value
            })
            return true;
        } else {
            console.log("Something is not valid")
            return false;
        }
    }
})