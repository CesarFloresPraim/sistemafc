const breadcrums = {
  "nominas": [
    { name: "Inicio", path: "/home" },
    { name: "Registro de nominas", path: "/nominas" },
  ],
  "nueva-nomina": [
    { name: "Inicio", path: "/home" },
    { name: "Nueva nomina", path: "/nueva-nomina" },
  ],
  "detalles-nomina": [
    { name: "Inicio", path: "/home" },
    { name: "Detalles de nomina", path: "/detalles-nomina" },
  ],
  "resumen-nomina": [
    { name: "Inicio", path: "/home" },
    { name: "Resumen de nomina", path: "/resumen-nomina" },
  ],
  "empleados": [
    { name: "Inicio", path: "/home" },
    { name: "Empleados", path: "/empleados" },
  ],
  "vacaciones": [
    { name: "Inicio", path: "/home" },
    { name: "Vacaciones", path: "/vacaciones" },
  ],
  "registros-rh": [
    { name: "Inicio", path: "/home" },
    { name: "Registros RH", path: "/registros-rh" },
  ],
  "detalles-registro-rh": [
    { name: "Inicio", path: "/home" },
    { name: "Registros RH", path: "/registros-rh" },
    { name: "Detalles de registro", path: "/detalles-registro-rh" },
  ],
  "lista-empleados-rh": [
    { name: "Inicio", path: "/home" },
    { name: "Empleados RH", path: "/lista-empleados-rh" },
  ],
  "nuevo-registro-rh": [
    { name: "Inicio", path: "/home" },
    { name: "Registros RH", path: "/registros-rh" },
    { name: "Nuevo registro", path: "/nuevo-registro-rh" },
  ],
  "comida-registro-rh": [
    { name: "Inicio", path: "/home" },
    { name: "Registros RH", path: "/registros-rh" },
    { name: "Nuevo registro", path: "/nuevo-registro-rh" },
  ],
  "caja-chica-registro-rh": [
    { name: "Inicio", path: "/home" },
    { name: "Registros RH", path: "/registros-rh" },
    { name: "Nuevo registro", path: "/nuevo-registro-rh" },
  ],
  "horas-extra-registro-rh": [
    { name: "Inicio", path: "/home" },
    { name: "Registros RH", path: "/registros-rh" },
    { name: "Nuevo registro", path: "/nuevo-registro-rh" },
  ],
  "editar-registro-rh": [
    { name: "Inicio", path: "/home" },
    { name: "Registros RH", path: "/registros-rh" },
    { name: "Detalles registro", path: "/detalles-registro-rh" },
    { name: "Editar registro", path: "/editar-registro-rh" },
  ],
  "editar-comida-registro-rh": [
    { name: "Inicio", path: "/home" },
    { name: "Registros RH", path: "/registros-rh" },
    { name: "Detalles registro", path: "/detalles-registro-rh" },
    { name: "Editar registro", path: "/editar-registro-rh" },
  ],
  "editar-caja-chica-registro-rh": [
    { name: "Inicio", path: "/home" },
    { name: "Registros RH", path: "/registros-rh" },
    { name: "Detalles registro", path: "/detalles-registro-rh" },
    { name: "Editar registro", path: "/editar-registro-rh" },
  ],
  "editar-horas-extra-registro-rh": [
    { name: "Inicio", path: "/home" },
    { name: "Registros RH", path: "/registros-rh" },
    { name: "Detalles registro", path: "/detalles-registro-rh" },
    { name: "Editar registro", path: "/editar-registro-rh" },
  ],
  "asignar-percepcion": [
    { name: "Inicio", path: "/home" },
    { name: "Percepcion", path: "/asignar-percepcion" },
  ],
  "tipo-percepcion": [
    { name: "Inicio", path: "/home" },
    { name: "Percepcion", path: "/tipo-percepcion" },
  ],
  "asignar-deduccion": [
    { name: "Inicio", path: "/home" },
    { name: "Deduccion", path: "/asignar-deduccion" },
  ],
  "tipo-deduccion": [
    { name: "Inicio", path: "/home" },
    { name: "Deduccion", path: "/tipo-deduccion" },
  ],
};

const titles = {
  "nominas": "Nomina",
  "nueva-nomina": "Nueva nomina",
  "detalles-nomina": "Nomina",
  "resumen-nomina": "Resumen nomina",
  "empleados": "Detalles de nomina",
  "registros-rh": "Registros RH",
  "detalles-registro-rh": "Detalles de registro",
  "lista-empleados-rh": "Lista empleados",
  "nuevo-registro-rh": "Nuevo registro",
  "comida-registro-rh": "Registro de comidas",
  "caja-chica-registro-rh": "Registro de caja chica",
  "horas-extra-registro-rh": "Registro de horas extra",
  "editar-registro-rh": "Editar registro",
  "editar-comida-registro-rh": "Editar registro de comidas",
  "editar-caja-chica-registro-rh": "Editar registro de caja chica",
  "editar-horas-extra-registro-rh": "Editar registro de horas extra",
  "settings-personal-information": "Personal information",
  "settings-account-focus": "Account focus",
  "settings-password": "Password",
  "asignar-percepcion": "Asignar percepcion",
  "tipo-percepcion": "Crear tipo de percepcion",
  "asignar-deduccion": "Asignar deduccion",
  "tipo-deduccion": "Crear tipo de deduccion",
  "vacaciones": "Vacaciones",

};

export function getBreadcrumsArray(path) {
  return breadcrums[path];
}

export function getTopbarTitle(path) {
  return titles[path];
}
