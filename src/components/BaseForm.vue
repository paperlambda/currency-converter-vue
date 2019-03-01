<template>
    <div>
        <form>
            <div>
                <label><i>United States Dollar</i></label>
                <div class="flex justify-content-between">
                    <label>USD</label>
                    <money v-model="baseRate" v-bind="money"></money>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import { Money } from 'v-money';

export default {
    name: 'BaseForm',
    components: { Money },
    data(){
        return {
            // baseRate: 10.00,
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
</style>