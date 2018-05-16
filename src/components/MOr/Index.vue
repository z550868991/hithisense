<template>
    <div class="mor-index">
        <el-container>
            <el-aside>
                <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :router="true">
                    <el-menu-item index="1" route="/mor/comppublish">
                        <span slot="title">开发者组件发布</span>
                    </el-menu-item>
                    <el-menu-item index="2" route="/mor/prodlist">
                        <span slot="title">产品列表</span>
                    </el-menu-item>
                    <el-menu-item index="3" route="/mor/userregister">
                        <span slot="title">组织用户注册</span>
                    </el-menu-item>
                    <el-menu-item index="4" route="/mor/order">
                        <span slot="title">产品订购单</span>
                    </el-menu-item>
                    <el-menu-item index="5" route="/mor/isclist">
                        <span slot="title">isc列表</span>
                    </el-menu-item>
                    <el-menu-item index="6" route="/mor/iscrequest">
                        <span slot="title">isc账号申请</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    }
}
</script>
<style lang="stylus">
.mor-index
    .el-aside
        position: fixed
        top: .62rem
        left: 0
        bottom: 0
        border-right: 1px solid #e6e6e6
        background: #545c64
        .el-menu
            border: none
    .el-main
        margin-left: 3rem
</style>
