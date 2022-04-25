<script lang="ts" setup>
import {defineProps} from 'vue'

defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="button-group">
    <slot />
  </div>
</template>

<style lang="scss">
  .button-group {
    display: flex;
    width: 100%;

    button {
      background: #FFFFFF;
      border: 1px solid #DFE5EC;
      box-sizing: border-box;
      font-weight: 600;
      cursor: pointer;
      padding: 15px;
      width: 100%;
      font-size: 12px;
      line-height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      letter-spacing: 0.5px;
      border-right: 0;
      text-transform: uppercase;
      color: #4A4A4A;
    }
    button:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    button:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      border-right: 1px solid #DFE5EC;
    }
    button:hover {
      background: #F1FCFF;
    }
    button:active, button.active {
      background: #2196F3;
      border-color: #2196F3;
      color: white;
    }
  }

</style>
