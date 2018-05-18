<template>
    <div class="comp-publish">
        <div class="query-param">
            <el-form :model="param" label-width=".8rem" :inline="true">
                <el-form-item label="组件ID">
                    <el-input v-model="param.id" placeholder="输入组件ID" clearable></el-input>
                </el-form-item>
                <el-form-item label="组件名称">
                    <el-input v-model="param.name" placeholder="输入组件ID" clearable></el-input>
                </el-form-item>
                <el-form-item label="组件版本">
                    <el-input v-model="param.version" placeholder="输入组件ID" clearable></el-input>
                </el-form-item>
                <el-button type="primary">搜索</el-button>
            </el-form>
        </div>
        <div class="add-wrapper">
            <el-button type="primary" size="mini" @click="goForAdd">添加产品</el-button>
        </div>
        <component-infor :infor="infor" :selectable="true"></component-infor>
    </div>
</template>
<script>
import ComponentInfor from '@/components/ComponentInfor'

export default {
    components: {
        ComponentInfor
    },
    data() {
        return {
            status,
            param: {
                id: '',
                name: '',
                version: '',
                status: ''
            },
            infor: []
        }
    },
    methods: {
        goForAdd() {
            this.$router.push('/prodDetail')
        }
    },
    created() {

    }
}
</script>
<style lang="stylus">
.comp-publish
    position: relative
    .query-param
        text-align: left
    .add-wrapper
        position: fixed
        top: 1rem
        right: .3rem
        padding: .05rem 0
</style>
