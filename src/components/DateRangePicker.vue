<template>
  <div>
    <!-- Date -->
    <label for="fecha1">Período</label>
    <div class="form-group">
      <div class="row">
        <!-- Início -->
        <div class="col datepicker date input-group">
          <input
            type="text"
            placeholder="Início"
            class="form-control"
            :id="startDateId"
            :value="startDateValue"
            v-model="forms.initialDate"
          />
          <div class="input-group-append">
            <span class="input-group-text">
              <i class="fa fa-calendar"></i>
            </span>
          </div>
        </div>
        <!-- Término -->
        <div class="col datepicker date input-group">
          <input
            type="text"
            placeholder="Término"
            class="form-control"
            :id="endDateId"
            :value="endDateValue"
            v-model="forms.finalDate"
          />
          <div class="input-group-append">
            <span class="input-group-text">
              <i class="fa fa-calendar"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forms: {
      type: Object,
      required: true,
    },
    startDateId: {
      type: String,
      default: "fecha1",
    },
    endDateId: {
      type: String,
      default: "fecha2",
    },
    startDateValue: {
      type: String
    },
    endDateValue: {
      type: String
    },
  },
};
</script>