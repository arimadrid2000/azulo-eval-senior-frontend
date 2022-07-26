<template>
    <div class="full-width">
      <div class="row q-col-gutter-md q-ma-lg">
        <div :class="cardSize" v-for="book in travelList" :key="book.id">
          <q-card @click="viewDetail(book.id)" class="bg-light-green-4 text-white">
            <q-card-section>
              <div class="text-h6 q-mb-xs">{{ book.name }}</div>
            </q-card-section>
             <q-separator />

            <q-card-actions align="right">
              <q-btn flat @click="viewDetail(book.id)">Ver</q-btn>
              <!-- <q-btn flat>Action 2</q-btn> -->
            </q-card-actions>

          </q-card>
        </div>
      </div>
    </div>


    <AddButton />
</template>

<script lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useTravelBookStore } from '../stores/travel-book-store'
import Books from '../helpers/books'
import AddButton from './AddButton.vue'

    export default {
      components: {
        AddButton
      },
        setup() {
            const router = useRouter()

            const bookStore = useTravelBookStore()

            const $q = useQuasar()

            const cardSize = computed(() => {
              return $q.screen.lt.sm ? 'col-12' : 'col-4'
            })


            bookStore.$patch((state) => {
              if (state.books.length === 0) {
                Books.forEach((book) => {
                  state.books.push(book)
                })
                localStorage.setItem('booksList', JSON.stringify(state.books))
              }
            })

            const travelList = ref(bookStore.books)

            watchEffect(()=> console.log(bookStore.$state))

            const viewDetail = (id: number) => {
              router.push({name: 'book-detail', params: {id}})
            }

            return {
                group: ref([]),
                Books,
                travelList,
                cardSize,

                viewDetail
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>