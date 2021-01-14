import * as schoolServer from "./schoolManage.server";
export default {
  data() {
    return {
      dataList: [],
      initData: {
        school: "",
      },
      multipleSelection: [],
      //分页参数
      currentPage: 1,
      total: 0,
      pageSize: 10,
      //模态框
      type: "",
      title: "",
      handle_dialog: false,
      handleData: {},
      schooltypes: [
        { id: 0, value: "k12" },
        { id: 1, value: "中职" },
        { id: 2, value: "其它" },
      ],
      procity: [],
      options: [],
      school_rules: {
        schoolname: [
          { required: true, message: "学校名称不能为空", trigger: "blur" },
        ],
        schoolattr: [
          { required: true, message: "学校属性不能为空", trigger: "blur" },
        ],
        principal: [
          { required: true, message: "学校负责人不能为空", trigger: "blur" },
        ],
        schooltype: [
          { required: true, message: "请选择学校类型", trigger: "blur" },
        ],
      },
    };
  },
  beforeMount() {
    //初始化查询
    this.query(0);
  },
  methods: {
    query(page) {
      let params = {
        schoolname: this.initData.school,
        page: page,
        pageSize: this.pageSize,
      };
      schoolServer.querySchool(params).then((res) => {
        if (res.status === 200) {
          this.dataList = [...res.resultMap.schools];
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
      //获取省份地区信息
      schoolServer.getAllProvinces({}).then((res) => {
        if (res.success) {
          this.options = res.resultMap.options;
        }
      });
      if (statu === "add") {
        this.type = "add";
        this.title = "新增学校";
        this.handle_dialog = true;
      } else if (statu === "edit") {
        if (row.provcode && row.citycode) {
          this.procity[0] = row.provcode;
          this.procity[1] = row.citycode;
        }
        this.type = "edit";
        this.title = "编辑学校";
        this.handleData = Object.assign({}, row);
        this.handle_dialog = true;
      } else if (statu === "detail") {
        this.type = "detail";
        this.title = "学校详情";
        let params = {
          schoolcode: row.schoolcode,
        };
        schoolServer.detailSchool(params).then((res) => {
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
            schoolServer.delSchool(row.schoolcode).then((res) => {
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
          this.tip("info", "请选择需要删除的学校");
        } else {
          this.$confirm("是否删除当前选中学校?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              let schoolcodes = [];
              this.multipleSelection.forEach((item) => {
                schoolcodes.push(item.schoolcode);
              });
              schoolServer.delmoreSchool(schoolcodes.join()).then((res) => {
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
      if (this.procity.length === 0) {
        this.tip("error", "请选择省份及地区");
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleData.provcode = this.procity[0];
          this.handleData.citycode = this.procity[1];
          if (type === "add") {
            schoolServer.addSchool(this.handleData).then((res) => {
              if (res.status === 200) {
                this.tip("success", "新增成功");
                this.query(0);
                this.handle_dialog = false;
              }
            });
          } else if (type === "edit") {
            let params = Object.assign({}, this.handleData);
            schoolServer.editSchool(params).then((res) => {
              if (res.status === 200) {
                this.tip("success", "修改成功");
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
    //表格选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //每頁顯示條數
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.query(0);
    },
    //跳轉的頁碼
    handleCurrentChange(page) {
      this.currentPage = page;
      this.query(page);
    },
  },
};
