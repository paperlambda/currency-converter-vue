<template>
  <div id="app">
    <BaseForm v-on:change-base="fetchRates"/>
    <CurrencyRateCard v-on:remove-rate="removeRate" v-for="(item, index) in displayedRates" :rate="item" :key="index"/>
    <CurrencyOptions v-on:add-currency="addDisplayedCurreny" :currencies="currencyOptions"/>
  </div>
</template>

<script>
import { Money } from 'v-money';

import CurrencyRateCard from './components/CurrencyRateCard.vue';
import CurrencyOptions from './components/CurrencyOptions.vue';
import BaseForm from './components/BaseForm.vue';

export default {
  name: 'app',
  components: {
    CurrencyRateCard,
    CurrencyOptions,
    BaseForm,
    Money
  },
  data(){
    return {
      displayedCurrencies: ['CAD', 'IDR', 'GBP', 'CHF', 'SGD', 'INR', 'MYR', 'JPY', 'KRW'],
      displayedRates: [],
      allRates: [],
      money: {
          precision: 2,
          masked: false,
          thousand: '.',
          decimal: ','
      },
      currencyOptions: []
    }
  },
  created() {
    this.fetchRates()
  },
  
  methods: {
    removeRate(symbol){
      let findRateBySymbol = this.displayedCurrencies.indexOf(symbol);
      this.displayedCurrencies.splice(findRateBySymbol, 1);

      this.displayedRates = this.getFilteredRates(this.allRates)
    },
    getFilteredRates(rates, baseRate){
      let symbols = this.displayedCurrencies,
          filteredRates = [];

      // Filter rates to be displayed
      symbols.map(symbol => {
        let rateValue = rates[symbol];

        filteredRates.push({
          symbol,
          rate: parseFloat(rateValue).toFixed(2),
          total: parseFloat(rateValue * baseRate).toFixed(2)
        })
      })
      // Object.entries(rates).filter(([key, value]) => {
      //   if(symbols.indexOf(key) !== -1){
      //     filteredRates.push({
      //       symbol: key,
      //       rate: parseFloat(value).toFixed(2),
      //       total: this.countTotalRate(value)
      //     })
      //   }
      // })

      return filteredRates;
    },
    fetchRates(baseRate = 10.00){
      fetch('https://api.exchangeratesapi.io/latest?base=USD')
        .then(response => response.json())
        .then(data => {
          this.allRates = data.rates;
          this.displayedRates = this.getFilteredRates(data.rates, baseRate);
          this.setCurrencyOptions(data.rates);
        })
    },
    setCurrencyOptions(rates){
      let symbols = this.displayedCurrencies;

      let excludeDisplayedCurrency = Object.keys(rates).filter(rate => {
        if(symbols.indexOf(rate) === -1){
          return rate;
        }
      })
      this.currencyOptions = excludeDisplayedCurrency;
    },
    addDisplayedCurreny(currency){
      this.displayedCurrencies.push(currency);
      this.fetchRates()
    }
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
