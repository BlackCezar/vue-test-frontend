
<script lang="ts" setup>
import {defineProps} from 'vue'
 
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="block">
    <header v-if="title">
      {{ title }}
    </header>
    <div class="block-content">
      <slot />
    </div>
  </div>
</template>


<style lang="scss" >
.block {
    background: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding-bottom: 15px;
    width: 100%;

    header {
        color: #4A4A4A;
        padding: 20px;
        font-style: normal;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 12px;
        line-height: 12px;
    }
}

</style>
