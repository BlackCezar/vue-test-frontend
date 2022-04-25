<script lang="ts" setup>
import Ticket from '../models/Ticket'
import {defineProps} from 'vue'
import '@/assets/scss/Ticket.scss'
import Price from '../filters/price'
import TimeFilter from '../filters/time'
import TicketService from '../services/tickets'

const ticketService = new TicketService()
interface TicketComponentProps {
  ticket: Ticket
}


defineProps<TicketComponentProps>()
</script>


<template>
  <Block>
    <div class="ticket">
      <div class="row">
        <div class="col">
          <span class="price">{{ Price(ticket.price) }}</span>
        </div>
        <div class="col">
          <img
            :src="ticketService.getCompanyImage(ticket.companyId)"
            :alt="ticket.companyId"
            class="ticket-company"
          />
        </div>
      </div>
      <div v-for="segment in ticket.segments" :key="segment.id" class="row">
        <div class="col">
          <span class="header">{{segment.origin}} – {{segment.destination}}</span>
          <span class="value">{{TimeFilter.Hours(segment.dateStart)}} – {{TimeFilter.Hours(segment.dateEnd)}}</span>
        </div>
        <div class="col">
          <span class="header">В пути</span>
          <span class="value">{{TimeFilter.Duration(segment.duration)}}</span>
        </div>
        <div class="col">
          <template v-if="segment.stops && segment.stops.length">
            <span class="header" v-if="segment.stops.length === 1">1 пересадка</span>
            <span class="header" v-else-if="segment.stops.length > 4">{{segment.stops.length}} пересадок</span>
            <span class="header" v-else>{{segment.stops.length}} пересадки</span>
            <span class="value">{{segment.stops.join(', ')}}</span>
          </template>
          <template v-else>
            <span class="header">Прямой</span>
          </template>
        </div>
      </div>
   
    </div>
  </Block>
</template>