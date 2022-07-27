<template>
<div class="q-pa-md full-width">
    <q-toolbar class="bg-cyan-10 text-white shadow-2">
      <q-toolbar-title>Listado de libretas</q-toolbar-title>
    </q-toolbar>

    <q-list bordered separator class="bg-white">
      <q-item v-for="book in travelList" :key="book.id" class="q-my-sm" v-ripple>
        <q-item-section avatar>
          <q-avatar icon="place" color="cyan-8" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ book.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn-group>
            <q-btn color="cyan" rounded glossy icon-right="book" label="Ver notas" @click="viewDetail(book.id)"/>
            <q-btn color="cyan" rounded glossy icon-right="delete_outline" label="Borrar" @click="deleteBook(book.id)"/>
          </q-btn-group>
        </q-item-section>
      </q-item>
    </q-list>
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