# GUÍA PRUEBA DE DESEMPEÑO — NODE.JS

## 1. Qué debo construir

La prueba requiere desarrollar un Backend utilizando:

* Node.js
* Express
* TypeScript
* PostgreSQL
* Sequelize ORM
* JWT
* Roles y autorización
* CRUD
* Reglas de negocio
* Middlewares
* Relaciones entre entidades
* Seeders
* Swagger
* Arquitectura por capas
* Clean Code
* Git / GitFlow
* Conventional Commits
* Pruebas unitarias

---

# 2. Orden mental antes de programar

Antes de crear archivos debo identificar:

### Entidades

¿Qué cosas existen en el sistema?

Ejemplos:

* User
* Court
* Reservation

### Relaciones

¿Cómo se relacionan?

Ejemplo:

* Un User puede tener muchas Reservations.
* Una Court puede tener muchas Reservations.
* Una Reservation pertenece a un User.
* Una Reservation pertenece a una Court.

### Roles

¿Quién puede hacer qué?

Ejemplo:

* CUSTOMER
* ADMIN

### Reglas de negocio

¿Qué cosas están permitidas y cuáles no?

Ejemplo:

* No reservar una cancha ocupada.
* No reservar con hora final menor que hora inicial.
* No permitir precios negativos.

### Endpoints

¿Qué operaciones necesita la API?

Pensar en:

* GET
* POST
* PATCH / PUT
* DELETE

---

# 3. Orden recomendado para comenzar el proyecto

## Paso 1 — Crear carpeta raíz

Crear una carpeta para todo el backend.

Ejemplo conceptual:

Courtly-API

Todo el proyecto debe quedar dentro de esta carpeta.

---

## Paso 2 — Inicializar Node.js

Objetivo:

Convertir la carpeta en un proyecto Node.js.

Resultado esperado:

Debe aparecer:

package.json

### ¿Qué es package.json?

Es el archivo principal de configuración del proyecto Node.

Contiene:

* nombre
* versión
* scripts
* dependencias
* dependencias de desarrollo
* configuración general

---

## Paso 3 — Inicializar Git

Git debe configurarse desde el principio.

No dejarlo para el final.

La prueba evalúa:

* uso de Git
* organización de ramas
* Conventional Commits

---

## Paso 4 — Crear .gitignore

Archivo:

.gitignore

Objetivo:

Evitar subir a Git archivos que no deben formar parte del repositorio.

Inicialmente ignorar:

* node_modules
* .env

### ¿Por qué node_modules?

Porque contiene las dependencias instaladas y puede reconstruirse utilizando package.json.

### ¿Por qué .env?

Porque puede contener información sensible:

* contraseñas
* conexión a PostgreSQL
* JWT_SECRET
* configuraciones privadas

---

# 4. Estado actual del proyecto

Ya realizado:

* [x] Carpeta Courtly-API creada
* [x] Proyecto Node inicializado
* [x] package.json creado
* [x] Git configurado
* [x] Repositorio GitHub asociado
* [x] README.md existente
* [x] .gitignore creado
* [x] node_modules agregado al .gitignore
* [x] .env agregado al .gitignore

Pendiente:

* [ ] Instalar Express
* [ ] Instalar TypeScript
* [ ] Configurar TypeScript
* [ ] Crear carpeta src
* [ ] Crear app.ts
* [ ] Crear server.ts
* [ ] Crear primer endpoint
* [ ] Crear arquitectura por capas
* [ ] Configurar PostgreSQL
* [ ] Configurar Sequelize
* [ ] Crear modelos
* [ ] Crear relaciones
* [ ] Crear CRUD
* [ ] Implementar JWT
* [ ] Implementar roles
* [ ] Crear middlewares
* [ ] Crear manejo de errores
* [ ] Crear seeders
* [ ] Crear Swagger
* [ ] Crear pruebas unitarias

---

# 5. Regla principal de arquitectura

Recordar siempre:

Route → Controller → Service → Repository → Model → PostgreSQL

### Route

Pregunta:

¿Qué endpoint existe?

Responsabilidad:

Definir método HTTP y ruta.

---

### Controller

Pregunta:

¿Qué llegó en la petición y qué respuesta HTTP debo enviar?

Responsabilidad:

Trabajar con Request y Response.

No debe contener toda la lógica del negocio.

---

### Service

Pregunta:

¿Qué debe permitir o impedir el negocio?

