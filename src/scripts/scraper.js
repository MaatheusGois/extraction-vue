// scraper.js
import axios from 'axios';
import cheerio from 'cheerio';

export const fetchData = async () => {
    try {
        const response = await axios.get('https://example.com'); // Substitua com a URL do site que você deseja raspar
        const $ = cheerio.load(response.data);

        // Realize operações de scraping usando o Cheerio
        const scrapedData = [];

        $('selector-do-elemento').each((index, element) => {
            scrapedData.push({
                id: index,
                text: $(element).text(),
            });
        });

        return scrapedData;
    } catch (error) {
        console.error('Erro durante o scraping:', error);
        return [];
    }
};
