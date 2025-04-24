import { FormEvent, useState } from "react";
import styles from "./Form.module.css";
import Swal from "sweetalert2";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import formSchema from "../../schemas/formSchema";

const Form = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    repeatPass: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await formSchema.validate(values, { abortEarly: false });

      Swal.fire({
        icon: "success",
        title: "Formulario enviado correctamente",
        confirmButtonText: "Aceptar",
      });
      setErrors({});
      setValues({
        name: "",
        email: "",
        password: "",
        repeatPass: "",
      });
    } catch (err: any) {
      const newErrors: { [key: string]: string } = {};
      err.inner.forEach((err: any) => {
        if (err.path) newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  const handleInputChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = async (name: string, value: string) => {
    try {
      await formSchema.validateAt(name, { ...values, [name]: value });

      // si no hay error, lo removés
      setErrors((prev) => {
        const { [name]: removed, ...rest } = prev;
        return rest;
      });
    } catch (err: any) {
      // si hay error, lo guardás
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  return (
    <>
      <div className={styles.containerForm}>
        <h1 className={styles.header}>Formulario Manejo de errores</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.Inputs}>
            <div className={styles.Input}>
              <Input
                placeholder="Nombre:"
                name="name"
                type="text"
                value={values.name}
                onChange={handleInputChange}
                error={errors.name}
              />
            </div>

            <div className={styles.Input}>
              <Input
                placeholder="Correo:"
                name="email"
                type="email"
                value={values.email}
                onChange={handleInputChange}
                error={errors.email}
              />
            </div>

            <div className={styles.Input}>
              <Input
                placeholder="Contraseña:"
                name="password"
                type="password"
                value={values.password}
                onChange={handleInputChange}
                error={errors.password}
              />
            </div>

            <div className={styles.Input}>
              <Input
                placeholder="Confirmar Contraseña:"
                name="repeatPass"
                type="password"
                value={values.repeatPass}
                onChange={handleInputChange}
                error={errors.repeatPass}
              />
            </div>
          </div>
          <div className={styles.submitContainer}>
            <div className={styles.submit}>
              <Button disabled={hasErrors} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
