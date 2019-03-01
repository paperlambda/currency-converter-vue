<template>
  <div id="app">
    <form>
        <div>
            <label><i>United States Dollar</i></label>
            <div class="flex justify-content-between">
                <label>USD</label>
                <money v-model="baseRate" v-bind="money"></money>
            </div>
        </div>
    </form>
    <CurrencyRateCard v-for="(item, index) in displayedRates" v-bind:rate="item" :key="index"/>
    <CurrencyOptions/>
  </div>
</template>

<script>
import { Money } from 'v-money';

import CurrencyRateCard from './components/CurrencyRateCard.vue';
import CurrencyOptions from './components/CurrencyOptions.vue'

export default {
  name: 'app',
  components: {
    CurrencyRateCard,
    CurrencyOptions,
    Money
  },
  data(){
    return {
      displayedCurrencies: [
        {
          symbol: 'CAD',
          label: 'Canadian dollar'
        },
        {
          symbol: 'IDR',
          label: 'Indonesian rupiah'
        },
        {
          symbol: 'GBP',
          label: 'Great Britain pound'
        },
        {
          symbol: 'CHF',
          label: 'Swiss franc'
        },
        {
          symbol: 'SGD',
          label: 'Singaporean dollar',
        },
        {
          symbol: 'INR',
          label: 'Indian rupee'
        },
        {
          symbol: 'MYR',
          label: 'Malaysian ringgit'
        },
        {
          symbol: 'JPY',
          label: 'Japanese yen'
        },
        {
          symbol: 'KRW',
          label: 'South Korean won'
        }
      ],
      displayedRates: [],
      allRates: [],
      money: {
          precision: 2,
          masked: false,
          thousand: '.',
          decimal: ','
      },
      baseRate: 10.00
    }
  },
  created() {
    this.fetchRates()
  },
  watch:{
    baseRate: function(){
      this.fetchRates();
    }
  },
  methods: {
    calculateFromBaseRate(value){
      return (value * this.baseRate)
    },
    filterRates(rates){
      let symbols = this.displayedCurrencies.map(({symbol}) => symbol),
          filteredRates = [];

      // Filter rates to be displayed
      Object.entries(rates).filter(([key, value]) => {
        if(symbols.indexOf(key) !== -1){
          filteredRates.push({
            symbol: key,
            rate: value,
            multipliedByBaseRate: this.calculateFromBaseRate(value)
          })
        }
      })

      return filteredRates;
    },
    fetchRates(){
      fetch('https://api.exchangeratesapi.io/latest?base=USD')
        .then(response => response.json())
        .then(data => {
          this.allRates = data.rates;
          this.displayedRates = this.filterRates(data.rates);
        })
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

form{
    border-bottom: 1px solid #cccccc;
    padding-bottom: 8px;
    margin-bottom: 12px;
}
</style>
