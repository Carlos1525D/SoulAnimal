<template>
  <!-- Header azul fuerte con el logo y botón de menú -->
  <header class="header">
    <div class="menu-icon" @click="toggleMenu">
      <i class="fas fa-bars"></i> <!-- Icono de menú -->
    </div>
    <div class="logo-container">
      <img src="@/assets/scss/logo.png" alt="Logo SoulAnimal" class="logo">
    </div>
  </header>

  <!-- Sección de menú (desplegable) -->
  <div v-if="menuVisible" class="menu-options">
    <button class="button is-small" @click="goToMenu">Regresar al menú</button>
    <button class="button is-small" @click="goToEmpleados">Empleados</button>
    <button class="button is-small" @click="goToCatalogo">Catálogo</button>
    <button class="button is-small" @click="goToPacientes">Pacientes</button>
    <button class="button is-small" @click="goToAlmacen">Almacen</button>
    <button class="button is-small" @click="logout">Cerrar sesión</button> <!-- Botón de Cerrar Sesión -->
  </div>

  <div class="receta-container">
    <h2 class="title has-text-centered">Recetas</h2>

    <!-- Botones principales -->
    <div class="buttons-container">
      <button class="button is-primary is-large" @click="currentAction = 'elegir'">Elegir Receta</button>
      <button class="button is-success is-large" @click="currentAction = 'agregar'">Agregar Receta</button>
      <button class="button is-danger is-large" @click="currentAction = 'eliminar'">Eliminar Receta</button>
    </div>

    <!-- Sección de agregar receta -->
    <div v-if="currentAction === 'agregar'" class="agregar-receta">
      <h3 class="title is-4 has-text-centered">Agregar Receta</h3>
      <div class="field">
        <label class="label">Selecciona una imagen</label>
        <div class="control">
          <input type="file" @change="handleFileUpload" class="input" />
        </div>
      </div>
      <button class="button is-info" @click="uploadImage" :disabled="!file">Subir Imagen</button>

      <!-- Mostrar imagen cargada -->
      <div v-if="uploadedImageUrl" class="image-preview">
        <h4 class="subtitle is-5">Imagen cargada:</h4>
        <img :src="uploadedImageUrl" alt="Receta" class="uploaded-image" />
      </div>
    </div>

    <!-- Mensaje de placeholder para otras acciones -->
    <div v-if="currentAction === 'elegir'">
      <p class="placeholder-text">Esta sección mostrará las recetas disponibles para elegir.</p>
    </div>
    <div v-if="currentAction === 'eliminar'">
      <p class="placeholder-text">Esta sección permitirá eliminar recetas existentes.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null, // Archivo seleccionado
      uploadedImageUrl: null, // URL de la imagen subida
      currentAction: "agregar", // Acción inicial por defecto
      menuVisible: false, // Controlar si el menú está visible
    };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible; // Alternar visibilidad del menú
    },

    // Función para regresar al menú
    goToMenu() {
      this.$router.push({ name: 'Menu' }); 
    },
    // Funciones para navegar a cada sección

  goToEmpleados() {
    this.$router.push({ name: 'Empleados' }); // Navegar a la vista Empleados
  },

  goToCatalogo() {
    this.$router.push({ name: 'Catalogo' }); // Navegar a la vista Catálogo
  },
  goToPacientes() {
    this.$router.push({ name: 'Pacientes' }); // Navegar a la vista Catálogo
  },
  goToAlmacen() {
    this.$router.push({ name: 'Almacen' }); // Navegar a la vista Catálogo
  },

    // Función para cerrar sesión
    logout() {
      
      console.log("Cerrando sesión...");
      this.$router.push({ name: 'Login' }); 
    },
  },
};
</script>

<style scoped>
/* Estilos del header */
.header {
  background-color: #004085; 
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative; 
}

.menu-icon {
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 10; /* Asegura que el icono esté por encima del menú */
}

/* Estilo del menú desplegable */
.menu-options {
  position: absolute; 
  top: 50px; 
  left: 0;
  background-color: #004085; 
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  z-index: 5; 
}

button {
  background-color: #004085;
  color: white;
  border: none;
  padding: 5px 10px; 
  cursor: pointer;
  font-size: 14px; 
}

button:hover {
  background-color: #003366; 
}

/* Estilos del contenedor de recetas */
.receta-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #a3c8f7;
  padding: 20px;
  margin-top: 0px;
  height: 800px;
}

h2, h3 {
  color: #000000;
  margin-bottom: 20px;
}

.buttons-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.button {
  font-size: 16px;
  padding: 12px 20px;
}

.agregar-receta {
  text-align: center;
}

.field {
  margin-bottom: 20px;
}

.input {
  width: 400px;
}

.image-preview {
  margin-top: 20px;
}

.uploaded-image {
  max-width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px 0;
}

.subtitle {
  margin-top: 10px;
}


label, .subtitle {
  color: #000000;
}

.placeholder-text {
  color: #000;
}

.logo {
  width: 200px;
}
</style>
