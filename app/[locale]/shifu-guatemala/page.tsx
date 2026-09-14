<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>El viaje de Shifu por Guatemala</title>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;700&display=swap');

:root {
  --verde: #163f35;
  --verde2: #286653;
  --dorado: #e5ad45;
  --crema: #f7f1df;
  --oscuro: #111814;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
  background: var(--crema);
  color: var(--oscuro);
}

/* HERO */

.hero {
  min-height: 100vh;
  background:
    linear-gradient(90deg, rgba(5,20,15,.88), rgba(5,20,15,.25)),
    url('https://commons.wikimedia.org/wiki/Special:FilePath/Antigua%20Guatemala%20-%20Santa%20Catalina%20Arch.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 60px 8%;
  color: white;
}

.hero-content {
  max-width: 850px;
}

.tag {
  display: inline-block;
  background: var(--dorado);
  color: #1b211d;
  padding: 9px 18px;
  border-radius: 30px;
  font-weight: bold;
  margin-bottom: 25px;
}

h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(70px, 13vw, 150px);
  line-height: .85;
  letter-spacing: 2px;
}

.hero p {
  font-size: 1.25rem;
  max-width: 650px;
  margin-top: 30px;
  line-height: 1.7;
}

.scroll {
  margin-top: 45px;
  color: var(--dorado);
  font-weight: bold;
}

/* INTRO */

.intro {
  padding: 100px 8%;
  text-align: center;
  max-width: 1000px;
  margin: auto;
}

.intro h2,
.timeline h2,
.gallery h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 60px;
  color: var(--verde);
  letter-spacing: 1px;
}

.intro p {
  margin-top: 25px;
  font-size: 1.15rem;
  line-height: 1.9;
}

/* TIMELINE */

.timeline {
  padding: 80px 8%;
  background: var(--verde);
  color: white;
}

.timeline h2 {
  color: var(--dorado);
  text-align: center;
  margin-bottom: 70px;
}

.moment {
  max-width: 1100px;
  margin: 0 auto 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 45px;
  align-items: center;
}

.moment:nth-child(even) {
  direction: rtl;
}

.moment:nth-child(even) .text {
  direction: ltr;
}

.moment img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 25px;
  box-shadow: 0 20px 50px rgba(0,0,0,.3);
}

.number {
  color: var(--dorado);
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 3px;
}

.moment h3 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 55px;
  margin: 10px 0 20px;
}

.moment p {
  line-height: 1.8;
  color: #d8e2dd;
}

.quote {
  border-left: 4px solid var(--dorado);
  margin-top: 25px;
  padding-left: 20px;
  font-style: italic;
}

/* GALLERY */

.gallery {
  padding: 100px 8%;
}

.gallery h2 {
  text-align: center;
  margin-bottom: 50px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.grid img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 18px;
  transition: .4s;
}

.grid img:hover {
  transform: scale(1.03);
}

/* FINAL */

.final {
  min-height: 70vh;
  background:
    linear-gradient(rgba(12,29,23,.75), rgba(12,29,23,.85)),
    url('https://commons.wikimedia.org/wiki/Special:FilePath/Tikal%20(Guatemala).JPG');
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 50px 8%;
}

.final h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(70px, 12vw, 130px);
  color: var(--dorado);
}

.final p {
  max-width: 700px;
  margin: 25px auto;
  font-size: 1.2rem;
  line-height: 1.8;
}

.btn {
  display: inline-block;
  margin-top: 20px;
  padding: 15px 30px;
  background: var(--dorado);
  color: #172019;
  text-decoration: none;
  font-weight: bold;
  border-radius: 30px;
}

/* FOOTER */

footer {
  background: #0c1713;
  color: #9eaca5;
  padding: 35px;
  text-align: center;
  font-size: .85rem;
}

/* MOBILE */

