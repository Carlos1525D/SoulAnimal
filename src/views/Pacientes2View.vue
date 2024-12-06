<template>
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
    <button class="button is-small" @click="goToCatalogo">Catálogo</button>
    <button class="button is-small" @click="goToAlmacen">Almacen</button>
    <button class="button is-small" @click="logout">Cerrar sesión</button> <!-- Botón de Cerrar Sesión -->
  </div>

    <div class="pacientes-container">
      <h2 class="title has-text-centered">Gestion de Pacientes</h2>
      <div class="buttons-container">
        <button @click="currentAction = 'agregar'">Agregar Registro</button>
        <button @click="currentAction = 'modificar'">Modificar Registro</button>
        <button @click="currentAction = 'eliminar'">Eliminar Registro</button>
      </div>

      <!-- Botón de regresar -->
    <div class="back-button-container">
        <button @click="goBack" class="button is-light is-small">Regresar</button>
      </div>
  
      <!-- Agregar Registro -->
      <div v-if="currentAction === 'agregar'" class="form-container">
        <h3>Agregar Registro</h3>
        <form @submit.prevent="addPaciente">
          <label for="mascota">Nombre de la Mascota:</label>
          <input id="mascota" v-model="paciente.mascota" type="text" required />
  
          <label for="propietario">Nombre del Propietario:</label>
          <input id="propietario" v-model="paciente.propietario" type="text" required />
  
          <label for="telefono">Teléfono / Celular:</label>
          <input id="telefono" v-model="paciente.telefono" type="tel" required />
  
          <label for="correo">Correo:</label>
          <input id="correo" v-model="paciente.correo" type="email" required />
  
          <button type="submit">Guardar</button>
        </form>
      </div>
  
      <!-- Modificar Registro -->
      <div v-if="currentAction === 'modificar'" class="form-container">
        <h3>Modificar Registro</h3>
        <form @submit.prevent="updatePaciente">
          <label for="pacienteSelect">Seleccionar Registro:</label>
          <select v-model="selectedPacienteId" id="pacienteSelect" required>
            <option v-for="paciente in pacientes" :key="paciente.id" :value="paciente.id">
              {{ paciente.mascota }}
            </option>
          </select>
  
          <label for="mascota">Nombre de la Mascota:</label>
          <input id="mascota" v-model="paciente.mascota" type="text" required />
  
          <label for="propietario">Nombre del Propietario:</label>
          <input id="propietario" v-model="paciente.propietario" type="text" required />
  
          <label for="telefono">Teléfono / Celular:</label>
          <input id="telefono" v-model="paciente.telefono" type="tel" required />
  
          <label for="correo">Correo:</label>
          <input id="correo" v-model="paciente.correo" type="email" required />
  
          <button type="submit">Modificar</button>
        </form>
      </div>
  
      <!-- Eliminar Registro -->
      <div v-if="currentAction === 'eliminar'" class="form-container">
        <h3>Eliminar Registro</h3>
        <label for="pacienteNombre">Nombre de la Mascota:</label>
        <input id="pacienteNombre" v-model="pacienteNombre" type="text" required />
        <button @click="deletePaciente">Eliminar</button>
      </div>
  
      <!-- Mostrar tabla de pacientes -->
      <div v-if="pacientes.length > 0" class="tabla-container">
        <h3>Lista de Pacientes</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre de la Mascota</th>
              <th>Nombre del Propietario</th>
              <th>Teléfono / Celular</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="paciente in pacientes" :key="paciente.id">
              <td>{{ paciente.mascota }}</td>
              <td>{{ paciente.propietario }}</td>
              <td>{{ paciente.telefono }}</td>
              <td>{{ paciente.correo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
  import { db } from "../firebase/firebase"; // Asegúrate de que db está exportado correctamente desde firebase.js
  
  export default {
    data() {
      return {
        pacientes: [], // Lista de pacientes
        paciente: {
          mascota: "",
          propietario: "",
          telefono: "",
          correo: "",
        },
        pacienteNombre: "", // Para eliminar paciente por nombre
        selectedPacienteId: "", // ID del paciente a modificar
        currentAction: null, // Acción actual: agregar, modificar, eliminar
        menuVisible: false,
      };
    },
    methods: {
      async fetchPacientes() {
        try {
          const querySnapshot = await getDocs(collection(db, "pacientes"));
          this.pacientes = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        } catch (error) {
          console.error("Error al obtener los pacientes:", error);
        }
      },
      async addPaciente() {
        try {
          await addDoc(collection(db, "pacientes"), this.paciente);
          this.paciente = { mascota: "", propietario: "", telefono: "", correo: "" };
          this.fetchPacientes();
        } catch (error) {
          console.error("Error al agregar paciente:", error);
        }
      },
      async updatePaciente() {
        try {
          const pacienteRef = doc(db, "pacientes", this.selectedPacienteId);
          await updateDoc(pacienteRef, this.paciente);
          this.fetchPacientes();
        } catch (error) {
          console.error("Error al modificar paciente:", error);
        }
      },
      async deletePaciente() {
        try {
          const pacienteRef = doc(db, "pacientes", this.pacienteNombre);
          await deleteDoc(pacienteRef);
          this.fetchPacientes();
        } catch (error) {
          console.error("Error al eliminar paciente:", error);
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

  goToEmpleados() {
    this.$router.push({ name: 'Empleados' }); // Navegar a la vista Empleados
  },

  goToCatalogo() {
    this.$router.push({ name: 'Catalogo' }); // Navegar a la vista Catálogo
  },
  goToSistema() {
    this.$router.push({ name: 'Recetas' }); // Navegar a la vista Catálogo
  },
  goToAlmacen() {
    this.$router.push({ name: 'Almacen' }); // Navegar a la vista Catálogo
  },
  goBack() {
      this.currentAction = null; // Esto volverá al estado inicial
    },

    // Función para cerrar sesión
    logout() {
      
      console.log("Cerrando sesión...");
      this.$router.push({ name: 'Login' }); 
    },
    },
    mounted() {
      this.fetchPacientes();
    },
  };
  </script>
  
  <style scoped>
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
.logo{
  width: 200px;
}
  .pacientes-container {
    display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #a3c8f7;
  padding: 20px;
  margin-top: 0px;
  height: 800px;
  }
  
  h1 {
    color: #00796b;
  }
  
  .buttons-container {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  button {
    padding: 10px 20px;
    background-color:  #004085;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color:  #003366;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 300px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  input {
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 14px;
  }
  
  button[type="submit"] {
    background-color:  #004085;
    border: none;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
  }
  
  button[type="submit"]:hover {
    background-color:  #003366;
  }
  
  .tabla-container {
    margin-top: 40px;
    width: 80%;
  }
  
  table {
    border-collapse: collapse;
    width: 100%;
  }
  
  th,
  td {
    padding: 12px;
    text-align: center;
    border: 1px solid #a09f9f;
    color: #000;
    background-color: #fff7f7;
  }
  
  th {
    background-color:  #004085;
    color: white;
  }
  
  tr:hover {
    background-color: #d7e7e6;
  }
  h2{
    color: #000;
  }
  h3{
    color:  #004085;
  }
  </style>
  