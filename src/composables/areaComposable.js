import { computed, onMounted, ref } from "vue";
import { Toast } from "../helpers/toast";
import * as Yup from "yup";
import axios from "../axios";

export const areaComposable = (areaServices) => {
  const { listData, saveData, getData, updateData, changeStatus } =
    areaServices();

  const schema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre es requerido.")
      .min(5, "Debe contener al menos 5 caracteres."),
  });

  const list = ref([]);
  const search = ref("");

  const data = ref({
    id: "",
    nombre: "",
  });

  const loading = ref(false);
  const open = ref(false);
  const open_a = ref({
    type: true,
    open: false,
    id: "",
  });

  /** functions */

  onMounted(() => {
    onLists();
  });

  const listFiltered = computed(() => {
    return list.value.filter(
      (el) => el.nombre.toLowerCase().indexOf(search.value.toLowerCase()) > -1
    );
  });

  const onLists = async () => {
    loading.value = true;
    list.value = [];
    list.value = await listData();
    loading.value = false;
  };

  const onSave = async (props) => {
    try {
      const res = await saveData(props);
      console.log(res);
      Toast(
        `Registro exitoso... <br> <strong> ${res.nombre} <strong/>`,
        "success",
        1500
      );
      closeModal();
    } catch (error) {
      Toast(`Ocurrio un errror ${error}`, "error", 1500);
    } finally {
      onLists();
    }
  };

  const onUpdate = async (props) => {
    try {
      const res = await updateData(props);

      Toast(
        `Modificacion exitosa... <br> <strong> ${res.nombre} <strong/>`,
        "info",
        1500
      );
      closeModal();
    } catch (error) {
      Toast(`Ocurrio un errror ${error}`, "error", 1500);
    } finally {
      onLists();
    }
  };

  const onSubmit = (props) => {
    if (props.id) {
      onUpdate(props);
      return;
    }
    onSave(props);
  };

  const onChangeStatus = async () => {
    console.log("entro a dar stado         ");
    console.log(open_a.value);
    try {
      const res = await changeStatus(open_a.value.id);
      console.log(res);
      open_a.value.type
        ? Toast(`Se habilitó correctamente`, "success", 1500)
        : Toast(`Se inhabilitó correctamente`, "warning", 1500);
      closeModal();
    } catch (error) {
      Toast(`Ocurrio un error ${error}`, "error", 1500);
    } finally {
      onLists();
    }
  };

  const openAlert = (i, obj, type) => {
    open_a.value = {
      open: true,
      type: type,
      id: obj,
    };
    console.log("dar " + type, obj);
  };

  const openModal = async (obj) => {
    if (obj) {
      loading.value = true;
      const res = await getData(obj);
      data.value = {
        id: res.area_id,
        nombre: res.nombre,
      };
      loading.value = false;
    }
    open.value = !open.value;
  };

  const closeModal = () => {
    open_a.value = {
      open: false,
      type: true,
      id: "",
    };
    data.value = {
      id: "",
      nombre: "",
    };
    open.value = false;
  };

  return {
    data,
    open,
    open_a,
    listFiltered,
    search,
    loading,
    schema,
    openAlert,
    openModal,
    closeModal,
    onSubmit,
    onChangeStatus,
  };
};

export const areaServices = () => {
  const listData = async () => {
    const { data } = await axios.get("/areas");
    return data;
  };

  const saveData = async (values) => {
    try {
      const { data } = await axios.post("/areas", values);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getData = async (id) => {
    try {
      const { data } = await axios.get(`/areas/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const updateData = async (values) => {
    try {
      const { data } = await axios.put(`/areas/${values.id}`, values);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const changeStatus = async (id) => {
    try {
      console.log(id);
      const { data } = await axios.delete(`/areas/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return {
    listData,
    saveData,
    getData,
    updateData,
    changeStatus,
  };
};
