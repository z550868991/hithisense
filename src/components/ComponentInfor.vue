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
                prop="bscID"
                label="组件ID">
            </el-table-column>
            <el-table-column
                prop="bscName"
                label="组件名称">
            </el-table-column>
            <el-table-column
                prop="version"
                label="组件版本">
            </el-table-column>
            <el-table-column
                label="组件状态">
                <template slot-scope="scope">
                    {{scope.row.open ? '已发布' : '未发布'}}
                </template>
            </el-table-column>
            <el-table-column
                prop="bscTime"
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="modifiedTime"
                label="修改时间">
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
        },
        isDr: {
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
            let url = `/detail?id=${row.bscID}&version=${row.version}`
            if (this.isDr) {
                url += `&isDr=1`
            }
            this.$router.push(url)
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
