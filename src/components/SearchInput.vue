<!-- SearchInput.vue -->

<template>
    <div>
        <!-- Search -->
        <label for="inputId">Pesquisa</label>
        <div class="row mb-0">
            <div class="form-group col-12">
                <input type="text"
                class="form-control form-control-user"
                id="inputId"
                aria-describedby="searchWord"
                name="searchWord"
                placeholder="Pesquise aqui suas palavras chaves..."
                v-model="forms.searchWord"
                required
                />
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
    searchWord: {
        type: Object
    }
  },
}
</script>
  