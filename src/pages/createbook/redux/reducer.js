// reducer.js
import { FILTER_DOUBAN } from './actionTypes.js'

export default (status, action) => {
    switch (action.type) {
        case FILTER_DOUBAN:
            console.log('books', status, action)
            return {
                books: action.books.map(item => {
                    delete item.rating
                    delete item.origin_title
                    delete item.image
                    delete item.catalog
                    delete item['ebook_url']
                    delete item.alt
                    delete item.id
                    delete item.url
                    delete item['alt_title']
                    delete item['author_intro']
                    delete item['ebook_price']
                    item.author = item.author.join(', ')
                    item.isbn = item.isbn13 ? item.isbn13 : item.isbn10
                    item.title = item.title ? item.title : item.subtitle
                    return item
                })
            }
        default:
            return {
                books: []
            }
    }
}
