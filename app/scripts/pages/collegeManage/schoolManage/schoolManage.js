import * as schoolServer from "./schoolManage.server";
import pagination from '@/components/pagination/index'
export default {
    data() {
      return {
        dataList: [],
        initData: {
          school: ""
        },
        //新增参数
        addData:{
          schoolname: "",
          schoolattr: "",
          principal: "",
          telephone: "",
          address: "",
          schooltype: 0
        },
        multipleSelection: [],
        detailData: {},
        //分页参数
         //分页参数
        currentPage: 1,
        total: 0,
        pageSize: 10,
      };
    },
    components: {
      pagination
    },
    beforeMount() {
      // for (let i = 0; i < 20; i++) {
      //   this.dataList.push({
      //     schoolcode: "L67581",
      //     schoolname: "深圳市外国语学校1",
      //     schoolattr: "深圳市教育局1",
      //     principal: "曹德旺1",
      //     telephone: "1398765411",
      //     schooltype: 2,
      //     schoolstate: 0,
      //     address: "深圳龙岗",
      //     remark: "~~",
      //   });
      // }
      //初始化查询
      this.query()
    },
    methods: {
      query(){
        let params = {
          schoolname: this.initData.school,
          page: this.currentPage,
          pageSize: this.pageSize
        }
            schoolServer.querySchool(params).then(res => {
              if(res.status === 200){
                this.dataList = [...res.resultMap.schools]
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
      //处理操作
      handle(type,row){
       if(type === "add"){
        schoolServer.addSchool(this.addData).then(res =>{
            if(res.status === 200){
              this.tip('success',res.message)
              this.query()
            }
        })
       }else if(type === "edit"){
          let params = Object.assign({},this.addData);
          params.schoolcode = row.schoolcode;
          schoolServer.editSchool(params).then(res => {
            if(res.status === 200){
              this.tip('success',res.message)
              this.query()
            }
          })
       }else if(type === "singleDel"){
           let id = row.schoolcode;
           schoolServer.delSchool(id).then(res=>{
             if(res.status === 200){
              this.tip('success',res.message)
              this.query()
             }
           })
       }else if(type === "moreDel"){
          let schoolcodes = [];
          this.multipleSelection.forEach(item=>{
            schoolcodes.push(item.schoolcode)
          })
          schoolServer.delmoreSchool(schoolcodes).then(res=>{
            if(res.status === 200){
              this.tip('success',res.message)
              this.query()
            }
          })
       }else if(type === "detail"){
        let params = row.schoolcode;
        schoolServer.detailSchool(params).then(res=>{
          if(res.status === 200){
            this.detailData = Object.assign({},res.resultMap)
          }
        })
       }
      },
      //选中
      handleSelectionChange(val){
        this.multipleSelection = val;
      }
    },
  };
  