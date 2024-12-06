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

    <div class="laboratorio-container">
      <h2 class="title has-text-centered">Gestion del laboratorio</h2>

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
        <form @submit.prevent="addRegistro">
          <label for="nombre">Nombre:</label>
          <input id="nombre" v-model="registro.nombre" type="text" required />
  
          <label for="costo">Costo:</label>
          <input id="costo" v-model="registro.costo" type="number" required />
  
          <label for="precio">Precio:</label>
          <input id="precio" v-model="registro.precio" type="number" required />
  
          <label for="total">Total:</label>
          <input id="total" v-model="registro.total" type="number" required />
  
          <button type="submit">Guardar</button>
        </form>
      </div>
  
      <!-- Modificar Registro -->
      <div v-if="currentAction === 'modificar'" class="form-container">
        <h3>Modificar Registro</h3>
        <form @submit.prevent="updateRegistro">
          <label for="registroSelect">Seleccionar Registro:</label>
          <select v-model="selectedRegistroId" id="registroSelect" required>
            <option v-for="registro in registros" :key="registro.id" :value="registro.id">
              {{ registro.nombre }}
            </option>
          </select>
  
          <label for="nombre">Nombre:</label>
          <input id="nombre" v-model="registro.nombre" type="text" required />
  
          <label for="costo">Costo:</label>
          <input id="costo" v-model="registro.costo" type="number" required />
  
          <label for="precio">Precio:</label>
          <input id="precio" v-model="registro.precio" type="number" required />
  
          <label for="total">Total:</label>
          <input id="total" v-model="registro.total" type="number" required />
  
          <button type="submit">Modificar</button>
        </form>
      </div>
  
      <!-- Eliminar Registro -->
      <div v-if="currentAction === 'eliminar'" class="form-container">
        <h3>Eliminar Registro</h3>
        <label for="registroNombre">Nombre del Registro:</label>
        <input id="registroNombre" v-model="registroNombre" type="text" required />
        <button @click="deleteRegistro">Eliminar</button>
      </div>
  
      <!-- Mostrar tabla de registros -->
      <div v-if="registros.length > 0" class="tabla-container">
        <h3>Lista de Registros</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Costo</th>
              <th>Precio</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="registro in registros" :key="registro.id">
              <td>{{ registro.nombre }}</td>
              <td>{{ registro.costo }}</td>
              <td>{{ registro.precio }}</td>
              <td>{{ registro.total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
  import { db } from "../firebase/firebase"; // Asegúrate de que db está exportado correctamente desde firebase.js
  
  export default {
    data() {
      return {
        registros: [], // Lista de registros
        registro: {
          nombre: "",
          costo: 0,
          precio: 0,
          total: 0,
        },
        registroNombre: "", // Para eliminar registro por nombre
        selectedRegistroId: "", // ID del registro a modificar
        currentAction: null, // Acción actual: agregar, modificar, eliminar
        menuVisible: false, 
      };
    },
    methods: {
      async fetchRegistros() {
        try {
          const querySnapshot = await getDocs(collection(db, "laboratorio"));
          this.registros = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        } catch (error) {
          console.error("Error al obtener los registros:", error);
        }
      },
      async addRegistro() {
        try {
          await addDoc(collection(db, "laboratorio"), this.registro);
          this.registro = { nombre: "", costo: 0, precio: 0, total: 0 };
          this.fetchRegistros();
        } catch (error) {
          console.error("Error al agregar registro:", error);
        }
      },
      async updateRegistro() {
        try {
          const registroRef = doc(db, "laboratorio", this.selectedRegistroId);
          await updateDoc(registroRef, this.registro);
          this.fetchRegistros();
        } catch (error) {
          console.error("Error al modificar registro:", error);
        }
      },
      async deleteRegistro() {
        try {
          const q = query(collection(db, "laboratorio"), where("nombre", "==", this.registroNombre));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            await deleteDoc(docRef);
            this.fetchRegistros();
          }
        } catch (error) {
          console.error("Error al eliminar registro:", error);
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

  goToSistema() {
    this.$router.push({ name: 'Recetas' }); // Navegar a la vista Catálogo
  },
  goToPacientes() {
    this.$router.push({ name: 'Pacientes' }); // Navegar a la vista Catálogo
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
      this.fetchRegistros();
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
  .laboratorio-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #a3c8f7;
  padding: 20px;
  margin-top: 0px;
  height: 800px;
  }
  .logo {
  width: 200px;
}
  
  .buttons-container {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .form-container {
    margin: 20px 0;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .table-container {
    margin-top: 20px;
}

table {
  width: 100%;
  border: 1px solid #0a3d62;
  border-collapse: collapse;
  padding: 10px;
}

table thead {
  background-color: #0a3d62;
  color: white;
}

table th, table td {
  border: 1px solid #0a3d62;
  padding: 10px;
  text-align: left;
  color: #000;
}

table tbody tr:nth-child(even) {
  background-color: #e9ecef;
}

table tbody tr:hover {
  background-color: #d0e2f0;
}

button {
  background-color:#004085;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #074a7c;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

h3 {
  color: #0a3d62;
  font-weight: bold;
  margin-bottom: 15px;
  padding: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
h2{
  color: #000;
}
  </style>
  