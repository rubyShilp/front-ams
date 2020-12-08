import * as statisticalServer from './statistical.server.js';
import { formDate,dataCode } from "@/util/core.js";
import charts from '@/components/charts';
import pagination from '@/components/pagination/index'
export default {
  data() {
    return {
      starttime:new Date(new Date().getTime()-30*24*60*60*1000),
      endtime:new Date(),
      dataList: [],
      totalCount:0,//總條數
      page:1,
      pageSize:10,//每頁顯示條數
      data: [],
      scoolType:0,//類型(學校,年級,班級)
      schoolcode:'',
      gradecode:'',
      classcode:'',
      handle_dialog: false,
      detail_starttime: new Date(new Date().getTime()-30*24*60*60*1000),
      detail_endtime: new Date(),
      chartData: [[80,60,40,48,18,20,100],["迟到人数","早退人数","旷课人数","请假人数","体温异常","心率异常","活动量差"]],
      right_data: [
        {
          id: "1", name: "迟到人数",count: 80
        },
        {
          id: "2", name: "早退人数",count: 60
        },
        {
          id: "3", name: "旷课人数",count: 40
        },
        {
          id: "4", name: "请假人数",count: 48
        },
        {
          id: "5", name: "体温异常",count: 18
        },
        {
          id: "6", name: "心率异常",count: 20
        },
        {
          id: "7", name: "活动量差",count: 100
        }
      ],
      bottom_data: [],
      detailtotal: 0,
      detailpage: 1,
      depageSize: 10
    };
  },
  beforeMount() {
    this.initUserRole();
    for(let i=0;i<9;i++){
      this.bottom_data.push({
        id: "01",
        name: "张三",
        kaostatu: "迟到",
        cstatu: "36.2",
        heartstatu: "60",
        school: "龙岗实验小学",
        class: "一年级2班",
        prantphone: "13455569875",
        prantname: "张三他爸",
        time: "2020-12-08"
      })
    }
  },
  components: {
    charts,
    pagination
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
      this.scoolType=type;
      let params={
        starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
        schoolcode:dataCode(this.schoolcode),
        gradecode:dataCode(this.gradecode),
        classcode:dataCode(this.classcode),
        querytype:type,
        sorttype:1,
        page:page,
        paegsize:this.pageSize
      }
      statisticalServer.attendTop(params).then(res=>{
        if(res.success){
          this.dataList=res.resultMap.abAttendSumList;
        }
      })
    },
    detail(){
      this.handle_dialog = true;
    },
    detailQuery(){
      //详情查询
    },
    //每頁顯示條數
    handleSizeChange(pageSize){
      this.pageSize=pageSize;
    },
    //跳轉的頁碼
    handleCurrentChange(page){
      this.page=page;
    },
    //删除統計信息
    statisticalRemove(list) {
      this.$confirm('是否删除当前統計信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
  },
};
