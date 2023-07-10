//COMPONENTES EXPLORER
let pagina = 1
const apiKey = 'ffe9e3e0742db9df0c671e43f4b9316c';
const contenedorPeliculas = document.getElementById("contenedor-peliculas")
const notFound = document.getElementById("NotFound")


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

//APLICADOR DE FILTROS

//x genero
const btnVerGeneros = document.getElementById("btn-generos")
const contenedorGeneros = document.getElementById("contenedor-generos")
let generoID;
let listaGeneros = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es`
let urlPeliculasxGenero = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-AR&with_genres=${generoID}`

// x fecha de estreno

const btnVerFechaDeEstreno = document.getElementById("btn-fechaDeEstreno")
const contenedorFechaDeEstreno  = document.getElementById("contenedor-fechaDeEstreno")

const inputFechaInicial = document.getElementById("fecha-inicial")
const inputFechaLimite = document.getElementById("fecha-limite")
const btnBuscarxFecha = document.getElementById("buscarPorFecha")
let fechaInicial;
let fechaLimite;
let urlPeliculasxFecha = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&primary_release_date.gte=${fechaInicial}&primary_release_date.lte=${fechaLimite}`;

// x plataformas

const btnVerPlataformas = document.getElementById("btn-plataformas")
const contenedorPlataformas  = document.getElementById("contenedor-plataformas")

let listaPlataformas = `https://api.themoviedb.org/3/watch/providers/movie?api_key=${apiKey}&language=es-AR&watch_region=AR`

let plataformaID;
let urlPeliculasxPlataforma = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-AR&watch_region=AR&with_watch_providers=${plataformaID}`

// x orden

const btnVerOrden = document.getElementById("btn-orden")
const contenedorOrden  = document.getElementById("contenedor-orden")


const popularidadASC = document.getElementById("orden-popularidad-asc")
const popularidadDESC = document.getElementById("orden-popularidad-desc")
const valoracionASC = document.getElementById("orden-valoracion-asc")
const valoracionDESC = document.getElementById("orden-valoracion-desc")
const cartelera = document.getElementById("orden-cartelera")

let urlPopularesASC = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-AR&page=${pagina}&sort_by=popularity.asc`
let urlPopularesDESC = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-AR&page=${pagina}&sort_by=popularity.desc`
let urlValoracionASC = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-AR&page=${pagina}&sort_by=vote_average.asc`
let urlValoracionDESC = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-AR&page=${pagina}&sort_by=vote_average.desc`
let urlCartelera = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&languag=es-AR&page=${pagina}`


//OBTENER PELICULAS

async function obtenerPeliculas(url){

    let respuesta = await fetch (url)

    respuesta = await respuesta.json()  

    console.log(url)
    console.log(respuesta)

    return respuesta
}

async function mostrarPeliculas(url){

    const respuesta = await obtenerPeliculas(url)

    let html = ''

    if(respuesta.results.length > 0){

        respuesta.results.forEach(pelicula => {

            html += `
                <div class="pelicula">
                <a target="_blank" href="detalles.html?id=${pelicula.id}"><img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"></a>
                </div>
            `;
            // agregará el ID de la película como un parámetro de consulta en el enlace hacia la página de detalles.

            notFound.innerHTML = ''
            contenedorPeliculas.innerHTML = html

    
        }) /*Agrego ?id=${pelicula.id} al enlace, para luego, en el archivo detalles.js, 
        poder obtener ese ID de los parámetros de consulta y utilizarlo para construir la URL de detalles*/

    }else{
        html += `
        <h2 class="NotFound">Sin coincidencias!</h2>
        `
        contenedorPeliculas.innerHTML = ''
        notFound.innerHTML = html
    }


   console.log(respuesta.page)
   console.log(respuesta.total_pages)

   urlActual = url; // Actualiza la URL actual con la ultima url que se haya consumido/mostrado
}


//Ejecucion con url por defecto
obtenerPeliculas(urlPopulares)
mostrarPeliculas(urlPopulares)


