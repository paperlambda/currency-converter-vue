<template>
    <div>
        <select @change="$emit('add-currency', selected)" v-model="selected">
            <option value="" disabled selected>+ Add More Currencies</option>
            <option :value="item" v-for="(item, index) in currencies" :key="index">{{item}}</option>
        </select>
    </div>
</template>
<script>
export default {
    name: 'CurrencyOptions',
    props: ['currencies'],
    data(){
        return {
            selected: ''
        }
    },
    watch: {
        currencies: function(){
            this.selected = '';
        }
    }
}
</script>
<style lang="scss" scoped>
    select{
        width: 100%;
    }
</style>
