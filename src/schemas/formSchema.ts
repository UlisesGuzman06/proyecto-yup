import { object, string, ref } from "yup";

const formSchema = object({
  name: string()
    .required("El campo nombre es obligatorio")
    .min(1, "El nombre tiene que tener al menos un carácter")
    .max(20, "El nombre no puede superar los 20 carácteres"),

  email: string()
    .required("El email es obligatorio")
    .email("El email no tiene un formato válido"),

  password: string()
    .required("El campo nombre es obligatorio")
    .min(8, "La contraseña tiene que tener al menos 8 carácteres")
    .max(16, "La contraseña no puede superar los 16 carácteres"),

  repeatPass: string()
    .required("El campo confirmar contraseña es obligatorio")
    .oneOf([ref("password")], "La contraseña debe coincidir"),
});


export default formSchema