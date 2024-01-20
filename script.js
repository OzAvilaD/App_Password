const lengthSlider = document.querySelector(".largo input");
const options = document.querySelectorAll(".opcion input");
const copyIcon = document.querySelector(".input_box span");
const passwordInput = document.querySelector(".input_box input");
const passIndicator = document.querySelector(".pass_indicador");
const generateBtn = document.querySelector(".generador_btn");

const characters = {
    minusculas: "abcdefghijklmnopqrstuvwxyz",
    mayusculas: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numeros: "0123456789",
    simbolos: "!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = "",
        randomPassword = "",
        excludeDuplicate = false,
        passLength = lengthSlider.value;

    options.forEach(option => {
        if (option.checked) {
            if (option.id !== "sin_duplicados" && option.id !== "con_espacios") {
                staticPassword += characters[option.id];
            } else if (option.id === "con_espacios") {
                staticPassword += `  ${staticPassword}  `;
            } else {
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;

}

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

const updateSlider = () => {
    document.querySelector(".largo span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}
updateSlider();

// copiar con el icono

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    copyIcon.style.color = "#4285f4";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";
    }, 1500);
}

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);