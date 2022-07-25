<template>
     <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        stamp="1 minutes ago"
        size="8"
        sent
        text-color="white"
        bg-color="primary"
      >
      <div v-for="msg in message" :key="msg" :innerHTML="msg">
      </div>
     </q-chat-message>

    <div class="q-pa-md q-gutter-sm">
      <div class="col-2">

      </div>
      <q-editor
        v-model="editor"
        :definitions="{
          save: {
            tip: 'Save your work',
            icon: 'save',
            label: 'Save',
            handler: saveWork
          },
          upload: {
            tip: 'Upload to cloud',
            icon: 'cloud_upload',
            label: 'Upload',
            handler: uploadIt
          }
        }"
        :toolbar="[
          ['bold', 'italic', 'strike', 'underline'],
          ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
          ['upload']
        ]"
      >
      <!-- <template v-slot:image>
          <q-uploader
          style="max-width: 300px"
          url="http://localhost:4444/upload"
          label="Restricted to images"
          multiple
          accept=".jpg, image/*"
        />
      </template> -->
      </q-editor>
      <q-btn color="primary" label="Guardar" @click="enviar"/>
  </div>
</template>

<script lang="ts">
import { ref, watchEffect } from 'vue'
import { useQuasar } from 'quasar'
import {useRoute} from 'vue-router'
import { useTravelBookStore } from '../stores/travel-book-store'
import { babelParse } from '@vue/compiler-sfc'


    export default {
        setup() {
            const $q = useQuasar()

            const route = useRoute()

            const bookStore = useTravelBookStore()

            const bookId = ref(route.params.id)

            const books = ref(bookStore.books)

            const message = ref(bookStore.message)

            const selectedBook = ref()

            const editor = ref('After you define a new button,' +' you have to make sure to put it in the toolbar too!')

            
            selectedBook.value = books.value.find((book)=> book.id === Number(bookId.value))
            
            bookStore.$patch((state) => {
                state.title = `${selectedBook.value.name}`
                state.selectedBook = selectedBook.value
            })

            const enviar = () => {
              bookStore.$patch((state) => {
                console.log('se disparo')
                state.message.push(editor.value)
                console.log(state.message)
              })
            }

            console.log(selectedBook.value)

            const openModal = (id: any) => {
                console.log(id)
            }

            watchEffect(() => console.log(bookStore.$state, 'detail'))

            return {
                selectedBook,
                message,
                editor,

                openModal,
                enviar,
                saveWork () {
                  $q.notify({
                    message: 'Saved your text to local storage',
                    color: 'green-4',
                    textColor: 'white',
                    icon: 'cloud_done'
                  })
                },
                uploadIt () {
                  console.log('upload')
                  // const post = editor.value
                  // // create an input file element to open file dialog
                  // const input = document.createElement('input')
                  // input.type = 'file'
                  // input.accept = '.png, .jpg' // file extensions allowed
                  // let file
                  // input.onchange = _ => {
                  //   const files = Array.from(input.files)
                  //   file = files[0]
  
                  //   // lets load the file as dataUrl
                  //     const reader = new FileReader()
                  //     let dataUrl = ''
                  //     reader.onloadend = function() {
                  //         dataUrl = reader.result
                        
                  //         // append result to the body of your post
                  //         post.body += '<div><img src="' + dataUrl + '" /></div>' 
                  //     }
                  //     reader.readAsDataURL(file)
                  //   }
                  // input.click()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>