@media(max-width: 750px) {

  .hero {
    padding: 40px 7%;
  }

  .moment {
    grid-template-columns: 1fr;
  }

  .moment:nth-child(even) {
    direction: ltr;
  }

  .moment img {
    height: 300px;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .grid img {
    height: 280px;
  }
}
</style>
</head>

<body>

<!-- PORTADA -->

<section class="hero">

  <div class="hero-content">

    <span class="tag">DIARIO DE AVENTURA · GUATEMALA</span>

    <h1>
      EL VIAJE<br>
      DE SHIFU
    </h1>

    <p>
      Entre volcanes, pueblos llenos de color, lagos rodeados de montañas
      y antiguas ciudades mayas, Shifu descubre una Guatemala que jamás
      olvidará.
    </p>

    <div class="scroll">
      ↓ DESLIZA PARA COMENZAR EL VIAJE
    </div>

  </div>

</section>


<!-- INTRO -->

<section class="intro">

  <h2>Una aventura inesperada</h2>

  <p>
    Shifu llegó a Guatemala buscando tranquilidad...
    pero encontró volcanes, selva, agua turquesa, cultura maya
    y algunos de los paisajes más impresionantes de Centroamérica.
  </p>

  <p>
    Este es el recorrido de sus momentos más memorables.
  </p>

</section>


<!-- MOMENTOS -->

<section class="timeline">

  <h2>Momentos clave del viaje</h2>


  <!-- ANTIGUA -->

  <article class="moment">

    <img
      src="https://commons.wikimedia.org/wiki/Special:FilePath/Antigua%20Guatemala%20-%20Santa%20Catalina%20Arch.jpg"
      alt="Arco de Santa Catalina en Antigua Guatemala">

    <div class="text">

      <span class="number">01 · ANTIGUA GUATEMALA</span>

      <h3>El comienzo</h3>

      <p>
        Shifu comienza su aventura caminando por las calles empedradas
        de Antigua Guatemala. Entre edificios coloniales, volcanes
        y el famoso Arco de Santa Catalina, descubre el carácter
        histórico de la ciudad.
      </p>

      <div class="quote">
        “Un buen viaje comienza cuando uno deja de saber exactamente
        qué encontrará.”
      </div>

    </div>

  </article>


  <!-- ACATENANGO -->

  <article class="moment">

    <img
      src="https://commons.wikimedia.org/wiki/Special:FilePath/Volcan%20acatenango.jpg"
      alt="Volcán Acatenango">

    <div class="text">

      <span class="number">02 · ACATENANGO</span>

      <h3>Frente al volcán</h3>

      <p>
        La tranquilidad queda atrás. Shifu emprende el ascenso hacia
        el Volcán Acatenango. El camino se vuelve más difícil,
        pero la recompensa llega al alcanzar las alturas y contemplar
        el paisaje volcánico.
      </p>

      <div class="quote">
        “La paciencia también es una forma de fuerza.”
      </div>

    </div>

  </article>


  <!-- ATITLAN -->

  <article class="moment">

    <img
      src="https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20Atitlan%2C%20Guatemala.jpg"
      alt="Lago de Atitlán">

    <div class="text">

      <span class="number">03 · LAGO DE ATITLÁN</span>

      <h3>El lago de los volcanes</h3>

      <p>
        Shifu llega al Lago de Atitlán y finalmente encuentra un momento
        de calma. El agua, los volcanes y los pueblos alrededor del lago
        crean uno de los escenarios más especiales del viaje.
      </p>

      <div class="quote">
        “A veces el mejor entrenamiento consiste simplemente en detenerse.”
      </div>

    </div>

  </article>


  <!-- SEMUC -->

  <article class="moment">

    <img
      src="https://commons.wikimedia.org/wiki/Special:FilePath/Semuc%20Champey%2C%20Guatemala%20CA.jpg"
      alt="Semuc Champey">

    <div class="text">

      <span class="number">04 · SEMUC CHAMPEY</span>

      <h3>La selva escondida</h3>

      <p>
        Después de atravesar caminos de montaña, Shifu descubre
        las pozas turquesas de Semuc Champey. Rodeado de selva,
        el maestro comprende que algunas de las mejores aventuras
        están lejos de los caminos fáciles.
      </p>

      <div class="quote">
        “El camino difícil suele llevar a lugares extraordinarios.”
      </div>

    </div>

  </article>


  <!-- TIKAL -->

  <article class="moment">

    <img
      src="https://commons.wikimedia.org/wiki/Special:FilePath/Tikal%20(Guatemala).JPG"
      alt="Templo maya de Tikal">

    <div class="text">

      <span class="number">05 · TIKAL</span>

      <h3>Entre los antiguos mayas</h3>

      <p>
        El último gran capítulo lleva a Shifu hasta Tikal.
        Los templos emergen entre la selva mientras el viajero
        contempla la grandeza de la civilización maya.
      </p>

      <div class="quote">
        “El verdadero conocimiento también vive en las historias del pasado.”
      </div>

    </div>

  </article>

</section>


<!-- GALERÍA -->

<section class="gallery">

  <h2>Postales del viaje</h2>

  <div class="grid">

    <img
      src="https://commons.wikimedia.org/wiki/Special:FilePath/Antigua%20Guatemala%20Arch.jpg"
      alt="Antigua Guatemala">

    <img
      src="https://commons.wikimedia.org/wiki/Special:FilePath/Lago%20de%20Atitl%C3%A1n%20en%20Guatemala.jpg"
      alt="Lago de Atitlán">

    <img
      src="https://commons.wikimedia.org/wiki/Special:FilePath/Semuc%20Champey.jpg"
      alt="Semuc Champey">

    <img
      src="https://commons.wikimedia.org/wiki/Special:FilePath/Volcan%20acatenango.jpg"
      alt="Acatenango">

    <img
      src="https://commons.wikimedia.org/wiki/Special:FilePath/Tikal%20-%20Guatemala%2C%20Guatemala.jpg"
      alt="Tikal">

    <img
      src="https://commons.wikimedia.org/wiki/Special:FilePath/Arco%20de%20Santa%20Catalina.jpg"
      alt="Arco de Santa Catalina">

  </div>

</section>


<!-- FINAL -->

<section class="final">

  <div>

    <h2>Hasta pronto, Guatemala.</h2>

    <p>
      Shifu llegó buscando una aventura y se marchó con algo mucho más
      valioso: recuerdos, paisajes y nuevas historias que contar.
    </p>

    <a href="#top" class="btn">VOLVER AL INICIO ↑</a>

  </div>

</section>


<footer>

  Fotografías: Wikimedia Commons · Las imágenes utilizadas indican
  sus autores y licencias en sus páginas originales.

</footer>

</body>
</html>
