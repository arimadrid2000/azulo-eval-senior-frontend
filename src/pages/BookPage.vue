<template>
    <!-- <div class="q-pa-md">
        <div class="row q-col-gutter-xl">
            <div class="col-12">
                <q-btn v-if="!showSearch" round color="light-green-10" dense icon="search" class="float-right" @click="changeStatus"/>
                <SearchBook v-else/>
            </div>
        </div>
    </div> -->
    <div class="row">
        <TravelBookList />
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import SearchBook from 'components/SearchBook.vue'
import TravelBookList from 'components/TravelBookList.vue'

    export default {
        components: {
            SearchBook,
            TravelBookList
        },
        setup() {
            const showSearch = ref(false)

            return {
                showSearch,

                changeStatus: () => showSearch.value = !showSearch.value,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>