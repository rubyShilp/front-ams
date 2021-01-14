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
      pagesize: 10,
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
        center: { lat: 113.87, lng: 22.27 },
        zoom: 18,
        show: true,
        dragging: true,
      },
      lineList: [],
    };
  },
  beforeMount() {
    this.query(1);
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
        pagesize: this.pagesize,
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
      this.visibleImei = true;
      this.studentMapImei = list.imei;
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
          this.lineList = [];
          let data = res.resultMap.positions;
          if (data.length > 0) {
            this.map.center = { lng: data[0].lon, lat: data[0].lat };
          }
          // 鼠标缩放
          map.enableScrollWheelZoom(true);
          // 点击事件获取经纬度
          let path = []; //本人的示例是要走规定经过的路线，所以中间有多经过点
          for (let i = 0; i < data.length; i++) {
            path.push([data[i].lon, data[i].lat]);
            this.lineList.push({
              lat: data[i].lat,
              lng: data[i].lon,
            });
          }
          if (data.length > 0) {
            map.centerAndZoom(new BMap.Point(data[0].lon, data[0].lat), 11);
          } else {
            map.centerAndZoom(new BMap.Point(113.87, 22.27), 11);
          }
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
                this.query(1);
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
                  this.query(1);
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
                this.query(1);
                this.handle_dialog = false;
              }
            });
          } else if (type === "edit") {
            studentServer.editStudent(params).then((res) => {
              if (res.status === 200) {
                this.tip("success", "编辑成功");
                this.query(1);
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
              this.query(1);
            }
          });
        }
        this.workFile = "";
      }
    },
    //每頁顯示條數
    handleSizeChange(pagesize) {
      this.pagesize = pagesize;
      this.query(1);
    },
    //跳轉的頁碼
    handleCurrentChange(page) {
      this.currentPage = page;
      this.query(page);
    },
  },
};
