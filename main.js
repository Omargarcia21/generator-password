//Creamos variables con sus valores
const lowercaseChars = "abcdefghijklmnñopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!-$^+";
const spaceChar = " ";

//Parametro (chars) es una cadena de caracteres de la que queremos obtener un carácter aleatorio
function getRandomChar(chars) {
    //Cálculo del índice aleatorio, Math.random(), genera un número decimal aleatorio entre 0 y 1
    //Multiplicándolo por chars.length, obtenemos un número entre 0 y la longitud de chars. 
    //Math.floor() redondea hacia abajo para obtener un índice entero válido.
    const index = Math.floor(Math.random() * chars.length);
    //Devolver el carácter: Usamos el índice calculado para obtener y devolver un carácter de la cadena chars
    return chars[index];
}
function generatePassword() {
    //Obtener referencias a elementos del DOM
    const passwordInput = document.getElementById("password");
    const lowercaseCheckbox = document.getElementById("lowercase");
    const uppercaseCheckbox = document.getElementById("uppercase");
    const numbersCheckbox = document.getElementById("numbers");
    const symbolsCheckbox = document.getElementById("symbols");
    const excludeDuplicateCheckbox = document.getElementById("exc-duplicate");
    const spacesCheckbox = document.getElementById("spaces");
    let characters = "";

    //Si alguna opcion essta checked agregamos characteres a la variable characters más la ocpion agregada
    //Construir el conjunto de caracteres posibles
    if(lowercaseCheckbox.checked) characters +=lowercaseChars;
    if(uppercaseCheckbox.checked) characters += uppercaseChars;
    if(numbersCheckbox.checked) characters += numberChars;
    if(symbolsCheckbox.checked) characters += symbolChars;
    if(spacesCheckbox.checked) characters += spaceChar;

    //Verificar que haya caracteres disponibles
    if(characters === ""){
        //Si no se seleccionó ninguna opción, characters será una cadena vacía, 
        //y se limpia el valor del campo de contraseña
        passwordInput.value ="";
        //y se sale de la función
        return;
    }

    //Inicializar una variable password como cadena vacía
    let password ="";
    const length = 12;

    //Bucle while: Se ejecuta hasta que la longitud de la contraseña generada sea 12
    while (password.length < length) {
        //Llama a getRandomChar(characters) para obtener un carácter aleatorio.
        let char = getRandomChar(characters);
        //Si excludeDuplicateCheckbox está marcado y el carácter ya está en la contraseña, continúa el bucle sin agregar el carácter.
        if(excludeDuplicateCheckbox.checked && password.includes(char)) continue;
        //Si no, agrega el carácter a la contraseña.
        password += char;
    }
    //una vez completada, asigna la contraseña generada al valor del campo de contraseña (passwordInput.value).
    passwordInput.value = password;
}


function copyPassword () {
    //Obtener referencias a elementos del DOM
    const passwordInput = document.getElementById('password');
    const copyButton = document.getElementById('copy');

    //Comprueba si el navegador soporta el API del portapapeles y si la página se ejecuta en un contexto seguro (https).
    if(navigator.clipboard && window.isSecureContext) {
        //Si es así, se usa navigator.clipboard.writeText(passwordInput.value) para copiar el texto.
        navigator.clipboard.writeText(passwordInput.value).then(() =>{
            //Actualiza el botón para indicar que se copió y luego vuelve al texto original después de 2 segundos
            copyButton.textContent = 'Copied';
            setTimeout(() => {
                copyButton.textContent ='Copy';
            }, 2000);
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    } else {
        //Si el API del portapapeles no está disponible
        //habilita temporalmente el campo de contraseña y selecciona su contenido (passwordInput.select())
        passwordInput.disabled = false;
        passwordInput.select();
        //se usa document.execCommand('copy') para copiar el texto.
        document.execCommand('copy');
        passwordInput.disabled = true;

        //Desactiva el campo de nuevo y muestra el texto "Copied" en el botón durante 2 segundos
        copyButton.textContent = 'Copied';
        setTimeout(() => {
            copyButton.textContent = 'Copy';
        }, 2000);
    }
}