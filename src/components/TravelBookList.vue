<template>
    <q-list>

      <q-item tag="label" v-ripple v-for="book in books" :key="book.id">
        <q-item-section side top>
          <q-checkbox v-model="check1" />
        </q-item-section>

        <q-item-section @click="viewDetail(book.id)">
          <q-item-label>
            <h5 class="text-h5 no-margin">
              {{ book.name }}
            </h5>
          </q-item-label>
        </q-item-section>
      </q-item>

       <!-- <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check2" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Sound</q-item-label>
          <q-item-label caption>
            Auto-update apps at anytime. Data charges may apply
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check3" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Auto-add widgets</q-item-label>
          <q-item-label caption>
            Automatically add home screen widgets
          </q-item-label>
        </q-item-section>
      </q-item> -->
    </q-list>

    <AddButton />
</template>

<script lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
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


            bookStore.$patch((state) => {
              if (state.books.length === 0) {
                Books.forEach((book) => {
                  state.books.push(book)
                })
                localStorage.setItem('booksList', JSON.stringify(state.books))
              }
            })

            const books = ref(bookStore.$state.books)

            watchEffect(()=> console.log(bookStore.$state))

            return {
                check1: ref(true),
                books,

                viewDetail: (id: number) => {
                    console.log(id)
                    router.push({name: 'book-detail', params: {id}})
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>