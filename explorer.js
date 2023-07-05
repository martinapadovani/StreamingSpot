// ELEMENTOS EXPLORER

const apiKey = 'ffe9e3e0742db9df0c671e43f4b9316c';
const contenedorPeliculas = document.getElementById("contenedor-peliculas")


// PELICULAS X DEFECTO

//Elementos 
let urlPopulares = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-MX&page=1`


//Consumir lista

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
            <li><a href="detalles.html"><img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"></a></li>
			
			</div>
		`;
    })

    contenedorPeliculas.innerHTML = html

   console.log(respuesta.page)
}

//Ejecucion
obtenerPeliculas(urlPopulares)
mostrarPeliculas(urlPopulares)

//Funciones para cambiar pagina

//Elementos
const btnAnteriorPopulares = document.getElementById('btnAnteriorPopulares');
const btnSiguientePopulares = document.getElementById('btnSiguientePopulares');

async function paginaSiguiente(url){

    let pagina = 1

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


//btnAnteriorPopulares.addEventListener("click", () => console.log("funciono"))

btnAnteriorPopulares.addEventListener("click", async () => paginaAnterior(urlPopulares))
btnSiguientePopulares.addEventListener("click", async() => paginaSiguiente(urlPopulares))

////////////////////////////////////////////////////////////////////////

//BARRA DE BÚSQUEDA

//Elementos

const input = document.getElementById("inputDeBusqueda")
const btnBuscar = document.getElementById("botonBuscar")

let query;
let urlSearchMovie = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}&include_adult=false&language=en-US&page=1`

//Funcion

btnBuscar.addEventListener("click", async ()  => {

    if(input.value){
        urlSearchMovie = `https://api.themoviedb.org/3/search/movie?query=${input.value}&api_key=${apiKey}&include_adult=false&language=en-US&page=1`
        console.log(input.value)
        console.log(urlSearchMovie)
        
    }

    await obtenerPeliculas(urlSearchMovie)
    await mostrarPeliculas(urlSearchMovie)
})

//Ejecucion

////////////////////////////////////

// //BTN CAMBIAR PAGINA


