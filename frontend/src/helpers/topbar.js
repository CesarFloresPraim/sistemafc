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
    { name: "Nuevo registro", path: "/nuevo-registro-rh" },
  ],
  "comida-registro-rh": [
    { name: "Inicio", path: "/home" },
    { name: "Comidas", path: "/comida-registro-rh" },
  ],
  "caja-chica-registro-rh": [
    { name: "Inicio", path: "/home" },
    { name: "Caja chica", path: "/caja-chica-registro-rh" },
  ],
};

const titles = {
  "registros-rh": "Registros RH",
  "detalles-registro-rh": "Detalles de registro",
  "lista-empleados-rh": "Lista empleados",
  "nuevo-registro-rh": "Nuevo registro",
  "comida-registro-rh": "Registro de comidas",
  "caja-chica-registro-rh": "Registro de caja chica",
  "customer-my-broker": "My broker",
  "customer-contact-breeze": "Contact",
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
