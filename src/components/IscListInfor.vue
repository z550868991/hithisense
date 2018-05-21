<template>
    <div class="og-order-list">
        <el-table
            :data="iscList"
            border
            style="width: 100%"
            @row-dblclick="goForDetail">
            <el-table-column
                type="index"
                label="序号"
                width="50%">
            </el-table-column>
            <el-table-column
                prop="iSCId"
                label="iSC ID">
            </el-table-column>
            <el-table-column
                v-if="!isAccountDetail"
                prop="ogId"
                label="组织ID">
            </el-table-column>
            <el-table-column
                prop="iSCName"
                label="iSC名称">
            </el-table-column>
            <el-table-column
                prop="iSCType"
                label="iSC类型">
            </el-table-column>
            <el-table-column
                prop="gmtCreate"
                label="创建时间">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props: {
        iscList: {
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
            this.$router.push(`/iscdetail?id=${row.iSCId}&og=${row.ogId}`)
        }
    }
}
</script>
<style lang="stylus">

</style>
