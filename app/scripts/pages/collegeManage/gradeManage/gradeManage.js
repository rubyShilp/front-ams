import * as gradeServer from "./gradeManage.server";
import pagination from '@/components/pagination/index'
export default {
    props: {
      ids: {
        type: Object
      }
    },
    data() {
      return {
        dataList: [],
        initData: {
          gradename: ""
        },
        //新增参数
        addData:{
          schoolcode: "",
          gradename: "",
          remark: ""
        },
        multipleSelection: [],
        //详情数据
        detailData: {},
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
      for (let i = 0; i < 20; i++) {
        this.dataList.push({
           grade: "一年级",
          school: "深圳市实验小学",
          reMark: "~~",
        });
      }
      this.query()
    },
    methods: {
      query(){
        let params = {
          schoolcode: this.ids.schoolcode,
          gradeId: this.ids.gradeId,
          classId: this.ids.classId,
          gradename: this.initData.gradename,
          page: this.currentPage,
          pageSize: this.pageSize
        }
        gradeServer.queryGrade(params).then(res => {
          if(res.status === 200){
            this.dataList = res.resultMap.grades;
            this.total = this.dataList.length;
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
        gradeServer.addGrade(this.addData).then(res =>{
            if(res.status === 200){
              this.tip('success',res.message)
              this.query()
            }
        })
      }else if(type === "edit"){
          let params = {
            gradecode: row.gradecode,
            gradename: row.gradename,
            remark: row.remark
          }
          schoolServer.editGrade(params).then(res => {
            if(res.status === 200){
              this.tip('success',res.message)
              this.query()
            }
          })
      }else if(type === "singleDel"){
          let id = row.gradecode;
          gradeServer.delGrade(id).then(res=>{
            if(res.status === 200){
              this.tip('success',res.message)
              this.query()
            }
          })
      }else if(type === "moreDel"){
          let gradecodes = [];
          this.multipleSelection.forEach(item=>{
            gradecodes.push(item.gradecode)
          })
          schoolServer.delmoreGrade(gradecodes).then(res=>{
            if(res.status === 200){
              this.tip('success',res.message)
              this.query()
            }
          })
      }else if(type === "detail"){
        let params = row.gradecode;
        schoolServer.detailGrade(params).then(res=>{
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
  