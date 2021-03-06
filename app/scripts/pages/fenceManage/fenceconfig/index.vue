<template>
     <el-container>
    <!-- 头部 -->
    <el-header>
      <el-page-header @back="goBack" content="电子围栏绘制">
      </el-page-header>
    </el-header>
 
    <!-- 中间 -->
    <el-main>
      <!-- 地图 -->
      <div id="map-container"></div>
 
      <!-- 左侧操作区 -->
      <div class="s-control-l">
        <v-region @values="regionChange" class="form-control"></v-region>
        <el-button type="primary" size="small" style="margin-left:20px;" @click="drawRegion">绘制区域</el-button>
      </div>
 
      <!-- 右侧操作区 -->
      <div class="s-control-r">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="" style="margin-right:30px;">
            <el-input v-model.lazy="keyword" placeholder="请输入地名" prefix-icon="el-icon-search" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="">
            <el-radio-group v-model="radioSelect" size="mini">
              <el-radio-button label="none"><span class="s-icon s-icon-select"></span></el-radio-button>
              <el-radio-button label="circle"><span class="s-icon s-icon-circle"></span>
              </el-radio-button>
              <el-radio-button label="polygon"><span class="s-icon s-icon-polygon"></span>
              </el-radio-button>
              <el-radio-button label="rectangle"><span class="s-icon s-icon-rectangle"></span>
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <!-- 地区检索显示区 -->
          <div id="search-result"></div>
        </el-form>
      </div>
    </el-main>
 
    <!-- 尾部 -->
    <el-footer>
      <el-row type="flex" class="row-bg" justify="end" style="margin:14px 0 0 0;">
        <el-button type="" size="small" style="margin-left:20px;" @click="goBack">返回</el-button>
        <el-button type="primary" size="small" style="margin-left:20px;" @click="saveHurdle">保存</el-button>
      </el-row>
    </el-footer>
  </el-container>
</template>
<script>
export default {
name: "index",
  data() {
    return {
      name: "draw",
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
    };
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
    // 创建Map实例
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
  }  
}
</script>
<style scoped>
.el-container {
  height: 100%;
}
 
.el-main {
  position: relative;
  padding: 0;
}
 
.el-page-header,
.el-footer {
  line-height: 60px;
}
 
.rg-select__el {
  background: #ffffff !important;
}
 
#map-container {
  width: 100%;
  height: 100%;
}
 
#search-result {
  width: 400px;
}
 
.s-control-l {
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 30px;
  top: 30px;
  z-index: 999;
}
 
.s-control-r {
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 30px;
  top: 30px;
  z-index: 999;
}
 
.s-search {
  width: 400px;
}
 
.s-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
 
