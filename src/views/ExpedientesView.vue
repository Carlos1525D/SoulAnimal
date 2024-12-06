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
    <button class="button is-small" @click="goToCatalogo">Catálogo</button>
    <button class="button is-small" @click="goToAlmacen">Almacen</button>
    <button class="button is-small" @click="logout">Cerrar sesión</button> <!-- Botón de Cerrar Sesión -->
  </div>

    <div class="expedientes-container">
      <h2 class="title has-text-centered">Gestion de Expedientes</h2>

      <div class="buttons-container">
        <button @click="currentAction = 'agregar'">Agregar Expediente</button>
        <button @click="currentAction = 'modificar'">Modificar Expediente</button>
        <button @click="currentAction = 'eliminar'">Eliminar Expediente</button>
      </div>

      <!-- Botón de regresar -->
    <div class="back-button-container">
        <button @click="goBack" class="button is-light is-small">Regresar</button>
      </div>

  
      <!-- Agregar Expediente -->
      <div v-if="currentAction === 'agregar'" class="form-container">
        <h3>Agregar Expediente</h3>
        <form @submit.prevent="addExpediente">
          <label for="nombre">Nombre del Paciente:</label>
          <input id="nombre" v-model="expediente.nombre" type="text" required />
  
          <label for="propietario">Nombre del Propietario:</label>
          <input id="propietario" v-model="expediente.propietario" type="text" required />
  
          <label for="peso">Peso (kg):</label>
          <input id="peso" v-model="expediente.peso" type="number" step="0.1" required />
  
          <label for="fecha">Fecha:</label>
          <input id="fecha" v-model="expediente.fecha" type="date" required />
  
          <label for="descripcion">Descripción:</label>
          <textarea id="descripcion" v-model="expediente.descripcion" rows="3" required></textarea>
  
          <button type="submit">Guardar</button>
        </form>
      </div>
  
      <!-- Modificar Expediente -->
      <div v-if="currentAction === 'modificar'" class="form-container">
        <h3>Modificar Expediente</h3>
        <form @submit.prevent="updateExpediente">
          <label for="expedienteSelect">Seleccionar Expediente:</label>
          <select v-model="selectedExpedienteId" id="expedienteSelect" required>
            <option v-for="expediente in expedientes" :key="expediente.id" :value="expediente.id">
              {{ expediente.nombre }}
            </option>
          </select>
  
          <label for="nombre">Nombre del Paciente:</label>
          <input id="nombre" v-model="expediente.nombre" type="text" required />
  
          <label for="propietario">Nombre del Propietario:</label>
          <input id="propietario" v-model="expediente.propietario" type="text" required />
  
          <label for="peso">Peso (kg):</label>
          <input id="peso" v-model="expediente.peso" type="number" step="0.1" required />
  
          <label for="fecha">Fecha:</label>
          <input id="fecha" v-model="expediente.fecha" type="date" required />
  
          <label for="descripcion">Descripción:</label>
          <textarea id="descripcion" v-model="expediente.descripcion" rows="3" required></textarea>
  
          <button type="submit">Modificar</button>
        </form>
      </div>
  
      <!-- Eliminar Expediente -->
      <div v-if="currentAction === 'eliminar'" class="form-container">
        <h3>Eliminar Expediente</h3>
        <label for="expedienteNombre">Nombre del Paciente:</label>
        <input id="expedienteNombre" v-model="expedienteNombre" type="text" required />
        <button @click="deleteExpediente">Eliminar</button>
      </div>
  
      <!-- Mostrar tabla de expedientes -->
      <div v-if="expedientes.length > 0" class="tabla-container">
        <h3>Lista de Expedientes</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre del Paciente</th>
              <th>Nombre del Propietario</th>
              <th>Peso (kg)</th>
              <th>Fecha</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="expediente in expedientes" :key="expediente.id">
              <td>{{ expediente.nombre }}</td>
              <td>{{ expediente.propietario }}</td>
              <td>{{ expediente.peso }}</td>
              <td>{{ expediente.fecha }}</td>
              <td>{{ expediente.descripcion }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
  import { db } from "../firebase/firebase"; // Configuración de Firebase
  
  export default {
    data() {
      return {
        expedientes: [], // Lista de expedientes
        expediente: {
          nombre: "",
          propietario: "",
          peso: "",
          fecha: "",
          descripcion: "",
        },
        expedienteNombre: "", // Para eliminar expediente por nombre
        selectedExpedienteId: "", // ID del expediente a modificar
        currentAction: null, // Acción actual: agregar, modificar, eliminar
        menuVisible: false,
      };
    },
    methods: {
      async fetchExpedientes() {
        try {
          const querySnapshot = await getDocs(collection(db, "expedientes"));
          this.expedientes = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        } catch (error) {
          console.error("Error al obtener los expedientes:", error);
        }
      },
      async addExpediente() {
        try {
          await addDoc(collection(db, "expedientes"), this.expediente);
          this.expediente = { nombre: "", propietario: "", peso: "", fecha: "", descripcion: "" };
          this.fetchExpedientes();
        } catch (error) {
          console.error("Error al agregar expediente:", error);
        }
      },
      async updateExpediente() {
        try {
          const expedienteRef = doc(db, "expedientes", this.selectedExpedienteId);
          await updateDoc(expedienteRef, this.expediente);
          this.fetchExpedientes();
        } catch (error) {
          console.error("Error al modificar expediente:", error);
        }
      },
      async deleteExpediente() {
        try {
          const q = query(collection(db, "expedientes"), where("nombre", "==", this.expedienteNombre));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            await deleteDoc(docRef);
            this.fetchExpedientes();
          }
        } catch (error)        {
          console.error("Error al eliminar expediente:", error);
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
      this.fetchExpedientes();
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
.expedientes-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #e3f2fd; 
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #1565c0;
  font-size: 2.5em;
  margin-bottom: 20px;
}
h2{
  color: #000;
}

.buttons-container {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

button {
  padding: 12px 25px;
  background-color: #004085;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #0d47a1;
  transform: scale(1.05);
}

.form-container {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
}

form label {
  display: block;
  margin: 10px 0 5px;
  font-weight: bold;
  color: #333;
}

form input,
form textarea,
form select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  outline: none;
}

form input:focus,
form textarea:focus,
form select:focus {
  border-color: #1976d2;
  box-shadow: 0px 0px 5px rgba(25, 118, 210, 0.5);
}

form button {
  width: 100%;
  background-color: #1976d2;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 12px;
  font-size: 1.2em;
  cursor: pointer;
}

form button:hover {
  background-color: #0d47a1;
}

.tabla-container {
  margin-top: 30px;
  width: 90%;
  max-width: 800px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th, table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

table th {
  background-color: #1976d2;
  color: white;
}

table tbody tr:nth-child(even) {
  background-color: #f1f1f1;
}
</style>