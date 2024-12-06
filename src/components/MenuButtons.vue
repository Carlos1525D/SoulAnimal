<template>
    <div class="main-container">
      <div class="button-container">
        <button v-for="button in buttons" :key="button.text" class="menu-button">
          {{ button.text }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        buttons: [
          { text: "Sistema" },
          { text: "Empleados" },
          { text: "Catálogo" },
          { text: "Paciente" },
          { text: "Almacén" },
          { text: "Servicio" },
          { text: "Control" },
          { text: "Reportes" },
          { text: "Calendario" },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .main-container {
    background-color: #41abcf; /* Azul claro */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .button-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    max-width: 600px;
  }
  
  .menu-button {
    background-color: #007BFF; /* Azul fuerte */
    color: white;
    border: none;
    border-radius: 8px;
    padding: 15px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.2s, background-color 0.2s;
  }
  
  .menu-button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
  </style>
  