.s-icon.s-icon-select {
  background-image: url(data:image/png;base64,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);
}
.el-radio-button.is-active .s-icon.s-icon-select {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAACQ1BMVEUAAAD///+jXKg1AAAAwHRSTlMAAQIDBAUGCAkKDA0ODxARExQWFxgaGxwdHiEiIyQlJicpKi0uLzAzNTg5Ojs8Pj9AQUNESElKS01PUFJUVVdYWltcXV5iY2RlZmhpamtsbW5vcHN0dXZ3eHt8fX5/gIKDhYaIiYuMjY6PkZKUlZaXmJmam5ydnp+goqOkpaanqKmqq62ys7S1tre4ubq7vL7AwcLDxMXHyMnKzM/T19jZ2tvc3d/g4eLj5efo6uvs7e7v8PHz9PX29/j5+vv8/f7EZiVIAAAAAWJLR0TAE2Hf+AAAA4NJREFUaN7t2Ol3DGkUx/GnsogIGrGvsY4hCUaY2IJBEGLJxE5IzIwllowgCGILGTOWhNj39DBDQmxN6HR9/zQvmqjurur0Oc+td/17d+v2qc95qp661aeUiieeeLSTNn1T9aVbjX9XFmcmuyMk5V3w05G3hzPliYR8L2FpmChsjLodPHFr4+kD1XVNJgBmZTdJY6EPwLtlbEKwTl/4jwlwP0PO2GACz5eH3OwfGwBaxksZ6wEiL83cd8CrUTJGngn+QpvGGC/g9UgYw99BYKZtK90LnBUwjMtAsdOmewPM0EdmAcccu7OBx0naC7kLzb2c+1eA+bpIJrA2Sn9cAOp1kQrwdY/2gzowB2ki/8LxkAPZxSuGWet5QL6eMQhYYKlTa4H2MuP7kd4BOKKH5AAjLPXR4Jzcb1Eew009ZBn4LTu0XzsRygV4oYesg1ZLORVYv8oMUY6BT3s2tljKXCBX5QeAyq9TX1VBmx6yCPxGOBKqnIP/9JCfgfQIJES5Bnf1kIHA9EjEqsxoo0bzYXwIv9kgViXnw3JNpBy8hg1iVabovulHAzl2SNge08sVaLRFJJXJ1ukVgkgqNdAywBYRVPq/hDuptoigMi0AV7vZIoLKFuB6X1tEUCkH/rdH5BRjD+CACK5ldcAREVQmNjkigkpPZ0R0wjgisooTohYLKo6IpOKMCCpREDklGiKmREWklOiIkNIJIqN0hogonSISSueIgBIDoq/EgmgrMSG6SmyIphIjoqfEiqgCE9jvMhJUilxGVIEJzckuI2ovMMA9pPvInxas2+0Ff5o0kjIkK6/o9+qrD3wdn6fr5O7JpMKtVX/de0lEmjPEkEIT27ScGCq2hZeFGa13av8sWZr7g0dwdv0aPPXHpuunt6+ekzVE+6OnDbI2aLRnKLmEI5sBngJV7iElAPU9HsHnwW4hWwEudlVLgH0uIaUAdSlKJT+Ftv5uIMYugPMpSilVBOxwATHKAc4Ex2xqM/j6iCPGHoBT356KjUCpNGLsAzjZ8eT1eA1vPbJI4hGAQ5Z3eBmwSRRJPApwwPo/ofd7eJUmiCRWA1QYIZ3dwBoZJBuoOAewM9RQAz/B864iiOfD14G+PaJ1EFgps5TSoLEtsjO8HZ51EUESytrgdYFdqwZYLLTBPFOy7C/9WBOeJCmXUwv84jYyAW5MchtRf0xV8cQTj0S+AJ6kzMb5JQNiAAAAAElFTkSuQmCC);
}
 
