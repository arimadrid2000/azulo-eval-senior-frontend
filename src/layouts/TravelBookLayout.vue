<template>
    <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders bg-grey-1">
      <q-header elevated class="bg-cyan-7">
        <q-toolbar>
          <q-avatar @click="goBack">
            <img :src="logo">
          </q-avatar>
          <q-toolbar-title>{{ title }}</q-toolbar-title>
          <!-- <q-btn flat @click="drawer = !drawer" round dense icon="menu" v-if="route.name !== 'home'"/> -->
        </q-toolbar>
      </q-header>

      <!-- <q-drawer
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
      </q-drawer> -->

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

    const { drawer, books, title, route, logo, goBack, viewDetail} = useBooks()

    return {
      drawer,
      books,
      title,
      route,
      logo,

      goBack,
      viewDetail
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
