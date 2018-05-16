<template>
    <div class="prod-list-infor">
        <el-table
            :data="infor"
            border
            @row-dbclick="goForDetail">
            <el-table-column
                type="index"
                label="序号"
                width="50%">
            </el-table-column>
            <el-table-column
                prop="ogId"
                label="组织ID">
            </el-table-column>
            <el-table-column
                prop="ogName"
                label="组织名称">
            </el-table-column>
            <el-table-column
                prop="ogAttribute"
                label="属性">
            </el-table-column>
            <el-table-column
                prop="ogType"
                label="组织类别">
            </el-table-column>
            <el-table-column
                prop="ogStatus"
                label="状态">
            </el-table-column>
            <el-table-column
                prop="gmtCreate"
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="gmtModified"
                label="修改时间">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props: {
        infor: {
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
