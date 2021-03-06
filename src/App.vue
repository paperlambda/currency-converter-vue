<template>
  <div id="app">
    <BaseForm v-on:change-base="fetchRates"/>
    <CurrencyRateCard v-on:remove-rate="removeRate" v-for="(item, index) in displayedRates" :rate="item" :key="index"/>
    <CurrencyOptions v-on:add-currency="addDisplayedCurreny" :currencies="currencyOptions"/>
  </div>
</template>

<script>
import { getRatesAPI } from  './services/currency-service.js';

import CurrencyRateCard from './components/CurrencyRateCard.vue';
import CurrencyOptions from './components/CurrencyOptions.vue';
import BaseForm from './components/BaseForm.vue';

export default {
  name: 'app',
  components: {
    CurrencyRateCard,
    CurrencyOptions,
    BaseForm
  },
  data(){
    return {
      displayedCurrencies: ['CAD', 'IDR', 'GBP', 'CHF', 'SGD', 'INR', 'MYR', 'JPY', 'KRW'],
      displayedRates: [],
      allRates: [],
      currencyOptions: [],
      baseRate: null
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
      
      return filteredRates;
    },
    fetchRates(baseRate = this.baseRate){
      // Store base rate for reference
      this.baseRate = baseRate;

      getRatesAPI()
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
