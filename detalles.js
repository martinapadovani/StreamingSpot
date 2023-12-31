//COMPONENTES 
const apiKey = 'ffe9e3e0742db9df0c671e43f4b9316c';

// Obtiene el ID de la película de los parámetros de consulta
const urlParams = new URLSearchParams(window.location.search);
//Con el objeto URLSearchParams obtengo los parámetros de consulta de la URL. 
const idPelicula = urlParams.get('id');
//Desde los parametros de la consulta extraigo el valor del parámetro id, que va a ser inyectado en al url

const urlDetalles = `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=${apiKey}&language=es-AR`
const urlProveedores = `https://api.themoviedb.org/3/movie/${idPelicula}/watch/providers?api_key=${apiKey}`
const urlTrailer = `https://api.themoviedb.org/3/movie/${idPelicula}/videos?api_key=${apiKey}&language=es-AR`


//CONSUMIR API
async function obtenerDetalles(url){

    let respuesta = await fetch (url)

    respuesta = await respuesta.json()  

    console.log(respuesta)

    return respuesta
}


//COMPONENTE PARA DETALLES DE LAS PELICULAS
class MovieCard extends HTMLElement{// Defino una clase MovieCard que hereda la clase base HTMLElement

    constructor(){
        super()
        this.mostrarDetalles();
    } 
        
    async mostrarDetalles() {

        const respuesta = await obtenerDetalles(urlDetalles);
        const plataforma = await obtenerDetalles(urlProveedores)
        const trailer = await obtenerDetalles(urlTrailer)

        //Obtengo los detalles de la API y los declaro como atributos del componente

        //Detalles
            this.titulo = respuesta.original_title
            this.descripcion = respuesta.overview
            this.portada = respuesta.poster_path
            this.fechaDeEstreno = respuesta.release_date
            const horas = Math.floor(respuesta.runtime / 60)
            const minutosRestantes = respuesta.runtime % 60;
            this.duracion = horas + "h" + minutosRestantes + "m"
            this.puntuacion = respuesta.vote_average

        //Generos
            const generos = respuesta.genres
            let nombreGeneros = ""

            if(generos && generos.length > 0){  

                generos.forEach((genero)=>{
                    const nombreGenero = genero.name
                    nombreGeneros += nombreGenero + ", "
                })
            }

            nombreGeneros = nombreGeneros.slice(0, -2)// Eliminar la última coma y espacio de la cadena
            this.genero = nombreGeneros

        //Plataforma
            const plataformasDisponibles = plataforma.results; // Arreglo de plataformas disponibles
            let plataformasHTML = ""; // Variable para almacenar los elementos HTML de las plataformas

            // Verificar si hay plataformas disponibles en AR
            if(plataformasDisponibles.AR && plataformasDisponibles.AR.flatrate &&plataformasDisponibles.AR.flatrate.length > 0){
                plataforma.results.AR.flatrate.forEach((plataforma) => {
               
                    // Procesar las plataformas disponibles
                    const nombrePlataforma = plataforma.provider_name;
                    const iconoPlataforma = plataforma.logo_path;
                    // Construir el elemento HTML para cada plataforma
                    const plataformaHTML = `<img class="iconoPlataforma"src="https://image.tmdb.org/t/p/original${iconoPlataforma}" alt="${nombrePlataforma}">`;
                    // Agregar el elemento HTML al conjunto de plataformas
                    plataformasHTML += plataformaHTML; 
                });
            }else{
                plataformasHTML = "No se encuentra disponible en ninguna plataforma"
            }
            this.plataforma = plataformasHTML

            
        //Trailer

         let trailerkey;

         if(trailer.results[0] && trailer.results[0].key){
            const trailerkeyObtenida = trailer.results[0].key

            trailerkey = trailerkeyObtenida
         }


        //Defino un html con los contenidos y atributos creados en base a la API
            const html = `
                
            <section class="informacion-pelicula">

            <div>
            <img class="poster" src="https://image.tmdb.org/t/p/w500/${this.portada}"> <br>
            <button class="trailer" > <a target="_blank" href="https://www.youtube.com/embed/${trailerkey}" class="link-trailer">Ver Trailer</a></button>
           
            </div>
            <div class="card" >
               <div class="contenedor-titulo">  <h2 class="titulo"> ${this.titulo} </h2> <p class="fecha">(${this.fechaDeEstreno})</p> </div>
                <p class="descripcion">${this.descripcion}</p> 

                <div class="contenedor-detalles"><h6 class="detalles" > Géneros:</h6> <p class="atributos" > ${this.genero}</p></div>

                <div class="contenedor-detalles" ><h6 class="detalles">Duración:</h6> <p class="atributos" > ${this.duracion}</p></div>

                <div class="contenedor-detalles"><h6 class="detalles" >Dónde ver: </h6> <p class="plataforma" >${this.plataforma}</p></div>

                <div class="contenedor-detalles"><h6 class="detalles" >Puntaje: </h6> <p class="atributos" >${this.puntuacion}</p></div></p>
            </div>
            </section>
            `
            this.insertAdjacentHTML("beforeend", html) //Inserto el contenido HTML en el componente
    }
}

customElements.define("movie-card", MovieCard)





