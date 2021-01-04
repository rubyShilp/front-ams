import * as studentServer from "./studentManage.server";
import {
  formDate,
  dateTime,
  upladFile,
  dataCode,
  dowandFile,
} from "@/util/core.js";
export default {
  props: {
    ids: {
      type: Object,
    },
  },
  data() {
    return {
      initData: {
        schoolcode: "",
        gradecode: "",
        classcode: "",
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
        remark: "",
      },
      //分页参数
      currentPage: 1,
      total: 0,
      pageSize: 10,
      multipleSelection: [],
      stusexs: [
        { id: 0, value: "女" },
        { id: 1, value: "男" },
        { id: 2, value: "其它" },
      ],
      dataList: [],
      //模态框
      type: "",
      title: "",
      handle_dialog: false,
      handleData: {},
      student_rules: {
        stuname: [
          { required: true, message: "学生姓名不能为空", trigger: "blur" },
        ],
        sno: [{ required: true, message: "学生编号不能为空", trigger: "blur" }],
        imei: [
          { required: true, message: "手表唯一码不能为空", trigger: "blur" },
        ],
        stuage: [
          { required: true, message: "学生年龄不能为空", trigger: "blur" },
        ],
        stusex: [
          { required: true, message: "请选择学生性别", trigger: "blur" },
        ],
        birthday: [
          { required: true, message: "请选择出生日期", trigger: "blur" },
        ],
      },
      workFile: "", //上传文件
      visibleImei: false,
      studentMapImei: "", //手表唯一标识
      map: {
        center: { lng: 113.763924, lat: 22.938634 },
        zoom: 18,
        show: true,
        dragging: true,
      },
    };
  },
  beforeMount() {
    this.query(0);
  },
  methods: {
    download() {
      studentServer.download({}).then((res) => {
        dowandFile(res, "导入模板下载.xlsx");
      });
    },
    //查询
    query(page) {
      let params = {
        schoolcode: this.ids.schoolcode,
        gradecode: this.ids.gradeId,
        classcode: this.ids.classId,
        stuname: this.initData.stuname,
        page: page,
        pageSize: this.pageSize,
      };
      studentServer.queryStudent(params).then((res) => {
        if (res.status === 200) {
          this.dataList = [...res.resultMap.students];
          this.total = this.dataList.length;
        }
      });
    },
    //tip
    tip(type, msg) {
      this.$message({
        type: type,
        message: msg,
      });
    },
    cancel(formName) {
      if (this.type !== "detail") {
        this.$refs[formName].resetFields();
      }
      this.handle_dialog = false;
    },
    //学生行程轨迹
    studentImei(list) {
      this.studentMapImei = list.imei;
      this.visibleImei = true;
    },
    handler({ BMap, map }) {
      let starttime = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000);
      let endtime = new Date();
      let params = {
        imei: this.studentMapImei,
        starttime: formDate(new Date(starttime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(endtime), "yyyy-MM-dd hh:mm:ss"),
      };
      studentServer.getPosRecordsByImei(params).then((res) => {
        if (res.success) {
          let data = res.resultMap.positions;
          this.map.center = { lng: data[0].lon, lat: data[0].let };
          // 鼠标缩放
          map.enableScrollWheelZoom(true);
          // 点击事件获取经纬度
          var path = []; //本人的示例是要走规定经过的路线，所以中间有多经过点
          for (let i = 0; i < data.length; i++) {
            path.push([data[i].lon, data[i].let]);
          }
          map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
          for (let i = 0; i < path.length; i += 2) {
            var walking = new BMap.WalkingRoute(map, {
              renderOptions: {
                map: map,
                autoViewport: true,
              },
              onPolylinesSet: function(routes) {
                let searchRoute = routes[0].getPolyline(); //导航路线
                map.removeOverlay(searchRoute); //移除查询出来 的路线
              },
              onMarkersSet: function(routes) {
                map.removeOverlay(routes[0].marker); //删除起点
                map.removeOverlay(routes[routes.length - 1].marker); //删除终点
              },
            });
            let _this = this;
            var start = new BMap.Point(path[i][0], path[i][1]);
            var end = new BMap.Point(path[i + 1][0], path[i + 1][1]);
            walking.search(start, end);
            walking.setSearchCompleteCallback(function() {
              var plan = walking.getResults().getPlan(0);
              for (let j = 0; j < plan.getNumRoutes(); j++) {
                var pts = plan.getRoute(j).getPath();
                var polyline = new BMap.Polyline(pts, {
                  strokeColor: "#ff0000",
                  strokeWeight: 5,
                  strokeOpacity: 1,
                }); //重新划路线
                map.addOverlay(polyline);
              }
            });
          }
          map.addEventListener("click", function(e) {
            // 点击地点获取经纬度
            console.log(e.point.lng, e.point.lat);
          });
        }
      });
    },
    show(statu, row) {
      for (let key in this.handleData) {
        this.handleData[key] = "";
      }
      if (statu === "add") {
        this.type = "add";
        this.title = "新增学生";
        this.handle_dialog = true;
      } else if (statu === "edit") {
        this.type = "edit";
        this.title = "编辑学生";
        this.handleData = Object.assign({}, row);
        this.handle_dialog = true;
      } else if (statu === "detail") {
        this.type = "detail";
        this.title = "学生详情";
        let params = {
          stucode: row.stucode,
        };
        studentServer.detailStudent(params).then((res) => {
          if (res.status === 200) {
            this.handleData = Object.assign({}, res.resultMap);
          }
        });
        this.handle_dialog = true;
      } else if (statu === "del") {
        this.$confirm("是否删除当前学生?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            studentServer.delStudent(row.stucode).then((res) => {
              if (res.status === 200) {
                this.tip("success", "删除成功");
                this.query(0);
              }
            });
          })
          .catch(() => {
            this.tip("info", "已取消删除");
          });
      } else if (statu === "moreDel") {
        if (this.multipleSelection.length === 0) {
          this.tip("info", "请选择需要删除的学生");
        } else {
          this.$confirm("是否删除当前选中学校?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              let stucodes = [];
              this.multipleSelection.forEach((item) => {
                stucodes.push(item.stucode);
              });
              studentServer.delmoreStudent(stucodes.join()).then((res) => {
                if (res.status === 200) {
                  this.tip("success", "批量删除成功");
                  this.$refs.table.clearSelection();
                  this.query(0);
                }
              });
            })
            .catch(() => {
              this.tip("info", "已取消删除");
            });
        }
      }
    },
    //处理操作
    handle(type, formName) {
      this.handleData.schoolcode = this.ids.schoolcode;
      this.handleData.gradecode = this.ids.gradeId;
      this.handleData.classcode = this.ids.classId;
      let params = Object.assign({}, this.handleData);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (type === "add") {
            params.birthday = formDate(new Date(params.birthday), "yyyy-MM-dd");
            studentServer.addStudent(params).then((res) => {
              if (res.status === 200) {
                this.tip("success", "新增成功");
                this.query(0);
                this.handle_dialog = false;
              }
            });
          } else if (type === "edit") {
            studentServer.editStudent(params).then((res) => {
              if (res.status === 200) {
                this.tip("success", "编辑成功");
                this.query(0);
                this.handle_dialog = false;
              }
            });
          }
        } else {
          this.tip("error", "有不合法的输入");
          return false;
        }
      });
    },
    //选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    uploadFile(e) {
      this.workFile = upladFile(e, 5);
      if (this.workFile) {
        for (let i = 0; i < this.workFile.length; i++) {
          let formData = new FormData();
          formData.append("file", this.workFile[i]);
          formData.append("schoolcode", dataCode(this.ids.schoolcode));
          formData.append("gradecode", dataCode(this.ids.gradeId));
          formData.append("classcode", dataCode(this.ids.classId));
          studentServer.importStudents(formData).then((res) => {
            if (res.success) {
            }
          });
        }
        this.workFile = "";
      }
    },
    //每頁顯示條數
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.query(0);
    },
    //跳轉的頁碼
    handleCurrentChange(page) {
      this.currentPage = page;
      this.query(page - 1);
    },
  },
};
