<template>
  <div class="pacientes-container">
    <h1 class="title is-1 has-text-centered has-text-primary">Gestión de Pacientes</h1>
    <div class="buttons-container">
      <button class="button is-primary is-large is-rounded" @click="goToExpedientes">
        Expedientes
      </button>
      <button class="button is-info is-large is-rounded" @click="goToPacientes">
        Pacientes
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToExpedientes() {
      this.$router.push({ name: "Expedientes" });
    },
    goToPacientes() {
      this.$router.push({ name: "Pacientes2" });
    },
  },
};
</script>

<style scoped>
.pacientes-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color:#c0ebf0; 
  padding: 20px;
}

.title {
  color: #00796b;
  margin-bottom: 30px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.buttons-container {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.button {
  font-size: 18px;
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
