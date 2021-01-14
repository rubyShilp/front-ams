import * as accountCenterServer from "../accountCenter.server";
import pagination from "@/components/pagination/index";
export default {
  data() {
    return {
      rolename: "",
      dataList: [],
      currentPage: 1,
      pagesize: 10,
      total: 0,
      //操作数据
      type: "",
      title: "",
      handle_dialog: false,
      handleData: {},
      multipleSelection: [],
      roletables: [],
      roles: [
        { id: 0, value: "未启用" },
        { id: 1, value: "启用" },
      ],
      levels: [
        { id: 0, value: "普通用户" },
        { id: 1, value: "系统管理员" },
        { id: 2, value: "局级管理员" },
        { id: 3, value: "学校管理员" },
        { id: 4, value: "年级管理员" },
        { id: 5, value: "班主任" },
      ],
      resourceData: [],
      rolecode: "",
      role_rules: {
        rolename: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
        ],
        rolestatus: [
          { required: true, message: "请选择角色状态", trigger: "blur" },
        ],
        level: [{ required: true, message: "请选择角色级别", trigger: "blur" }],
      },
    };
  },
  beforeMount() {
    this.query();
  },
  components: {
    pagination,
  },
  methods: {
    //初始化查询角色列表
    query() {
      let params = {
        rolename: this.rolename,
        page: this.currentPage,
        pagesize: this.pagesize,
      };
      accountCenterServer.queryRole(params).then((res) => {
        if (res.success) {
          this.dataList = res.resultMap.roles;
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
        this.title = "新增角色";
        this.handle_dialog = true;
      } else if (statu === "edit") {
        this.type = "edit";
        this.title = "编辑角色";
        if (row) {
          this.handleData = Object.assign({}, row);
        }
        this.handle_dialog = true;
      } else if (statu === "roleEdit") {
        this.type = "roleEdit";
        this.title = "角色权限编辑";
        this.rolecode = row.rolecode;
        let params = {
          page: 1,
          pagesize: 10,
          rolecode: row.rolecode,
        };
        accountCenterServer.queryuserResource(params).then((res) => {
          if (res.success) {
            this.resourceData = [...res.resultMap.resources];
            //默认选中
            this.$nextTick(() => {
              this.resourceData.forEach((item) => {
                if (item.chk === 1) {
                  this.$refs.roleTable.toggleRowSelection(item, true);
                }
              });
            });
          }
        });
        this.handle_dialog = true;
      } else if (statu === "del") {
        this.$confirm("是否删除当前角色?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            accountCenterServer.delRole(row.rolecode).then((res) => {
              if (res.status === 200) {
                this.tip("success", "删除成功");
                this.query();
              }
            });
          })
          .catch(() => {
            this.tip("info", "已取消删除");
          });
      } else if (statu === "moreDel") {
        if (this.multipleSelection.length === 0) {
          this.tip("info", "请选择需要删除的角色");
        } else {
          this.$confirm("是否删除当前选中角色?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              let rolecodes = [];
              this.multipleSelection.forEach((item) => {
                rolecodes.push(item.rolecode);
              });
              accountCenterServer.delmoreRole(rolecodes.join()).then((res) => {
                if (res.status === 200) {
                  this.tip("success", "批量删除成功");
                  this.$refs.table.clearSelection();
                  this.query();
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
      if (type !== "roleEdit") {
        let params = Object.assign({}, this.handleData);
        params.schoolcode = JSON.parse(
          sessionStorage.getItem("userInfo")
        ).roles[0].schoolcode;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (type === "add") {
              // params.birthday = formDate(new Date(params.birthday), "yyyy-MM-dd")
              accountCenterServer.addRole(params).then((res) => {
                if (res.status === 200) {
                  this.tip("success", "新增成功");
                  this.query();
                  this.handle_dialog = false;
                }
              });
            } else if (type === "edit") {
              accountCenterServer.editRole(params).then((res) => {
                if (res.status === 200) {
                  this.tip("success", "编辑成功");
                  this.query();
                  this.handle_dialog = false;
                }
              });
            }
          } else {
            this.tip("error", "有不合法的输入");
            return false;
          }
        });
      } else {
        let rescodes = [];
        this.roletables.forEach((item) => {
          rescodes.push(item.resourcecode);
        });
        let parmas = {
          rolecode: this.rolecode,
          resourcecodes: rescodes.join(),
        };
        accountCenterServer.saveroleResource(parmas).then((res) => {
          if (res.success) {
            this.tip("success", "分配资源成功");
            this.query();
            this.handle_dialog = false;
          }
        });
      }
    },
    //
    close() {
      this.handle_dialog = false;
      this.$refs.roleTable.clearSelection();
    },
    //选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    roletableSelect(val) {
      this.roletables = val;
    },
  },
};
