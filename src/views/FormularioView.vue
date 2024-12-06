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
    <button class="button is-small" @click="goToSistema">Sistema</button>
    <button class="button is-small" @click="goToEmpleados">Empleados</button>
    <button class="button is-small" @click="goToPacientes">Pacientes</button>
    <button class="button is-small" @click="goToAlmacen">Almacen</button>
    <button class="button is-small" @click="logout">Cerrar sesión</button> <!-- Botón de Cerrar Sesión -->
  </div>

  <div class="formulario-container">
    <h2 class="title has-text-centered">Formularios</h2>
    <div class="buttons-container">
      <button @click="currentAction = 'elegir'">Elegir Formulario</button>
      <button @click="currentAction = 'agregar'">Agregar Formulario</button>
      <button @click="currentAction = 'eliminar'">Eliminar Formulario</button>
    </div>

     <!-- Sección de agregar receta -->
     <div v-if="currentAction === 'agregar'" class="agregar-formulario">
      <h3 class="title is-4 has-text-centered">Agregar Formulario</h3>
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

    <div v-if="currentAction === 'elegir'">
      <p class="placeholder-text">Esta sección mostrará los formularios disponibles para elegir.</p>
    </div>
    <div v-if="currentAction === 'eliminar'">
      <p class="placeholder-text">Esta sección permitirá eliminar formularios existentes.</p>
    </div>
  </div>
</template>

<script>
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  name: "FormularioView",
  data() {
    return {
      currentAction: null,
      file: null,
      uploadedImageUrl: null,
      menuVisible: false,
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.file = file;
        this.uploadedImageUrl = URL.createObjectURL(file); // Vista previa local
      }
    },
    async uploadImage() {
      if (!this.file) return;

      const storage = getStorage();
      const storageRef = ref(storage, `formularios/${this.file.name}`);
      try {
        // Subir la imagen a Firebase Storage
        await uploadBytes(storageRef, this.file);
        const downloadURL = await getDownloadURL(storageRef);
        this.uploadedImageUrl = downloadURL;
        alert("Imagen subida correctamente.");
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible; // Alternar visibilidad del menú
    },

    // Función para regresar al menú
    goToMenu() {
      this.$router.push({ name: 'Menu' }); 
    },
    // Funciones para navegar a cada sección
  goToSistema() {
    this.$router.push({ name: 'Recetas' }); // Navegar a la vista Sistema
  },

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
  z-index: 5; /* Asegura que los botones estén por encima de otros elementos */
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
.header {
  background-color: #004085; 
  padding: 10px;
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.logo {
  width: 200px;
  margin-right: 10px;
}
.formulario-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #a3c8f7;
  padding: 20px;
  margin-top: 0px;
  height: 800px;
}

.buttons-container {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}
h2, h3 {
  color: #000000;
  margin-bottom: 20px;
}
/* Cambiar el color del texto de los títulos en la sección de Agregar receta */
label, .subtittle{
  color: #000000;
}
.placeholder-text {
  color: #000;
}
button {
  padding: 10px 20px;
  background-color: #004085;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

.agregar-formulario {
  margin-top: 20px;
  text-align: center;
}

.image-preview {
  margin-top: 20px;
}

.uploaded-image {
  max-width: 300px;
  max-height: 300px;
  margin-top: 10px;
  border: 2px solid #ccc;
  border-radius: 10px;
}
.field {
  margin-bottom: 20px;
}

.input {
  width: 400px;
}
h1{
  color: #000;
  text-align: center;
}
</style>
