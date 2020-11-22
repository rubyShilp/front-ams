import { querySchool,addSchool,editSchool,delSchool,delmoreSchool } from "./schoolManage.server";
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
        //分页参数
         //分页参数
        currentPage: 1,
        total: 0,
        pageSize: 10,
      };
    },
    beforeMount() {
      for (let i = 0; i < 20; i++) {
        this.dataList.push({
          schoolcode: "L67581",
          schoolname: "深圳市外国语学校1",
          schoolattr: "深圳市教育局1",
          principal: "曹德旺1",
          telephone: "1398765411",
          schooltype: 2,
          schoolstate: 0,
          address: "深圳龙岗",
          remark: "~~",
        });
      }
      //初始化查询
      // this.query()
    },
    methods: {
      handleNodeClick(node,data,value){
        console.log(node)
        console.log(data)
      },
      query(){
          if(this.initData.school){
            querySchool().then(res => {
              if(res.status === 200){
                this.dataList = res.resultMap
              }
            })
          }
        },
      //处理操作
      handle(type,row){
       if(type === "add"){
          addSchool(this.addData).then(res =>{
            if(res.status === 200){
              alert(res.message)
            }
        })
       }else if(type === "edit"){
          let params = Object.assign({},this.addData);
          params.schoolcode = row.schoolcode;
          editSchool(params).then(res => {
            if(res.status === 200){
                alert(res.message)
            }
          })
       }else if(type === "singleDel"){
           let id = row.schoolcode;
           delSchool(id).then(res=>{
             if(res.status === 200){
               alert(res.message)
             }
           })
       }else if(type === "moreDel"){
            
       }
      }
    },
  };
  