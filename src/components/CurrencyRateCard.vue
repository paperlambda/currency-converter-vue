<template>
    <div class="card">
        <div class="flex justify-content-between">
            <div class="card--content">
                <div class="flex justify-content-between">
                    <b>{{rate.symbol}}</b>
                    <span>{{rate.total}}</span>
                </div>
                <div>
                    <i>1 USD = {{rate.symbol}} {{rate.rate}}</i> 
                </div>
            </div>
            <button v-on:click="$emit('remove-rate', rate.symbol)" class="card--close">
                &minus;
            </button>
        </div>
    </div>
</template>
<script>

export default {
    name: "CurrencyRateCard",
    props: ['rate']
}
</script>
<style lang="scss" scoped>
    .card{
        border:1px solid #cccccc;
        padding-left: 8px;
        margin-bottom: 12px;
        .card--close{
            align-items: center;
            border: 0px;
            border-left: 1px solid #cccccc;
            background-color: #f8f9fb;
            cursor: pointer;
        }
        .card--content{

        }
    }
</style>
