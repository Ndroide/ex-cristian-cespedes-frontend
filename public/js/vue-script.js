// ---- COMPONENTES ----
const Home = {
    template: `
    <section class="py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-6">
            <div class="card p-4 text-center">
              <h2 class="fw-bold mb-3">EX - FrontEnd</h2>
              <p>Utiliza el menú de navegación para acceder a las diferentes secciones.</p>
              <p>Este proyecto está desarrollado con Vue.js y Bootstrap 5 (CDN).</p>
              <p class="text-start fw-bold mt-4">Detalles del Proyecto</p>
              <ul class="list-unstyled- text-start">
                <li>Se utiliza Vue Router para generar paginas de forma dinámica y no crear archivos HTML por cada página.</li>
                <li>Se utiliza Bootstrap 5 para el diseño y estilo de la aplicación.</li>
                <li>El diseño es responsive y se adapta a diferentes tamaños de pantalla.</li>
                <li>El código está organizado en componentes para facilitar su mantenimiento y escalabilidad.</li>
                <li>El código fuente está disponible en <a href="https://github.com/tu-repo">GitHub</a>.</li>
                <li>El proyecto está desplegado en hosting propio <a href="https://rakoon.cl/proyectos/ex-cristian-cespedes-frontend/#/">RAKOON.CL</a> para respaldo.</li>
                <li>Desarrollado por Cristian Céspedes.</li>
                <li>No se adjunta informe ya que no fue solicitado para la entrega (o al menos no se indicó explicitamente).</li>
                <li>El código está comentado y es autoexplicativo.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
};

/* =======================
   CALCULO DE CALIFICACIONES
   ======================= */
const CalculoDeCalificaciones = {
    data() {
        return {
            form: { nota1: null, nota2: null, nota3: null, asistencia: null },
            showErrors: false,
            resultado: { mostrar: false, promedio: 0, aprueba: false }
        };
    },
    computed: {
        errors() {
            return {
                nota1: this.validarNota(this.form.nota1),
                nota2: this.validarNota(this.form.nota2),
                nota3: this.validarNota(this.form.nota3),
                asistencia: this.validarAsistencia(this.form.asistencia),
            };
        },
        hasAnyError() {
            return Object.values(this.errors).some(m => m !== "");
        },
        promedioPonderado() {
            const n1 = Number(this.form.nota1) || 0;
            const n2 = Number(this.form.nota2) || 0;
            const n3 = Number(this.form.nota3) || 0;
            return n1 * 0.35 + n2 * 0.35 + n3 * 0.30;
        },
    },
    methods: {
        validarNota(v) {
            if (v === null || v === undefined || v === "") return "Este campo es obligatorio.";
            if (isNaN(v)) return "Debe ser un número.";
            if (v < 10) return "El valor debe ser superior o igual a 10.";
            if (v > 70) return "El valor debe ser inferior o igual a 70.";
            if (v.toString().length > 2) return "Máximo 2 dígitos.";
            return "";
        },
        validarAsistencia(v) {
            if (v === null || v === undefined || v === "") return "Este campo es obligatorio.";
            if (isNaN(v)) return "Debe ser un número.";
            if (v < 0) return "El valor debe ser superior o igual a 0.";
            if (v > 100) return "El valor debe ser inferior o igual a 100.";
            return "";
        },
        onSubmit() {
            this.showErrors = true;
            this.resultado.mostrar = false;
            if (this.hasAnyError) return;

            const promedio = this.promedioPonderado;
            const aprueba = promedio >= 40 && Number(this.form.asistencia) >= 80;

            this.resultado.promedio = promedio;
            this.resultado.aprueba = aprueba;
            this.resultado.mostrar = true;
        },
        resetForm() {
            this.form.nota1 = this.form.nota2 = this.form.nota3 = this.form.asistencia = null;
            this.showErrors = false;
            this.resultado = { mostrar: false, promedio: 0, aprueba: false };
        },
        limitarDosDigitos(campo) {
            const v = this.form[campo];
            if (v !== null && v !== undefined && v !== "" && v.toString().length > 2) {
                this.form[campo] = parseInt(v.toString().slice(0, 2));
            }
        }
    },
    template: `
    <section class="py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-6">
            <div class="card p-4">
              <h2 class="fw-bold mb-3">Calculadora de Notas</h2>

              <form @submit.prevent="onSubmit" novalidate>
                <!-- Nota 1 -->
                <div class="mb-3">
                  <label for="nota1" class="form-label">Nota 1</label>
                  <input
                    id="nota1" type="number" class="form-control"
                    :class="{'is-invalid': showErrors && errors.nota1}"
                    v-model.number="form.nota1" min="10" max="70" step="1"
                    placeholder="Ingresa un valor entre 10 y 70"
                    @input="limitarDosDigitos('nota1')"
                  />
                  <div class="invalid-feedback">{{ errors.nota1 }}</div>
                </div>

                <!-- Nota 2 -->
                <div class="mb-3">
                  <label for="nota2" class="form-label">Nota 2</label>
                  <input
                    id="nota2" type="number" class="form-control"
                    :class="{'is-invalid': showErrors && errors.nota2}"
                    v-model.number="form.nota2" min="10" max="70" step="1"
                    placeholder="Ingresa un valor entre 10 y 70"
                    @input="limitarDosDigitos('nota2')"
                  />
                  <div class="invalid-feedback">{{ errors.nota2 }}</div>
                </div>

                <!-- Nota 3 -->
                <div class="mb-3">
                  <label for="nota3" class="form-label">Nota 3</label>
                  <input
                    id="nota3" type="number" class="form-control"
                    :class="{'is-invalid': showErrors && errors.nota3}"
                    v-model.number="form.nota3" min="10" max="70" step="1"
                    placeholder="Ingresa un valor entre 10 y 70"
                    @input="limitarDosDigitos('nota3')"
                  />
                  <div class="invalid-feedback">{{ errors.nota3 }}</div>
                </div>

                <!-- Asistencia -->
                <div class="mb-3">
                  <label for="asistencia" class="form-label">Asistencia (%)</label>
                  <input
                    id="asistencia" type="number" class="form-control"
                    :class="{'is-invalid': showErrors && errors.asistencia}"
                    v-model.number="form.asistencia" min="0" max="100" step="1"
                    placeholder="Ingresa un porcentaje entre 0 y 100"
                  />
                  <div class="invalid-feedback">{{ errors.asistencia }}</div>
                </div>

                <!-- Botones -->
                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-primary">Calcular</button>
                  <button type="reset" class="btn btn-secondary" @click="resetForm">Limpiar</button>
                </div>
              </form>

              <!-- Resultados -->
              <div class="mt-3">
                <div v-if="resultado.mostrar" class="alert" :class="resultado.aprueba ? 'alert-success' : 'alert-danger'">
                  <div class="fw-semibold">Promedio ponderado: {{ resultado.promedio.toFixed(2) }}</div>
                  <div class="mt-1" v-if="resultado.aprueba">Aprobado :)</div>
                  <div class="mt-1" v-else>Reprobado :(</div>
                </div>

                <div v-else-if="showErrors && hasAnyError" class="text-danger text-center">
                  Por favor, ingrese valores válidos para las notas y la asistencia.
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  `
};

/* =======================
   FORMULARIO DE REGISTRO
   ======================= */
const FormularioDeRegistro = {
    data() {
        return {
            form: { nombre: "", correo: "", password: "", password2: "" },
            showErrors: false
        };
    },
    computed: {
        errors() {
            return {
                nombre: this.validarNombre(this.form.nombre),
                correo: this.validarCorreo(this.form.correo),
                password: this.validarPassword(this.form.password),
                password2: this.validarPassword2(this.form.password2, this.form.password)
            };
        },
        hasAnyError() {
            return Object.values(this.errors).some(m => m !== "");
        }
    },
    methods: {
        validarNombre(v) {
            if (!v || v.trim() === "") return "El nombre es obligatorio.";
            if (v.trim().length < 2) return "Debe tener al menos 2 caracteres.";
            return "";
        },
        validarCorreo(v) {
            if (!v || v.trim() === "") return "El correo es obligatorio.";
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!re.test(v)) return "Formato de correo inválido.";
            return "";
        },
        validarPassword(v) {
            if (!v) return "La contraseña es obligatoria.";
            return "";
        },
        validarPassword2(v, p) {
            if (!v) return "Debe repetir la contraseña.";
            if (v !== p) return "Las contraseñas no coinciden.";
            return "";
        },
        onSubmit() {
            this.showErrors = true;
            if (this.hasAnyError) return;
            alert("El registro se ha realizado correctamente");
            this.resetForm();
        },
        resetForm() {
            this.form.nombre = "";
            this.form.correo = "";
            this.form.password = "";
            this.form.password2 = "";
            this.showErrors = false;
        }
    },
    template: `
    <section class="py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-6">
            <div class="card p-4">
              <h2 class="fw-boldmb-3 text-center">Formulario de Registro</h2>

              <form @submit.prevent="onSubmit" novalidate>
                <!-- Nombre -->
                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre:</label>
                  <input
                    id="nombre" type="text" class="form-control"
                    v-model.trim="form.nombre"
                    :class="{'is-invalid': showErrors && errors.nombre}"
                    placeholder="Ingresa tu nombre" autocomplete="name"
                  />
                  <div class="invalid-feedback">{{ errors.nombre }}</div>
                </div>

                <!-- Correo -->
                <div class="mb-3">
                  <label for="correo" class="form-label">Correo:</label>
                  <input
                    id="correo" type="email" class="form-control"
                    v-model.trim="form.correo"
                    :class="{'is-invalid': showErrors && errors.correo}"
                    placeholder="tucorreo@dominio.com" autocomplete="email"
                  />
                  <div class="invalid-feedback">{{ errors.correo }}</div>
                </div>

                <!-- Contraseña -->
                <div class="mb-3">
                  <label for="password" class="form-label">Contraseña:</label>
                  <input
                    id="password" type="password" class="form-control"
                    v-model="form.password"
                    :class="{'is-invalid': showErrors && errors.password}"
                    autocomplete="new-password"
                  />
                  <div class="invalid-feedback">{{ errors.password }}</div>
                </div>

                <!-- Repetir Contraseña -->
                <div class="mb-3">
                  <label for="password2" class="form-label">Repetir Contraseña:</label>
                  <input
                    id="password2" type="password" class="form-control"
                    v-model="form.password2"
                    :class="{'is-invalid': showErrors && errors.password2}"
                    autocomplete="new-password"
                  />
                  <div class="invalid-feedback">{{ errors.password2 }}</div>
                </div>

                <button type="submit" class="btn btn-success">Enviar</button>
                <button type="reset" class="btn btn-secondary ms-2" @click="resetForm">Limpiar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
};

/* =======================
   PAGINA EN CONSTRUCCION
   ======================= */
const EnConstruccion = {
    template: `
    <section class="py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-6">
            <div class="card p-4 text-center">
              <h2 class="fw-bold mb-2">En Construcción</h2>
              <p>Esta sección estará disponible próximamente.</p>
            </div>
          </div>
        </div>
    </section>
  `
};

// ---- Router ----
const routes = [
    { path: '/', component: Home },
    { path: '/calculo-de-calificaciones', component: CalculoDeCalificaciones },
    { path: '/formulario-de-registro', component: FormularioDeRegistro },
    { path: '/en-construccion', component: EnConstruccion },
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    // history: VueRouter.createWebHistory(), // (requiere config de servidor)
    routes
});

// ---- App ----
const app = Vue.createApp({});
app.use(router);
app.mount('#app');