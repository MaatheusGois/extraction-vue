<script setup>
import ArchivesCheckbox from '@/components/ArchivesCheckbox.vue';
import DateRangePicker from "@/components/DateRangePicker.vue";
import LanguageCheckbox from "@/components/LanguageCheckbox.vue";
import ResultTable from '@/components/ResultTable.vue';
import ResultDTO from '@/models/ResultDTO.js';
import { ArchiveEnum } from '@/models/ArchiveEnum.js';
import { LanguageEnum } from "@/models/LanguageEnum.js";
</script>

<template>
  <div>
    <!-- Loader Modal -->
    <div class="modal fade show d-flex align-items-center justify-content-center" id="loaderModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Container Fluid -->
    <div class="container-fluid">
      <!-- Row with Images -->
      <div class="row ms-auto">
        <a href="https://ciberdem.mack.com.br" target="_blank">
          <div class="ml-3 mr-2 mt-4 mb-4 m-1 bg-image"></div>
        </a>
        <a href="https://sol.sbc.org.br/busca/index.php/integrada" target="_blank">
          <div class="m-1 mt-4 mb-4 bg-sbc-image"></div>
        </a>
      </div>

      <!-- Page Heading -->
      <h1 class="h4 mb-2 text-gray-800">FERRAMENTA PARA EXTRAÇÃO DE DADOS DA BIBLIOTECA DIGITAL DA SOCIEDADE BRASILEIRA DE COMPUTAÇÃO</h1>
      <p class="mb-4"></p>

      <!-- DataTales Example -->
      <div class="card shadow">
        <div class="row ms-auto mb-4 mt-4 m-2">
          <!-- Formulário -->
          <form id="target" class="user col-12" action="/" method="post">
            <!-- Search -->
            <label for="inputWord">Pesquisa</label>
            <div class="row mb-0">
              <div class="form-group col-12">
                <input type="string" class="form-control form-control-user" id="inputWord" aria-describedby="searchWord" name="searchWord" placeholder="Pesquise aqui suas palavras chaves..." :value="forms.searchWord" required />
              </div>
            </div>

            <!-- Archives -->
            <ArchivesCheckbox :forms="formsData" />

            <!-- Date -->
            <DateRangePicker :forms="formsData" />

            <!-- Language -->
            <LanguageCheckbox :forms="formsData" />

            <button id="submit" type="submit" class="col-sm-4 btn btn-primary btn-user btn-block mt-4">
              Pesquisar
            </button>
          </form>
        </div>

        <!-- Results -->
        <ResultTable v-if="results && results.length > 0" :results="results" />

      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ArchivesCheckbox,
    DateRangePicker,
    LanguageCheckbox,
    ResultTable,
  },
  data() {
    return {
      forms: {
        searchWord: 'Batata',
      },
      formsData: {
        archives: [
          ArchiveEnum.ANAIS_DE_EVENTOS
        ],
        language: [
          LanguageEnum.SPANISH
        ],
        initialDate: '21/11/2020',
        finalDate: '21/11/2021',
      },
      results: [
        new ResultDTO({
          id: 1,
          title: 'Exemplo 1',
          year: 2023,
          authors: ['Autor 1', 'Autor 2'],
          abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          publicated: '01/01/2023',
          type: 'Artigo',
          DOI: 'https://doi.org/10.1234/exemplo1',
          PDF: 'https://example.com/exemplo1.pdf',
          url: 'https://example.com/exemplo1',
        }),
        new ResultDTO({
          id: 2,
          title: 'Exemplo 2',
          year: 2022,
          authors: ['Autor 3', 'Autor 4'],
          abstract: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
          publicated: '15/02/2022',
          type: 'Livro',
          DOI: 'https://doi.org/10.5678/exemplo2',
          PDF: 'https://example.com/exemplo2.pdf',
          url: 'https://example.com/exemplo2',
        }),
      ],
      // ... (outras propriedades necessárias)
    };
  },
  // ... (outros métodos ou hooks necessários)
};
</script>

<style scoped>
/* Adicione estilos específicos para este componente se necessário */
</style>
