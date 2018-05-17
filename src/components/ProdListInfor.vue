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
                v-if="!isOrder"
                prop="pdtStatus"
                label="状态">
            </el-table-column>
            <el-table-column
                v-if="!isOrder"
                prop="createdTime"
                label="创建时间">
            </el-table-column>
            <el-table-column
                v-if="!isOrder"
                prop="lastModifiedTime"
                label="修改时间">
            </el-table-column>
            <el-table-column
                v-if="isOrder"
                label="产品价格">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.pdtPrice"></el-input>
                </template>
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
        },
        isOrder: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        }
    },
    methods: {
        goForDetail(row, event) {
            this.$router.push(`/prodDetail?id=${row.pdtId}&version=${row.pdtVersion}`)
        }
    }
}
</script>
<style lang="stylus">

</style>
