//COMPONENTES EXPLORER
let pagina = 1
const apiKey = 'ffe9e3e0742db9df0c671e43f4b9316c';
const contenedorPeliculas = document.getElementById("contenedor-peliculas")


//PELICULAS X DEFECTO
let urlPopulares = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-AR&page=page=${pagina}`
let urlActual = urlPopulares;
//Variable global que almacenará la URL actual en uso.
//La inicializo con la URL de las películas populares por defecto.


//BOTONES

const btnAnterior= document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

//BARRA DE BÚSQUEDA
const input = document.getElementById("inputDeBusqueda")
const btnBuscar = document.getElementById("botonBuscar")
const btnVaciar = document.getElementById("botonVaciarInput");
let query;
let urlSearchMovie = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}&include_adult=false&language=es-AR&page=page=${pagina}`


//OBTENER PELICULAS

async function obtenerPeliculas(url){

    let respuesta = await fetch (url)

    respuesta = await respuesta.json()  

    console.log(respuesta)

    return respuesta
}

async function mostrarPeliculas(url){

    const respuesta = await obtenerPeliculas(url)

    let html = ''

    respuesta.results.forEach(pelicula => {

        html += `
			<div class="pelicula">
            <li><a target="_blank" href="detalles.html?id=${pelicula.id}"><img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"></a></li>
			</div>
		`;
        // agregará el ID de la película como un parámetro de consulta en el enlace hacia la página de detalles.

    }) /*Agrego ?id=${pelicula.id} al enlace, para luego, en el archivo detalles.js, 
    poder obtener ese ID de los parámetros de consulta y utilizarlo para construir la URL de detalles*/


    contenedorPeliculas.innerHTML = html
   console.log(respuesta.page)

   urlActual = url; // Actualiza la URL actual con la ultima url que se haya consumido/mostrado
}


//Ejecucion con url por defecto
obtenerPeliculas(urlPopulares)
mostrarPeliculas(urlPopulares)


//PAGINACION
async function paginaSiguiente(url){

    if(pagina < 1000){
        pagina ++;
        url = `${url}&page=${pagina}`
        console.log(pagina)
        console.log(url)

        await obtenerPeliculas(url);
        await mostrarPeliculas(url);
    }
}

async function paginaAnterior(url) {

    if(pagina > 1){
        pagina -= 1;
        url = `${url}&page=${pagina}`
        await obtenerPeliculas(url);
        await mostrarPeliculas(url);
    }
}
 
btnAnterior.addEventListener("click", () => console.log("funciono"))
btnAnterior.addEventListener("click", () => paginaAnterior(urlActual))
btnSiguiente.addEventListener("click", () => paginaSiguiente(urlActual))
/*Los botones de paginación utilizarán la URL actualmente en uso y cambiarán la página de esa URL.
Por lo tanto funcionarán tanto para las películas populares como para las películas obtenidas a través de la búsqueda por título, dependiendo de la URL en uso en ese momento. */


//BUSQUEDA POR TITULO

// El evento input se activa cuando se produce un cambio en el valor del mismo (se introduce, modifica o elimina texto)
input.addEventListener("input", () => {

    if (input.value !== "") {
        btnVaciar.style.display = "block";
     // Si el valor no es una cadena vacía (hay contenido en el input) establecemos "block" para mostrarlo.

    } else {
        btnVaciar.style.display = "none";
        //Caso contrario (input vacio), utilizamos none para ocultarlo
    }
})

btnVaciar.addEventListener("click", function() {
    input.value = "";
    btnVaciar.style.display = "none";

    //Al clickear el boton vaciamos el contenido del input, y lo ocultamos
});

btnBuscar.addEventListener("click", async ()  => {

    if(input.value){

        urlSearchMovie = `https://api.themoviedb.org/3/search/movie?query=${input.value}&api_key=${apiKey}&include_adult=false&language=es-AR&page=1`
        console.log(input.value)
        console.log(urlSearchMovie)
        
    }
    await obtenerPeliculas(urlSearchMovie)
    await mostrarPeliculas(urlSearchMovie)
})






