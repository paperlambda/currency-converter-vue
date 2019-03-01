<template>
    <div>
        <select>
            <option>+ Add More Currencies</option>
            <option :value="item" v-for="(item, index) in currencies" :key="index">{{item}}</option>
        </select>
    </div>
</template>
<script>
export default {
    name: 'CurrencyOptions',
    props: ['currencies']
}
</script>
<style lang="scss" scoped>
    select{
        width: 100%;
    }
</style>
