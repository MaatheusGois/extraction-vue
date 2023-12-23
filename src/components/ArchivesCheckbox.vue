<!-- ArchivesCheckbox.vue -->
<script setup>
import { ArchiveEnum } from '@/models/ArchiveEnum.js';
</script>

<template>
  <div>
    <label for="customCheck1">Bases</label>
    <div class="row form-group ml-1">
      <div v-for="(archive, index) in archives" :key="index" class="custom-control custom-checkbox custom-checkbox-green form-check-inline">
        <input
          type="checkbox"
          class="custom-control-input custom-control-input-green"
          :name="archive.name"
          :value="archive.value"
          :id="archive.id"
          :checked="isChecked(archive.value)"
          @change="handleCheckboxChange(archive.value)"
        />
        <label class="custom-control-label" :for="archive.id">{{ archive.label }}</label>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      archives: [
        { name: "archives", value: ArchiveEnum.ANAIS_DE_EVENTOS, id: "customCheck1", label: "Anais de Eventos" },
        { name: "archives", value: ArchiveEnum.PERIODICOS, id: "customCheck2", label: "Periódicos" },
        { name: "archives", value: ArchiveEnum.LIVROS_E_RELATORIOS, id: "customCheck3", label: "Livros e relatórios" },
      ],
    };
  },
  methods: {
    isChecked(value) {
      return this.forms.archives.includes(value);
    },
    handleCheckboxChange(value) {
      const index = this.forms.archives.indexOf(value);
      if (index === -1) {
        this.forms.archives.push(value);
      } else {
        this.forms.archives.splice(index, 1);
      }
    },
  },
  props: {
    forms: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Add specific styles for this component if needed */
</style>
