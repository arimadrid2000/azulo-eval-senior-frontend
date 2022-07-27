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
              <q-btn flat @click="deleteBook(book.id)">Borrar</q-btn>
            </q-card-actions>

          </q-card>
        </div>
      </div>
    </div>


    <AddButton />
</template>

<script lang="ts">
import useBooks from '../composables/useBooks'
import AddButton from './AddButton.vue'

    export default {
      components: {
        AddButton
      },
        setup() {
            
            const { travelList, cardSize, viewDetail, deleteBook } = useBooks()

            return {
                travelList,
                cardSize,

                viewDetail,
                deleteBook
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>