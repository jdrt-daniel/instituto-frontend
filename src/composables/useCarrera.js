import { computed, onMounted, ref, watch } from "vue";
import { Toast } from "../helpers/toast";
import * as Yup from "yup";
import axios from "../axios";

export const useCarrera = (carreraServices) => {
  const {
    listData,
    saveData,
    getData,
    updateData,
    changeStatus,
    listAreasActivas,
    listNivelFormacion,
  } = carreraServices();

  const schema = Yup.object().shape({
    nombre: Yup.string()
      .required("Campo requerido.")
      .min(5, "Debe contener al menos 5 caracteres."),
    carga_horaria: Yup.number().required("Campo requerido."),
    tiempo_estudio: Yup.string().required("Campo requerido."),
    regimen_estudio: Yup.string()
      .required("Campo requerido.")
      .min(5, "Debe contener al menos 5 caracteres."),
    nivel_formacion: Yup.number().min(1, "Debe seleccionar un nivel"),
    area_id: Yup.number().min(1, "Debe seleccionar un area"),
    denominacion_titulo: Yup.string()
      .required("Campo requerido.")
      .min(5, "Debe contener al menos 5 caracteres."),
  });

  const list = ref([]);
  const areas = ref([]);
  const niveles = ref([]);
  const search = ref("");
  const loading = ref(false);

  const data = ref({
    id: "",
    nombre: "",
    carga_horaria: 3600,
    tiempo_estudio: 0,
    regimen_estudio: "Anual",
    nivel_formacion: 0,
    area_id: 0,
    denominacion_titulo: "",
  });

  const open = ref(false);
  const open_v = ref(false);
  const open_a = ref({
    type: true,
    open: false,
    id: "",
  });

  watch(
    () => data.value.nivel_formacion,
    (newValue) => {
      if (newValue > 0) {
        let tiempo = niveles.value.find((el) => el.nivel_id == newValue);
        data.value.tiempo_estudio = tiempo?.tiempo_estudio;
      }
    }
  );

  /** functions */

  onMounted(() => {
    onLists();
  });

  /** Lista filtrada */
  const listFiltered = computed(() => {
    return list.value.filter(
      (el) => el.nombre.toLowerCase().indexOf(search.value.toLowerCase()) > -1
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
    loading.value = true;
    try {
      const res = await saveData(props);
      Toast(
        `Registro exitoso... <br> <strong> ${res.nombre} <strong/>`,
        "success",
        1500
      );
      closeModal();
    } catch (error) {
      Toast(
        `<strong>Ocurrio un error :</strong> ${Object.entries(
          error.response.data.errors
        ).map((item) => {
          return `${item[1][0]}<br>`;
        })}`,
        "error",
        20000
      );
    } finally {
      loading.value = false;
      onLists();
    }
  };

  const onUpdate = async (props) => {
    loading.value = true;
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
      loading.value = false;
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
    loading.value = true;
    try {
      const res = await changeStatus(open_a.value.id);
      console.log(res);
      open_a.value.type
        ? Toast(`Se habilitó correctamente`, "success", 1500)
        : Toast(`Se inhabilitó correctamente`, "warning", 1500);
      closeModal();
    } catch (error) {
      Toast(`Ocurrio un error ${JSON.stringify(error)}`, "error", 1500);
    } finally {
      onLists();
    }
    loading.value = false;
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
    open.value = !open.value;
    loading.value = true;
    areas.value = await listAreasActivas();
    niveles.value = await listNivelFormacion();
    if (obj) {
      const res = await getData(obj);
      //console.log(res);
      data.value = {
        id: res.carrera_id,
        nombre: res.nombre,
        carga_horaria: res.carga_horaria,
        tiempo_estudio: res.tiempo_estudio,
        regimen_estudio: res.regimen_estudio,
        nivel_formacion: res.nivel_id,
        area_id: res.area_id,
        denominacion_titulo: res.denominacion_titulo,
      };
    }
    loading.value = false;
  };

  const openViewModal = async (obj) => {
    loading.value = true;
    const res = await getData(obj);
    console.log(res);
    data.value = {
      id: res.carrera_id,
      nombre: res.nombre,
      carga_horaria: res.carga_horaria,
      tiempo_estudio: res.tiempo_estudio,
      regimen_estudio: res.regimen_estudio,
      nivel_formacion: res.nivel_id,
      area_id: res.area_id,
      denominacion_titulo: res.denominacion_titulo,
      area: res.area.nombre,
    };
    loading.value = false;
    open_v.value = !open_v.value;
  };

  const closeModal = () => {
    open.value = false;
    open_v.value = false;
    open_a.value = {
      open: false,
      type: true,
      id: "",
    };
    data.value = {
      id: "",
      nombre: "",
      carga_horaria: 3600,
      tiempo_estudio: 0,
      regimen_estudio: "Anual",
      nivel_formacion: 0,
      area_id: 0,
      denominacion_titulo: "",
    };
  };

  return {
    data,
    open,
    open_a,
    open_v,
    listFiltered,
    areas,
    niveles,
    search,
    loading,
    schema,
    openAlert,
    openModal,
    openViewModal,
    closeModal,
    onSubmit,
    onChangeStatus,
  };
};

export const carreraServices = () => {
  const listData = async () => {
    const { data } = await axios.get("/carreras");
    return data;
  };

  const listAreasActivas = async () => {
    const { data } = await axios.get("/areas-activas");
    return data;
  };

  const listNivelFormacion = async () => {
    const { data } = await axios.get("/niveles");
    return data;
  };

  const saveData = async (values) => {
    try {
      const { data } = await axios.post("/carreras", values);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getData = async (id) => {
    try {
      const { data } = await axios.get(`/carreras/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const updateData = async (values) => {
    try {
      const { data } = await axios.put(`/carreras/${values.id}`, values);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const changeStatus = async (id) => {
    try {
      console.log(id);
      const { data } = await axios.delete(`/carreras/${id}`);
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
    listAreasActivas,
    listNivelFormacion,
  };
};
