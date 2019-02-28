<template>
    <div class="card">
        <div class="flex justify-content-between">
            <div class="card--content">
                <div class="flex justify-content-between">
                    <b>IDR</b>
                    <span>144,151</span>
                </div>
                <div>
                    <i>IDR - Indonesia Rupiah</i> 
                </div>
                <div>
                    <i>1 USD = IDR 15.000</i> 
                </div>
            </div>
            <button class="card--close">
                &minus;
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: "CurrencyRateCard"
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
