<!-- LanguageCheckbox.vue -->
<script setup>
import { LanguageEnum } from '@/models/LanguageEnum.js';
</script>

<template>
    <div>
        <label for="customCheck1">Bases</label>
        <div class="row form-group ml-1">
            <div v-for="(archive, index) in language" :key="index"
                class="custom-control custom-checkbox custom-checkbox-green form-check-inline">
                <input type="checkbox" class="custom-control-input custom-control-input-green" :name="archive.name"
                    :value="archive.value" :id="archive.id" :checked="isChecked(archive.value)"
                    @change="handleCheckboxChange(archive.value)" />
                <label class="custom-control-label" :for="archive.id">{{ archive.label }}</label>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            language: [
                { id: "languageCheck1", name: "languages", value: LanguageEnum.PORTUGUESE, label: "Português", checked: false },
                { id: "languageCheck2", name: "languages", value: LanguageEnum.ENGLISH, label: "Inglês", checked: false },
                { id: "languageCheck3", name: "languages", value: LanguageEnum.SPANISH, label: "Espanhol", checked: false },
            ],
        };
    },
    methods: {
        isChecked(value) {
            return this.forms.language.includes(value);
        },
        handleCheckboxChange(value) {
            const index = this.forms.language.indexOf(value);
            if (index === -1) {
                this.forms.language.push(value);
            } else {
                this.forms.language.splice(index, 1);
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
