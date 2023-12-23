<script setup>
import { ref } from 'vue';

import ArchivesCheckbox from '@/components/ArchivesCheckbox.vue';
import DateRangePicker from "@/components/DateRangePicker.vue";
import LanguageCheckbox from "@/components/LanguageCheckbox.vue";
import ResultTable from '@/components/ResultTable.vue';
import SearchInput from '@/components/SearchInput.vue';

import { ArchiveEnum } from '@/models/ArchiveEnum.js';
import { LanguageEnum } from "@/models/LanguageEnum.js";

import ResultDTO from '@/models/ResultDTO.js';
import RequestDTO from "@/models/RequestDTO.js";

import ExtractionService from "@/scripts/scraper";
</script>

<template>
    <div class="p-4">
        <!-- Loader Modal -->
        <div v-if="isLoading" class="modal fade show d-flex align-items-center justify-content-center" id="loaderModal"
            tabindex="-1" role="dialog">
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
            <h1 class="h4 mb-2 text-gray-800">FERRAMENTA PARA EXTRAÇÃO DE DADOS DA BIBLIOTECA DIGITAL DA SOCIEDADE
                BRASILEIRA DE COMPUTAÇÃO</h1>
            <p class="mb-4"></p>

            <!-- Search -->
            <SearchInput :forms="formsData" />

            <!-- DataTales Example -->
            <div class="card shadow">
                <div class="row ms-auto mb-4 mt-4 m-2">
                    <!-- Formulário -->
                    <div class="user col-12">
                        
                        <!-- Archives -->
                        <ArchivesCheckbox :forms="formsData" />

                        <!-- Date -->
                        <DateRangePicker :forms="formsData" />

                        <!-- Language -->
                        <LanguageCheckbox :forms="formsData" />

                        <button @click="searchBy" class="col-sm-4 btn btn-primary btn-user btn-block mt-4">
                            Pesquisar
                        </button>
                    </div>
                </div>

                <!-- Results -->
                <ResultTable v-if="results && results.length > 0" :results="results" />

            </div>
        </div>
    </div>
</template>

<script>

let service = new ExtractionService();

export default {
    components: {
        ArchivesCheckbox,
        DateRangePicker,
        LanguageCheckbox,
        ResultTable,
    },
    data() {
        return {
            isLoading: false,
            formsData: {
                searchWord: 'Social Network Analysis',
                archives: [
                    ArchiveEnum.ANAIS_DE_EVENTOS
                ],
                language: [
                    LanguageEnum.ENGLISH,
                    LanguageEnum.PORTUGUESE
                ],
                initialDate: '21/01/2020',
                finalDate: '21/11/2021',
            },
            results: [],
        };
    },
    methods: {
        async searchBy() {
            try {
                this.isLoading = true;
                const wordSearch = new RequestDTO(
                    this.formsData.searchWord,
                    this.formsData.archives,
                    this.formsData.language,
                    this.formsData.initialDate,
                    this.formsData.finalDate
                )

                const searchResults = await service.getAll(wordSearch);
                this.results = searchResults.map((result) => new ResultDTO(result));
            } catch (error) {
                console.error('Error during search:', error);
            } finally {
                this.isLoading = false;
            }
        },
    },
};
</script>

<style scoped>/* Adicione estilos específicos para este componente se necessário */</style>
