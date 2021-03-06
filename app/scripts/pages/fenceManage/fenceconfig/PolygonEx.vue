<template>
  <div>
    <bm-polygon
      v-for="(item, index) in polygons"
      :path="item.path"
      :editing="item.editing"
      :key="index"
      @ready="onReady($event)"
      @rightclick="rightClick(index, $event)"/>
  </div>
</template>
<script>
  import commonMixin from 'vue-baidu-map/components/base/mixins/common.js'
  import BmPolygon from './Polygon'

  export default {
    name: 'BmPolygonEx',
    components: { BmPolygon },
    mixins: [commonMixin('overlay')],
    props: {
      polygonData: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        polygons: []
      }
    },
    watch: {
      polygonData:{
         handler(val, oldVal) {
          this.reload()
        },
        deep: true
      }
    },
    methods: {
      load() {
        // 由于mix调用，该函数必须存在
        const { BMap, map } = this
         let _that=this;
        // 防止重复添加菜单
        if (map.menu === undefined) {
          var that = this
          var { polygons } = this

          // 添加多边形
          var addPolygonCallback = function() {
            polygons.push({
              editing: false,
              state: 'pre_draw',
              path: []
            })
          }

          var menu = new BMap.ContextMenu()
          menu.addItem(new BMap.MenuItem('添加围栏', addPolygonCallback))
          map.addContextMenu(menu)
          // 暂存菜单
          map.menu = menu

          // 点击地图
          var clickCallback = function(e) {
           
            var polygon = polygons[polygons.length - 1]
            if(polygon.state=='pre_draw'){
                polygon.path.push(e.point)
                polygon.state = 'draw'
            }else if(polygon.state=='draw'){
               polygon.path.push(e.point)
            }
          }
          // 鼠标移动
          var mousemoveCallback = function(e) {
            if (polygons.length > 0 && polygons[polygons.length - 1].state === 'draw') {
              var path = polygons[polygons.length - 1].path
              if (path.length === 1) {
                path.push(e.point)
              } else if (path.length > 1) {
                // 调用vue的$set修改数组，可触发更新
                that.$set(path, path.length - 1, e.point)
              }
            }
          }
          map.addEventListener('click', clickCallback)
          map.addEventListener('mousemove', mousemoveCallback)
        }
        var polygons = []
        if (this.polygonData.length > 0) {
          this.polygonData.forEach(function(item, index, array) {
            polygons.push({
              state: 'idle',
              editing: false,
              path: item.path,
              data: item
            })
          })
        }
       this.polygons = polygons
      },
      onReady({ BMap, map }) {
      },
      rightClick(index, e) {
        var polygonObj = e.currentTarget
        if (polygonObj.menu === undefined) {
          console.log('%c 菜单不存在，创建', 'color: #CC00FF;')
          var that = this
          var { polygons, BMap } = this
          var menus = []
          // 变更状态函数
          var changeState = function(newState) {
            polygons[index].state = newState
            if (polygonObj.menu !== undefined) {
              polygonObj.removeContextMenu(polygonObj.menu)
            }
            // 一旦状态变更，弹出的菜单也会变更。故将菜单置空，等显示菜单时重建
            polygonObj.menu = undefined
          }
          switch (polygons[index].state) {
            case 'idle':
              menus.push({
                title: '修改多边形',
                callback: function() {
                  console.log('%c 修改围栏', 'color: #CC00FF;')
                  polygons[index].editing = true
                  changeState('modify')
                }
              })
              menus.push({
                title: '删除多边形',
                callback: function() {
                  console.log('%c 删除围栏', 'color: #CC00FF;')
                  if (polygons.length > index) {
                    // 删除多边形需要先触发事件，否则数据删掉就无法返回了
                    that.$emit('delete', { ...polygons[index] })
                    polygons.splice(index, 1)
                  }
                }
              })
              break
            case 'draw':
              menus.push({
                title: '添加结束',
                callback: function() {
                  console.log('%c 添加结束', 'color: #CC00FF;')
                  changeState('idle')
                  // 移除最后一个点，该点由鼠标移动生成
                  polygons[polygons.length - 1].path.pop()
                  if (polygons[polygons.length - 1].path.length < 3) {
                    polygons.pop()
                  } else {
                    that.$emit('drawover', polygons[polygons.length - 1])
                  }
                }
              })
              break
            case 'modify':
              menus.push({
                title: '修改结束',
                callback: function() {
                  console.log('%c 修改结束', 'color: #CC00FF;')
                  changeState('idle')
                  polygons[index].editing = false
                  that.$set(polygons[index], 'path', polygonObj.getPath())
                  that.$emit('modifyover', polygons[index])
                }
              })
              break
            default:
              break
          }

          var menu = new BMap.ContextMenu()
          menus.forEach(function(item, index, array) {
            menu.addItem(new BMap.MenuItem(item.title, item.callback.bind(polygonObj)))
          })
          polygonObj.addContextMenu(menu)
          polygonObj.menu = menu

          // 添加菜单后不会立即弹出，需额外触发一次右键点击事件
          polygonObj.dispatchEvent('rightclick', e)
        }
      }
    }
  }
</script>