Responsabilidad:

Aplicar reglas de negocio y coordinar operaciones.

Ejemplos:

* verificar disponibilidad
* validar usuario
* calcular precio
* impedir operaciones inválidas

---

### Repository

Pregunta:

¿Qué necesito consultar, crear, actualizar o eliminar en la base de datos?

Responsabilidad:

Acceso a datos.

Aquí estarán después las operaciones de Sequelize.

---

### Model

Pregunta:

¿Cómo se representa esta entidad en la base de datos?

Responsabilidad:

Definir:

* atributos
* tipos
* llaves
* relaciones

---

# 6. Regla para construir funciones

Antes de programar cualquier función responder:

### 1. ¿Qué problema resuelve?

### 2. ¿Qué datos necesita?

Esos datos serán normalmente sus parámetros.

### 3. ¿Qué validaciones debe realizar?

### 4. ¿Qué proceso debe ejecutar?

### 5. ¿Qué devuelve?

---

Ejemplo mental:

Necesito calcular precio de reserva.

Entrada:

* hora inicial
* hora final
* precio por hora

Proceso:

* calcular duración
* validar duración
* multiplicar duración por precio

Salida:

* precio total

---

# 7. Patrón fundamental para reglas de negocio

Pensar siempre:

VALIDAR → PROCESAR → GUARDAR → DEVOLVER

Ejemplo conceptual:

Crear reserva:

1. Validar horario.
2. Verificar disponibilidad.
3. Calcular precio.
4. Construir reserva.
5. Guardar reserva.
6. Devolver reserva.

---

# 8. Métodos de arrays importantes

## find

Usar cuando necesito:

Encontrar un elemento.

Resultado:

* elemento
* o undefined

---

## filter

Usar cuando necesito:

Encontrar varios elementos.

Resultado:

Un array.

---

## some

Usar cuando necesito responder:

¿Existe al menos uno?

Resultado:

* true
* false

Muy útil para reglas de negocio.

---

## map

Usar cuando necesito:

Transformar todos los elementos.

Resultado:

Un nuevo array.

---

# 9. Convenciones básicas

Interfaces y tipos:

PascalCase

Ejemplos:

* ReservationData
* CreatedReservation

Variables y propiedades:

camelCase

Ejemplos:

* userID
* courtID
* startHour
* totalPrice

Mantener siempre los mismos nombres.

No cambiar:

userID

por:

UserID

en diferentes lugares.

---

# 10. Principio importante

No repetir lógica existente.

Si ya existe una función que valida un horario, reutilizarla.

No volver a escribir la misma condición en diferentes funciones.

Pensar:

¿Ya existe una función que sabe hacer esto?

Si existe, llamarla.

---

# 11. Manejo mental de errores

Patrón frecuente:

Buscar información.

↓

Comprobar si existe.

↓

Si no existe → lanzar error.

↓

Si existe → continuar.

Ejemplo:

findReservation

puede devolver:

Reservation | undefined

Pero:

getReservation

debe devolver:

Reservation

y lanzar error si no existe.

---

# 12. Lista rápida para el día de la prueba

Antes de empezar a programar:

* [ ] Leer completamente el enunciado
* [ ] Identificar entidades
* [ ] Identificar relaciones
* [ ] Identificar roles
* [ ] Identificar reglas de negocio
* [ ] Identificar endpoints
* [ ] Dibujar flujo de arquitectura
* [ ] Inicializar Node
* [ ] Inicializar Git
* [ ] Crear .gitignore
* [ ] Configurar TypeScript
* [ ] Crear estructura
* [ ] Configurar base de datos
* [ ] Crear modelos
* [ ] Crear relaciones
* [ ] Crear repositories
* [ ] Crear services
* [ ] Crear controllers
* [ ] Crear routes
* [ ] Probar CRUD
* [ ] Implementar JWT
* [ ] Proteger endpoints
* [ ] Aplicar roles
* [ ] Crear middlewares
* [ ] Crear pruebas unitarias
* [ ] Crear seeders
* [ ] Documentar Swagger
* [ ] Completar README
* [ ] Revisar errores
* [ ] Revisar Git


# Flujo

src contiene el código TypeScript que escribo; dist contiene el JavaScript generado al compilar. app.ts configura Express y server.ts inicia el servidor.

Configurar app.ts y server.ts para correr por el puerto

# SCRIPTS CONFIG

"scripts": {

    "dev": "tsx src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },