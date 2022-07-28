import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { Toast } from "../helpers/toast";
import * as Yup from "yup";
import axios from "../axios";
import { useRoute } from "vue-router";

export const useMateria = (materiaServices) => {
  const {
    listData,
    saveData,
    getData,
    updateData,
    changeStatus,
    listPlanActives,
    listMateriasPrerequisito,
    verificarHoras,
    verificarSigla,
  } = materiaServices();

  const schema = Yup.object().shape({
    nivel: Yup.number().min(1, "Debe seleccionar el nivel"),
    sigla: Yup.string().required("Campo requerido."),
    horas: Yup.number().required("Campo requerido."),
    nombre: Yup.string()
      .required("Campo requerido.")
      .min(5, "Debe contener al menos 5 caracteres."),
    prerequisito: Yup.string(),
  });

  const route = useRoute();
  const carrera_id = route.params.id;

  const list = ref([]);
  const carreras = ref([]);
  const planes = ref([]);
  const plan = ref("");
  const search = ref("");
  const loading = ref(false);
  const loadingModal = ref(false);
  const materias = ref([]);
  const horas_excedidas = ref(false);

  const data = ref({
    id: "",
    nombre: "",
    sigla: "",
    horas: 4,
    nivel: 0,
    prerequisito: "",
    plan_id: plan.value,
    carrera_id: carrera_id,
  });

  const open = ref(false);
  const open_v = ref(false);
  const open_a = ref({
    type: true,
    open: false,
    id: "",
  });

  /** functions */

  onMounted(async () => {
    loading.value = true;
    planes.value = await listPlanActives();
    plan.value = planes.value[0]?.plan_id;
    await onLists(plan.value);
    loading.value = false;
  });

  watch(plan, async (newVal) => {
    loading.value = true;
    await onLists(newVal);
    loading.value = false;
  });

  watchEffect(async () => {
    if (data.value.nivel > 0)
      horas_excedidas.value = await verificarHoras(
        carrera_id,
        plan.value,
        data.value.nivel
      );
    if (data.value.sigla.length > 3) await verificarSigla(data.value.sigla);
  });

  const getMateriasBylvl = async () => {
    if (data.value.nivel > 1) {
      materias.value = await listMateriasPrerequisito(
        carrera_id,
        plan.value,
        data.value.nivel
      );
    }
  };

  /** Lista filtrada */
  const listFiltered = computed(() => {
    return list.value.filter(
      (el) => el.nombre.toLowerCase().indexOf(search.value.toLowerCase()) > -1
    );
  });

  /** metodos crud  */
  const onLists = async (plan) => {
    loading.value = true;
    list.value = [];
    list.value = await listData(carrera_id, plan);
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
      onLists(plan.value);
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
      onLists(plan.value);
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
      //console.log(res);
      open_a.value.type
        ? Toast(`Se habilitó correctamente`, "success", 1500)
        : Toast(`Se inhabilitó correctamente`, "warning", 1500);
      closeModal();
    } catch (error) {
      Toast(`Ocurrio un error ${JSON.stringify(error)}`, "error", 1500);
    } finally {
      loading.value = false;
      onLists(plan.value);
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
    open.value = !open.value;
    loadingModal.value = true;

    if (obj) {
      const res = await getData(obj);
      res.id = res.sigla;
      console.log(res);
      data.value = {
        id: res.sigla,
        nombre: res.nombre,
        sigla: res.sigla,
        horas: res.horas,
        nivel: res.nivel,
        prerequisito: res.prerequisito,
        plan_id: res.plan_id,
        carrera_id: res.carrera_id,
      };
    }
    await getMateriasBylvl();
    loadingModal.value = false;
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
      nivel_formacion: res.nivel_formacion,
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
      sigla: "",
      horas: 4,
      nivel: 0,
      prerequisito: "",
      plan_id: plan.value,
      carrera_id: carrera_id,
    };
  };

  return {
    data,
    open,
    open_a,
    open_v,
    listFiltered,
    carreras,
    materias,
    horas_excedidas,
    planes,
    plan,
    search,
    loading,
    loadingModal,
    schema,
    onLists,
    openAlert,
    openModal,
    openViewModal,
    closeModal,
    onSubmit,
    onChangeStatus,
    getMateriasBylvl,
  };
};

export const materiaServices = () => {
  const listData = async (carrera_id, plan) => {
    const { data } = await axios.get(
      `/materias?carrera_id=${carrera_id}&plan_id=${plan}`
    );
    return data;
  };

  const listPlanActives = async () => {
    const { data } = await axios.get(`/plan_estudios_activos`);
    return data;
  };

  const listCarrerasActivas = async () => {
    const { data } = await axios.get("/carreras-activas");
    return data;
  };

  const listMateriasPrerequisito = async (carrera, plan, nivel = 1) => {
    const { data } = await axios.get(
      `/list_by_nivel?plan_id=${plan}&carrera_id=${carrera}&nivel=${nivel}`
    );
    return data;
  };

  const verificarHoras = async (carrera, plan, nivel = 1) => {
    const { data } = await axios.get(
      `/verify_hours?plan_id=${plan}&carrera_id=${carrera}&nivel=${nivel}`
    );
    return data.data;
  };

  const verificarSigla = async (sigla) => {
    const { data } = await axios.get(`/validar/${sigla}`);
    console.log(data);
    return data;
  };

  const saveData = async (values) => {
    try {
      const { data } = await axios.post("/materias", values);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getData = async (id) => {
    try {
      const { data } = await axios.get(`/materias/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const updateData = async (values) => {
    try {
      const { data } = await axios.put(`/materias/${values.id}`, values);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const changeStatus = async (id) => {
    try {
      console.log(id);
      const { data } = await axios.delete(`/materias/${id}`);
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
    listPlanActives,
    listCarrerasActivas,
    listMateriasPrerequisito,
    verificarHoras,
    verificarSigla,
  };
};
