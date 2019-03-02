<template>
    <div>
        <div class="form">
            <label><i>United States Dollar</i></label>
            <div class="flex justify-content-between">
                <b>USD</b>
                <money @change.native="$emit('change-base', baseRate)" v-model="baseRate" v-bind="money"></money>
            </div>
        </div>
    </div>
</template>
<script>
import { Money } from 'v-money';

export default {
    name: 'BaseForm',
    components: { Money },
    data(){
        return {
            baseRate: 10.00,
            money: {
                precision: 2,
                masked: false,
                thousand: '.',
                decimal: ','
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .form{
        border-bottom: 1px solid #cccccc;
        padding-bottom: 8px;
        margin-bottom: 12px;
    }
</style>