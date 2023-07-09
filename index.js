
let pagina = 1;
const apiKey = 'ffe9e3e0742db9df0c671e43f4b9316c';


//Elementos contenedor POPULARES
const btnAnteriorPopulares = document.getElementById('btnAnteriorPopulares');
const btnSiguientePopulares = document.getElementById('btnSiguientePopulares');
const contenedorPopulares = document.getElementById("contenedor-peliculas-populares")
let urlPopulares = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&languag=es-AR&page=${pagina}`


//Elementos contenedor CARTELERA

const btnAnteriorCartelera = document.getElementById('btnAnteriorCartelera');
const btnSiguienteCartelera = document.getElementById('btnSiguienteCartelera');
const contenedorCartelera = document.getElementById("contenedor-peliculas-cartelera")
let urlCartelera = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&languag=es-AR&page=${pagina}`

//Elementos contenedor PROXIMAMENTE

const btnAnteriorProximamente = document.getElementById('btnAnteriorProximamente');
const btnSiguienteProximamente = document.getElementById('btnSiguienteProximamente');
const contenedorProximamente = document.getElementById("contenedor-peliculas-proximamente")
let urlProximamente = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=es-AR&page=${pagina}`

//Elementos contenedor mayor VALORACION

const btnAnteriorValoracion = document.getElementById('btnAnteriorValoracion');
const btnSiguienteValoracion = document.getElementById('btnSiguienteValoracion');
const contenedorValoracion = document.getElementById("contenedor-peliculas-valoracion")
let urlValoracion = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${pagina}`

//CONSUMIR LISTAS

async function obtenerPeliculas(url){

    let respuesta = await fetch (url)

    respuesta = await respuesta.json()  

    console.log(respuesta)

    return respuesta
}

async function mostrarPeliculas(url, contenedor){

    const respuesta = await obtenerPeliculas(url)

    let html = ''

    respuesta.results.forEach(pelicula => {

        html += `
			<div class="pelicula">
            <li><a target="_blank" href="detalles.html?id=${pelicula.id}"><img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"></a></li>
			</div>
		`;
    })/*Agrego ?id=${pelicula.id} al enlace, para luego, en el archivo detalles.js, 
    poder obtener ese ID de los parámetros de consulta y utilizarlo para construir la URL de detalles*/

    contenedor.innerHTML = html

   // console.log(respuesta.page)

}

//Funciones para cambiar pagina

async function paginaSiguiente(url, contenedor){

    const respuesta = await obtenerPeliculas(url)
    const paginasTotales = respuesta.total_pages
    console.log(paginasTotales)

    if(pagina < paginasTotales){
        pagina ++;
        url = `${url}&page=${pagina}`
        await obtenerPeliculas(url);
        await mostrarPeliculas(url, contenedor);
        console.log(pagina)
        console.log(url)
    }

}

async function paginaAnterior(url, contenedor) {

    if(pagina > 1){
        pagina -= 1;
        url = `${url}&page=${pagina}`
        await obtenerPeliculas(url);
        await mostrarPeliculas(url, contenedor);
    }
}

//PELICULAS POPULARES

obtenerPeliculas(urlPopulares)
mostrarPeliculas(urlPopulares, contenedorPopulares)
btnAnteriorPopulares.addEventListener("click",() => paginaAnterior(urlPopulares, contenedorPopulares))
btnSiguientePopulares.addEventListener("click",() => paginaSiguiente(urlPopulares, contenedorPopulares))


//PELICULAS CARTELERA

obtenerPeliculas(urlCartelera)
mostrarPeliculas(urlCartelera, contenedorCartelera)
btnAnteriorCartelera.addEventListener("click",() => paginaAnterior(urlCartelera, contenedorCartelera))
btnSiguienteCartelera.addEventListener("click",() => paginaSiguiente(urlCartelera, contenedorCartelera))

//PELICULAS PROXIMAMENTE 

obtenerPeliculas(urlProximamente)
mostrarPeliculas(urlProximamente, contenedorProximamente)
btnAnteriorProximamente.addEventListener("click",() => paginaAnterior(urlProximamente, contenedorProximamente))
btnSiguienteProximamente.addEventListener("click",() => paginaSiguiente(urlProximamente, contenedorProximamente))

//PELICULAS MAYOR VALORACION

obtenerPeliculas(urlValoracion)
mostrarPeliculas(urlValoracion, contenedorValoracion)
btnAnteriorValoracion.addEventListener("click",() => paginaSiguiente(urlValoracion, contenedorValoracion))
btnSiguienteValoracion.addEventListener("click",() => paginaSiguiente(urlValoracion, contenedorValoracion))


