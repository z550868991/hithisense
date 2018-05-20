<template>
    <div class="prod-list-infor">
        <el-table
            :data="prodList"
            border
            @row-dblclick="goForDetail"
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
                label="产品类别">
                <template slot-scope="scope">
                    {{prodType[scope.row.pdtType]}}
                </template>
            </el-table-column>
            <el-table-column
                prop="pdtVersion"
                label="产品版本">
            </el-table-column>
            <el-table-column
                v-if="!isOrder&&!isGr"
                label="状态">
                <template slot-scope="scope">
                    {{prodStatus[scope.row.pdtStatus]}}
                </template>
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
import {prodType, prodStatus} from '@/dataMap'
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
        },
        isMOr: {
            type: Boolean,
            default: false
        },
        editor: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            prodType,
            prodStatus
        }
    },
    methods: {
        goForDetail(row, event) {
            let url = `/prodDetail?id=${row.pdtId}&version=${row.pdtVersion}`
            if (this.isMOr) {
                url += `&isMOr=1`
            }
            if (this.editor) {
                url += `&editor=1`
            }
            this.$router.push(url)
        },
        handleSelectionChange(selection) {
            this.$emit('addOrder', selection)
        },
        deletePro(index) {
            this.$emit('deletePro', index)
        }
    }
}
</script>
<style lang="stylus">

</style>
