import * as gradeServer from "./gradeManage.server";
export default {
  props: {
    ids: {
      type: Object,
    },
  },
  data() {
    return {
      dataList: [],
      initData: {
        gradename: "",
      },
      //新增参数
      addData: {
        schoolcode: "",
        gradename: "",
        remark: "",
      },
      multipleSelection: [],
      //详情数据
      detailData: {},
      //分页参数
      currentPage: 1,
      total: 0,
      pagesize: 10,
      //模态框
      type: "",
      title: "",
      handle_dialog: false,
      handleData: {},
      grade_rules: {
        gradename: [
          { required: true, message: "年级名称不能为空", trigger: "blur" },
        ],
      },
    };
  },
  beforeMount() {
    this.query(1);
  },
  methods: {
    query(page) {
      let params = {
        schoolcode: this.ids.schoolcode,
        gradecode: this.ids.gradeId,
        classcode: this.ids.classId,
        gradename: this.initData.gradename,
        page: page,
        pagesize: this.pagesize,
      };
      gradeServer.queryGrade(params).then((res) => {
        if (res.status === 200) {
          this.dataList = res.resultMap.grades;
          this.total = res.resultMap.total;
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
      // for(let key in this.handleData){
      //   this.handleData[key] = ""
      // }
      if (this.type !== "detail") {
        this.$refs[formName].resetFields();
      }
      this.handle_dialog = false;
    },
    show(statu, row) {
      for (let key in this.handleData) {
        this.handleData[key] = "";
      }
      if (statu === "add") {
        this.type = "add";
        this.title = "新增年级";
        this.handle_dialog = true;
      } else if (statu === "edit") {
        this.type = "edit";
        this.title = "编辑年级";
        this.handleData = Object.assign({}, row);
        this.handle_dialog = true;
      } else if (statu === "detail") {
        this.type = "detail";
        this.title = "年级详情";
        let params = {
          gradecode: row.gradecode,
        };
        gradeServer.detailGrade(params).then((res) => {
          if (res.status === 200) {
            this.handleData = Object.assign({}, res.resultMap);
          }
        });
        this.handle_dialog = true;
      } else if (statu === "del") {
        this.$confirm("是否删除当前学校?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            gradeServer.delGrade(row.gradecode).then((res) => {
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
          this.tip("info", "请选择需要删除的学校");
        } else {
          this.$confirm("是否删除当前选中学校?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              let gradecodes = [];
              this.multipleSelection.forEach((item) => {
                gradecodes.push(item.gradecode);
              });
              gradeServer.delmoreGrade(gradecodes.join()).then((res) => {
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
      let params = Object.assign({}, this.handleData);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (type === "add") {
            gradeServer.addGrade(params).then((res) => {
              if (res.status === 200) {
                this.tip("success", "新增成功");
                this.$emit("resetquery");
                this.query(1);
                this.handle_dialog = false;
              }
            });
          } else if (type === "edit") {
            gradeServer.editGrade(params).then((res) => {
              if (res.status === 200) {
                this.tip("success", res.message);
                this.query(1);
                this.$emit("resetquery");
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