.s-icon.s-icon-circle {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAACylBMVEUAAAAA//8AgP9Vqv9AgP8zmf8rgP9Jkv9AgP85jv8zgP8ui/9Alf87if83kv8ziP9Aj/88h/85jv82hv8zjP89kv86i/83kP+bm5s1iv8zj/87if85jv81jf88iP84j/82i/81j/86iv85jv83iv82jf87if85jP84j/83jP81jv86i/85jv83i/+bm5s6iv85jf84iv83jP82jv86jP85jv84i/83jf86i/84iv83jP82iv86jP83jf82i/85jf84i/83jP83iv85jP85jv84jP83jf82i/85jf84i/+YmJg3i/85jP85i/84jP83jf83jP85jf84i/83i/85jP85i/84jP83jf83jP85jf84jP84jf83i/85jf85i/84jP84i/83jP+ZmZk5jf84jP84jf83jP83jf85i/84jP83jP85i/84jP84jf83jf85i/84jP84i/85i/84jP84jP83jf85jP84jf9yk8E4i/83jP84jP84jP83jf85jP84jP83jP85i/84jP84i/83jf85jP84jf84jP84jf83jP84jP84i/84jP83i/85jP84jf+YmJg4jP83jP84jP84jP84jP83i/85jP84i/84jf83jP84jP84jP84jP85jP84i/84jP84jf83jP84jP84jP84jP+YmJg5jP84i/84jP84i/83jP85jf84jP84jP84jP85jP84jP84jP84i/85jf84jP84jf84jP83jP84jP84jP84jP85i/84jP84jf84jP84jP84jP+ZmZk4jP85jP84jP84i/83jP84jP84jP84jP85jP84jP84jP9Zkdw4jf84jP84jP84jP84jP+ZmZk4jP84i/84jP84jP84jP84jP83jP84jP84jP84jP84jP84jf84jP84jP84jP84jP84jP84jP84jP84jP84jP84jP9VkOCZmZn///9jnv+IAAAA6nRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcXGBkaGx0eICEiIyQlJicoKSorLC0uLjAxMjM0NTY3ODk7PD0+QUJDREVGR0hJSktMTU1PUFFSU1RVVlhZWltcXV5fYGFiY2RlZmZnaGlqa2xtb3BxcnR1dnd5enx9fn9/gIGDhYaHiYqLjI2PkJGSk5SVlpeYmZqam52en6ChoqOlpqipqqusra6vsbKzs7S1tre4ubq7vL2+v8DCw8TFxsfIycvMzc7Q0dHT1NXW2Nrb3N3e4ODh4+Tn6Ojp6uvs7e7v8fLz9PX29/j5+vv8/f5uZ1SuAAAAAWJLR0TtVr6DjQAABNBJREFUaN7tmelDVFUYhw/rKGIomhqihZa2GS5ZiFmEpjklUihmZEhaFppiakVaaWpGRCYYlYmYFYuZFSkWNpbhitgibgkiwzbMY39EHxg0h7l37nLmk7zf7nl/9z7nnu0957xCdFmXXS/W677ZqzYWlO6xfVdSkL04IbqbbMAtcz79Czdr/nld4g3SCEMzj6NgTSWp4RIIwc/uc6Jm9rwxJhEhC6+20omStfMmxo6Mirpt9APJy3Mrmq94fnrYBCIw/azrMyc3zYxw91piMsrbXP6yGKOMcQfbv1C7cbyfgqT/fFu7xrnZUN/0zG3vi+Op6mP13o9bADgzQz9j5DEADiUFeJUOyXcAkB+ik7GgEaBuYaAm9Z17AagcpgcRkAPA5xFaX/BLvQBQ96B2hmUrgD1dT70GlQM0J2nu8jKAytv1NXDQOwBtaRrn+C6A7/UvSyktgDNFU38UAmwJNjDqp1wCWiZrUOYAfOBvaPpOsAMN0V51aQBb/A0uEvFNwMm+XlQj7MDOYMPLXTJAiXodQ48Ch3uYWFTXACxSlWQDl+4wExwCdgMNQ1QUYxzA0+ZCUMQ/wI9+yrWwAQVmY+lMgGRF9/NAXaTpiP0lUK00dix/A+mmGSKqCXhJwTkPOBJoHiLWAzWeQ11gNTBLxh6qz0XgGY+uJKBKxo8IsQ741aNnF5AmhSFubgXGe3AMdEB9DzkQUQjkeCjPADbL2tk+Dpzz0PQHgAmyIJZaj1/r0wan/GVBRB6wvlNpIvCZvLNGEnCgU+n7QKo8SD8nOMLcSyuBKLXXBljdbICC8B6r1Wq1/nH58uXX24VXp3sznFetm/VfN7MqCD9yF17x3AqU+xryKJDra8giIMMr5HSRy057gfzeIbwGsgqY7RVS1PFQ5AXyXMfDNZANwDRfQ/KAOH0QNfMM2Qbc72vIdmCcryH5wERfQ7KA6b7u+LcUQ79EyFLgVV9Pxulew4mEZeUuwOZriMUB9f4+hogqINrHQUvkez0gSQi/KcBXvt5IDAbqLNIgm4F1nYuPAYmyGN08b+7EmzLbKwGo8XBTNhxo6ScJ8oXChlvsB1bIYUQ5gFhPnheA86FSIBsUD0Gh54DFMhg31gMKV1LLgVM9JUDeUz6YirBaYK15xrAW4EUlbybQOsI0pFjtskCEVAP7AkwyUlA/qk8CyDTHiLygfoEjxA6g7SEzjKA9QMNQ1XukGqDGzB1OFsDL6pq4NqCyt2HGXIBSbwfcNwAqjF4aTGvVctEpAooBSkMMMaY0A/ZR3oXd9wJU9DXASGgEHAlapOGVAIcH6WYsagOcT2kc6UcAzsTrQ3TfBOBcoFXfuxzA+W6QDsbwgwCtc7S/EVIMwP5RmqfgK3aAhsl6/j3wbSeAI6uXJvn4SgCO6V1cH2lPMZ5dFuZVOnZnexqwUH/KJfJbV5Zx5UDVeTXVhahN9TMytZ50pWQd38xSWgHufu1PV850W4TBRSJ0daPrEw27lo51jzORCetPdGR/f4kXxu2m1Revpqt/27py7hOTYkfHTZ2xJHvn//Lzh6b7CVMWvqJaNVOOY0ecSYQQQvjFfnhBieCsyBgsa2sbGLNst70ToeqTeZFCrgUNe2zJpq/LbFUnjtp+2L5mfnx/0WVddp3Yf2mRN4D5fZHrAAAAAElFTkSuQmCC);
}
.el-radio-button.is-active .s-icon.s-icon-circle {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAIVElEQVR4nO2de4wdVR3Hv8ctr9JKi0IpULWAFkWrNZSEAOoiwSdGG2OqrbG+KloND02NRtIaExNfEcUHtlHsP8YHgQj4KoEatFqtEhFLCpRNRQ0tVpY+tqXtdj/+8burd8+ce2fu3pk5c+/OJ5lsZnf2/L7n/GbO+yHV1NTU1NTU1NTU9D0utoCsALMkLWi6TpM0S9KMxjVd0tOSDksakbRH0lDTtd0590z5yjujsg4B5ksabFyvkXR2l0EekXS/pC2SNkva6Jzb12WYuVMphwDnSVouaZmk8wo2d1jSPZJul3Sbc+6pgu31BsDxwPuBzcAYcTgIfA+4MHZ6RPtCgOmSVkr6uLJlR0OStjeuRyTtlJUVI5L2Np6ZJmmmpJMlzZM0v3FdIGmRpOMz2Pm9pDXOubszRqW3AaYB1wBPpry1O4H1wLuAuTnYPQG4GFgN/BY4lmJ/E3BxHnGuLMAlwANtEmEYWAdcBhT69QJzgKuBP7XRMwbcApxapJbSAWYC36V1GfEo8AHgxEj6FgPfB4600LcbeGcMbbkDLAIeaRHRvwFLgYHYOiUJOBfYAIy20LsBK/t6E2AVcCgQsb3AtcC02BpDABcAv2nhlAeBBbE1dgQwANzcIkI/JIdCumgAh2WjT7V4oS6PrTETWG3mR4FIHASuia2vU4B5WK3M5zCwNLa+tmCF96YWn/mLY+ubLMBxwJcD8ToGrIytLwjW4v5VQPQ9wLNj68sDYAXJmtgYsCK2tglgZcatAWf8AMjSOu4ZgDcBB7x4HgHeGFvb/yBcgH8beFZsbUUADGJlYjMjwCtiaxOwssWX0ZfOGAe4EnjGi/dO4LkxRS0MvCm/6LdsqhXAssDL+LMoLyMwA9juidkGnFy6mIgAXwo45boYQr7liTgAvKR0IZHBKjR3e2kxApxbpogLSfb3vKc0ARUDmAv8x0uPX1Nwj/W48QGSXdY/LtxwxcHGbXyWlWH4w57RvcBZhRvuAYCfemkzRJEVHKyf6p+e0Z7rnyoK4BySVeGPFWnwQ56xh6hoF3osgBu9NNpFEQNv2Fj4kGdsee6GehzgOcA+L53eW4ShpZ6RHfXXEQb4qpdW9xdhxO/JrWa3cwUAXgAc9dLrsjwNnMnEdsd+pliLvFNI9n7fnGfgq73Ab8kt8D4FeKuXZv/OLYsH/uwFPphLwH0M1kQYzj3dsFpD8yy/J+jzrvW8wOYLN3Nj2v9kSdhB77l7nXNjk1Y5tdjo3acW7Fkd0symzHJq7pVE0/3LgVPa/UOWQuZVASOlAsyRdFGXwfzRObc7Dz0hgIWSnh/40+NNvx+QdC0t2iXOuTvTjEzD5h+Ns6cb0ZMFuIruuapgjeu6FSilZ1nzNXFNxfbCYlQjKd0h/hzWh4sSUmOklSEv9O6r4pDdkramPLNY0pwStLTir7Lyox1v9n+R5hB/SsuuThQVyFbnXNsyAbhTgQiXyDedc+vaPTBebjSTlmXN9O73d6qqpjPSvpAZ3n0vO+SOwAtZOTr9Qg4UJaTGSHOI//dKLD3rZ9Ic4n8RfhZWkzNpDvHLjF52yFtcgUhan4fITh3SFwtvqkxaLetp735eUUI6ZHGjndH2mVKUtGbVZPrP0hyyw7uvynLgOYrb6MvCwsbVEWlZlt9VUhWH9C1pDnlU0rGm+wXUw7eFkjpdHtghqXmtwyLn3F+KkxTU0MsDVDd5v18r29kuQeoAVcPQBm8cpfzVQT0KcDoTN9wZJWUIN0v244+h11OAsnO5JuZCDzjn9rZ6WMrmEH8M/dXACZ0qm6K8zru/L5dQSW6v9PZcAu5jgBMpYqJcI/DPewHfkUvAfQywxEuzXeS1Lxhwvhf4EeD0XALvU4DbvDTLb7J1w8AfPAM35Gqgj8CWtvmrlC/N28hHPAN7gF7u/S0M4OteWhWyYGcGNqW+mU/kbqjHAU7D1s80s6IoY5/xDD0B+MO8UxrgJi+Niln02TB2Csmq3FcKMdaDAAtIbnD20aKNrvUMHsX6caY8wF1e2hS7cUDD6HSSy6M3U5G9d2OBbf/nU86yceD1AeNrSzFeQYCzSG4nW87mM00ibvcEHANeW5qAioDtWHqflxYj2FkopQqZi9UgmtnFFNuIBvhGILe4PpaYK0ge+/AgMDuKoJIBPhhwxs+JOaoKfDYgagt9vrEA8DaSuzXE3QSzIWyAZHVv/E3p3ZME2oDt3XvYi+9B4JWxtUmSgJMInyawJfobkzNYt7p/4sMosCS2tgkAp2Llh882oCoT7LoCuI5kmTkGvDu2tiBYffyhgFN2A1fG1jdZGjnA+kC8xoBVsfW1BZhN+HiHMeBrwHGxNXYCNjgXOjfrKPC+2PoygXWvhAp6sIGuahR+bcAafJ8iuXM3WMOvOpvvZwHbdOALhA8CG8UaVLNi6wyBnRIXKg/BJnz0bmcq8AZan1n4JPBpUiaPlQVwEbZ3fStupR/OQsEK+41tIjoMfA44M4K2AWzrjnaOGMbOo6rU2cFdA7wD+EebiI8CvwSWU3BLH3gZsAb4exs9AD+hBw4xmzTY2PwXCR+n18wItvHmJ7GspKvxFuwrXYLtq/tYim2ArUSoqsc8nPgMSddLulrJ5dchDskOJX648fNx2Qqv/bLFqYckzZZ0kmwt5Nn6/+HEL1X289i3SVojO9K7+gvb8wZr4d9AchSyTEax8Z0r6LdyYrJgBzleCnyH8GGOeTOG9bWtBp4XO/7jVPJtwLZTXSxb+jAo6RJZVtQtj0n6naTNku5yzv0rhzBzpZIO8cG6W86RdL6kFzWuM2RlxUxJs2RxOSorT/ZJGpY0JHPCkGxtRmErqGpqampqampqampqMvNfvniaAfFFb/EAAAAASUVORK5CYII=);
}
 
