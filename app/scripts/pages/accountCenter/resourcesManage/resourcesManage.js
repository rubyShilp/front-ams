import * as accountCenterServer from "../accountCenter.server";
import pagination from '@/components/pagination/index'
export default{
    data(){
        return{
            dataList:[],
            resourcename: "",
            resourcestatu: [
                {id: 0, value: '未启用'},
                {id: 1, value: '启用'}
            ],
            types: [
                {id: 0, value: '菜单'},
                {id: 1, value: '按钮'}
            ],
            //分页
            currentPage:1,
            pagesize:10,
            total:0,
            //模态框
            type: '',
            title: '',
            handle_dialog: false,
            handleData: {},
            schooltypes: [
            {id: 0,value: 'k12'},
            {id: 1,value: '中职'},
            {id: 2,value: '其它'}
            ],
            resource_rules: {
                resourcecode: [
                { required: true, message: '资源ID不能为空', trigger: 'blur' }
              ],
              resourcename: [
                { required: true, message: '资源名称不能为空', trigger: 'blur' }
              ],
              resourceurl: [
                { required: true, message: '资源路径不能为空', trigger: 'blur' }
              ],
              resourcestatus: [
                { required: true, message: '请选择资源状态', trigger: 'blur' }
              ],
              resourcetype: [
                { required: true, message: '请选择资源类型', trigger: 'blur' }
              ],
              resourceicon: [
                { required: true, message: '资源icon图标不能为空', trigger: 'blur' }
              ]
            },
            parentIds: []
        }
    },
    beforeMount(){
      this.query()
    },
    components: {
        pagination
      },
    methods:{
        query(){
            let params = {
              resourcename: this.resourcename,
              page: this.currentPage,
              pagesize: this.pagesize
            }
            accountCenterServer.queryuserResource(params).then(res => {
                  if(res.status === 200){
                    this.dataList = [...res.resultMap.resources]
                    this.total = res.resultMap.total
                  }
            })
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
             //获取父资源ID
             accountCenterServer.selectResourcename({}).then(res=>{
              if(res.status === 200){
                this.parentIds = [...res.resultMap.resourcenames]
              }
            })
            if(statu === 'add'){
              this.type = 'add';
              this.title = '新增资源';
              this.handle_dialog = true;
            }else if(statu === 'edit'){
              this.type = 'edit';
              this.title = '编辑资源';
              this.handleData = Object.assign({},row)
              this.handle_dialog = true;
            }else if(statu === "detail"){
              this.type = 'detail';
              this.title = '资源详情'; 
              this.handleData = Object.assign({},row)
              this.handle_dialog = true;
            }else if(statu === "del"){
              this.$confirm("是否删除当前资源?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
                .then(() => {
                    accountCenterServer.delResource(row.resourcecode).then(res=>{
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
                this.tip('info','请选择需要删除的资源')
              }else{
                this.$confirm("是否删除当前选中资源?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning",
                })
                  .then(() => {
                    let resourcecodes = [];
                    this.multipleSelection.forEach(item=>{
                        resourcecodes.push(item.resourcecode)
                    })
                    accountCenterServer.delmoreResource(resourcecodes.join()).then(res=>{
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
            this.$refs[formName].validate((valid) => {
              if (valid) {
           if(type === "add"){
            accountCenterServer.addResource(this.handleData).then(res =>{
                  if(res.status === 200){
                    this.tip('success','新增成功')
                    this.query()
                    this.handle_dialog = false;
                  }
                })
              }else if(type === "edit"){
              let params = Object.assign({},this.handleData);
              accountCenterServer.editResource(params).then(res => {
                if(res.status === 200){
                  this.tip('success','修改成功')
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
          },
          //表格选中
          handleSelectionChange(val){
            this.multipleSelection = val;
          }
    }
}