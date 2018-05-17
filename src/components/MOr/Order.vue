<template>
    <div class="mor-order">
        <div class="query-param">
            <el-form :model="param" label-width=".8rem" :inline="true">
                <el-form-item label="订单ID">
                    <el-input v-model="param.orderId" placeholder="输入组件ID" clearable></el-input>
                </el-form-item>
                <el-form-item label="组织ID">
                    <el-input v-model="param.ogId" placeholder="输入组件ID" clearable></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="param.status" placeholder="输入组件ID" clearable></el-input>
                </el-form-item>
                <el-button type="primary">搜索</el-button>
            </el-form>
        </div>
        <og-order-list :orders="orders"></og-order-list>
    </div>
</template>
<script>
import OgOrderList from '@/components/OgOrderList'

export default {
    components: {
        OgOrderList
    },
    data() {
        return {
            param: {
                orderId: '',
                ogId: '',
                status: ''
            },
            orders: []
        }
    }
}
</script>
<style lang="stylus">
.mor-order
    font-size: .2rem
</style>
