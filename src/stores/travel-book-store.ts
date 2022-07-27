import { defineStore } from 'pinia';

import { api } from '../boot/axios'

import { Book } from '../interfaces/bookInterface';

export type travelBook = {
  selectedBook: any,
  message: String[],
  books: Book[];
};

export const useTravelBookStore = defineStore('travelBookStore', {
  state: () => ({
    selectedBook: {},
    message: [],
    books: [],
  } as travelBook),

  getters: {
    
  },

  actions: {

    findBookById(id: number) {
      return this.books.findIndex((book) => book.id === id);
    },

    getBooks() {
      api.get('items/books')
      .then(response => {
        const { data } = response.data;
        this.books = data;
      })
      .catch(error => {
        console.log(error);
      })
    },

    createNewBook(book: Book) {
      if (!book) return;
      api.post('items/books', book).then(response => {
        console.log(response);
        this.getBooks();
      }).catch(error => {
        console.log(error);
      })
    },

    updateBook(id: number, data: Book) {
      if (!id || !data) return;
      const index = this.findBookById(id);

      if(index !== -1) {
        this.books[index] = data;
      }
    },

    deleteBook(id: number) {
      
      // const index = this.findBookById(id);
      
      // if(index === -1) return ;

      // this.books.splice(index, 1);

      api.delete(`items/books/${id}`).then(response => {
        this.getBooks();
        console.log(response);
      }).catch(error => {
        console.log(error);
      })
    },
    
  }
});
