import { ref, watchEffect, computed } from 'vue'
import { api } from '../boot/axios'
import axios from 'axios'
import { useQuasar } from 'quasar'
import {useRoute} from 'vue-router'
import { useTravelBookStore } from '../stores/travel-book-store'
import { useSettingsStore } from '../stores/settings'

const useNotes = () => {
    const $q = useQuasar()

    const route = useRoute()

    const bookStore = useTravelBookStore()

    const settingsStore = useSettingsStore()

    const bookId = ref(route.params.id)

    const books = ref(bookStore.books)

    const message = ref(bookStore.message)

    const editor = ref('')

    const tempMsj = ref()

    console.log(tempMsj)
    
    const selectedBook = computed(() => {
      bookStore.$patch((state) => {
          state.selectedBook = books.value.find((book)=> book.id === Number(bookId.value))
      })
      settingsStore.title = bookStore.selectedBook.name
      return bookStore.selectedBook
    })

    const enviar = () => {
      bookStore.$patch((state) => {
        if (tempMsj.value) {
          bookStore.$patch((state) => {
            const index = state.selectedBook.notes.findIndex((note: any) => note.id === tempMsj.value.id);
            if (index === -1) return
            state.selectedBook.notes[index].value = editor.value;
            api.patch(`items/books/${state.selectedBook.id}`, {notes: state.selectedBook.notes}).then(response => {
              console.log(response)
            }).catch(error => {
              console.log(error)
            })
          })
        } else {
          const lastIndex = state.selectedBook.notes.length
          const id = lastIndex > 0 ? state.selectedBook.notes[lastIndex - 1].id + 1 : 0
          const position = lastIndex > 0 ? state.selectedBook.notes[lastIndex - 1].position + 1 : 0
          const newNote = {
            id: id,
            position: position,
            value: editor.value,
            type: 'text'
          }
          state.selectedBook.notes.push(newNote)
          api.patch(`items/books/${state.selectedBook.id}`, {notes: state.selectedBook.notes}).then(response => {
            console.log(response)
          }).catch(error => {
            console.log(error)
          })
        }
      })
      editor.value = '';
    }

    const editar = (msg: any) => {
      editor.value = msg.value
      tempMsj.value = msg
    }

    const borrar = (msg: any) => {
      bookStore.$patch((state) => {
        const index = state.selectedBook.notes.findIndex((note: any) => note.id === msg.id);
        if (msg.type === 'image') {
          const id = msg.value.substring(msg.value.lastIndexOf("/") + 1)
          console.log(id);
          api.delete(`files/${id}`).then(response => {
            console.log(response);
          }).catch(error => {
            console.log(error)
          })
        }
        if (index === -1) return
        state.selectedBook.notes.splice(index, 1)
        api.patch(`items/books/${state.selectedBook.id}`, {notes: state.selectedBook.notes}).then(response => {
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
      })
    }


    const successUpload = (info: any) => {
      const { xhr } = info;
      const response = JSON.parse(xhr.response);
      const { data } = response;
      bookStore.$patch((state) => {
        const lastIndex = state.selectedBook.notes.length
        const id = lastIndex > 0 ? state.selectedBook.notes[lastIndex - 1].id + 1 : 0
        const position = lastIndex > 0 ? state.selectedBook.notes[lastIndex - 1].position + 1 : 0
        const newNote = {
          id: id,
          position: position,
          value: `${process.env.API_URL}assets/${data.id}`,
          type: 'image'
        }
        state.selectedBook.notes.push(newNote)
        api.patch(`items/books/${state.selectedBook.id}`, {notes: state.selectedBook.notes}).then(response => {
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

        enviar,
        editar,
        borrar,
        factoryFn,
        successUpload
    }
}

export default useNotes