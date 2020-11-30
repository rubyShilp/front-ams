import * as studentServer from "./studentManage.server";
import pagination from '@/components/pagination/index'
export default {
    data() {
      return {
        initData: {
          schoolcode: "",
          gradecode: "",
          classcode: ""
        },
        addData: {
          schoolcode: "",
          gradecode: "",
          classcode: "",
          stuname: "",
          sno: "",
          imei: "",
          stuage: "",
          stusex: 0,
          birthday: "",
          expression: "",
          remark: "" 
        },
        detailData: {},
         //分页参数
         currentPage: 1,
         total: 0,
         pageSize: 10,
         multipleSelection: [],
        stusexs: [
          { id: 0,value: "女" },
          { id: 1,value: "男" },
          { id: 2,value: "其它" }
        ],
        dataList: [],
        data: [
          {
            label: "深圳市实验小学",
            children: [
              {
                label: "一年级",
                children: [
                  {
                    label: "001班",
                  },
                ],
              },
            ],
          },
          {
            label: "深圳市外国语学校",
            children: [
              {
                label: "一年级",
                children: [
                  {
                    label: "001班",
                  },
                  {
                    label: "002班",
                  },
                  {
                    label: "003班",
                  },
                ],
              },
              {
                label: "二年级",
                children: [
                  {
                    label: "001班",
                  },
                ],
              },
            ],
          },
        ],
      };
    },
    components: {
      pagination
    },
    beforeMount() {
      this.query()
    },
    methods: {
      //查询
      query(){
        let params = {
          schoolcode: this.initData.schoolcode,
          gradecode: this.initData.gradecode,
          classcode: this.initData.classcode,
          page: this.currentPage,
          pageSize: this.pageSize
        }
        studentServer.queryStudent(params).then(res => {
          if(res.status === 200){
            this.dataList = [...res.resultMap.students];
            this.total = this.dataList.length;
          }
         })
      },
        //处理操作
        handle(type,row){
          if(type === "add"){
            studentServer.addStudent(this.addData).then(res =>{
                if(res.status === 200){
                  this.tip('success',res.message)
                  this.query()
                }
            })
          }else if(type === "edit"){
              let params = {
                stucode: row.stucode,
                stuname: row.stuname,
                sno: row.sno,
                imei: row.imei,
                stuage: row.stuage,
                stusex: row.stusex,
                expression: row.expression,
                remark: row.remark
              }
              studentServer.editStudent(params).then(res => {
                if(res.status === 200){
                  this.tip('success',res.message)
                  this.query()
                }
              })
          }else if(type === "singleDel"){
              let id = row.stucode;
              studentServer.delStudent(id).then(res=>{
                if(res.status === 200){
                  this.tip('success',res.message)
                  this.query()
                }
              })
          }else if(type === "moreDel"){
              let stucodes = [];
              this.multipleSelection.forEach(item=>{
                stucodes.push(item.stucode)
              })
              let ids = stucodes.join()
              studentServer.delmoreStudent(ids).then(res=>{
                if(res.status === 200){
                  this.tip('success',res.message)
                  this.query()
                }
              })
          }else if(type === "detail"){
            let params = row.stucode;
            studentServer.detailStudent(params).then(res=>{
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
  