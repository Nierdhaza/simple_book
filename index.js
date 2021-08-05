const fetch = require('node-fetch');


class BookHandler {
    constructor() {
        this.blockForText = document.querySelector('.main-text');
        this.pageText = document.querySelector('.page');

        document.addEventListener('DOMContentLoaded', function () {
            document.querySelector('.first-button').addEventListener('click', () => {
                !!this.textLength && this.prevPage();
            })
            document.querySelector('.second-button').addEventListener('click', () => {
                !!this.textLength && this.nextPage();
            })
            this.start = 0;
            this.end = 1000;
            this.init().then(data => {
                this.text = data;
                this.textLength = this.text.length;
                this.pages = Math.floor(this.textLength / 1000);
                this.page = 1;
                this.pageText.innerHTML = `Page: ${this.page}`
                console.log(this.pages)
                console.log('this.textLength', this.textLength);
                this.blockForText.innerHTML = this.text.slice(0, 1000)
            })
        });
    }

    init() {
        return fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(json => {
            let allText;
            allText = json.reduce((prev, next) => {
                return prev += next.body
            }, '')
            return allText
        })
    }

    nextPage() {
        document.addEventListener('DOMContentLoaded', () => {
            if (this.end + 1000 >= this.textLength) return
            this.start += 1000;
            this.end += 1000;
            ++this.page;
            this.pageText.innerHTML = `Page: ${this.page}`
            console.log('this.end is', this.end)
            this.blockForText.innerHTML = this.text.slice(this.start, this.end)
        })
    }

    prevPage() {
        document.addEventListener('DOMContentLoaded', () => {
            if (this.start === 0) return 
            this.start -= 1000;
            this.end -= 1000;
            --this.page;
            this.pageText.innerHTML = `Page: ${this.page}`
            console.log('this.start is', this.start)
            this.blockForText.innerHTML = this.text.slice(this.start, this.end)
        })
    }
}

const book = new BookHandler();

module.exports = { BookHandler };