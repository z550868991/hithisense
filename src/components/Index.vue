<template>
    <div class="index">
        <el-container>
            <el-header>
                <p class="title header-item">HITHISENSE云平台</p>
                <p class="user-infor header-item">
                    <span>角色名称：{{$store.state.userInfor.user}}</span>
                    <span class="content">
                        <span class="user">{{$store.state.userInfor.account}}</span>
                        <span class="logout" @click="logout">注销</span>
                    </span>
                </p>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    mounted() {
        if(!this.$store.state.userInfor.user) {
            this.$request
                .get('/api/cloudplatform/getSession')
                .end((err, res) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    } else {
                        if (!res.body) {
                            this.$router.push('/login')
                        } else {
                            this.$store.commit('setUserInfor', {
                                user: res.text,
                                type: this.form.type,
                                account: this.form.id
                            })
                            this.$router.push(`/${res.body.type && res.body.type.toLowerCase()}`)
                        }
                    }
                })
        }
    },
    methods: {
        logout() {
            this.$request
                .get('/api/cloudplatform/logout')
                .end((err, res) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    } else {
                        this.$router.push('/login')
                    }
                })
        }
    }
}
</script>
<style lang="stylus" scoped>
.index
    .el-header
        padding: 0
        height: .6rem
        .header-item
            width: 100%
            color: #ffffff
            text-align: left
            text-indent: .1rem
            margin: 0
        .title
            background: #606266
            font-size: .25rem
            font-weight: bold
        .user-infor
            background: #C0C4CC
            font-size: .14rem
            color: #606266
            padding: .03rem 0
            .content
                float: right
                margin-right: .1rem
                span
                    margin-right: .1rem
                    cursor: pointer
                .logout
                    &:hover
                        text-decoration: underline
    .el-main
        padding: 0
</style>
