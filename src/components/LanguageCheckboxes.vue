<template>
    <div>
      <label :for="checkbox.id" v-for="checkbox in languageCheckboxes" :key="checkbox.id">
        {{ checkbox.label }}
      </label>
      <div class="row form-group ml-1">
        <div v-for="checkbox in languageCheckboxes" :key="checkbox.id">
          <div class="custom-control custom-checkbox custom-checkbox-green form-check-inline">
            <input
              type="checkbox"
              class="custom-control-input custom-control-input-green"
              :name="checkbox.name"
              :value="checkbox.value"
              :id="checkbox.id"
              v-model="checkbox.checked"
            />
            <label class="custom-control-label" :for="checkbox.id">{{ checkbox.label }}</label>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        languageCheckboxes: [
          { id: "languageCheck1", name: "languages", value: "&field-10%5B%5D=por", label: "Português", checked: true },
          { id: "languageCheck2", name: "languages", value: "&field-10%5B%5D=eng", label: "Inglês", checked: false },
          { id: "languageCheck3", name: "languages", value: "&field-10%5B%5D=spa", label: "Espanhol", checked: false },
        ],
      };
    },
    computed: {
      isChecked() {
        return this.languageCheckboxes
          .filter(checkbox => checkbox.checked)
          .map(checkbox => checkbox.value);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Adicione estilos específicos do componente aqui, se necessário */
  </style>
  