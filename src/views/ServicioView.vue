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
    <button class="button is-small" @click="goToPacientes">Pacientes</button>
    <button class="button is-small" @click="goToAlmacen">Almacen</button>
    <button class="button is-small" @click="logout">Cerrar sesión</button> <!-- Botón de Cerrar Sesión -->
  </div>
  <div class="servicio-container">
    <h2 class="title has-text-centered">Gestion del servicio</h2>
    <div class="buttons-container">
      <button @click="currentAction = 'agregar'" class="action-button">Agregar Registro</button>
      <button @click="currentAction = 'modificar'" class="action-button">Modificar Registro</button>
      <button @click="currentAction = 'eliminar'" class="action-button">Eliminar Registro</button>
    </div>

    <!-- Botón de regresar -->
    <div class="back-button-container">
        <button @click="goBack" class="button is-light is-small">Regresar</button>
      </div>

    <!-- Agregar Registro -->
    <div v-if="currentAction === 'agregar'" class="form-container">
      <h3>Agregar Registro</h3>
      <form @submit.prevent="addRegistro">
        <label for="descripcion">Descripción:</label>
        <input id="descripcion" v-model="registro.descripcion" type="text" required />

        <label for="costo">Costo:</label>
        <input id="costo" v-model="registro.costo" type="number" required />

        <label for="precio">Precio:</label>
        <input id="precio" v-model="registro.precio" type="number" required />

        <label for="total">Total:</label>
        <input id="total" v-model="registro.total" type="number" required />

        <button type="submit" class="submit-button">Guardar</button>
      </form>
    </div>

    <!-- Modificar Registro -->
    <div v-if="currentAction === 'modificar'" class="form-container">
      <h3>Modificar Registro</h3>
      <form @submit.prevent="updateRegistro">
        <label for="registroSelect">Seleccionar Registro:</label>
        <select v-model="selectedRegistroId" id="registroSelect" required>
          <option v-for="registro in registros" :key="registro.id" :value="registro.id">
            {{ registro.descripcion }}
          </option>
        </select>

        <label for="descripcion">Descripción:</label>
        <input id="descripcion" v-model="registro.descripcion" type="text" required />

        <label for="costo">Costo:</label>
        <input id="costo" v-model="registro.costo" type="number" required />

        <label for="precio">Precio:</label>
        <input id="precio" v-model="registro.precio" type="number" required />

        <label for="total">Total:</label>
        <input id="total" v-model="registro.total" type="number" required />

        <button type="submit" class="submit-button">Modificar</button>
      </form>
    </div>

    <!-- Eliminar Registro -->
    <div v-if="currentAction === 'eliminar'" class="form-container">
      <h3>Eliminar Registro</h3>
      <label for="registroDescripcion">Descripción del Registro:</label>
      <input id="registroDescripcion" v-model="registroDescripcion" type="text" required />
      <button @click="deleteRegistro" class="submit-button delete-button">Eliminar</button>
    </div>

    <!-- Mostrar tabla de registros -->
    <div v-if="registros.length > 0" class="tabla-container">
      <h3>Lista de Registros</h3>
      <table>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Costo</th>
            <th>Precio</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="registro in registros" :key="registro.id">
            <td>{{ registro.descripcion }}</td>
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
import { db } from "../firebase/firebase";

export default {
  data() {
    return {
      registros: [],
      registro: {
        descripcion: "",
        costo: 0,
        precio: 0,
        total: 0,
      },
      registroDescripcion: "",
      selectedRegistroId: "",
      currentAction: null,
      menuVisible: false,
    };
  },
  methods: {
    async fetchRegistros() {
      try {
        const querySnapshot = await getDocs(collection(db, "servicio"));
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
        await addDoc(collection(db, "servicio"), this.registro);
        this.registro = { descripcion: "", costo: 0, precio: 0, total: 0 };
        this.fetchRegistros();
      } catch (error) {
        console.error("Error al agregar registro:", error);
      }
    },
    async updateRegistro() {
      try {
        const registroRef = doc(db, "servicio", this.selectedRegistroId);
        await updateDoc(registroRef, this.registro);
        this.fetchRegistros();
      } catch (error) {
        console.error("Error al modificar registro:", error);
      }
    },
    async deleteRegistro() {
      try {
        const q = query(collection(db, "servicio"), where("descripcion", "==", this.registroDescripcion));
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
    goBack() {
      this.currentAction = null; // Esto volverá al estado inicial
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

  goToAlmacen() {
    this.$router.push({ name: 'Almacen' }); // Navegar a la vista Catálogo
  },
  goToPacientes() {
    this.$router.push({ name: 'Pacientes' }); // Navegar a la vista Catálogo
  },
  goToSistema() {
    this.$router.push({ name: 'Recetas' }); 
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
  z-index: 10;
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
.logo {
  width: 200px;
}
.servicio-container {
  background-color: #a3c8f7;
  padding: 20px;
  border-radius: 10px;
  height: 800px
}

h1, h3 {
  color: #000;
  text-align: center;
}

.buttons-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.action-button {
  padding: 10px 20px;
  background-color: #004085;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.action-button:hover {
  background-color: #004d40;
}

.form-container {
  margin: 20px 0;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

form label {
  display: block;
  margin: 10px 0 5px;
}

form input, form select {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #b2dfdb;
  border-radius: 5px;
}

.submit-button {
  padding: 10px 20px;
  background-color: #004085;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #00251a;
}

.delete-button {
  background-color: #d32f2f;
}

.delete-button:hover {
  background-color: #b71c1c;
}

.tabla-container table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background-color:  #e9ecef;
}

.tabla-container th, .tabla-container td {
  border: 1px solid #c3d0cf;
  text-align: left;
  padding: 8px;
  color: #000;
}

.tabla-container th {
  background-color: #004085;
  color: rgb(255, 255, 255);
}
table tbody tr:nth-child(even) {
  background-color: #e9ecef;
}

table tbody tr:hover {
  background-color: #d0e2f0;
}
h2{
  color: #000;
}
</style>
