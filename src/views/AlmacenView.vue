<template>
  <div class="almacen-container">
    <h1 class="title is-1 has-text-centered has-text-primary">Gestión de Almacén</h1>
    <div class="buttons-container">
      <button class="button is-success is-large is-rounded" @click="goToProveedores">
        Proveedores
      </button>
      <button class="button is-info is-large is-rounded" @click="goToProductos">
        Productos
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToProveedores() {
      this.$router.push({ name: 'Proveedores' });
    },
    goToProductos() {
      this.$router.push({ name: 'Productos' });
    },
    goToCodigoBarras() {
      this.$router.push({ name: 'codigo-barras' });
    },
  },
};
</script>

<style scoped>
.almacen-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #c0ebf0;
  padding: 20px;
}

.title {
  color: #00796b;
  margin-bottom: 40px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

.buttons-container {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.button {
  padding: 15px 30px;
  font-size: 16px;
  font-weight: bold;
  width: 200px;
  text-align: center;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.button:hover {
  transform: translateY(-5px);
}

.button:active {
  transform: translateY(2px);
}

@media (max-width: 768px) {
  .buttons-container {
    flex-direction: column;
    gap: 15px;
  }

  .button {
    width: 100%;
  }
}
</style>
