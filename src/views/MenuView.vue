<template>
  <header>
    <div class="logo-container">
      <img src="@/assets/scss/logo.png" alt="Logo SoulAnimal" class="logo">
      <h1 class="title has-text-centered has-text-white">Menú</h1>
    </div>
   
  </header>

  <div class="marque">
  <marquee behavior="" direction="">
    <img src="https://static.vecteezy.com/system/resources/thumbnails/043/473/421/small_2x/friendly-female-veterinarian-holding-a-cute-dog-png.png" alt="">
    Sistema de registros de veterinaria
    <img src="https://static.vecteezy.com/system/resources/previews/049/675/913/non_2x/a-cartoon-dog-with-a-collar-on-a-blue-background-png.png" alt="">
    “Cuando miro a los ojos de un animal, veo un alma.” 
    <img src="https://images.vexels.com/content/281837/preview/veterinarian-animals-people-a209c2.png" alt="">“Respetar a los animales es una obligación, amarlos es un privilegio.”
    <img src="https://images.vexels.com/content/282757/preview/animal-doctor-veterinarian-people-f182f8.png" alt=""> “Todo aquel que es cruel con los animales, no puede ser un hombre bueno.” 
    <img src="https://veterinariahvm.com/wp-content/uploads/2022/10/veterinario.png" alt="">
    “Todos y cada uno de los animales en la tierra tienen tanto derecho a estar aquí como tú y yo.”
    <img src="https://static.vecteezy.com/system/resources/thumbnails/043/473/421/small_2x/friendly-female-veterinarian-holding-a-cute-dog-png.png" alt="">
  </marquee>

  <p><i>SoulAnimal</i>&nbsp;&nbsp;Es un sistema para registros de veterinaria. Seleccione el tipo de registro que desea llevar acabo. </p>
    
  </div>
  <div class="menu-container">
    <div class="container">
      <!-- Contenedor para los botones -->
      <div class="columns is-multiline is-centered">
        <!-- Botón Sistema con fondo amarillo claro y la imagen debajo del texto -->
        <div class="column is-one-third">
          <button @click="goToSistema" class="button is-warningg is-fullwidth is-rounded flex-column">
            <span class="has-text-white arial-black">Sistema</span>
            <span class="icon is-small">
              <img src="@/assets/scss/sistema.png" alt="Sistema" />
            </span>
          </button>
        </div>
        <!-- Botón Empleados con la imagen debajo del texto y color rosa -->
        <div class="column is-one-third">
          <button @click="goToEmpleados" class="button is-rose is-fullwidth is-rounded flex-column">
            <span class="has-text-white arial-black">Empleados</span>
            <span class="icon is-small">
              <img src="@/assets/scss/empleados.png" alt="Empleados" />
            </span>
          </button>
        </div>
        <!-- Botón Catálogo con color morado claro -->
        <div class="column is-one-third">
          <button @click="goToCatalogo" class="button is-lightpurple is-fullwidth is-rounded">
            <span class="has-text-white arial-black">Catálogo</span>
            <span class="icon is-small">
              <img src="@/assets/scss/catalogo.png" alt="Empleados" />
            </span>
          </button>
        </div>
        <!-- Botón Paciente con color rojo claro -->
        <div class="column is-one-third">
          <button @click="goToPacientes" class="button is-lightred is-fullwidth is-rounded">
            <span class="has-text-white arial-black">Paciente</span>
            <span class="icon is-small">
              <img src="@/assets/scss/pacientes.png" alt="Empleados" />
            </span>
          </button>
        </div>
        <!-- Botón Almacén con color verde -->
        <div class="column is-one-third">
          <button @click="goToAlmacen" class="button is-green is-fullwidth is-rounded">
            <span class="has-text-white arial-black">Almacén</span>
            <span class="icon is-small">
              <img src="@/assets/scss/almacen.png" alt="Empleados" />
            </span>
          </button>
        </div>
        

      </div>
      <!-- Botón para cerrar sesión -->
      <div class="has-text-centered">
        <button @click="handleLogout" class="button is-danger is-rounded is-medium custom-logout-button">
          <span class="icon is-small"></span>
          <span class="has-text-centered">Cerrar sesión</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToSistema() {
      this.$router.push('/recetas');
    },
    goToEmpleados() {
      this.$router.push('/empleados');
    },
    goToCatalogo() {
      this.$router.push('/catalogo');
    },
    goToPacientes() {
      this.$router.push('/pacientes');
    },
    goToAlmacen() {
      this.$router.push('/almacen');
    },
    
    handleLogout() {
      // Elimina el estado de autenticación de localStorage
      localStorage.removeItem('authenticated');
      // Redirige a la página de inicio de sesión
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.menu-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #a3c8f7;
  padding: 20px;
  margin-top: 0px;
  height: 800px; 
 
}

.container {
  text-align: center;
  padding: 20px;
 margin-top: 2px;
}

.title {
  font-family: 'Arial Black', Arial, sans-serif;
  color: white;
  font-size: 24px; 
  margin: 0;
}

.columns {
  margin-bottom: 30px;
}

.column {
  margin-bottom: 10px;
}

.button {
  font-size: 16px;
  padding: 12px 20px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column; 
  border: 2px solid black; 
}

.button.is-warningg {
  background-color: #f5d03b;
  color: white;
}

.button.is-rose {
  background-color: #ff66b2; 
  color: white;
}


.button.is-lightpurple {
  background-color: #d1a6ff; 
  color: white;
}


.button.is-lightred {
  background-color: #f02929; 
  color: white;
}


.button.is-green {
  background-color: #28a745; 
  color: white;
}



.button.is-teal {
  background-color: #4337c7; 
  color: white;
}

.button.is-warning {
  background-color: #7fd573; 
  color: white;
}

.button.is-light {
  background-color: #7b7a7a; 
  color: white;
}

.button.is-brown {
  background-color: #724a2f; 
  color: white;
}

.button.is-rounded {
  border-radius: 20px;
}

.icon.is-small img {
  width: 40px; 
  height: 40px;
  margin-top: 8px; 
}

.arial-black {
  font-family: 'Arial Black', Arial, sans-serif;
  font-weight: bold;
}

/* Estilo para el botón de cerrar sesión */
.custom-logout-button {
  background-color: #c50000; 
  color: white;
  font-size: 13px;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: 'Arial Black', Arial, sans-serif;
}

.custom-logout-button:hover {
  background-color: #9b0000; 
}
.logo {
  width: 250px; 
  height: auto;
  padding: 5px;
  height: auto;
  margin-bottom: 10px;
}
header{
  background-color: #004085;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.marque img{
  height: 50px;
}
.marque{
  color: black;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.logo-container {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  text-align: center; 
}
p{
  color: #000;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  text-align: center;
  font-size: 24px;
  margin-top: 20px;
}
</style>