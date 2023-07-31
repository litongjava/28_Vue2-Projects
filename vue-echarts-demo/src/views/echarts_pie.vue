<template>
<div ref="main" class="main"></div>
</template>

<script>
import echarts from "echarts"

export default {
  name: "echarts_pie",
  mounted() {
    let myChart = echarts.init(this.$refs.main);

    // 指定图表的配置项和数据
    let option = {
      title: {
        text: '饼图示例',
        subtext: '虚构数据',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['类别1', '类别2', '类别3', '类别4', '类别5']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '50%', // 饼图的半径
          data: [
            {value: 335, name: '类别1'},
            {value: 310, name: '类别2'},
            {value: 234, name: '类别3'},
            {value: 135, name: '类别4'},
            {value: 1548, name: '类别5'}
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