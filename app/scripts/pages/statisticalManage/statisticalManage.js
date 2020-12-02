import * as statisticalServer from './statistical.server.js';
import { formDate,dataCode } from "@/util/core.js";
export default {
  data() {
    return {
      starttime:new Date(new Date().getTime()-7*24*60*60*1000),
      endtime:new Date(),
      dataList: [],
      totalCount:0,//總條數
      page:1,
      pageSize:10,//每頁顯示條數
      data: [],
      schoolcode:'',
      gradecode:'',
      classcode:''
    };
  },
  beforeMount() {
    this.initUserRole();
  },
  methods: {
    //初始化学校年级树形结构菜单项
    initUserRole() {
      let params = {};
      statisticalServer.userRole(params).then((res) => {
        if (res.success) {
          this.data = res.resultMap.roleTrees;
          this.schoolcode = this.data[0].id;
          this.schoolDataQuery(0,1);
        }
      });
    },
    //选择学校或班级或年级信息
    selectTreeDate(item, e) {
      let obj = {};
      for (let i = 0; i < e.level - 1; i++) {
        if (!i) {
          obj = e.parent;
        } else {
          obj = obj.parent;
        }
      }
      if (!obj.data) {
        this.schoolcode = item.id;
      } else {
        this.schoolcode = obj.data.id;
      }
      let parentid = item.parentid;
      if (this.schoolcode === parentid) {
        this.gradecode = item.id;
        this.classcode = "";
      } else {
        if(!obj.data){
          this.gradecode = '';
          this.classcode = '';
        }else{
          this.gradecode = parentid;
          this.classcode = item.id;
        }
      }
      if(this.schoolcode!='' &&  this.gradecode=='' && this.classcode==''){
        this.schoolDataQuery(0,1);
      }else if(this.schoolcode!='' &&  this.gradecode!='' && this.classcode==''){
        this.schoolDataQuery(0,2);
      }else if(this.schoolcode!='' &&  this.gradecode!='' && this.classcode!=''){
        this.schoolDataQuery(0,3);
      }
    },
    //根據學校查詢考勤統計信息
    schoolDataQuery(page,type){
      let params={
        starttime: formDate(new Date('2020-11-10'), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date('2020-11-20'), "yyyy-MM-dd hh:mm:ss"),
        schoolcode:dataCode(this.schoolcode),
        gradecode:dataCode(this.gradecode),
        classcode:dataCode(this.classcode),
        querytype:type,
        sorttype:1,
        page:page,
        paegSize:this.pageSize
      }
      statisticalServer.attendTop(params).then(res=>{
        if(res.success){
          this.dataList=res.resultMap.abAttendSumList;
        }
      })
    },
    //每頁顯示條數
    handleSizeChange(pageSize){
      this.pageSize=pageSize;
    },
    //跳轉的頁碼
    handleCurrentChange(page){
      this.page=page;
    },
  },
};
