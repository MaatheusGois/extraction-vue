
import axios from 'axios';
import { load } from 'cheerio';

class ExtractionService {

    constructor() { }

    async getAll(data) {
        const URL = this.createURL(data);
        const numberOfPages = await this.getNumberOfPages(URL);
        let requests = [];
        for (let i = 1; i <= numberOfPages; i++) {
            requests.push(this.getAllFromPage(URL, i));
        }
        const responses = await Promise.all(requests);
        const flatArray = [].concat(...responses);

        return flatArray;
    }

    createURL(data) {
        let URL = `/api?query=${encodeURIComponent(data.searchWord)}`;

        const archives = this.createArchives(data);
        if (archives !== "") {
            URL += archives;
        }

        const date = this.createDate(data);
        if (date !== "") {
            URL += date;
        }

        const languages = this.createLanguages(data);
        if (languages !== "") {
            URL += languages;
        }

        return URL;
    }

    createArchives(data) {
        let archives = data.archives || "";
        if (archives !== undefined) {
            if (Array.isArray(data.archives)) {
                archives = data.archives.join("&");
            }

            archives = `&${archives}`;
        }
        return archives;
    }

    createDate(data) {
        let result = "";
        const initialDate = data.initialDate;

        if (initialDate !== undefined) {
            const [day, month, year] = initialDate.split('/');
            result += `&field-7-fromDay=${day}`;
            result += `&field-7-fromMonth=${month}`;
            result += `&field-7-fromYear=${year}`;
        }

        const finalDate = data.finalDate;

        if (finalDate !== undefined) {
            const [day, month, year] = finalDate.split('/');
            result += `&field-7-toDay=${day}`;
            result += `&field-7-toMonth=${month}`;
            result += `&field-7-toYear=${year}`;
        }

        return result;
    }

    createLanguages(data) {
        let languages = data.languages || "";

        if (languages !== undefined) {
            if (Array.isArray(data.languages)) {
                languages = data.languages.join("&");
            }

            languages = `&${languages}`;
        }
        return languages;
    }

    async getNumberOfPages(URL) {
        const html = await this.fetchData(URL);
        const $ = load(html);
        const numberOfArticles = $('div.articles_count').text().replace(/(\d+)\s+a\s+\d+\s+de\s+(\d+)\s+itens/, '$2');

        return Math.ceil(Number(numberOfArticles) / 25);
    }

    async getAllFromPage(URL, page) {
        const targetURL = `${URL}&searchPage=${page}`;

        return new Promise(async (resolve, reject) => {
            try {
                const htmlData = await this.fetchData(targetURL);
                var $ = load(htmlData);

                const data = [];

                for (const element of $('a.record_title')) {
                    const url = $(element).attr('href');
                    const pageHtml = await this.fetchData(url);
                    var $ = load(pageHtml);

                    const fetchConfig = {
                        title: $('h1').text().trim(),
                        year: $('div.published div.value').text().trim().replace(/.*\/(\d{4})$/, "$1"),
                        authors: $('span.name').text().trim().replace(/\t/g, "").replace(/\n\n/g, ', '),
                        abstract: $('div.abstract').text().trim().replace(/\t/g, "").replace(/Resumo\n/g, ''),
                        publicated: $('nav.cmp_breadcrumbs a').text().trim(),
                        PDF: $('a.obj_galley_link').attr('href'),
                        DOI: $('div.doi span.value a').attr('href'),
                        type: $('nav.cmp_breadcrumbs b').text().trim(),
                        url: url
                    };

                    data.push(fetchConfig);
                }

                resolve(data);
            } catch (error) {
                console.error('Error during data extraction:', error.message);
                reject([]);
            }
        });
    }

    async fetchData(url) {
        try {
            const response = await fetch();

            return response.data;
        } catch (error) {
            throw new Error(`Error fetching data from ${url}: ${error.message}`);
        }
    }
}

export default ExtractionService;