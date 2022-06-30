import { ref } from "vue";
import { useRouter } from "vue-router";
import * as Yup from "yup";
import { Toast } from "../helpers/toast";

import { loginStore } from "../stores";

export const loginComposable = () => {
  /** Schema validation  */
  const schema = Yup.object().shape({
    login: Yup.string().required("El usuario es requerido."),
    password: Yup.string()
      .min(5, "La contraseña debe tener al menos 5 caractéres.")
      .required("La contraseña es requerida."),
  });

  /**  Variable */
  const loading = ref(false);
  const invalid = ref("");
  const success = ref("");
  const login = ref("");
  const password = ref("");

  const router = useRouter();

  const { authLogin, logOut, user } = loginStore();

  const onSubmit = async (values) => {
    loading.value = true;
    try {
      const res = await authLogin(values);
      success.value = res.message;
      invalid.value = "";
      Toast(
        `<strong>Exito!</strong><span> Redireccionando... </span>`,
        "success",
        1500
      );
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      Toast(
        `<strong>Falló!</strong><span> Intente de nuevo, porfavor </span>`,
        "error",
        1500
      );
      invalid.value = error.response.data.message;
      password.value = "";
    } finally {
      loading.value = false;
    }
  };

  const onLogout = () => {
    logOut();
    Toast(
      `<strong>Cerrando sesiòn...!</strong><span> Hasta pronto... </span>`,
      "warning",
      1500
    );
    setTimeout(() => {
      router.push({ name: "login" });
    }, 1500);
  };

  return {
    schema,
    login,
    password,
    user,
    invalid,
    success,
    loading,
    onSubmit,
    onLogout,
  };
};
