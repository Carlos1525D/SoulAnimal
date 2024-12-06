import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';  // Vista de inicio de sesión
import MenuView from '../views/MenuView.vue';    // Vista del menú
import EmpleadosView from "../views/EmpleadosView.vue";
import CatalogoView from "../views/CatalogoView.vue";
import PacientesView from "../views/PacientesView.vue";
import AlmacenView from "../views/AlmacenView.vue";

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView, // Página de inicio de sesión
  },
  {
    path: '/menu',
    name: 'Menu',
    component: MenuView,  // Página del menú (después de iniciar sesión)
    meta: { requiresAuth: true }, // Requiere autenticación
  },
  
  {
    path: "/recetas",
    name: "Recetas",
    component: () => import("../views/RecetaView.vue"),
  },
  {
    path: '/empleados',
    name: 'Empleados',
    component: EmpleadosView,  // Página del sistema (parte del menú)
  },
  {
    path: '/catalogo',
    name: 'Catalogo',
    component: CatalogoView,  // Página del sistema (parte del menú)
  },
  {
    path: "/formulario",
    name: "Formulario",
    component: () => import("../views/FormularioView.vue"),
  },
  {
    path: "/laboratorio",
    name: "Laboratorio",
    component: () => import("../views/LaboratorioView.vue"),
  },
  {
    path: "/servicio",
    name: "Servicio",
    component: () => import("../views/ServicioView.vue"),
  },
  {
    path: '/pacientes',
    name: 'Pacientes',
    component: PacientesView,  // Página del sistema (parte del menú)
  },
  {
    path: "/expedientes",
    name: "Expedientes",
    component: () => import("../views/ExpedientesView.vue"),
  },
  {
    path: "/pacientes2",
    name: "Pacientes2",
    component: () => import("../views/Pacientes2View.vue"),
  },
  {
    path: '/almacen',
    name: 'Almacen',
    component: AlmacenView,  // Página del sistema (parte del menú)
  },
  {
    path: "/proveedores",
    name: "Proveedores",
    component: () => import("../views/ProveedoresView.vue"),
  },
  {
    path: "/productos",
    name: "Productos",
    component: () => import("../views/ProductosView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authenticated');
  
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/'); // Redirige a login si no está autenticado
  } else {
    next(); // Permite el acceso
  }
  
});
export default router;
