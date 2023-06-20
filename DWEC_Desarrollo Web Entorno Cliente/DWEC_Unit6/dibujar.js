/*
Autor: Jorge Jiménez Juara - DAWC06 Arcipreste de Hita.
*/

//Array con los colores disponibles
const colores = ["yellow", "green", "black", "red", "blue", "white"];
//Variable que controla el color seleccionado. Color usado por defecto: yellow.
let color = colores[0];
//Obtenemos el elemento con ID zonadibujo
let dibujo = document.getElementById("zonadibujo");
//Mostramos el mensaje en dicho div (zonadibujo).
dibujo.innerText = "Haga CLICK en cualquier celda para activar/desactivar el Pincel";

//Cargamos el elemento con ID pincel
let pincel = document.getElementById("pincel");
//Por defecto mostramos que se encuentra desactivado.
pincel.innerText = "PINCEL DESACTIVADO..."

//FUNCIÓN: estadoPincel() - Obtiene el texto mostrado en dicho id y en base a ello retorna false si el texto indica que está desactivado y true si no.
function estadoPincel(){
    if(pincel.innerText == "PINCEL DESACTIVADO..."){
        return false;
    }else{
        return true;
    }
}

//Convertimos en un array todos los elementos tr que estén dentro de la tabla con id paleta.
let paleta = document.getElementById("paleta").getElementsByTagName("tr").item(0);

/*
FUNCIÓN: cambioColor() 
- Obtiene los elementos por TagName (td) dentro de la tabla id "paleta".
- Comprueba si alguno tiene el texto "seleccionado" en su className, de ser así, cambia el nombre de la clase por color{numero} donde {numero} es el número del array+1 correspondiente al css.
- Finalmente, al elemento seleccionado (this) le cambia el nombre de la clase añadiendole el texto "seleccionado", y cambia la variable "color" al color seleccionado (número en el array).
*/
function cambioColor(){
    for(let i=0;i<6;i++){
        if(paleta.getElementsByTagName("td").item(i).className.indexOf("seleccionado")!=-1){
            paleta.getElementsByTagName("td").item(i).className.substring(5,6);
        }
        paleta.getElementsByTagName("td").item(i).className="color"+(i+1);
    }
    //Con substring, obtenemos sólamente el número de la clase del className, y le restamos 1 que corresponde a la posición del array.
    classSeleccionado=this.className.substring(5,6)-1;
    this.className=this.className+" seleccionado";
    //Cambiamos el color seleccionado por la posición del array del elemento seleccionado.
    color=colores[classSeleccionado];
}

/*
FUNCIÓN: activarPincel() - Si está activado, cambia el resto a desactivado. En caso contrario, muestra "PINCEL ACTIVADO..." 
y además cambia el color del cuadro que seleccionamos por el color seleccionado actualmente.
*/
function activarPincel(){
    if(estadoPincel()){
        pincel.innerText = "PINCEL DESACTIVADO...";
    }else{
        pincel.innerText = "PINCEL ACTIVADO...";
        //Aquí coloreamos el elemento en el que activamos el pincel con el color actual seleccionado en la paleta.
        this.style.backgroundColor= color;
    }
}

//FUNCIÓN: colorear() - Si el pincel se encuentra activado (función estadoPincel()), colorea el elemento td con el color seleccionado actual.
function colorear(){
    if(estadoPincel()){
        this.style.backgroundColor= color;
    }
}

/*
FUNCIÓN: crearTabla() - Realiza las siguientes funciones:
- Crea el elemento tabla con unas características:  tabla con borde de 1px, solido y con color negro.
- Después creamos 2 bucles. El primer bucle con variable i, hace mención a los elementos TR que crearemos, el segundo con variable j creará los elementos TD.
- Los elementos TD tienen como diseño: borde de 1px, solid en color negro, ancho y alto de 10px.

- Todos los elementos TD son hijos de TR, al igual que los TR son hijos de la propia tabla. Por ello, hacemos este árbol con la función appendChild.
*/
function crearTabla(){

    //Creamos tabla.
    let tabla = document.createElement("table");
    //Damos estilo.
    tabla.style.border="1";
    tabla.style.borderColor="black";
    tabla.style.borderStyle="solid";


    //Bucle para elementos TR.
    for(let i=1;i<=30;i++){
        //Creamos elementos TR.
        let TR = document.createElement("tr");

        //Bucle para elementos TD.
        for(let j=1;j<=30;j++){
            //Creamos elementos TD.
            let TD = document.createElement("td");
            //Le damos estilo.
            TD.style.width = "10px";
            TD.style.height = "10px";
            TD.style.border = "1px";
            TD.style.borderColor = "black";
            TD.style.borderStyle="solid";
            

            //Añadimos 2 listener: uno que al pasar el mouse coloree, otro que al hacer click, cambie el estado del pincel (activarPincel()), y que coloree si la acción es activar el pincel.
            TD.addEventListener("mouseover", colorear, false);
            TD.addEventListener("click", activarPincel, false);

            //Añadimos el TD como elemento hijo del TR.
            TR.appendChild(TD);
        }

        //Añadimos el elemento TR como hijo de la tabla.
        tabla.appendChild(TR);
    }
    //Añadimos el elemento tabla como hijo de dibujo, el cual es un DIV.
    dibujo.appendChild(tabla);

}

//BUCLE: Lo único que hacemos aquí es, hacer un bucle de los elementos con TagName td dentro de la paleta. Después, añadimos un addEventListener que escuche los clicks y llame a la función cambioColor.
for(let e=0;e<6;e++){
    itemColor = paleta.getElementsByTagName("td").item(e);
    itemColor.addEventListener("click", cambioColor, false);
}

//Al cargar Window, ejecutamos crearTabla() para dibujar el lienzo.
window.onload=crearTabla;