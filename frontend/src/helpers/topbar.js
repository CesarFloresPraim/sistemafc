const breadcrums = {
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
};
const titles = {
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
};
export function getBreadcrumsArray(path) {
  return breadcrums[path];
}

export function getTopbarTitle(path) {
  return titles[path];
}
