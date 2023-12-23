<template>
    <div class="custom-card">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Resultados</h6>
      </div>
  
      <div class="card-body">
        <div class="table-responsive">
          <div class="d-flex justify-content-end">
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-primary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#ffffff"
                  class="bi bi-save"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"
                  />
                </svg>
                Exportar
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" id="tableExportCsv">CSV</a>
                <a class="dropdown-item" id="tableExportExcel">Excel</a>
                <a class="dropdown-item" id="tableExportPdf">PDF</a>
                <a class="dropdown-item" id="tableExportDoc">DOC</a>
                <a class="dropdown-item" id="tableExportTxt">TXT</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" id="tableExportJson">JSON</a>
                <a class="dropdown-item" id="tableExportXml">XML</a>
              </div>
            </div>
          </div>
          <table class="table table-bordered" style="overflow-y: auto;" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>Título</th>
                <th>Ano</th>
                <th>Autores</th>
                <th>Resumo</th>
                <th>Publicado em:</th>
                <th>Tipo</th>
                <th>DOI</th>
                <th>PDF</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="result in results" :key="result.id">
                <td>
                  <a v-if="result.url" :href="result.url" target="_blank">{{ result.title }}</a>
                  <span v-else>{{ result.title }}</span>
                </td>
                <td>{{ result.year || '---' }}</td>
                <td>{{ result.authors || '---' }}</td>
                <td>
                  <div style="width: 300px; height: 300px; overflow: auto">{{ result.abstract || '---' }}</div>
                </td>
                <td>{{ result.publicated || '---' }}</td>
                <td>{{ result.type || '---' }}</td>
                <td>
                  <a v-if="result.DOI" :href="result.DOI" target="_blank">DOI</a>
                </td>
                <td>
                  <a v-if="result.PDF" :href="result.PDF" target="_blank">PDF</a>
                </td>
                <td>
                  <a v-if="result.url" :href="result.url" target="_blank">Link</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ResultDTO from '@/models/ResultDTO.js';
  
  export default {
    props: {
      results: {
        type: Array,
        required: true,
        validator: (results) => results.every((result) => console.log(result) instanceof ResultDTO),
      },
    },
  };
  </script>
  
  <style scoped>
  /* Adicione estilos específicos do componente aqui, se necessário */
  </style>
  