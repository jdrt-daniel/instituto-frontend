import { computed, ref } from "vue";
import { Toast } from "../helpers/toast";
import { useRouter } from "vue-router";
import * as Yup from "yup";
import api from "../axios";

export const areaComposable = () => {
  const schema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre es requerido.")
      .min(5, "Debe contener al menos 5 caracteres."),
  });

  const list = ref([]);
  const search = ref("");

  const data = ref({
    nombre: "",
  });

  const loading = ref(false);
  const open = ref(false);
  const openAlert = ref({
    type: "",
    open: false,
    id: "",
  });

  /** functions */
  const listFilter = computed(() => {
    return list.value.filter(
      (el) => el.nombre.toLowerCase().indexOf(search.value.toLowerCase()) > -1
    );
  });

  const disabled = (i, obj) => {
    openAlert.value = {
      open: true,
      type: "baja",
      id: obj,
    };
    console.log("dar baja", obj);
  };
  const enabled = (i, obj) => {
    openAlert.value = {
      open: true,
      type: "alta",
      id: obj,
    };
    console.log("dar alta", obj);
  };
  const openModal = (obj) => {
    if (obj) {
      console.log("entro a modificar", obj);
    }
    open.value = !open.value;
  };
  const closeModal = () => {
    openAlert.value = {
      open: false,
      type: "",
      id: "",
    };
    data.value = {
      nombre: "",
    };
    open.value = false;
  };
  return {
    list,
    data,
    open,
    openAlert,
    listFilter,
    search,
    loading,
    schema,
    disabled,
    enabled,
    openModal,
    closeModal,
  };
};

export const areaServices = () => {
  const getList = async () => {
    const { data } = await api.get("/areas");
    return data;
  };

  const saveData = async (values) => {
    const { data } = await api.post("/areas", values);
    return data;
  };
  return {
    getList,
    saveData,
  };
};
