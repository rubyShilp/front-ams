<template>
  <div class="map-bg">
    <div class="page">
      <div class="main">
        <div class="page-map-left"></div>
        <div class="page-midd">
          <h1>累计学生总人数</h1>
          <p class="midd-p">4,823,084,667</p>
          <div id="scrollMap"></div>
        </div>
        <div class="page-map-right"></div>
      </div>
      <div class="fotter">
        <div class="data-core">
          <ul>
            <li class="core-font">
              <p>全国数据中心</p>
              <p>可用性(SLA)</p>
            </li>
            <li class="core-li-canvar">
              <span class="core-canvars" id="canvasId01"></span>
              <span class="core-span">
                <span class="core-rate"><i id="showNum01">0</i>%</span><br />
                <span class="core-city">北京</span>
              </span>
            </li>
            <li class="core-li-canvar">
              <span class="core-canvars" id="canvasId02"></span>
              <span class="core-span">
                <span class="core-rate"><i id="showNum02">0</i>%</span><br />
                <span class="core-city">上海</span>
              </span>
            </li>
            <li class="core-li-canvar">
              <span class="core-canvars" id="canvasId03"></span>
              <span class="core-span">
                <span class="core-rate"><i id="showNum03">0</i>%</span><br />
                <span class="core-city">深圳</span>
              </span>
            </li>
            <li class="core-li-canvar">
              <span class="core-canvars" id="canvasId04"></span>
              <span class="core-span">
                <span class="core-rate"><i id="showNum04">0</i>%</span><br />
                <span class="core-city">杭州</span>
              </span>
            </li>
            <li class="core-li-canvar">
              <span class="core-canvars" id="canvasId05"></span>
              <span class="core-span">
                <span class="core-rate"><i id="showNum05">0</i>%</span><br />
                <span class="core-city">广州</span>
              </span>
            </li>
          </ul>
        </div>
        <div class="core-fotter">
          <ul>
            <li>
              <i><img src="../../../images/27001.png"/></i>
              <span>ISO27001 信息安全安全管理体系认证</span>
            </li>
            <li>
              <img src="../../../images/27018.png" />
              <span>ISO27018公有云个人信息保护管理体系</span>
            </li>
            <li>
              <img src="../../../images/cloud.png" />
              <span>可信云服务认证</span>
            </li>
            <li>
              <img src="../../../images/djcp.png" />
              <span>公安部信息安全等级保护三级</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./mainMap.js"></script>
