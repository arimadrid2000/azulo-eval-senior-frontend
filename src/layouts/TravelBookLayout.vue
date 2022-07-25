<template>
    <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders bg-light-green-1">
      <q-header elevated class="bg-light-green-9">
        <q-toolbar>
          <!-- <q-btn flat @click="drawer = !drawer" round dense icon="menu" /> -->
          <q-avatar @click="goBack">
            <img :src="settings.project_logo">
          </q-avatar>
          <q-toolbar-title>{{ settings.project_name }}</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        side="right"
        :width="200"
        :breakpoint="500"
      >
        <q-scroll-area class="fit">
          <q-list padding class="menu-list">
            <q-item clickable v-ripple v-for="book in books" :key="book.id" @click="viewDetail(book.id)">
              <q-item-section>
                {{ book.name}}
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <router-view>
        </router-view>
      </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { ref, watchEffect } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useTravelBookStore } from '../stores/travel-book-store'

export default {
  setup () {

    const bookStore = useTravelBookStore()

    const books = ref(bookStore.books)

    const router = useRouter()

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

      goBack,
      viewDetail
    }
  }
}
</script>

<style lang="sass" scoped>
.menu-list .q-item
  border-radius: 0 32px 32px 0
</style>
