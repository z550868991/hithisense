<template>
    <div class="login">
        <div class="content">
            <h3 class="title">HITHISENSE云平台</h3>
            <div class="edit-wrapper">
                <el-form :model="form" label-width=".6rem">
                    <el-form-item label="账号：">
                        <el-input v-model="form.id" placeholder="输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：">
                        <el-input v-model="form.pwd" type="password" placeholder="输入密码"></el-input>
                    </el-form-item>
                    <div class="type-wrapper">
                        <el-radio-group v-model="form.type">
                            <el-radio v-for="item in typeE" :key="item" :label="item">{{item}}</el-radio>
                        </el-radio-group>
                    </div>
                    <el-button class="submit" type="primary" @click="login">登入</el-button>
                    <p class="register">
                        <a href="/#/register">注册</a>
                    </p>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                id: '',
                pwd: '',
                type: ''
            },
            typeEnum: {
                MOr: '运维人员登录模式',
                Dr: '开发者登录模式，账号需注册审核',
                Gr: '组织用户登录模式，账号需注册审核',
                iSC: '服务中心管理员登录模式',
                Cus: '客户登录模式，账号需注册'
            }
        }
    },
    computed: {
        typeE() {
            return Object.keys(this.typeEnum)
        }
    },
    methods: {
        login() {
            if(this.form.id == '') alert('账号为空！')
            else if(this.form.pwd == '') alert('密码为空！')
            else if(this.form.type == '') alert('请选择登入角色！')
            else{
                this.$request
                .post('/api/cloudplatform/login')
                .set('contentType', 'application/json')
                .send({
                    userId: '',
                    userAccount: this.form.id,
                    userPwd: this.form.pwd,
                    userJur: this.form.type,
                    email: '',
                    phone: '',
                    flag: '',
                    groupId: ''
                })
                .end((err, res) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    } else {
                        if(res.text == "[msg]AccountError") alert('账号不存在！');
                        else if(res.text == "[msg]PasswordError") alert('密码错误！');
                        else if(res.text == "[msg]JurisdictionError") alert('权限错误！');
                        else this.$router.push(`/${this.form.type && this.form.type.toLowerCase()}`)
                    }
                })
            }
        }
    }
}
</script>
<style lang="stylus">
.login
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: #606266
    font-size: .14rem
    .content
        position: absolute
        width: 100%
        height: 5rem
        top: 0
        left: 0
        right: 0
        bottom: 0
        margin auto
        color: #ffffff
        .title
            margin: .1rem 0
            font-size: .3rem
        .edit-wrapper
            width: 4rem
            height: 3rem
            margin: 0 auto
            padding-top: .2rem
            border-radius: .05rem
            box-sizing: border-box
            background: rgba(255, 255, 255, .2)
            .el-form-item
                width: 80%
                margin: .2rem auto
                .el-form-item__label
                    color: #ffffff
            .type-wrapper
                width: 80%
                margin: 0 auto
                .el-radio-group
                    display: flex
                    flex-wrap: wrap
                    .el-radio
                        flex: 1 1 auto
                        margin-top: .1rem
                        margin-left: 0
                        .el-radio__label
                            color: #ffffff
            .submit
                width: 80%
                margin-top: .15rem
            .register
                width: 80%
                margin: .1rem auto
                text-align: right
                a
                    color: #ffffff
</style>
