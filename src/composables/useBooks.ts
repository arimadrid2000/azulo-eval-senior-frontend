import { ref, watchEffect } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import { useTravelBookStore } from '../stores/travel-book-store'

const useBooks = () => {
    const bookStore = useTravelBookStore()

    const books = ref(bookStore.books)

    const router = useRouter()

    const route = useRoute()

    console.log(route.name)

    const settings = ref({})

    watchEffect(() => console.log(bookStore.$state, 'layout'))

    const goBack = () => {
      router.push('/')
    }

    const viewDetail = (id: number) => {
      router.push({name: 'book-detail', params: {id}})
    }

    const getSettings = async() => {
        const { status, data } = await axios.get(`${process.env.API_URL}settings`)
        if (status !== 200) return
        settings.value = data.data

        console.log(data.data)
    }

    getSettings()

    return {
      drawer: ref(false),
      title: ref(bookStore.title),
      books,
      settings,
      route,

      goBack,
      viewDetail
    }
}

export default useBooks