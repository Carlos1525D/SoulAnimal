LoginForm.vue

<template>
  <div class="login-form">
    <form @submit.prevent="handleSubmit">
      <label for="email">Correo Electrónico</label>
      <input
        id="email"
        type="email"
        v-model="email"
        placeholder="Ingresa tu correo"
        required
      />

      <label for="password">Contraseña</label>
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Ingresa tu contraseña"
        required
      />

      <button type="submit">Iniciar Sesión</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    handleSubmit() {
      if (this.email === 'admin@example.com' && this.password === '123456') {
        alert('Inicio de sesión exitoso');
        // Redirigir a otra página si es necesario
        this.$router.push('/');
      } else {
        this.error = 'Credenciales incorrectas. Intenta nuevamente.';
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 300px;
  padding: 20px;
  background: rgb(36, 33, 33);
  border-radius: 10px;
  font-family: Arial, sans-serif;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
}

input {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>