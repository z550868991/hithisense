<template>
    <div class="prod-list-infor">
        <el-table
            :data="prodList"
            border
            @row-dbclick="goForDetail">
            <el-table-column
                type="index"
                label="序号"
                width="50%">
            </el-table-column>
            <el-table-column
                prop="pdtId"
                label="产品ID">
            </el-table-column>
            <el-table-column
                prop="pdtName"
                label="产品名称">
            </el-table-column>
            <el-table-column
                prop="pdtType"
                label="产品类别">
            </el-table-column>
            <el-table-column
                prop="pdtVersion"
                label="产品版本">
            </el-table-column>
            <el-table-column
                prop="pdtStatus"
                label="状态">
            </el-table-column>
            <el-table-column
                prop="createdTime"
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="lastModifiedTime"
                label="修改时间">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props: {
        prodList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
        }
    },
    methods: {
        goForDetail() {
            this.$router.push()
        }
    }
}
</script>
<style lang="stylus">

</style>
