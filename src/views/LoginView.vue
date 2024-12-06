<template>
  <div class="login-container">
    <!-- Logo en la parte superior -->
    <div class="logo-container">
      <img src="@/assets/scss/logo.png" alt="Logo SoulAnimal" class="logo">
    </div>

    <!-- Caja de login -->
    <div class="login-box box">
      <h1 class="title is-4 has-text-centered" style="color: black;">Bienvenido a SoulAnimal</h1>
      <div class="field">
        <label for="username" class="label">Usuario:</label>
        <div class="control has-icons-left">
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            class="input" 
            placeholder="Ingrese su usuario"
            required
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <label for="password" class="label">Contraseña:</label>
        <div class="control has-icons-left">
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            class="input" 
            placeholder="Ingrese su contraseña"
            required
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button 
            @click="handleLogin" 
            class="button is-primary is-fullwidth"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
      <p v-if="error" class="help is-danger has-text-centered">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
  },
  methods: {
    handleLogin() {
      // Simula el proceso de autenticación
      if (this.username === 'carlos@example.com' && this.password === '123456') {
        // Guarda el estado de autenticación en localStorage solo si el login es exitoso
        localStorage.setItem('authenticated', 'true');
        this.$router.push('/menu'); // Redirige al menú si las credenciales son correctas
      } else {
        this.error = 'Usuario o contraseña incorrectos';
      }
    },
  },
};
</script>

<style scoped>

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #4591dc; 

}

.logo-container {
  margin-bottom: 20px; 
}

.logo {
  width: 250px;
  height: auto;
}

.login-box {
  width: 350px; 
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
}

/* Estilo de las letras del formulario */
label {
  font-family: 'Verdana', sans-serif;
  color: #333;
}

h1 {
  color: black; 
}

button {
  font-family: 'Verdana', sans-serif;
}
</style>