//PAGINACION
async function paginaSiguiente(url){

    const respuesta = await obtenerPeliculas(url)
    const paginasTotales = respuesta.total_pages
    console.log(paginasTotales)

    if(pagina < paginasTotales){
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

//APLICADOR DE FILTROS


//BOTONES VER + 

function botonVer(boton, contenedor){

    boton.addEventListener("click", () => {

        console.log("probando")

         // Obtener el contenedor de filtros asociado al botón actual
        const contenedorFiltros = boton.nextElementSibling;
    
         // Alternar la visibilidad del contenedor de filtros
        contenedorFiltros.style.display = contenedorFiltros.style.display === 'none' ? 'block' : 'none'
        
        contenedor.classList.toggle("ver")
        contenedor.classList.toggle("desplegado");
        boton.classList.toggle('activo');
    })
}

//Generos

botonVer(btnVerGeneros, contenedorGeneros)

async function obtenerPeliculasGenero() {

    const listaDeGeneros = await obtenerPeliculas(listaGeneros)

    contenedorGeneros.innerHTML = '';

    listaDeGeneros.genres.forEach(genero => {

        const itemGenero = document.createElement('li');
        itemGenero.classList.add('item-genero');
        itemGenero.id = genero.id;
        itemGenero.innerText = genero.name;

        itemGenero.addEventListener('click', async () => {

            urlPeliculasxGenero = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-AR&with_genres=${genero.id}`
            await obtenerPeliculas(urlPeliculasxGenero)
            await mostrarPeliculas(urlPeliculasxGenero)

            console.log(urlPeliculasxGenero)
        })
        contenedorGeneros.append(itemGenero);
    })
}

obtenerPeliculasGenero()

//Fecha de estreno

botonVer(btnVerFechaDeEstreno, contenedorFechaDeEstreno)

btnBuscarxFecha.addEventListener("click", async ()  => {

    if(inputFechaInicial.value && inputFechaLimite.value){

        fechaInicial = inputFechaInicial.value
        fechaLimite = inputFechaLimite.value
        urlPeliculasxFecha = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&primary_release_date.gte=${fechaInicial}&primary_release_date.lte=${fechaLimite}`;
        await obtenerPeliculas(urlPeliculasxFecha)
        await mostrarPeliculas(urlPeliculasxFecha)
    }
})

//Plataformas

botonVer(btnVerPlataformas, contenedorPlataformas)

async function obtenerPlataformas() {

    const listaDePlataformas = await obtenerPeliculas(listaPlataformas)

    console.log(listaDePlataformas)

    contenedorPlataformas.innerHTML = '';

    listaDePlataformas.results.forEach(plataforma => {

        const itemPlataforma = document.createElement('li');
        itemPlataforma.classList.add('item-plataforma');
        itemPlataforma.id = plataforma.provider_id;
        itemPlataforma.innerText = plataforma.provider_name;
        itemPlataforma.innerHTML= `
        <img class="iconoPlataforma" src="https://image.tmdb.org/t/p/original${plataforma.logo_path}" alt="${plataforma.provider_name}">
        `

        itemPlataforma.addEventListener('click', async () => {

            urlPeliculasxPlataforma = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&language=es-AR&watch_region=AR&with_watch_providers=${plataforma.provider_id}`
            await obtenerPeliculas(urlPeliculasxPlataforma)
            await mostrarPeliculas(urlPeliculasxPlataforma)

            console.log(urlPeliculasxPlataforma)
        })

        contenedorPlataformas.append(itemPlataforma);
    })
}

obtenerPlataformas()

async function probar (){

    const respuesta = await obtenerPeliculas(urlPopularesASC)
    const respuesta1 = await obtenerPeliculas(urlPopularesDESC)
    console.log("peliculas x orden ascendente")
    console.log(respuesta)
    console.log("peliculas x orden descendente")
    console.log(respuesta1)

    //await mostrarPeliculas(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-AR&watch_region=AR&with_watch_providers=337`)
}
probar ()

//Orden

botonVer(btnVerOrden, contenedorOrden)

async function aplicarOrden(tipoDeOrden, url){

    tipoDeOrden.addEventListener("click", async () => {
        await obtenerPeliculas(url);
        await mostrarPeliculas(url);    
    })
}

aplicarOrden(popularidadASC, urlPopularesASC)
aplicarOrden(popularidadDESC, urlPopularesDESC)
aplicarOrden(valoracionASC, urlValoracionASC)
aplicarOrden(valoracionDESC, urlValoracionDESC)
aplicarOrden(cartelera, urlCartelera)
    
