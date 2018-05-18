<template>
    <div class="prod-list-infor">
        <el-table
            :data="prodList"
            border
            @row-dbclick="goForDetail"
            @selection-change="handleSelectionChange">
            <el-table-column
                v-if="isGr&!isOrder"
                type="selection"
                width="55">
            </el-table-column>
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
                v-if="!isOrder&&!isGr"
                prop="pdtStatus"
                label="状态">
            </el-table-column>
            <el-table-column
                v-if="!isOrder&&!isGr"
                prop="createdTime"
                label="创建时间">
            </el-table-column>
            <el-table-column
                v-if="!isOrder&&!isGr"
                prop="lastModifiedTime"
                label="修改时间">
            </el-table-column>
            <el-table-column
                v-if="isOrder&&!isGr"
                label="产品价格">
                <template slot-scope="scope">
                    <span v-if="isAccountDetail">{{scope.row.pdtPrice}}</span>
                    <el-input v-else v-model="scope.row.pdtPrice"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                v-if="isOrder&&isGr"
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="deletePro(scope.$index)">删除</el-button>
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
        },
        isGr: {
            type: Boolean,
            default: false
        },
        isAccountDetail: {
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
        },
        handleSelectionChange(selection) {
            console.log(selection)
        },
        deletePro(index) {
            this.$emit('deletePro', index)
        }
    }
}
</script>
<style lang="stylus">

</style>
