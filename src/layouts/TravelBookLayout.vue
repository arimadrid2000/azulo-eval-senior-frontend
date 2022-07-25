<template>
    <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders bg-light-green-1">
      <q-header elevated class="bg-light-green-9">
        <q-toolbar>
          <!-- <q-btn flat @click="drawer = !drawer" round dense icon="menu" /> -->
          <q-avatar @click="goBack">
            <img :src="settings.project_logo">
          </q-avatar>
          <q-toolbar-title>{{ settings.project_name }}</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" v-if="route.name !== 'home'"/>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-if="route.name !== 'home'"
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
import useBooks from '../composables/useBooks'

export default {
  setup () {

    const { drawer, title, books, settings, route, goBack, viewDetail} = useBooks()

    return {
      drawer,
      title,
      books,
      settings,
      route,

      goBack,
      viewDetail
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
