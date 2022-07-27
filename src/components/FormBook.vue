<template>
     <q-chat-message
        size="8"
        sent
        text-color="white"
        bg-color="light-green-6"
        class="q-mt-md q-mr-lg"
      >
      <div v-for="msg in selectedBook.notes" :key="msg" class="cursor-pointer">
        <!-- <q-btn-dropdown
      color="primay"
    >
      <q-list>
        <q-item clickable v-close-popup @click="editar(msg)">
          <q-item-section>
            <q-item-label>Editar</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label>Videos</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label>Articles</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown> -->
    <div v-if="msg.type === 'text'" :innerHTML="msg.value"></div>
     <q-img
        v-if="msg.type === 'image'"
          :src="msg.value"
          :ratio="16/9"
        />
      </div>
     </q-chat-message>
     <q-footer elevated class="bg-white text-light-green-10 q-pa-md">
        <div class="row q-gutter-lg">
          <div class="col-8">
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
            <q-btn color="light-green-6" label="Guardar nota" @click="enviar"/>
          </div>
          <div class="col-3">
            <q-uploader
              :factory="factoryFn"
              label="Solo imagenes"
              class="full-width"
              color="light-green-4"
              multiple
              accept=".jpg, image/*"
              @uploaded="successUpload"
              @rejected="onRejected"
            />
          </div>
      </div>
      </q-footer>

</template>

<script lang="ts">
import useNotes from '../composables/useNotes'


    export default {
        setup() {

          const { selectedBook, message, editor, openModal, enviar, editar, factoryFn, successUpload, saveWork, uploadIt } = useNotes()
            return {
                selectedBook,
                message,
                editor,

                openModal,
                successUpload,
                enviar,
                editar,
                factoryFn,
                saveWork,
                uploadIt
            }
        }
    }
</script>

<style lang="scss" scoped>
  .cursor-pointer {
    cursor: pointer;
  }
</style>