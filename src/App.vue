<template>
  <div id="app">
    <BaseForm/>
    <CurrencyRateCard v-for="(item, index) in [1,2]" :key="index"/>
    <CurrencyOptions/>
  </div>
</template>

<script>
import BaseForm from './components/BaseForm.vue';
import CurrencyRateCard from './components/CurrencyRateCard.vue';
import CurrencyOptions from './components/CurrencyOptions.vue'

export default {
  name: 'app',
  components: {
    BaseForm,
    CurrencyRateCard,
    CurrencyOptions
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 30px auto;

  // Style app to be mobile-like display
  width: 270px;
}

.flex{
  display: flex;
  &.justify-content-between{
    justify-content: space-between
  }
}
</style>
