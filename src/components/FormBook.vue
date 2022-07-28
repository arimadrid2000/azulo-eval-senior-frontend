<template>
      <q-scroll-area
      :delay="1200"
      style="height: 420px; max-width: 100%;"
    >
     <q-chat-message
        sent
        text-color="black"
        bg-color="cyan-3"
        class="q-mt-md q-mr-lg"
      >
        <div v-for="msg in selectedBook.notes" :key="msg" class="cursor-pointer">
          <div class="row justify-end">
            <q-btn-dropdown
              color="cyan-10"
              size="md"
              flat
              unelevated
            >
              <q-list>
                <q-item clickable v-close-popup @click="editar(msg)" v-if="msg.type === 'text'">
                  <q-item-section>
                    <q-item-label>Editar</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="edit" color="cyan-8" />
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="borrar(msg)">
                  <q-item-section>
                    <q-item-label>Borrar</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="delete_outline" color="cyan-8" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <div v-if="msg.type === 'text'" :innerHTML="msg.value"></div>
          <q-img
              v-if="msg.type === 'image'"
                :src="msg.value"
                height="140px"
                width="140px"
              />
        </div>
     </q-chat-message>
      </q-scroll-area>
     <q-footer elevated class="bg-white text-cyan-10 q-pa-md">
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
            <q-btn color="cyan-9" class="q-mt-md" label="Guardar nota" @click="enviar"/>
          </div>
          <div class="col-3">
            <q-uploader
              :factory="factoryFn"
              label="Solo imagenes"
              class="full-width"
              color="cyan-10"
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

          const { selectedBook, message, editor, enviar, editar, borrar, factoryFn, successUpload } = useNotes()
            return {
                selectedBook,
                message,
                editor,

                successUpload,
                enviar,
                borrar,
                editar,
                factoryFn
            }
        }
    }
</script>

<style lang="scss" scoped>
  .cursor-pointer {
    cursor: pointer;
  }
</style>