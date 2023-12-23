export default class RequestDTO {
    constructor(
        searchWord = '',
        archives = '',
        languages = '',
        initialDate = '',
        finalDate = ''
    ) {
        this.searchWord = searchWord;
        this.archives = archives;
        this.languages = languages;
        this.initialDate = initialDate;
        this.finalDate = finalDate;
    }
}
