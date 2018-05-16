<template>
    <div class="component-infor">
        <el-table
            :data="infor"
            :border="true"
            stripe
            @row-dblclick="goForDetail"
            @selection-change="selectChange">
            <el-table-column
                v-if="selectable"
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                type="index"
                label="序号"
                width="50%">
            </el-table-column>
            <el-table-column
                prop="compId"
                label="组件ID">
            </el-table-column>
            <el-table-column
                prop="compName"
                label="组件名称">
            </el-table-column>
            <el-table-column
                prop="compVersion"
                label="组件版本">
            </el-table-column>
            <el-table-column
                prop="compStatus"
                label="组件状态">
            </el-table-column>
            <el-table-column
                label="创建时间">
                <template slot-scope="scope">
                    {{formatDate(scope.row.createdTime)}}
                </template>
            </el-table-column>
            <el-table-column
                label="修改时间">
                <template slot-scope="scope">
                    {{formatDate(scope.row.lastModifiedTime)}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {formatDate} from '@/utils'
export default {
    props: {
        infor: {
            type: Array,
            required: true
        },
        selectable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {}
    },
    methods: {
        formatDate,
        goForDetail(row, event) {
            this.$router.push(`/detail?id=${row.id}&version=${row.version}`)
        },
        selectChange(selection) {
            console.log(selection)
        }
    }
}
</script>
<style lang="stylus">
.component-infor
    .el-table
        text-align: left
</style>
