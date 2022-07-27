import { ref, onUnmounted } from 'vue'
import { useTravelBookStore } from '../stores/travel-book-store'

const usePlaces = () => {

    const bookStore = useTravelBookStore()
    
    const src = process.env.MAP_URL
    
    const streetRef = ref(null)
    
    const prompt = ref(false)
    
    const address = ref('')

    const addBook = () => {
        console.log(streetRef.value, address.value)
        const newBook = {
            name: `${address.value}`,
            notes: []
        }
        bookStore.createNewBook(newBook)
        prompt.value = false
    }

    const searchFunction = () => {
        new Promise((resolve, reject): void => {
            let script = document.querySelector(`script[src="${src}"]`)

            if(!script) {
                script = document.createElement("script")
                script.src = src
                script.async = true
                script.setAttribute("data-status", "loading")
                document.head.append(script)
            }

            if (script.getAttribute("data-status") === "loaded") {
                resolve();
            }

            function onScriptLoad() {
                resolve();
                script.setAttribute("data-status", "loaded")
            }

            function onScriptError() {
                reject()
                script.setAttribute("data-status", "error")
            }

            script.addEventListener("load", onScriptLoad)
            script.addEventListener("error", onScriptError)

            onUnmounted(() => {
                if(document.head.contains(script)) {
                    script.removeEventListener("load", onScriptLoad)
                    script.removeEventListener("error", onScriptError)
                    document.head.removeChild(script)
                }
            })

        }).then(()=>{
            const place = new google.maps.places.Autocomplete(streetRef.value)
            place.addEventListener("place_changed", () => {
                address.value = place.getPlace()
            })
        })
    }

    return {
        prompt,
        address,
        streetRef,
        
        addBook,
        searchFunction
    }
}

export default usePlaces