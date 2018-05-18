<template>
    <div class="data-model-infor">
        <el-table
            :data="dataModelList"
            :border="true"
            stripe
            @row-dblclick="goForDetail">
            <el-table-column
                type="index"
                label="序号"
                width="50%">
            </el-table-column>
            <el-table-column
                prop="modelID"
                label="模型ID">
            </el-table-column>
            <el-table-column
                prop="modelName"
                label="模型名称">
            </el-table-column>
            <el-table-column
                prop="chartName"
                label="表名">
            </el-table-column>
            <el-table-column
                prop="type"
                label="类型">
            </el-table-column>
            <el-table-column
                prop="version"
                label="版本">
            </el-table-column>
            <el-table-column
                prop="desc"
                label="描述">
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="modifiedTime"
                label="描述">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props: {
        dataModelList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {}
    },
    methods: {
        goForDetail() {
        }
    }
}
</script>
<style lang="stylus">
.data-model-infor
    box-shadow: -0.05rem .1rem .1rem #F2F6FC
</style>
