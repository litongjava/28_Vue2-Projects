<template>
<div class="main" ref="main"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: "echarts_circle_pie.vue",
  mounted() {
    let myChart = echarts.init(this.$refs.main);

    // 指定图表的配置项和数据
    let option = {
      title: {
        text: '底部标题',
        left: 'center',
        bottom: 0
      },
      series: [
        {
          name: '圆环',
          type: 'pie',
          radius: ['50%', '70%'], // 设置内外半径来创建圆环
          color: ['#000000'], // 设置圆环颜色为黑色
          label: {
            position: 'center',
            formatter: '50%', // 中间显示的百分比
            fontSize: 20,
            color: '#000000' // 百分比文字颜色
          },
          labelLine: {
            show: false
          },
          data: [
            {value: 50, name: '圆环'}
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
}
</script>

<style scoped>
  .main {
    height: 500px;
  }
</style>