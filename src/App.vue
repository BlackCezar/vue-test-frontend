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
            :checked="filters.transferCounts.indexOf(transferCount.count) !== -1"
            :value="transferCount.count"
            @update-value="val => store.commit('updateTransferCount', val)"
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
            :checked="filters.company === company.name"
            :value="company.name"
            @update-value="val => store.commit('setCompanyFilter', val)"
            :field-label="company.name"
            type="radio"
          />
        </Block>
      </aside>
      <main>
        <ButtonGroup>
          <button 
            :class="{active: searchType === SearchType.Cheapest}" 
            @click="changeSortType(SearchType.Cheapest)"
            >Самый дешевый</button>
          <button :class="{active: searchType === SearchType.Fastest}" 
            @click="changeSortType(SearchType.Fastest)">Самый быстрый</button>
          <button :class="{active: searchType === SearchType.Optimal}" 
            @click="changeSortType(SearchType.Optimal)">Оптимальный</button>
        </ButtonGroup>

        <template v-if="loading">
          <div class="loader">
            <div class="loader-line"></div>
          </div>
        </template>
        <template v-if="tickets && tickets.length && !loading">
          <template
            v-for="ticket in tickets"
            :key="ticket.id"
          >
            <TicketBlock :ticket="ticket" />
          </template>
        </template>

        <button :disabled="loadMoreDisabled" class="primary" @click="loadMore">
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
import Company from './models/Company'
import {SearchType, SearchParams, Filters} from './models/SearchType'
import { computed } from 'vue'
import { useStore } from 'vuex'


const store = useStore()
const ticketService = new TicketService()
const tickets: Ref<Ticket[]> = ref([])
const companies: Ref<Company[]> = ref([])

// Search params
const searchParams = new URLSearchParams(window.location.search)
const ticketsCount: Ref<number> = ref(parseInt(searchParams.get('limit')) || null)
const skipCount: Ref<number> = ref(parseInt(searchParams.get('skip')) || null)
const searchType: Ref<SearchType> = ref(searchParams.get('sort') as SearchType || SearchType.Cheapest)
const loadMoreDisabled: Ref<Boolean> = ref(false)
const filters = computed<Filters>(() => store.state.filters) 
const loading: Ref<Boolean> = ref(false)
const LoaderStart = () => loading.value = true 
const LoaderEnd = () => loading.value = false 
const transferCounts = [
    { title: 'Без пересадок', count: 0 },
    { title: '1 пересадка', count: 1 },
    { title: '2 пересадки', count: 2 },
    { title: '3 пересадки', count: 3 }
]

// let selectedTransfers = reactive([])

onMounted(async () => {
  if (!ticketsCount.value) ticketsCount.value = 10
  if (!skipCount.value) skipCount.value = 0

  const params: SearchParams = ({
    limit: ticketsCount.value,
    skip: skipCount.value,
    sort: searchType.value,
    filters: filters.value
  })
  LoaderStart()
  tickets.value = await ticketService.list(params) as Ticket[]
  companies.value = await ticketService.companies() as Company[]
  store.commit('setCompanyFilter', companies.value[0].name)
  LoaderEnd()
})

const changeSortType = async (newType: SearchType) => {
  searchType.value = newType
  skipCount.value = 0
  tickets.value = []
  const params: SearchParams = ({
    limit: ticketsCount.value,
    skip: skipCount.value,
    sort: searchType.value,
    filters: filters.value
  })
  LoaderStart()
  tickets.value = await ticketService.list(params) as Ticket[]
  LoaderEnd()
}

const loadMore = async () => {
  skipCount.value += 10
  const params: SearchParams = ({
    limit: ticketsCount.value,
    skip: skipCount.value,
    sort: searchType.value,
    filters: filters.value
  })
  LoaderStart()
  let ticketsList: Ticket[] = await ticketService.list(params) as Ticket[]
  if (ticketsList.length < params.limit) loadMoreDisabled.value = true
  tickets.value.push(...ticketsList)
  LoaderEnd()
}

watch(searchType, (val) => {
  searchParams.set('sort', val.toString())
  window.history.pushState("", '', window.location.pathname + '?' + searchParams.toString())
})
watch(skipCount, (val) => {
  searchParams.set('skip', val.toString())
  window.history.pushState("", '', window.location.pathname + '?' + searchParams.toString())
})
watch(ticketsCount, (val) => {
  searchParams.set('limit', val.toString())
  window.history.pushState("", '', window.location.pathname + '?' + searchParams.toString())
})


watch(filters.value, async (filters) => {
  const params: SearchParams = ({
    limit: ticketsCount.value,
    skip: skipCount.value,
    sort: searchType.value,
    filters: filters
  })
  LoaderStart()
  tickets.value = await ticketService.list(params) as Ticket[]
  LoaderEnd()
})

</script>