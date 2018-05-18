<template>
    <div class="og-order-list">
        <el-table
            :data="orders"
            border
            style="width: 100%"
            @row-dbclick="goForDetail">
            <el-table-column
                type="index"
                label="序号"
                width="50%">
            </el-table-column>
            <el-table-column
                prop="orderId"
                label="订单ID">
            </el-table-column>
            <el-table-column
                v-if="!isAccountDetail"
                prop="ogId"
                label="组织ID">
            </el-table-column>
            <el-table-column
                prop="createdBy"
                label="创建人">
            </el-table-column>
            <el-table-column
                prop="created"
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态">
            </el-table-column>
            <el-table-column
                v-if="!isAccountDetail"
                prop="approvePerson"
                label="审核人">
            </el-table-column>
            <el-table-column
                v-if="!isAccountDetail"
                prop="changeTime"
                label="修改时间">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props: {
        orders: {
            type: Array,
            required: true
        },
        isAccountDetail: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {}
    },
    methods: {
        goForDetail(row, event) {
            let url = `orderdetail?id=${row.orderId}`
            if (this.isAccountDetail) {
                url += `&isAccountDetail=1`
            }
            this.$router.push(url)
        }
    }
}
</script>
<style lang="stylus">
.og-order-list
    .el-table
        box-shadow: -0.05rem .1rem .1rem #F2F6FC
</style>
