import { defineStore } from 'pinia';

import { Book } from '../interfaces/bookInterface';

export type travelBook = {
  title: string,
  books: Book[];
};

export const useTravelBookStore = defineStore('travelBookStore', {
  state: () => ({
    title: 'Libreta de viajes',
    books: [],
  } as travelBook),

  getters: {
    
  },

  actions: {

    findBookById(id: number) {
      return this.books.findIndex((book) => book.id === id);
    },

    createNewBook(book: Book) {
      if (!book) return;
      this.books.push(book);
    },

    updateBook(id: number, data: Book) {
      if (!id || !data) return;
      const index = this.findBookById(id);

      if(index !== -1) {
        this.books[index] = data;
      }
    },

    deleteBook(id: number) {
      
      const index = this.findBookById(id);
      
      if(index === -1) return ;

      this.books.splice(index, 1);
    },
    
  }
});
