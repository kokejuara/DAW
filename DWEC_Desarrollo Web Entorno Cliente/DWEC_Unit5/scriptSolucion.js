//Cargamos elementos del DOM con los que vamos a trabajar.
const formulario = document.querySelector('form');
var errores = document.getElementById("errores");
var divIntentos = document.getElementById("intentos"); 
var nombre = document.getElementById("nombre");
var apellidos = document.getElementById("apellidos");
var edad = document.getElementById("edad");
var nif = document.getElementById("nif");
var email = document.getElementById("email");
var provincia = document.getElementById("provincia");
var fecha = document.getElementById("fecha");
var telefono = document.getElementById("telefono");
var hora = document.getElementById("hora");

//Comprobamos si existen cookies. De no existir, creamos una llamada intentos y le damos el valor de 0.
if(document.cookie == ""){ document.cookie = "intentos="+0 }else{
    //Si ya tiene valor esta cookie, mostramos los intentos en el div con id "intentos".
    let intentos = document.cookie.replace(/(?:(?:^|.*;\s*)intentos\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    divIntentos.innerText = `Intento de Envíos del formulario: ${intentos}`;
}

/*
Esta función se llamará cuando el usuario haga clic en el botón de submit y lo que hace es obtener el número de intentos
de la cookie "intentos" y le hace parseInt para poder sumarle 1 intento más. DEspués lo muestra en el div id ="intentos".
*/

actualizaIntentos = () => {
    let intentos = document.cookie.replace(/(?:(?:^|.*;\s*)intentos\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    intentos = parseInt(intentos)+1;
    document.cookie = "intentos="+intentos;
    divIntentos.innerText = `Intento de Envíos del formulario: ${intentos}`;
}

//Función comprobación nombre y apellidos:
validarNombreApellidos = (valor, tipo) => {
    //Expresión para comprobar que solo admitimos letras.
    let expresion = /^[A-Z]*$/;
    //variable que controla si existe error en el campo pasado por parámetro.
    let error = false;
    //Si el valor es vacío, mostramos error.
    if(valor == ""){
        errores.innerText = `Campo: ${tipo} no debe estar vacío.`;
        //Cambiamos el fondo del imput a rojo
        if(tipo == "Nombre"){
            nombre.style.background = "pink";
        }else{
            apellidos.style.background = "pink";
        }
        error = true;
        //Si no cumple con la expresión, devolvemos error.
    }else if(!expresion.test(valor)){
        errores.innerText = `Campo: ${tipo} sólamente puede contener letras.`;
        //Cambiamos el fondo del imput a rojo
        if(tipo == "Nombre"){
            nombre.style.background = "pink";
        }else{
            apellidos.style.background = "pink";
        }
        error = true;
    }else{
        //Si no existe errores y por si anteriormente su hubiese errores, eliminamos el error del div.
        errores.innerText = "";
        //Cambiamos el fondo del imput 
        if(tipo == "Nombre"){
            nombre.style.background = "white";
        }else{
            apellidos.style.background = "white";
        }
        
    }

    /*
    Por otro lado, con esta variable, controlamos el foco. Si existe error y dependiendo de la variable tipo que controla
    si se le pasa un nombre o apellidos, centra el foco de nuevo en el campo. 
    */
    if(error){
        if(tipo == "Nombre"){ nombre.focus(); }else if (tipo == "Apellidos"){ apellidos.focus(); }
    }
}

/*
Validar edad lo que hacemos es revisar lo primero que sea un número. 
De no serlo mostramos error y haemos focus. Después comprobamos que esté en el rango de edad.
*/
validarEdad = () => {
    if(isNaN(edad.value)){
        errores.innerText = "Edad debe contener un nombre";
        //Cambiamos el fondo del imput 
        edad.style.background = "pink";
        edad.focus();
    }else if (edad.value < 0 || edad.value > 105){
        errores.innerText = "Edad debe contener valores entre 0 y 105";
        //Cambiamos el fondo del imput 
        edad.style.background = "pink";
        edad.focus();
    }else{
        errores.innerText = "";
        //Cambiamos el fondo del imput 
        edad.style.background = "white";
    }
}

/*
Función que valida simplemente que la expresión regular del campo DNI se cumpla.
*/
validarNif = () => {

    /*
    Las expresiones regulares se añaden entre el caracter de la barra /
    - Con [0-9]{8,8} lo que conseguimos comprobar es la expresión tenga primero 8 números con valores entre 0 y 9.
    Con \- indicamos que el DNI tendrá un guión en la posición 9 (Detrás de los 8 números).
    Con  [A-Z] y sin indicar ningún numero, entre corchetes, da por válida una letra EN MAYÚSCULA.
    Todo esto lo hacemos entre aserciones ^ que indican que coincide el comienzo y con $ que indica que coincide el final.
    */

    let expresionDNI = /(^([0-9]{8,8}\-[A-Z])|^)$/;
    if(!expresionDNI.test(nif.value)){
        errores.innerText = "DNI debe contener 8 dígitos, guión y una letra mayúscula.";
        //Cambiamos el fondo del input
        nif.style.background = "pink";
        nif.focus();
    }else{
        errores.innerText = "";
        //Cambiamos el fondo del input
        nif.style.background = "white";
    }

}
/*
Función que valida que la expresión regular del email se cumple.
*/
validarEmail = () => {

    /*

    El email empieza por una cadena sin empezar por @ o espacio en blanco (\s). Busca entre una y x repeticiones.
    Le sigue el símbolo @
    Vuelve a buscar más caracteres sin ser @ o espacio en blanco y lo hace también es repetidas ocasiones.
    Muestra ahora el caracter .
    Vuelve a buscar una cadena.
    */

    let expresionEmail =  /^[^@\s]+@[^@\s]+(\.[^@\.\s]+)+$/;
    if(!expresionEmail.test(email.value)){
        errores.innerText = "Email con formato incorrecto";
        //Cambiamos el fondo del input
        email.style.background = "pink";
        email.focus();
    }else{
        errores.innerText = "";
        //Cambiamos el fondo del input
        email.style.background = "white";
    }

}

/*
Para este campo, he creado un array con los valores que se admite en los option. En caso de que el valor no sea uno de ellos,
devolveremos el error correspondiente y hacemos focus.

En el HTML edité el option de Pontevedra ya que en el codigo original que duplica el valor de "OU" en dos options.
*/
validarProvincia = () => {
    
    let provinciasValidas = ["C", "LU", "OU", "PO"];
    if(!provinciasValidas.includes(provincia.value)){
        errores.innerText = "La provincia introducida no es válida.";
        provincia.focus();
        //Cambiamos el fondo del input
        provincia.style.background = "pink";
    }else{
        errores.innerText = "";
        //Cambiamos el fondo del input
        provincia.style.background = "white";
    }
    
}

/*
Función que revisa que se cumpla con la expresión regular en el campo fecha.
*/
validarFecha = () => {
   
    /*
    Para comprobar la fecha (no comprueba calendario), lo que realiza es primero buscar una coincidencia con una cadenad de 2 numeros.
    Después una coincidencia entre el símbolo - o /
    Después de nuevo una nueva cadena de 2 numeros.
    Vuelve a comprobar coincidencia con símbolo - o /
    Cadena final de 4 numeros.

    Para este tipo de expresión regular, un valor 00-00-0000 sería válido, al igual que lo sería interpolar el uso de - y /: 00-00/0000

    */

    let fechaValida = /^([0-9]{2,2})(\-|\/)([0-9]{2,2})(\-|\/)([0-9]{4,4})$/;
    if(!fechaValida.test(fecha.value)){
        errores.innerText = "Fecha con formáto no válido.";
        fecha.focus();
         //Cambiamos el fondo del input
        fecha.style.background = "pink";
    }else{
        errores.innerText = "";
         //Cambiamos el fondo del input
        fecha.style.background = "white";
    }

}
/*
Función que revisa que se cumpla la expresión regular en el campo teléfono.
*/
validarTelefono = () => {
    //En esta expresión buscamos simplemente que contenga 9 números.
    let telefonoExpresion = /^([0-9]{9,9})$/;
    if(!telefonoExpresion.test(telefono.value)){
        errores.innerText = "Teléfono introducido erróneo";
        telefono.focus();
        //Cambiamos el fondo del input
        telefono.style.background = "pink";
    }else{
        errores.innerText = "";
        //Cambiamos el fondo del input
        telefono.style.background = "white";
    }
}
/*
Función que comprueba que la expresión regular del campo hora se cumpla.
/*/
validarHora = () => {

    let horaExpresion = /^([0-9]{2,2})\:([0-9]{2,2})$/;
    if(!horaExpresion.test(hora.value)){
        errores.innerText = "Hora en formáto inválido";
        hora.focus();
        //Cambiamos el fondo del input
        hora.style.background = "pink";
    }else{
        errores.innerText = "";
        //Cambiamos el fondo del input
        hora.style.background = "white";
    }
}

//Escuchador submit del formulario.
formulario.addEventListener('submit', (event) => {
    //Si hacemos submit en el formulario llamamos a la función que suma intentos en la cookie.
    actualizaIntentos();
    //Preguntamos si queremos confirmar el envío.
    // Si confirmamos nos llevará al action del form a google. De lo contrario, nos mantendremos en nuestra página cancelando el evento.
    var confirmar = confirm("¿Desea enviar el formulario?");
    if(!confirmar){
        //Cancelamos el evento.
        event.preventDefault();
    }
  });


//Listener para campo nombre
nombre.addEventListener("blur", ( event ) => {
    //Cambiamos el nombre a mayuscyla al perder el foco.
    nombre.value = nombre.value.toUpperCase();
    //Llamamos a la función que valida el nombre.
    validarNombreApellidos(nombre.value, "Nombre");
}, true);
//Listener para campo apellidos
apellidos.addEventListener("blur", ( event ) => {
    //Cambiamos los apellidos a mayuscula al perder el foco.
    apellidos.value = apellidos.value.toUpperCase();
    validarNombreApellidos(apellidos.value, "Apellidos");
}, true);

//Listener del resto de campos.
edad.addEventListener("blur", validarEdad, true);
nif.addEventListener("blur", validarNif, true);
email.addEventListener("blur", validarEmail, true);
provincia.addEventListener("blur", validarProvincia, true);
fecha.addEventListener("blur", validarFecha, true);
telefono.addEventListener("blur", validarTelefono, true);
hora.addEventListener("blur", validarHora, true);