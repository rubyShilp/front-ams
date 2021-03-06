import * as attendanceServer from "./../index.server";
import { formDate, dateTime } from "@/util/core.js";
export default {
  data() {
    return {
      schoolList: JSON.parse(sessionStorage.getItem("schoolList")),
      dataList: [],
      totalCount: 0, //總條數
      page: 1,
      pagesize: 10, //每頁顯示條數
      schoolcode: "",
      starttime: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      endtime: new Date(),
      isRule: false, //是否展开详情信息
      isDetail: false, //是否是详情
      isAddOrUpdate: false, //是否新增或编辑
      ruleInfo: {}, //规则信息详情
      selectDataList: [], //选择考勤规则数据
      isfence: false,
      fentchSchoolcode: '',
      fentchid: '',
      center: { lng: 116.93761, lat: 40.059866 }, // 中心点坐标
      zoom: 11, // 缩放级别
      location: "吉安市",
      keyword: "",
      radioSelect: "none",
      styleOptions: {
        strokeColor: "#5E87DB", // 边线颜色
        fillColor: "#5E87DB", // 填充颜色。当参数为空时，圆形没有填充颜色
        strokeWeight: 2, // 边线宽度，以像素为单位
        strokeOpacity: 1, // 边线透明度，取值范围0-1
        fillOpacity: 0.2, // 填充透明度，取值范围0-1
      },
      labelOptions: {
        borderRadius: "2px",
        background: "#FFFBCC",
        border: "1px solid #E1E1E1",
        color: "#703A04",
        fontSize: "12px",
        letterSpacing: "0",
        padding: "5px",
      },
      map: null, // 百度地图
      drawingManager: null, // 鼠标绘制工具
      localSearch: null, // 地区检索
      region: {}, // 行政区域
    }
  },
  watch: {
    // 绘制类型变更
    radioSelect(nval, oval) {
      if (nval != "none") {
        this.clearOverlays();
        this.drawingManager.close();
        this.draw(nval);
      } else {
        this.drawingManager.close();
      }
    },
    // 地区检索关键字变更
    keyword(nval, oval) {
      this.localSearch.clearResults();
      this.localSearch.search(nval);
    },
  },
  mounted() {
    this.initAttendRoleQuery(1);
    this.map = new BMap.Map("map-container", {
      enableMapClick: false,
      minZoom: 5,
      maxZoom: 15,
    });
    // 设置中心点坐标和地图级别
    this.map.centerAndZoom(
      new BMap.Point(this.center.lng, this.center.lat),
      this.zoom
    );
    // 开启鼠标滚轮缩放
    this.map.enableScrollWheelZoom(true);
    console.log(this.drawingManager)
    // 创建鼠标绘制工具
    this.drawingManager = new BMapLib.DrawingManager(this.map, {
      // isOpen: true, //是否开启绘制模式
      enableCalculate: true, // 绘制是否进行测距(画线时候)、测面(画圆、多边形、矩形)
      drawingToolOptions: {
        enableTips: true,
        customContainer: "selectbox_Drawing",
        hasCustomStyle: true,
        offset: new BMap.Size(5, 5), // 偏离值
        scale: 0.8, // 工具栏缩放比例
        drawingModes: [
          BMAP_DRAWING_RECTANGLE,
          BMAP_DRAWING_POLYGON,
          BMAP_DRAWING_CIRCLE,
        ],
      },
      enableSorption: true, // 是否开启边界吸附功能
      sorptionDistance: 20, // 边界吸附距离
      enableGpc: true, // 是否开启延边裁剪功能
      enbaleLimit: true, // 是否开启超限提示
      // limitOptions: {
      //     area: 50000000 // 面积超限值
      // },
      circleOptions: this.styleOptions, // 圆的样式
      polylineOptions: this.styleOptions, // 线的样式
      polygonOptions: this.styleOptions, // 多边形的样式
      rectangleOptions: this.styleOptions, // 矩形的样式
      labelOptions: this.labelOptions, // label的样式
    });

    // 实例化地区检索
    this.localSearch = new BMap.LocalSearch(this.map, {
      renderOptions: { map: this.map, panel: "search-result" },
    });

    // 加载围栏数据
    this.loadHurdle();
  },
  methods: {
    hide(){
      this.polygonData = [{
        path:  [],
        value: 0
      }]
      this.isfence = false
    },
     // 清除地图覆盖物
     clearOverlays() {
      this.map.clearOverlays();
    },
    // 绘制圆、矩形、多边形
    draw(type) {
      var arr = document.getElementsByClassName("bmap-btn");
      for (var i = 0; i < arr.length; i++) {
        arr[i].style.backgroundPositionY = "0";
      }
      switch (type) {
        case "marker": {
          var drawingType = BMAP_DRAWING_MARKER;
          break;
        }
        case "polyline": {
          var drawingType = BMAP_DRAWING_POLYLINE;
          break;
        }
        case "rectangle": {
          var drawingType = BMAP_DRAWING_RECTANGLE;
          break;
        }
        case "polygon": {
          var drawingType = BMAP_DRAWING_POLYGON;
          break;
        }
        case "circle": {
          var drawingType = BMAP_DRAWING_CIRCLE;
          break;
        }
      }
      // 进行绘制
      if (
        this.drawingManager._isOpen &&
        this.drawingManager.getDrawingMode() === drawingType
      ) {
        this.drawingManager.close();
      } else {
        this.drawingManager.setDrawingMode(drawingType);
        this.drawingManager.open();
      }
    },
 
    // 绘制行政区域
    drawRegion() {
      if (!this.region.value) {
        this.$message({
          message: "操作失败，请选择区域",
          type: "error",
        });
        return;
      }
      this.radioSelect = "none";
      var bdary = new BMap.Boundary();
      bdary.get(this.region.value, (rs) => {
        //获取行政区域
        this.map.clearOverlays(); //清除地图覆盖物
        var count = rs.boundaries.length; //行政区域的点有多少个
        if (count === 0) {
          alert("未能获取当前输入行政区域");
          return;
        }
        var pointArray = [];
        for (var i = 0; i < count; i++) {
          console.log(rs.boundaries[i]);
          var ply = new BMap.Polygon(rs.boundaries[i], this.styleOptions); //建立多边形覆盖物
          var str = JSON.stringify(ply.ia); //将BMap获取的行政区边界经纬度转为字符串
          this.map.addOverlay(ply); //添加覆盖物
          pointArray = pointArray.concat(ply.getPath());
        }
        this.map.setViewport(pointArray); //调整视野
      });
    },
 
    // 返回
    goBack() {},
 
    // 切换地区
    regionChange(data) {
      this.region = data.area || data.city || data.province || {};
    },
 
    // 加载围栏数据
    async loadHurdle() {
      const {
        data: { points },
      } = await this.$http.get("/api/getCurrent");
      var pointsArr = JSON.parse(points);
      var pathArr = [];
      pointsArr.forEach((item) => {
        var ply = new BMap.Polygon(item, this.styleOptions); //建立多边形覆盖物
        this.map.addOverlay(ply); //添加覆盖物
        pathArr = pathArr.concat(ply.getPath());
      });
      this.map.setViewport(pathArr); //调整视野
    },
 
    // 保存围栏数据
    saveHurdle() {
      var overlays = this.map.getOverlays();
      var pointsStrArr = [];
      overlays.forEach((item) => {
        if (item.getPath) {
          var pointsStr = this.pointsToStr(item.getPath());
          pointsStr && pointsStrArr.push(pointsStr);
        }
      });
      if (pointsStrArr.length == 0) {
        this.$message({
          message: "操作失败，您没用绘制任何有效区域",
          type: "error",
        });
        return;
      }
 
      // 后台保存需要的路径坐标数据
      const data = JSON.stringify(pointsStrArr);
      alert(data);
    },
 
    // 坐标点数组转字符串
    pointsToStr(points) {
      if (!points) return "";
      var str = "";
      points.forEach((item) => {
        str += item.lng + "," + item.lat + ";";
      });
      return str.slice(0, -1);
    },
    // callbakAdd(e) {
    //   console.log('%c map callbakAdd', 'color: green;')
    //   console.log(e)
    //   let params = {
    //     vertexes: e.path,
    //     schoolcode: this.fentchSchoolcode,
    //     fencename: this.fentchSchoolcode 
    //   }
    //   attendanceServer.fentch(params).then(res=>{
    //     if(res.success){
    //       this.$message.success(res.message)
    //       this.initAttendRoleQuery(1);
    //     }
    //   })
    // },
    // callbakModify(e) {
    //   console.log('%c map callbakModify', 'color: green;')
    //   console.log(e)
    //   let params = {
    //     vertexes: e.path,
    //     schoolcode: this.fentchSchoolcode,
    //     fencename: this.fentchSchoolcode,
    //     fencecode: this.fentchSchoolcode
    //   }
    //   attendanceServer.fentchUpdate(params).then(res=>{
    //     if(res.success){
    //       this.$message.success(res.message)
    //       this.initAttendRoleQuery(1);
    //     }
    //   })
    // },
    // callbakDelete(e) {
    //   console.log('%c map callbakDelete', 'color: green;')
    //   console.log(e)
    //   let params = {
    //     schoolcodes: this.fentchSchoolcode,
    //   };
    //   attendanceServer.fentchDel(params.schoolcodes).then(res=>{
    //     if(res.success){
    //       this.$message.success(res.message)
    //       this.initAttendRoleQuery(1);
    //     }
    //   })
    // },
    //查询学校考勤规则信息
    initAttendRoleQuery(page) {
      let params = {
        starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: this.schoolcode,
        page: page,
        pagesize: this.pagesize,
      };
      attendanceServer.attendRoleQuery(params).then((res) => {
        if (res.success) {
          this.dataList = res.resultMap.attendRules;
          this.totalCount = res.resultMap.total;
          for (let i = 0; i < this.dataList.length; i++) {
            if (this.dataList[i].rulestate == 0) {
              this.dataList[i].isRuleState = true;
            } else {
              this.dataList[i].isRuleState = false;
            }
          }
        }
      });
    },
    //每頁顯示條數
    handleSizeChange(pagesize) {
      this.pagesize = pagesize;
      this.initAttendRoleQuery(1);
    },
    //跳轉的頁碼
    handleCurrentChange(page) {
      this.page = page;
      this.initAttendRoleQuery(page);
    },
    //查询考勤规则详情信息
    attendRoleDetail(list, type) {
      this.ruleInfo = JSON.parse(JSON.stringify(list));
      this.isRule = true;
      if (type == 1) {
        this.isDetail = true;
      } else {
        this.isDetail = false;
      }
    },
    //绘制围栏
    fenceconfig(row){
      this.fentchSchoolcode = row.schoolcode;
      this.fentchid = row
      let params = {
        schoolcode: row.schoolcode
      }
      attendanceServer.fentchQuery(params.schoolcode).then(res=>{
        if(res.success){
          // [...this.polygonData[0].path] = res.resultMap.fences[0].vertexes
          // this.polygonData = [
          //   {
          //     path: res.resultMap.fences.length!=0?res.resultMap.fences[0].vertexes:[],
          //     value: 0
          //   }
          // ]
        }
      })
      this.isfence = true;
    },
    //保存绘制
    fencesave(){

    },
    //新增考勤设备信息
    attendRolAdd() {
      this.isRule = true;
      this.isDetail = false;
      this.isAddOrUpdate = true;
      this.ruleInfo = {
        schoolname: "",
        morschtime: "",
        morhometime: "",
        minschtime: "",
        minhometime: "",
        nightschtime: "",
        nighthometime: "",
      };
    },
    //编辑或新增设备信息
    attendRoleAddOrUpdate() {
      if (this.isAddOrUpdate) {
        this.attendRoleAdd();
      } else {
        this.attendRoleUpdate();
      }
    },
    //编辑考勤规则信息
    attendRoleUpdate() {
      attendanceServer.attendRoleUpdate(this.ruleInfo).then((res) => {
        if (res.success) {
          this.initAttendRoleQuery(1);
          this.isRule = false;
        }
      });
    },
    //新增学校考勤规则信息
    attendRoleAdd() {
      attendanceServer.attendRoleAdd(this.ruleInfo).then((res) => {
        if (res.success) {
          this.initAttendRoleQuery(1);
          this.isRule = false;
        }
      });
    },
    //删除学校考勤规则信息
    attendRoleRemove(list) {
      this.$confirm("是否删除当前规则信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          attendanceServer.attendRoleRemove(list.rulecode).then((res) => {
            if (res.success) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.initAttendRoleQuery(1);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //选择考勤规则信息
    selectData(list) {
      for (let i = 0; i < list.length; i++) {
        this.selectDataList.push(list[i].schoolcode);
      }
    },
    //批量删除围栏
    attendRoleBatchRemove() {
      this.$confirm("是否删除选中规则信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.selectDataList.length == 0) {
            this.$message.warning("请选择要删除的数据");
            return false;
          }
          let params = {
            schoolcodes: this.selectDataList.join(","),
          };
          attendanceServer
            .fentchDel(params.schoolcodes)
            .then((res) => {
              if (res.success) {
                this.initAttendRoleQuery(1);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //启动考勤规则
    attendRoleApply(list) {
      this.$confirm(
        "是否" + (list.rulestate == 0 ? "禁用" : "启用") + "该考勤规则?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          let params = {
            schoolcode: list.schoolcode,
            rulecode: list.rulecode,
            rulestate: list.rulestate == 0 ? 1 : 0,
          };
          attendanceServer.attendRoleApply(params).then((res) => {
            if (res.success) {
              if (res.success) {
                this.initAttendRoleQuery(1);
                this.$message({
                  type: "success",
                  message: (list.rulestate == 0 ? "禁用" : "启用") + "成功!",
                });
              }
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message:
              "已取消" + (list.rulestate == 0 ? "禁用" : "启用") + "规则",
          });
        });
    },
  },
};
