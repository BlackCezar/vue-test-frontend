<template>
  <div class="page">
    <img
      src="@/assets/imgs/Logo.svg"
      alt="Logo"
      class="logo"
    >
    <div class="page-content">
      <aside>
        <button class="filterShowButton primary">
          Фильтры
        </button>
        <Block title="Количество пересадок">
          <Field
            v-for="transferCount in transferCounts"
            :key="transferCount.count"
            type="checkbox"
            :field-id="`transferCount-${transferCount.count}`"
            name="transferCount"
            :field-label="transferCount.title"
          />
        </Block>
        <Block title="Компания">
          <Field
            v-for="company in companies"
            :key="company.name"
            :field-id="`company-${company.name}`"
            name="company"
            :field-label="company.title"
            type="radio"
          />
        </Block>
      </aside>
      <main>
        <ButtonGroup>
          <button 
            :class="{active: searchType === SearchType.Cheapest}" 
            @click="changeSearchType(SearchType.Cheapest)"
            >Самый дешевый</button>
          <button :class="{active: searchType === SearchType.Fastest}" 
            @click="changeSearchType(SearchType.Fastest)">Самый быстрый</button>
          <button :class="{active: searchType === SearchType.Optimal}" 
            @click="changeSearchType(SearchType.Optimal)">Оптимальный</button>
        </ButtonGroup>

        <template v-if="tickets && tickets.length">
          <template
            v-for="ticket in tickets"
            :key="ticket.id"
          >
            <TicketBlock :ticket="ticket" />
          </template>
        </template>

        <button class="primary">
          Показать еще 5 билетов!
        </button>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TicketService from './services/tickets'
import '@/assets/scss/App.scss'
import {onMounted, ref, watch} from 'vue'
import type {Ref} from 'vue'
import Ticket from './models/Ticket'
import {SearchType, SearchParams} from './models/SearchType'

const ticketService = new TicketService()
const tickets: Ref<Ticket[]> = ref([])

// Search params
const searchParams = new URLSearchParams(window.location.search)
const ticketsCount = ref(searchParams.get('limit') || 10)
const searchType: Ref<SearchType> = ref(searchParams.get('sort') as SearchType || SearchType.Cheapest)

onMounted(async () => {
  let params: SearchParams = {
    limit: ticketsCount.value,
    sort: searchType.value
  }

  tickets.value = await ticketService.list(params) as Ticket[]
})

const changeSearchType = async (newType: SearchType) => {
  searchType.value = newType
  let params: SearchParams = {
    limit: ticketsCount.value,
    sort: searchType.value
  }
  tickets.value = await ticketService.list(params) as Ticket[]


watch(searchType, (val) => {
  console.log('Set ' + val)
  searchParams.set('sort', val.toString())
})

}

</script>