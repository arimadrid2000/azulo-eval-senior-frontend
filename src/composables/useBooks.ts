import { ref, watchEffect, computed } from 'vue'
import { api } from '../boot/axios'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useTravelBookStore } from '../stores/travel-book-store'
import { useSettingsStore } from '../stores/settings'

const useBooks = () => {
  const $q = useQuasar()

  const router = useRouter()

  const route = useRoute()

  const bookStore = useTravelBookStore()

  const settingsStore = useSettingsStore()

  const books = ref(bookStore.books)

  const travelList = computed(() => {
    return bookStore.books
  })

  const title = computed(()=>{
    return settingsStore.title
  })

  const logo = computed(() => {
    return settingsStore.logo
  })

  const cardSize = computed(() => {
    return $q.screen.lt.sm ? 'col-12' : 'col-4'
  })
  
  const goBack = () => {
    router.push('/')
  }

  const viewDetail = (id: number) => {
    router.push({name: 'book-detail', params: {id}})
  }

  const deleteBook = (id: number) => {
    $q.dialog({
      title: 'Confirmacion',
      message: 'Esta seguro que desea eliminar esta libreta',
      cancel: true,
      persistent: true
    }).onOk(() => {
      bookStore.deleteBook(id)
    }).onCancel(() => {
      console.log('Operacion cancelada por el usuario')
    }).onDismiss(() => {
      console.log('Operacion cancelada por el usuario')
    })
  }

  const getSettings = async() => {

      const { status, data } = await api.get('items/branding')
  
      if (status !== 200) return
      settingsStore.setSettings(data.data[0])
    }

    
  getSettings()
    
  bookStore.$patch((state) => {
      api.get('items/books').then(response => {
        const { data } = response.data;
        state.books = data;
      }).catch(error=> {
        console.log(error)
      })
      localStorage.setItem('booksList', JSON.stringify(state.books))
  })

  watchEffect(() => console.log(bookStore.$state, settingsStore.$state, 'layout'))

  return {
    drawer: ref(false),
    books,
    title,
    logo,
    route,
    cardSize,
    travelList,

    goBack,
    viewDetail,
    deleteBook
  }
}

export default useBooks