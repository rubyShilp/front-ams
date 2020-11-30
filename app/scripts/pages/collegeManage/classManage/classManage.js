import * as classServer from "./classManage.server";
import pagination from '@/components/pagination/index'
export default {
    data() {
      return {
        initData: {
          classname: ""
        },
        dataList: [],
        addData: {
          schoolcode: "",
          gradecode: "",
          classname: "",
          teachername: "",
          remark: ""
        },
        detailData: {},
        multipleSelection: []
      };
    },
    components: {
      pagination
    },
    beforeMount() {
      for (let i = 0; i < 20; i++) {
        this.dataList.push({
          class: "001班",
          teacherName: "李小红",
          school: "深圳市实验小学",
          grade: "一年级",
          reMark: "~~",
          createTime: "2020-11-07 22:04"
        });
      }
      this.query()
    },
    methods: {
      //查询
      query(){
        let params = {
          classname: this.initData.classname,
          page: this.currentPage,
          pageSize: this.pageSize
        }
        classServer.queryClass(params).then(res => {
          if(res.status === 200){
            this.dataList = [...res.resultMap.classes];
            this.total = this.dataList.length;
          }
         })
      },
      //处理操作
      handle(type,row){
        if(type === "add"){
          classServer.addClass(this.addData).then(res =>{
              if(res.status === 200){
                this.tip('success',res.message)
                this.query()
              }
          })
        }else if(type === "edit"){
            let params = {
              classcode: row.classcode,
              classname: row.classname,
              teachername: row.teachername,
              remark: row.remark
            }
            classServer.editClass(params).then(res => {
              if(res.status === 200){
                this.tip('success',res.message)
                this.query()
              }
            })
        }else if(type === "singleDel"){
            let id = row.classcode;
            classServer.delClass(id).then(res=>{
              if(res.status === 200){
                this.tip('success',res.message)
                this.query()
              }
            })
        }else if(type === "moreDel"){
            let classcodes = [];
            this.multipleSelection.forEach(item=>{
              classcodes.push(item.classcode)
            })
            let ids = classcodes.join()
            classServer.delmoreClass(ids).then(res=>{
              if(res.status === 200){
                this.tip('success',res.message)
                this.query()
              }
            })
        }else if(type === "detail"){
          let params = row.calsscode;
          classServer.detailClass(params).then(res=>{
            if(res.status === 200){
              this.detailData = Object.assign({},res.resultMap)
            }
          })
        }
      },
      //tip
      tip(type,msg){
        this.$message({
          type: type,
          message: msg
        })
      },
       //选中
       handleSelectionChange(val){
        this.multipleSelection = val;
      }
    },
  };
  