import { ref, watchEffect } from 'vue'
import { api } from '../boot/axios'
import axios from 'axios'
import { useQuasar } from 'quasar'
import {useRoute} from 'vue-router'
import { useTravelBookStore } from '../stores/travel-book-store'

const useNotes = () => {
    const $q = useQuasar()

    const route = useRoute()

    const bookStore = useTravelBookStore()

    const bookId = ref(route.params.id)

    const books = ref(bookStore.books)

    const message = ref(bookStore.message)

    const selectedBook = ref()

    const editor = ref('')

    
    selectedBook.value = books.value.find((book)=> book.id === Number(bookId.value))

    console.log(selectedBook.value)
    
    bookStore.$patch((state) => {
        state.selectedBook = selectedBook.value
    })

    const enviar = () => {
      bookStore.$patch((state) => {
        const lastIndex = selectedBook.value.notes.length
        const id = lastIndex > 0 ? selectedBook.value.notes[lastIndex - 1].id + 1 : 0
        const position = lastIndex > 0 ? selectedBook.value.notes[lastIndex - 1].position + 1 : 0
        const newNote = {
          id: id,
          position: position,
          value: editor.value,
          type: 'text'
        }
        state.selectedBook.notes.push(newNote)
        api.patch(`items/books/${selectedBook.value.id}`, {notes: state.selectedBook.notes}).then(response => {
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
      })
    }

    const editar = (msg: any) => {
      editor.value = msg.value
    }

    console.log(selectedBook.value)

    const openModal = (id: any) => {
        console.log(id)
    }


    const successUpload = (info: any) => {
      const { xhr } = info;
      const response = JSON.parse(xhr.response);
      const { data } = response;
      bookStore.$patch((state) => {
        const lastIndex = selectedBook.value.notes.length
        const id = lastIndex > 0 ? selectedBook.value.notes[lastIndex - 1].id + 1 : 0
        const position = lastIndex > 0 ? selectedBook.value.notes[lastIndex - 1].position + 1 : 0
        const newNote = {
          id: id,
          position: position,
          value: `${process.env.API_URL}assets/${data.id}`,
          type: 'image'
        }
        state.selectedBook.notes.push(newNote)
        api.patch(`items/books/${selectedBook.value.id}`, {notes: state.selectedBook.notes}).then(response => {
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
      })
      console.log(JSON.parse(xhr.response));
    }

    const factoryFn = (files: any) => {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              url: `${process.env.API_URL}files`
            })
          }, 2000)
      })

    }

    watchEffect(() => console.log(bookStore.$state, 'detail'))

    return {
        selectedBook,
        message,
        editor,

        openModal,
        enviar,
        editar,
        factoryFn,
        successUpload,
        saveWork () {
          $q.notify({
            message: 'Saved your text to local storage',
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done'
          })
        },
        uploadIt () {
          console.log('upload')
        }
    }
}

export default useNotes