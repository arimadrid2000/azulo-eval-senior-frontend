<template>
    <h3 class="text-h3 q-ma-lg text-light-green-9">
        {{ selectedBook.name }}
        <span>
            <q-btn icon="edit" round dense size="md" color="light-green-8" @click="openModal(selectedBoook.id)"></q-btn>
        </span>
    </h3>
    <div class="q-pa-md">
    <q-list bordered>
      <q-expansion-item
        icon="rate_review"
        label="Notas"
        default-opened
        expand-separator
        header-class="bg-light-green-10 text-white"
        expand-icon-class="text-white"
      >
        <q-expansion-item
            v-for="note in selectedBook.notes" 
            :key="note.name"
            icon="event_note"
            :label="note.name"
            :header-inset-level="1"
            expand-separator
            header-class="bg-light-green-8 text-white"
            expand-icon-class="text-white"
        >
            <q-card v-for="list in note.todoList" :key="list" class="bg-light-green-6 text-white">
                <q-card-section>
                    {{ list }}
                </q-card-section>
            </q-card>
        </q-expansion-item>
      </q-expansion-item>

      <q-separator />

      <q-expansion-item 
        icon="images" 
        label="Imagenes" 
        expand-separator
        header-class="bg-light-green-10 text-white"
        expand-icon-class="text-white"
        >
        <q-card v-for="pic in selectedBook.pictures" 
        :key="pic.caption">
        <q-img :src="pic.src">
            <div class="absolute-bottom text-subtitle2 text-center">
                {{ pic.caption }}
            </div>
        </q-img>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { ref, watchEffect } from 'vue'
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
            
            bookStore.$patch((state) => {
                state.title = `${selectedBook.value.name}`
            })

            console.log(selectedBook.value)

            const openModal = (id: any) => {
                console.log(id)
            }

            watchEffect(() => console.log(bookStore.$state, 'detail'))

            return {
                selectedBook,

                openModal
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>