<template>
    <div class="og-order-list">
        <el-table
            :data="tableData"
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
                prop="approvePerson"
                label="审核人">
            </el-table-column>
            <el-table-column
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
        }
    },
    data() {
        return {}
    },
    methods: {
        goForDetail(row, event) {
            this.$router.push(`orderdetail?id=${row.orderId}`)
        }
    }
}
</script>
<style lang="stylus">

</style>
