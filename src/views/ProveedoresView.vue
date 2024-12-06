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
    <button class="button is-small" @click="goToPacientes">Pacientes</button>
    <button class="button is-small" @click="logout">Cerrar sesión</button> <!-- Botón de Cerrar Sesión -->
  </div>
  <div class="proveedores-container">
    <h1 class="title">Lista de provedores</h1>
    <!-- Botones de acciones -->
    <div class="buttons mt-5">
      <button class="button is-primary" @click="currentAction = 'agregar'">Agregar Proveedor</button>
      <button class="button is-link" @click="currentAction = 'modificar'">Modificar Proveedor</button>
      <button class="button is-danger" @click="currentAction = 'eliminar'">Eliminar Proveedor</button>
    </div>
  <!-- Botón de regresar -->
  <div class="back-button-container">
        <button @click="goBack" class="button is-light is-small">Regresar</button>
      </div>

    <!-- Agregar Registro -->
    <div v-if="currentAction === 'agregar'" class="box mt-5">
      <h3 class="title is-4">Agregar Proveedor</h3>
      <form @submit.prevent="addRegistro">
        <div class="field">
          <label class="label" for="producto">Producto</label>
          <div class="control">
            <input id="producto" class="input" v-model="registro.producto" type="text" required />
          </div>
        </div>

        <div class="field">
          <label class="label" for="nombre">Nombre</label>
          <div class="control">
            <input id="nombre" class="input" v-model="registro.nombre" type="text" required />
          </div>
        </div>

        <div class="field">
          <label class="label" for="telefono">Teléfono</label>
          <div class="control">
            <input id="telefono" class="input" v-model="registro.telefono" type="text" required />
          </div>
        </div>

        <div class="field">
          <label class="label" for="celular">Celular</label>
          <div class="control">
            <input id="celular" class="input" v-model="registro.celular" type="text" required />
          </div>
        </div>

        <button class="button is-success" type="submit">Guardar</button>
      </form>
    </div>

    <!-- Modificar Registro -->
    <div v-if="currentAction === 'modificar'" class="box mt-5">
      <h3 class="title is-4">Modificar Proveedor</h3>
      <form @submit.prevent="updateRegistro">
        <div class="field">
          <label class="label" for="registroSelect">Seleccionar Proveedor:</label>
          <div class="control">
            <select v-model="selectedRegistroId" class="input" required>
              <option v-for="registro in registros" :key="registro.id" :value="registro.id">
                {{ registro.nombre }}
              </option>
            </select>
          </div>
        </div>

        <div class="field">
          <label class="label" for="producto">Producto</label>
          <div class="control">
            <input id="producto" class="input" v-model="registro.producto" type="text" required />
          </div>
        </div>

        <div class="field">
          <label class="label" for="nombre">Nombre</label>
          <div class="control">
            <input id="nombre" class="input" v-model="registro.nombre" type="text" required />
          </div>
        </div>

        <div class="field">
          <label class="label" for="telefono">Teléfono</label>
          <div class="control">
            <input id="telefono" class="input" v-model="registro.telefono" type="text" required />
          </div>
        </div>

        <div class="field">
          <label class="label" for="celular">Celular</label>
          <div class="control">
            <input id="celular" class="input" v-model="registro.celular" type="text" required />
          </div>
        </div>

        <button class="button is-success" type="submit">Modificar</button>
      </form>
    </div>

    <!-- Eliminar Registro -->
    <div v-if="currentAction === 'eliminar'" class="box mt-5">
      <h3 class="title is-4">Eliminar Proveedor</h3>
      <div class="field">
        <label class="label" for="registroSelectEliminar">Seleccionar Proveedor:</label>
        <div class="control">
          <select v-model="selectedRegistroId" class="input" required>
            <option v-for="registro in registros" :key="registro.id" :value="registro.id">
              {{ registro.nombre }}
            </option>
          </select>
        </div>
      </div>
      <button class="button is-danger mt-3" @click="deleteRegistro">Eliminar</button>
    </div>

    <!-- Tabla de registros -->
    <div v-if="registros.length > 0" class="box mt-5">
      <h3 class="title is-4">Lista de Proveedores</h3>
      <table class="table is-fullwidth has-background-black has-text-white">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Celular</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="registro in registros" :key="registro.id">
            <td>{{ registro.producto }}</td>
            <td>{{ registro.nombre }}</td>
            <td>{{ registro.telefono }}</td>
            <td>{{ registro.celular }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default {
  data() {
    return {
      registros: [],
      registro: {
        producto: "",
        nombre: "",
        telefono: "",
        celular: "",
      },
      selectedRegistroId: "",
      currentAction: null,
      menuVisible: false,
    };
  },
  methods: {
    async fetchRegistros() {
      try {
        const querySnapshot = await getDocs(collection(db, "proveedores"));
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
        await addDoc(collection(db, "proveedores"), this.registro);
        this.registro = { producto: "", nombre: "", telefono: "", celular: "" };
        this.fetchRegistros();
      } catch (error) {
        console.error("Error al agregar registro:", error);
      }
    },
    async updateRegistro() {
      if (!this.selectedRegistroId) {
        alert("Selecciona un proveedor para modificar.");
        return;
      }
      try {
        const registroRef = doc(db, "proveedores", this.selectedRegistroId);
        await updateDoc(registroRef, this.registro);
        alert("Proveedor modificado con éxito.");
        this.currentAction = null;
        this.fetchRegistros();
      } catch (error) {
        console.error("Error al modificar registro:", error);
      }
    },
    async deleteRegistro() {
      if (!this.selectedRegistroId) {
        alert("Selecciona un proveedor para eliminar.");
        return;
      }
      try {
        const registroRef = doc(db, "proveedores", this.selectedRegistroId);
        await deleteDoc(registroRef);
        alert("Proveedor eliminado con éxito.");
        this.currentAction = null;
        this.fetchRegistros();
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

  goToCatalogo() {
    this.$router.push({ name: 'Catalogo' }); // Navegar a la vista Catálogo
  },
  goToPacientes() {
    this.$router.push({ name: 'Pacientes' }); // Navegar a la vista Catálogo
  },
  goToSistema() {
    this.$router.push({ name: 'Recetas' }); // Navegar a la vista Catálogo
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

.proveedores-container {
  background-color: #a3c8f7;
  padding: 20px;
  min-height: 100vh;
}


.table.has-background-black {
  background-color: #000;
}

.table th,
.table td {
  color: #fff;
}

.navbar {
  padding: 10px 20px;
}

.navbar .image img {
  max-height: 48px;
}
.logo {
  width: 200px;
}
h1{
  color: #000;
  text-align: center;
}
</style>
