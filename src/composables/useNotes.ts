import { ref, watchEffect } from 'vue'
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
        state.title = `${selectedBook.value.name}`
        state.selectedBook = selectedBook.value
    })

    const enviar = () => {
      bookStore.$patch((state) => {
        console.log('se disparo')
        const lastIndex = selectedBook.value.notes.length
        const lastItem = selectedBook.value.notes[lastIndex - 1]
        const newNote = {
          id: lastItem.id + 1,
          position: lastItem.position + 1,
          value: editor.value,
          bookId: selectedBook.value.id
        }
        state.selectedBook.notes.push(newNote)
        console.log(state.selectedBook.notes)
      })
    }

    const editar = (msg: any) => {
      editor.value = msg.value
    }

    console.log(selectedBook.value)

    const openModal = (id: any) => {
        console.log(id)
    }

    watchEffect(() => console.log(bookStore.$state, 'detail'))

    return {
        selectedBook,
        message,
        editor,

        openModal,
        enviar,
        editar,
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