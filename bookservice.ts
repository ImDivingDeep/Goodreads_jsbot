const xpath = require("xpath-html");
const axios = require('axios');
const htmlmarkdown = require('node-html-markdown');

const nhm = new htmlmarkdown.NodeHtmlMarkdown();

export class BookService {
    static async getBookFromUrl(url: string) {
        const { data } = await axios.get(url);
        let nodes = xpath.fromPageSource(data);
        let title = nodes.findElement("//h1[@data-testid='bookTitle']").getText();
        let description = nhm.translate(nodes.findElement("//div[@class='BookPageMetadataSection__description']").toString());
        let imageUrl = nodes.findElement("//div[@class='BookCover__image']/div/img").getAttribute('src');

        return {
            title,
            description,
            imageUrl,
        }
    }
}