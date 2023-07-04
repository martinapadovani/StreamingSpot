
let pagina = 1;
const apiKey = 'ffe9e3e0742db9df0c671e43f4b9316c';


//Elementos contenedor POPULARES
const btnAnteriorPopulares = document.getElementById('btnAnteriorPopulares');
const btnSiguientePopulares = document.getElementById('btnSiguientePopulares');
const contenedorPopulares = document.getElementById("contenedor-peliculas-populares")
let urlPopulares = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-MX&page=${pagina}`


//Elementos contenedor CARTELERA

const btnAnteriorCartelera = document.getElementById('btnAnteriorCartelera');
const btnSiguienteCartelera = document.getElementById('btnSiguienteCartelera');
const contenedorCartelera = document.getElementById("contenedor-peliculas-cartelera")
let urlCartelera = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=es-MX&page=${pagina}`


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
            <li><a href="detalles.html"><img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"></a></li>
			<h3 class="titulo">${pelicula.title}</h3>
			</div>
		`;
    })

    contenedor.innerHTML = html

   // console.log(respuesta.page)

}

//Funciones para cambiar pagina

async function paginaSiguiente(url, contenedor){

    if(pagina < 1000){
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





