<template>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn color="yellow-4" icon-right="add" label="Agregar" @click="addBook"/>
    </q-page-sticky>
</template>

<script>
import { useTravelBookStore } from '../stores/travel-book-store'

    export default {
        setup() {
            const bookStore = useTravelBookStore()

            const addBook = () => {
                const newBook = {
                    id: 3,
                    name: 'Libreta 4',
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