.s-icon.s-icon-polygon {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAACalBMVEUAAAAA//8AgP9Vqv9AgP8zmf8rgP9Jkv9AgP85jv+Ojo4zgP+ioqJAlf87if+dnZ03kv8ziP9Aj/85jv82hv89kv86i/83kP8zj/87if+dnZ05jv88iP84j/81j/86iv83iv82jf87if85jP83jP86i/85jv86iv85jf84iv83jP+bm5s6jP+ampo5jv84i/83jf83jP82iv+bm5s6jP82i/85jf9+mLo4i/84jP83jf+YmJg4jf83i/85jP+Tlpw5i/83jf83jP84jf83i/85jP85jf84jP84jf+ampo4jP84i/83jP+ZmZlAjvg4i/83jP85i/+ZmZk3jf85i/+Ela84i/84jP84jf+ampo4jf84i/+YmJg4i/84jP84jf84jP83jP9vlMaampo4jP83jf84jf84jP83jP84jP87i/o5jP84jf+YmJg4jP+ZmZk4jP84jP83i/85jP84jf83jP84jP84jP84jP85jP83jP85jf84jP+YmJhIju04i/84jP9zk8A4i/9Iju45jf84jP+ampo4jP84jP88jPo5jP84i/83jP9lks6YmJg4jP84jf84jP83jP84jP9DjvQ4jP+ZmZk4jP+ZmZk4jP83jP84jP84jP85jP84jP84jP83jP84jP84jP84jP85jP89jfk4jP84jP84jf+ZmZk4jP84jP84jP85jP+ZmZk4jP+RmKI4jP8+jfo4i/8+jPg4jP83jP84jP9wlMU4jP84jP84jP+ZmZk3i/44jP+ZmZk4jf84jP+ZmZk4jP84jP84jP84jP84jP84jP84jP84jP84jP+ZmZnk2CbVAAAAy3RSTlMAAQIDBAUGBwgJCQoLDA0NDg8QEhMVFhcZGhobHiAiIyUmJygqLC0wMTIzMzU1Njc4PD09PkJDQ0RJSk1OT1BQUVNUV1hZXl9gYmRlZmZobm9wc3R1dnd6e35/gIGEhYiJioqNjo+RkpSVmJmampudn6ChoqWmqKmqq6+wsbO0tba2t7e5urq7vLy9wMHCwsPExcbJycrKzM3Oz9LT1NXX2Nna3N3d3t/h4eLj5ebm6Ojp6err7e/w8PHy8/P09PT19vb3+Pn6+/z9/vrFw7kAAAABYktHRM1t0KNFAAADhElEQVRo3u3a51/TQBzH8VTcinuLOHEPBCeouMFRNy7cuAX3Btx7L6xb3Ipbq7gnivRzf5QPJLwgmOZyCQ/Q/p6l9+29Oy6/NtdqWqgqbvXIMlSPckDihaHiQ4gFcj6+qM6XI5KlH2SFkBBS4ZAEIcSBFkV1QAiR4L7RaYfxjN/b021jxJdzRuRc/mhXCU9KgLIILK3knlEnE7jz5tmTEvXszR0gs45bRuQVgPyk0reO/AqQ084do/dzgMfRxtu75AK86uuGMf4nwKWIsiPNswEKJjomKs8HYEutvw1W3wDAqirOjIaHAALzPSarbnohwMkmToy2OQDvh5on4vIAbkepGwPzAHK7BMt0vAvwfoiqMakQ4JTFa9HoCEAgxaNCVFsPQFpVy7WxDIDNtewbzc8CFEyXX+UXI+wane8DvOonl455CfC4l92mC3BDume0vgqQn2iz6QJ76svfJTwDsNOWw7f/uUOYZv+B7ZJ8YJH2n3qJtiz3Esc8V3kTNU3TOueaLpZupav/YYDsliqnVstsgMP9DVNqmmb8VD2ueGIVn8DHjTP+FVFsEXorkkLUm92fpmqGXCiqB0KI3VGao4raLYR4oM9YAtEDXiFEutMP03QhhFc/CCEh5N9B0ovqhFvICX1Gk7biCmLVuyou4tUr+YXf71/kjXWKxHoX+f3+F8nFE5cazQAy3LikyQS2m4z1AQLtnRttCoEYs9GzwHLnyArAZzo6CvjSyKnR8BMw0vz7+X1ghlNkJvAwyBXeNOBRVWdGlYfA1CCBenlAojMkCXjXIFhiCXDZ4wi5BCwOmmhVAPRzYgwAfkUGz2wDdjpBdgFbLTLdgUAHdaNdIRBtlToDpKkjq4HTlqnhQH5TVaPxV2CYZSzsFjBbFUkB7klcoU0GXtZQvHR4CkyS2aZ7DYxVQ8YBb+vJJBcCOUqbi55rwAK5i7KfwEAVJA4okNyX2ATsV0EOAhsls10BOtk3OgYA6R3pY8Ba+8g64Kh0ejDwo5ldo+l3YJD8KrkOzLWLzANu2liVo30+374we0bYPp/PJ797P+uJoWqbZ2sbs7MkkVTj98y65tm6xmzqf4nM0X9Y+myNfNazc2wiU/SDD9bIB/1gihNkZZpprXQN+YhpfQwhZZAJ401rgmtIea2uNfofFb5ZI9/07Jr/tq2UOzLG+IeemubZmsbsGC1UFaF+A3/z1LRfqk66AAAAAElFTkSuQmCC);
}
.el-radio-button.is-active .s-icon.s-icon-polygon {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAACEFBMVEUAAAD///9gosZ0AAAAr3RSTlMAAQIDBAUGBwgJCgsMDQ4PEBITFRYXGRobHiAiIyUmJygqLC0wMTIzNTY3ODw9PkJDRElKTU5PUFFTVFdYWV5fYGJkZWZobm9wc3R1dnd6e35/gIGEhYiJio2Oj5GSlJWYmZqbnZ+goaKlpqipqquvsLGztLW2t7m6u7y9wMHCw8TFxsnKzM3Oz9LT1NXX2Nna3N3e3+Hi4+Xm6Onq6+3v8PHy8/T19vf4+fr7/P3+9C+D0gAAAAFiS0dEr85sozEAAANwSURBVGje7dr5XwxxHMfxWRFRyBVClBSJJHJExbqLFMnNus8OSkKOdskVoujYLLslpX39i37Q9KjJ7HxnvtMPsZ/fZr/vnefu7Hc+O/PdVZRwjd9KrdJU6hggWWgqK4wYIO6swXKPIVKlblSFkTAy7pBsoDZusGqBbPuN5Xe0Z3zNSruNrd0NWqShd7uthKM4yGgETk2wz4ipBJp97W3Dqt3XDFTG2GXEvwLozRv5aE4PQFOCPcbqDoC2NO3jK1oButbaYTj7ABoXjB6JcwP075YmJpYCcHPq3wanXAXg/CQ5I7YOIFjq0Jl1hQMAj+fIGEuaAPyb9BPrfQDNidaNTB9A64pQmaSPAH7LPWbPAMATg2Mx6wFAsNhhhZh8BQBXpOHcOA3AjanmjbgGgP5C8Vn+YoFZI7kFoCtDLJ3eCdC2ymzTBXgn3DMWvQbozTXZdIGaGeJPia4AzLTl6PI/T4hQzL+wasEXFm/+rQ9ry2KHOL3DyoeoKIqS3Ko7WVJGVkYdgHu+lVNrvhugLkOzS0VRtN+q9RZPrKETuF67x78iFluE2oqEEL/UBVWmTw95PlgtQHWiIlWJ1UCLusdhyFATAlyyX6YuwKluhJEw8u8grsGqtwupV/eo01ZsQYx61/hFnGoVdHi93jJnuiyS7izzer0dBUM7HjFaAVTYcUtTCZTrjK0BgkvljcUDgO4BaQDOyCNnAY/u6Dage5asERsAcvSvz1uAg7LIIeBziDu8A8CXSDlj0mdgf4jAdB+QK4fkAd9nhkqcBF46pJBG4ETIxMJ+IEPGWAf8ig+duQ3clUGqgVsGmVQguMy6kTAApBmlnsn1yAvAU8PUFqB3rlVjdg+w2TAW8QE4bBUpBj4J3KHtBTqjLN46tAN7RJbpvgI7rCE7gW/TRZJlQJOlxUXHG+CY2E1ZH5BpBVkP9AuuS1wHaq0g94FrgtkUgOXmjaQgILwi/Qi4ZB65DDwUTm8Efs4za8z9AWwQnyVvgSNmkaPAexOzcrvH47kXYc6IuOfxeMRX74vaNDVNPztNmy0SRI5rrzNDLMjHaLPH/0ukRP1hKWCMBNRsiUlkn7rhN0b86sY+GeScS7fO2YYE0K1AGBmF7HLq1i7bkLGaXRfVPyr0GCM9avbif9tWxhzJ1/6hJ8T1ZJQ2m6+EazzUb1ZpL7nMYcMYAAAAAElFTkSuQmCC);
}
.s-icon.s-icon-rectangle {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAALVBMVEUAAACdnZ2Xl5eYmJiZmZmZmZmZmZmZmZmYmJiZmZmZmZk4jP98lbeZmZn///8t8ZxiAAAAC3RSTlMAGjFNX32CoLPO5hUiNAEAAAABYktHRA5vvTBPAAAArklEQVRYw2NgGAWkg1mrIKAAtxJ2qJKVUP7auxDQgFsLB1TJLTprURQUFPTFr+UKUIkQkhYBIGmLX8tlIMmIoeX0bpxgz1DTQob3SdLibGxsnItfyzWgEhO6JxiStVR0dJw509HREYBbC2sHRE07Qmj3bsI5EU3NqJZRLaNaRrWMahnVMqplVMuollEtA6WFjEbvIO4kktEZoU8vaYT3K8novA/SNEbGoMooIAUAABF2jY+JYPkUAAAAAElFTkSuQmCC);
}
.el-radio-button.is-active .s-icon.s-icon-rectangle {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAJFBMVEUAAAD///+0CY3pAAAAC3RSTlMAGjFNX32CoLPO5hUiNAEAAAABYktHRAsf18TAAAAAqklEQVRYw2NgGAWkg1mrIKAAtxJ2qJKVUP7q3RDQgFsLB1TJLjprURQUFPTGr2ULUIkQkhYBIGmNX8tmIMmIoQUvGGJayPA+SVqcjY2Ns/Fr2QZUYkL3BEOyloqOjt27Ozo6AnBrYe2AqGlHCO3eTTgnoqkZ1TKqZVTLqJZRLaNaRrWMahnVMqploLSQ0egdxJ1EMjoj9OkljfB+JRmd90GaxsgYVBkFpAAAyZJmP55ExscAAAAASUVORK5CYII=);
}
</style>