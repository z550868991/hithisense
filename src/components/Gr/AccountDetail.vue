<template>
    <div class="account-detail">
        <div class="content-wrapper">
            <el-collapse v-model="activeNames">
                <el-collapse-item name="1">
                    <template slot="title">
                        <p class="title">我的订单</p>
                    </template>
                    <div class="order-wrapper wrapper">
                        <og-order-list :orders="orders" :isAccountDetail="true"></og-order-list>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="2">
                    <template slot="title">
                        <p class="title">我的iSC</p>
                    </template>
                    <div class="isc-wrapper wrapper">
                        <isc-list-infor :iscList="iscList" :isAccountDetail="true"></isc-list-infor>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>
<script>
import OgOrderList from '@/components/OgOrderList'
import IscListInfor from '@/components/IscListInfor'

export default {
    components: {
        OgOrderList,
        IscListInfor
    },
    data() {
        return {
            activeNames: ['1'],
            orders: [],
            iscList: []
        }
    }
}
</script>
<style lang="stylus">
.account-detail
    padding: 0 .1rem
    .el-collapse
        margin-bottom: 1rem
        .title
            text-align: left
            margin: 0
            padding: 0 .3rem
            overflow: hidden
        .wrapper
            width: 90%
            margin: 0 auto
</style>
