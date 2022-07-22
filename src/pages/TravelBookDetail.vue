<template>
    <h2 class="text-h2">{{ selectedBook.name }}</h2>

    <h4 class="text-h4">Notas</h4>
    <div v-for="note in selectedBook.notes" :key="note.name">
        <h6 class="text-h6">{{ note.name }}</h6>
        <h6 v-for="list in note.todoList" :key="list" class="text-subtitle1">{{ list }}</h6>
    </div>
    <div class="q-col-gutter-md row items-start">
        <div class="col-6" v-for="pic in selectedBook.pictures" :key="pic.caption">
            <q-img :src="pic.src" no-native-menu>
                <div class="absolute-bottom text-subtitle1 text-center">
                    {{ pic.caption }}
                </div>
            </q-img>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import {useRoute} from 'vue-router'
import { useTravelBookStore } from '../stores/travel-book-store'

    export default {
        setup() {
            const route = useRoute()

            const bookStore = useTravelBookStore()

            const bookId = ref(route.params.id)

            const books = ref(bookStore.books)

            const selectedBook = ref()
            
            selectedBook.value = books.value.find((book)=> book.id === Number(bookId.value))

            console.log(selectedBook.value)

            return {
                selectedBook
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>