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
    <button class="button is-small" @click="goToCatalogo">Catálogo</button>
    <button class="button is-small" @click="goToPacientes">Pacientes</button>
    <button class="button is-small" @click="goToAlmacen">Almacen</button>
    <button class="button is-small" @click="logout">Cerrar sesión</button> <!-- Botón de Cerrar Sesión -->
  </div>

    
    <div class="empleados-container">
      <h1 class="title is-1 has-text-centered text-black">Gestión de Empleados</h1>

      <!-- Botones de acción -->
      <div class="buttons-container">
        <button @click="currentAction = 'agregar'" class="button is-primary is-medium">Agregar Empleado</button>
        <button @click="currentAction = 'modificar'" class="button is-warning is-medium">Modificar Empleado</button>
        <button @click="currentAction = 'eliminar'" class="button is-danger is-medium">Eliminar Empleado</button>
      </div>

      <!-- Botón de regresar -->
      <div class="back-button-container">
        <button @click="goBack" class="button is-light is-small">Regresar</button>
      </div>

      <!-- Agregar Empleado -->
      <div v-if="currentAction === 'agregar'" class="form-container box">
        <h3 class="title is-4">Agregar Empleado</h3>
        <form @submit.prevent="addEmpleado">
          <div class="field">
            <label for="nombre" class="label">Nombre:</label>
            <div class="control">
              <input id="nombre" v-model="empleado.nombre" type="text" class="input" required />
            </div>
          </div>

          <div class="field">
            <label for="rol" class="label">Rol:</label>
            <div class="control">
              <input id="rol" v-model="empleado.rol" type="text" class="input" required />
            </div>
          </div>

          <div class="field">
            <label for="telefono" class="label">Teléfono:</label>
            <div class="control">
              <input id="telefono" v-model="empleado.telefono" type="text" class="input" required />
            </div>
          </div>

          <div class="field">
            <label for="correo" class="label">Correo:</label>
            <div class="control">
              <input id="correo" v-model="empleado.correo" type="email" class="input" required />
            </div>
          </div>

          <div class="field">
            <button type="submit" class="button is-success">Guardar</button>
          </div>
        </form>
      </div>

      <!-- Modificar Empleado -->
      <div v-if="currentAction === 'modificar'" class="form-container box">
        <h3 class="title is-4">Modificar Empleado</h3>
        <form @submit.prevent="updateEmpleado">
          <div class="field">
            <label for="empleadoSelect" class="label">Seleccionar Empleado:</label>
            <div class="control">
              <div class="select">
                <select v-model="selectedEmpleadoId" id="empleadoSelect" required>
                  <option v-for="empleado in empleados" :key="empleado.id" :value="empleado.id">
                    {{ empleado.nombre }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label for="nombre" class="label">Nombre:</label>
            <div class="control">
              <input id="nombre" v-model="empleado.nombre" type="text" class="input" required />
            </div>
          </div>

          <div class="field">
            <label for="rol" class="label">Rol:</label>
            <div class="control">
              <input id="rol" v-model="empleado.rol" type="text" class="input" required />
            </div>
          </div>

          <div class="field">
            <label for="telefono" class="label">Teléfono:</label>
            <div class="control">
              <input id="telefono" v-model="empleado.telefono" type="text" class="input" required />
            </div>
          </div>

          <div class="field">
            <label for="correo" class="label">Correo:</label>
            <div class="control">
              <input id="correo" v-model="empleado.correo" type="email" class="input" required />
            </div>
          </div>

          <div class="field">
            <button type="submit" class="button is-warning">Modificar</button>
          </div>
        </form>
      </div>

      <!-- Eliminar Empleado -->
      <div v-if="currentAction === 'eliminar'" class="form-container box">
        <h3 class="title is-4">Eliminar Empleado</h3>
        <div class="field">
          <label for="empleadoNombre" class="label">Nombre del Empleado:</label>
          <div class="control">
            <input id="empleadoNombre" v-model="empleadoNombre" type="text" class="input" required />
          </div>
        </div>
        <button @click="deleteEmpleado" class="button is-danger">Eliminar</button>
      </div>

      <!-- Tabla de empleados -->
      <div v-if="empleados.length > 0" class="tabla-container box">
        <h3 class="title is-4">Lista de Empleados</h3>
        <table class="table is-striped is-bordered is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Teléfono</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="empleado in empleados" :key="empleado.id">
              <td>{{ empleado.nombre }}</td>
              <td>{{ empleado.rol }}</td>
              <td>{{ empleado.telefono }}</td>
              <td>{{ empleado.correo }}</td>
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
      empleados: [],
      empleado: { nombre: "", rol: "", telefono: "", correo: "" },
      empleadoNombre: "",
      selectedEmpleadoId: "",
      currentAction: null,
      menuVisible: false,  // Estado para el menú
    };
  },
  methods: {
    async fetchEmpleados() {
      try {
        const querySnapshot = await getDocs(collection(db, "empleados"));
        this.empleados = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error al obtener los empleados:", error);
        alert("Hubo un error al cargar los empleados.");
      }
    },

    async addEmpleado() {
      try {
        if (!this.empleado.nombre || !this.empleado.rol || !this.empleado.telefono || !this.empleado.correo) {
          alert("Por favor, complete todos los campos.");
          return;
        }

        await addDoc(collection(db, "empleados"), { ...this.empleado });
        alert("Empleado agregado exitosamente.");
        this.empleado = { nombre: "", rol: "", telefono: "", correo: "" };
        this.fetchEmpleados();
      } catch (error) {
        console.error("Error al agregar empleado:", error);
        alert("Hubo un error al agregar el empleado.");
      }
    },

    async updateEmpleado() {
      try {
        if (!this.empleado.nombre || !this.empleado.rol || !this.empleado.telefono || !this.empleado.correo) {
          alert("Por favor, complete todos los campos.");
          return;
        }

        const empleadoRef = doc(db, "empleados", this.selectedEmpleadoId);
        await updateDoc(empleadoRef, { ...this.empleado });
        alert("Empleado modificado exitosamente.");
        this.fetchEmpleados();
      } catch (error) {
        console.error("Error al modificar empleado:", error);
        alert("Hubo un error al modificar el empleado.");
      }
    },

    async deleteEmpleado() {
      try {
        if (!this.empleadoNombre) {
          alert("Por favor, ingresa el nombre del empleado a eliminar.");
          return;
        }

        const q = query(collection(db, "empleados"), where("nombre", "==", this.empleadoNombre));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          alert("No se encontró ningún empleado con ese nombre.");
          return;
        }

        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });

        alert("Empleado eliminado exitosamente.");
        this.fetchEmpleados();
      } catch (error) {
        console.error("Error al eliminar empleado:", error);
        alert("Hubo un error al eliminar el empleado.");
      }
    },

    toggleMenu() {
      this.menuVisible = !this.menuVisible; // Alternar visibilidad del menú
    },

    goBack() {
      this.currentAction = null; // Esto volverá al estado inicial
    },
     // Función para regresar al menú
     goToMenu() {
      this.$router.push({ name: 'Menu' }); 
    },
    // Funciones para navegar a cada sección
  goToSistema() {
    this.$router.push({ name: 'Recetas' }); // Navegar a la vista Sistema
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

  created() {
    this.fetchEmpleados();
  },
};
</script>

<style scoped>
/* Estilos para el menú lateral */
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
/* Estilos para el contenido principal */
.header {
  background-color: #004085; 
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative; 
  
}

.logo {
  width: 200px;
  
}

.empleados-container {
  max-width: 100%;
  height: 900px;
  margin: 0 auto;
  background-color: #a3c8f7;
  padding: 20px;
  border-radius: 10px;
}

.buttons-container {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  padding: 10px;
  
}

.form-container {
  margin-top: 20px;
}

.table {
  margin-top: 20px;
  width: 100%;

}

.back-button-container {
  margin-top: 20px;
  text-align: center;
}
h1{
  color: black;
}

</style>
