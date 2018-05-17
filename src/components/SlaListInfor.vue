<template>
    <div class="sla-list-infor">
        <el-table
            :data="slaList"
            border
            @row-dbclick="goForDetail">
            <el-table-column
                type="index"
                label="序号"
                width="50%">
            </el-table-column>
            <el-table-column
                prop="slaCoding"
                label="SLA编码">
            </el-table-column>
            <el-table-column
                prop="slaContent"
                label="SLA内容">
            </el-table-column>
            <el-table-column
                label="价格">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.slaPrice"></el-input>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props: {
        slaList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
        }
    },
    methods: {
        goForDetail(row, event) {
            this.$router.push()
        }
    }
}
</script>
<style lang="stylus">

</style>
