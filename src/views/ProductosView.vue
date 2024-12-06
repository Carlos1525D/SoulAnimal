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
    <button class="button is-small" @click="goToPacientes">Pacientes</button>
    <button class="button is-small" @click="logout">Cerrar sesión</button> <!-- Botón de Cerrar Sesión -->
  </div>
  <div class="almacen-container">
    <!-- Header con el logo -->
    
    <h2 class="title has-text-centered">Gestion de Productos</h2>
    <!-- Botones de acciones -->
    <div class="buttons-container">
      <button @click="currentAction = 'agregar'">Agregar Producto</button>
      <button @click="currentAction = 'modificar'">Modificar Producto</button>
      <button @click="currentAction = 'eliminar'">Eliminar Producto</button>
    </div>
    <!-- Botón de regresar -->
    <div class="back-button-container">
        <button @click="goBack" class="button is-light is-small">Regresar</button>
      </div>

    <!-- Agregar Producto -->
    <div v-if="currentAction === 'agregar'" class="form-container">
      <h3>Agregar Producto</h3>
      <form @submit.prevent="addProducto">
        <label for="descripcion">Descripción:</label>
        <input id="descripcion" v-model="producto.descripcion" type="text" required />

        <label for="categoria">Categoría:</label>
        <input id="categoria" v-model="producto.categoria" type="text" required />

        <label for="unidades">Unidades:</label>
        <input id="unidades" v-model="producto.unidades" type="number" required />

        <label for="precioProveedor">Precio Proveedor:</label>
        <input id="precioProveedor" v-model="producto.precioProveedor" type="number" required />

        <label for="precioPublico">Precio Público:</label>
        <input id="precioPublico" v-model="producto.precioPublico" type="number" required />

        <button type="submit">Guardar</button>
      </form>
    </div>

    <!-- Modificar Producto -->
    <div v-if="currentAction === 'modificar'" class="form-container">
      <h3>Modificar Producto</h3>
      <form @submit.prevent="updateProducto">
        <label for="productoSelect">Seleccionar Producto:</label>
        <select v-model="selectedProductoId" id="productoSelect" required>
          <option v-for="producto in productos" :key="producto.id" :value="producto.id">
            {{ producto.descripcion }}
          </option>
        </select>

        <label for="descripcion">Descripción:</label>
        <input id="descripcion" v-model="producto.descripcion" type="text" required />

        <label for="categoria">Categoría:</label>
        <input id="categoria" v-model="producto.categoria" type="text" required />

        <label for="unidades">Unidades:</label>
        <input id="unidades" v-model="producto.unidades" type="number" required />

        <label for="precioProveedor">Precio Proveedor:</label>
        <input id="precioProveedor" v-model="producto.precioProveedor" type="number" required />

        <label for="precioPublico">Precio Público:</label>
        <input id="precioPublico" v-model="producto.precioPublico" type="number" required />

        <button type="submit">Modificar</button>
      </form>
    </div>

    <!-- Eliminar Producto -->
    <div v-if="currentAction === 'eliminar'" class="form-container">
      <h3>Eliminar Producto</h3>
      <label for="productoSelectEliminar">Seleccionar Producto:</label>
      <select v-model="selectedProductoId" id="productoSelectEliminar" required>
        <option value="" disabled>Selecciona un producto</option>
        <option v-for="producto in productos" :key="producto.id" :value="producto.id">
          {{ producto.descripcion }}
        </option>
      </select>
      <button @click="deleteProducto">Eliminar</button>
    </div>

    <!-- Mostrar tabla de productos -->
    <div v-if="productos.length > 0" class="tabla-container">
      <h3>Lista de Productos</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Unidades</th>
            <th>Precio Proveedor</th>
            <th>Precio Público</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.id">
            <td>{{ producto.id }}</td>
            <td>{{ producto.descripcion }}</td>
            <td>{{ producto.categoria }}</td>
            <td>{{ producto.unidades }}</td>
            <td>{{ producto.precioProveedor }}</td>
            <td>{{ producto.precioPublico }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { collection, setDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default {
  data() {
    return {
      productos: [],
      producto: {
        descripcion: "",
        categoria: "",
        unidades: 0,
        precioProveedor: 0,
        precioPublico: 0,
      },
      selectedProductoId: "",
      currentAction: null,
      nextId: 1,
      menuVisible: false,
    };
  },
  methods: {
    async fetchProductos() {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        this.productos = querySnapshot.docs.map((doc) => ({
          id: parseInt(doc.id, 10), // Convertimos el ID en un número
          ...doc.data(),
        }));
        if (this.productos.length > 0) {
          this.nextId = Math.max(...this.productos.map((p) => p.id)) + 1;
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    },
    async addProducto() {
      try {
        const productoRef = doc(db, "productos", this.nextId.toString());
        await setDoc(productoRef, this.producto);
        this.producto = { descripcion: "", categoria: "", unidades: 0, precioProveedor: 0, precioPublico: 0 };
        this.nextId++;
        this.fetchProductos();
      } catch (error) {
        console.error("Error al agregar producto:", error);
      }
    },
    async updateProducto() {
      try {
        const productoRef = doc(db, "productos", this.selectedProductoId.toString());
        await setDoc(productoRef, this.producto);
        this.fetchProductos();
      } catch (error) {
        console.error("Error al modificar producto:", error);
      }
    },
    async deleteProducto() {
      try {
        if (!this.selectedProductoId) {
          alert("Por favor, selecciona un producto para eliminar.");
          return;
        }
        const productoRef = doc(db, "productos", this.selectedProductoId.toString());
        await deleteDoc(productoRef);
        this.selectedProductoId = "";
        this.fetchProductos();
      } catch (error) {
        console.error("Error al eliminar producto:", error);
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

    // Función para cerrar sesión
    logout() {
      
      console.log("Cerrando sesión...");
      this.$router.push({ name: 'Login' }); 
    },
  },
  mounted() {
    this.fetchProductos();
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
.almacen-container {
  padding: 20px;
  height: 800px;
  background-color: #a3c8f7;
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

.title {
  font-size: 1.8rem;
  font-weight: bold;
}
h2{
  color: black;
  text-align: center;
}


.buttons-container {
  margin: 20px 0;
}

.buttons-container button {
  margin: 0 5px;
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
table td {
 color: #000;
 background-color: #f6f5f5;
 border: 1px solid #0a3d62;
  padding: 10px;
  text-align: left;

}

table th{
  border: 1px solid #0a3d62;
  padding: 10px;
  text-align: left;
  color: #f6f5f5;
  
}

button {
  background-color: #004085;
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
</style>

