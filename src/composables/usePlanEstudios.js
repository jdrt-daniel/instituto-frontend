import { computed, onMounted, ref } from "vue";
import { Toast } from "../helpers/toast";
import * as Yup from "yup";
import axios from "../axios";

export const usePlan = (planServices) => {
  const { listData, saveData, getData, updateData, changeStatus } =
    planServices();

  const schema = Yup.object().shape({
    plan: Yup.number()
      .typeError("El valor ingresado debe ser un numero.")
      .required("Campo requerido")
      .integer()
      .positive(),
    descripcion: Yup.string().required("Campo requerido."),
  });

  const list = ref([]);
  const search = ref("");
  const loading = ref(false);

  const data = ref({
    id: "",
    plan: "",
    descripcion: "",
  });

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

  /** Lista filtrada */
  const listFiltered = computed(() => {
    return list.value.filter(
      (el) =>
        el.descripcion.toLowerCase().indexOf(search.value.toLowerCase()) > -1
    );
  });

  /** metodos crud  */
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
      Toast(`Registro exitoso...`, "success", 1500);
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

      Toast(`Modificacion exitosa...`, "info", 1500);
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
    try {
      const res = await changeStatus(open_a.value.id);
      open_a.value.type
        ? Toast(`Se habilitó correctamente`, "success", 1500)
        : Toast(`Se inhabilitó correctamente`, "warning", 1500);
      closeModal();
      onLists();
    } catch (error) {
      Toast(`Ocurrio un error ${error}`, "error", 1500);
    }
  };

  /**  Abrir y cerrar modal y alerta  */
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
        id: res.plan_id,
        plan: res.plan,
        descripcion: res.descripcion,
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
      plan: "",
      descripcion: "",
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

export const planServices = () => {
  const listData = async () => {
    const { data } = await axios.get("/plan_estudios");
    return data;
  };

  const saveData = async (values) => {
    try {
      const { data } = await axios.post("/plan_estudios", values);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getData = async (id) => {
    try {
      const { data } = await axios.get(`/plan_estudios/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const updateData = async (values) => {
    try {
      const { data } = await axios.put(`/plan_estudios/${values.id}`, values);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const changeStatus = async (id) => {
    try {
      console.log(id);
      const { data } = await axios.delete(`/plan_estudios/${id}`);
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
