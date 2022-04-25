import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import Block from './components/Block.vue'
import Ticket from './components/Ticket.vue'
import ButtonGroup from './components/ButtonGroup.vue'


const app = createApp(App)

app
    .component('Block', Block)
    .component('TicketBlock', Ticket)
    .component('ButtonGroup', ButtonGroup)
    .use(store)
    .mount('#app')
