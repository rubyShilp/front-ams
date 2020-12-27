import * as accountCenterServer from "../accountCenter.server";
import pagination from '@/components/pagination/index'
export default{
    data(){
        return{
            initData: {
              phone: "",
              nickname:""
            },
            dataList:[],
            currentPage:1,
            pagesize:10,
            total:0,
            handleData: {
              usercode: "",
              nickname: "",
              phone: "",
              loginpwd: "",
              userstatus: 0
            },
            handle_dialog: false,
            multipleSelection: [],
            roleTrees: [],
            roles: [],
            userRole: "",
            status: [
              {id: 0,value:"正常"},
              {id: 1,value:"禁用"}
            ],
            user_rules: {
              phone: [
                  { required: true, message: '手机号码不能为空', trigger: 'blur' }
               ],
              loginpwd: [
                { required: true, message: '登录密码不能为空', trigger: 'blur' }
              ],
              nickname: [
                { required: true, message: '昵称不能为空', trigger: 'blur' }
               ] 
          },
          defaultProps: {
            children: 'children',
            label: 'label'
          },
          role_rules: {
            userRole: [
              { required: true, message: '请选择用户角色！', trigger: 'blur' }
           ],
          },
          usercode: "",
          relationIds: [],
          defaultnodes: [],
          checkStrictly: false
        }
    },
    beforeMount(){
        this.query()
      },
      components: {
          pagination
        },
      methods: {
         //初始化查询角色列表
         query(){
            let params = {
              phone: this.initData.phone,
              nickname: this.initData.nickname,
              page: this.currentPage,
              pagesize: this.pagesize
            }
            accountCenterServer.queryUser(params).then(res=>{
                if(res.success){
                   this.dataList = res.resultMap.users;
                   this.total = res.resultMap.total;
                }
            })  
         },
         //递归取默认选中
         defaultSlect(arr){
           let newArr = arr.children;
           if(newArr){
            if(newArr.length>0){
              newArr.forEach(item=>{
                if(item.chk === 1){
                  this.defaultnodes.push(item.id)
                  this.defaultSlect(item)
                }
              })  
            }
           }
         },
          //tip
          tip(type,msg){
              this.$message({
                type: type,
                message: msg
              })
            },
            cancel(formName){
              if(this.type !== 'detail'){
                this.$refs[formName].resetFields();
              }
              this.handle_dialog = false;
            },
            show(statu,row){
              for(let key in this.handleData){
                this.handleData[key] = ""
              }
              this.usercode = ""
              this.relationIds = []
              this.userRole = ""
              this.defaultnodes = []
              if(statu === 'add'){
                this.type = 'add';
                this.title = '新增用户';
                this.handle_dialog = true;
              }else if(statu === 'edit'){
                this.type = 'edit';
                this.title = '编辑用户';
                if(row){
                  this.handleData = Object.assign({},row);
               }
                this.handle_dialog = true;
              }else if(statu === "giverole"){
               this.type = "giverole";
               this.title = '分配用户权限';
               this.usercode = row.usercode;
               let parmas = {
                 usercode: row.usercode
               }
                 accountCenterServer.getUserRole(parmas).then(res=>{
                     if(res.success){
                        //树形菜单数据
                         this.roleTrees = res.resultMap.roleTrees;
                        //角色列表数据
                         this.roles = res.resultMap.roles;
                         this.roles.forEach(item=>{
                           if(item.chk === 1){
                             this.userRole = item.rolecode
                           }
                         })
                         //默认选中
                           this.roleTrees.forEach(item=>{
                             if(item.chk === 1){
                               this.defaultnodes.push(item.id)
                               this.defaultSlect(item)
                             }
                       })
                       if(this.defaultnodes.length !== 0){
                         this.checkStrictly = true;
                          this.$nextTick( ()=>{
                            this.$refs.tree.setCheckedKeys(this.defaultnodes);
                            this.checkStrictly = false;
                          } )
                       }
                     }
               })
               this.handle_dialog = true;
              }else if(statu === "del"){
                this.$confirm("是否删除当前用户?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning",
                })
                  .then(() => {
                      accountCenterServer.delUser(row.usercode).then(res=>{
                      if(res.status === 200){
                       this.tip('success','删除成功')
                       this.query()
                      }
                    })
                  })
                  .catch(() => {
                    this.tip('info','已取消删除')
                  });
              }else if(statu === "moreDel"){
                if(this.multipleSelection.length === 0){
                  this.tip('info','请选择需要删除的用户')
                }else{
                  this.$confirm("是否删除当前选中用户?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                  })
                    .then(() => {
                      let usercodes = [];
                      this.multipleSelection.forEach(item=>{
                         usercodes.push(item.usercode)
                      })
                      accountCenterServer.delmoreRUser(usercodes.join()).then(res=>{
                        if(res.status === 200){
                          this.tip('success','批量删除成功')
                          this.$refs.table.clearSelection();
                          this.query()
                        }
                      })
                    })
                    .catch(() => {
                      this.tip('info','已取消删除')
                    });
                }
              }
            },
            //处理操作
            handle(type,formName){
              if(type !== "giverole"){
                  let params = Object.assign({},this.handleData);
                      // params.schoolcode = (JSON.parse(sessionStorage.getItem("userInfo"))).roles[0].schoolcode;
                  this.$refs[formName].validate((valid) => {
                   if (valid) {
                  if(type === "add"){
                      // params.birthday = formDate(new Date(params.birthday), "yyyy-MM-dd")
                      accountCenterServer.createUser(params).then(res =>{
                          if(res.status === 200){
                              this.tip('success','新增成功')
                              this.query()
                              this.handle_dialog = false;
                          }
                          })
                      }else if(type === "edit"){
                          accountCenterServer.editlUser(params).then(res => {
                          if(res.status === 200){
                          this.tip('success','编辑成功')
                          this.query()
                          this.handle_dialog = false;
                          }
                      })
                      }
                  }else {
                      this.tip('error','有不合法的输入')
                      return false;
                  }
                  })
              }
             else{
                this.relationIds = [...this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())]
                  let parmas = {
                    usercode: this.usercode,
                    rolecodes: this.userRole,
                    relationIds: this.relationIds.join()
                }
              accountCenterServer.saveUserRelation(parmas).then(res=>{
                  if(res.success){
                      this.tip('success','分配资源成功')  
                      this.query()
                      this.handle_dialog = false;
                  }
              })
              }
            },
            //
            close(){
              this.handle_dialog = false;   
              this.$refs.tree.setCheckedKeys([]);
              // this.$refs.roleTable.clearSelection();
            },
            //列表选中
            handleSelectionChange(val){
              this.multipleSelection = val;
            },
            roletableSelect(val){
              this.roletables = val;
            }  
      }
}