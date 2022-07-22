<template>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn color="light-green-10" icon-right="add" label="Agregar" @click="addBook"/>
    </q-page-sticky>
</template>

<script>
import { ref } from 'vue'
import { useTravelBookStore } from '../stores/travel-book-store'

    export default {
        setup() {
            const bookStore = useTravelBookStore()

            const books = ref(bookStore.books)

            const addBook = () => {
                const index = books.value.length
                console.log(index, 'el index');
                const newBook = {
                    id: index,
                    name: `Libreta ${index + 1}`,
                    notes: [
                        {
                            name: 'Nota 1',
                            todoList: ['List 1', 'List 2', 'List 3']
                        },
                        {
                            name: 'Nota 2',
                            todoList: ['List 1', 'List 2', 'List 3']
                        },
                        {
                            name: 'Nota 3',
                            todoList: ['List 1', 'List 2', 'List 3']
                        },
                        {
                            name: 'Nota 4',
                            todoList: ['List 1', 'List 2', 'List 3']
                        },
                    ],
                    pictures: [
                        {
                            src: 'https://cdn.pixabay.com/photo/2016/08/30/12/08/horseshoe-bend-1630528_960_720.jpg',
                            caption: 'Curva de Herradura Arizona'
                        },
                        {
                            src: 'https://cdn.pixabay.com/photo/2016/08/30/12/08/horseshoe-bend-1630528_960_720.jpg',
                            caption: 'Curva de Herradura Arizona'
                        },
                        {
                            src: 'https://cdn.pixabay.com/photo/2016/08/30/12/08/horseshoe-bend-1630528_960_720.jpg',
                            caption: 'Curva de Herradura Arizona'
                        },
                    ]
                }
                bookStore.createNewBook(newBook)
            }

            return {
                addBook
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>