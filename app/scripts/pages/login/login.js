import * as loginServer from './login.server.js';
export default{
    data(){
        return{
            user:{
                account:'',
                code:'',
            }
        }
    },
    methods: {
        //登录
        login(){
            let params=this.user;
            loginServer.login(params).then(res=>{
                if(res.success){
                    sessionStorage.setItem('TOKEN',res.resultMap.userKey)
                    sessionStorage.setItem("userInfo",JSON.stringify(res.resultMap))
                    this.$router.push('/home/homePage');
                }
            })
        }
    },
}