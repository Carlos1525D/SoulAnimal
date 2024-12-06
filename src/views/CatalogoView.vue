<template>
  <div class="catalogo-container">
    <h1 class="title is-1 has-text-centered has-text-primary">Catálogo</h1>
    <div class="buttons-container">
      <button @click="goToFormulario" class="button is-primary is-large is-rounded">
        Formulario
      </button>
      <button @click="goToLaboratorio" class="button is-info is-large is-rounded">
        Laboratorio
      </button>
      <button @click="goToServicios" class="button is-success is-large is-rounded">
        Servicios
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CatalogoView",
  methods: {
    goToFormulario() {
      this.$router.push({ name: 'Formulario' });
    },
    goToLaboratorio() {
      this.$router.push({ name: 'Laboratorio' });
    },
    goToServicios() {
      this.$router.push({ name: 'Servicio' });
    },
  },
};
</script>

<style scoped>
.catalogo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #c0ebf0;
  padding: 20px;
}

.title {
  font-family: 'Arial Black', Arial, sans-serif;
  color: #003366;
  margin-bottom: 30px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.buttons-container {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.button {
  font-size: 16px;
  padding: 15px 30px;
  width: 180px; 
  text-transform: uppercase; 
}

.button:hover {
  opacity: 0.8;
  transform: scale(1.05);
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
