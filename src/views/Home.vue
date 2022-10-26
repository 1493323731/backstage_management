<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card" style="margin-bottom: 70px">
        <div class="user">
          <img src="@/assets/images/user.png" alt="" />
          <div class="userinfo">
            <p class="name">{{ privilege === "1" ? "123" : "666" }}</p>
            <P class="access">{{ privilege === "1" ? "超级用户" : "普通用户" }}</P>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-10-20</span></p>
          <p>上次登录地点：<span>秦皇岛</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 355px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column v-for="(val, key) in tableLabel" :prop="key" :label="val" :key="key">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="text">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <div ref="line_chart" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px; width: 48%">
          <div ref="histogram" style="height: 260px"></div>
        </el-card>
        <el-card style="height: 260px; width: 48%">
          <div ref="pie_chart" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getHomeData } from "../api";
// 引入echarts
import * as echarts from "echarts";
import Cookie from "js-cookie"
export default {
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "这些不是服务器数据",
          value: 666,
          icon: "umbrella",
          color: "#2ec7c9",
        },
        {
          name: "文件夹",
          value: 120,
          icon: "folder-add",
          color: "#ffb980",
        },
        {
          name: "没什么用的耳机",
          value: 81,
          icon: "headset",
          color: "#5ab1ef",
        },
      ],
      privilege: Cookie.get("privilege")
    };
  },
  mounted() {
    //getData返回一个Promise对象
    getHomeData().then(({ data }) => {
      // 基于准备好的dom，初始化折线图echarts实例
      const line_chart = echarts.init(this.$refs.line_chart);
      let line_chart_option = {
        yAxis: {},
      };
      //准备左侧表格数据
      const { tableData, orderData, userData, videoData } = data.data;
      this.tableData = tableData;
      //准备折线图配置
      const xAxis = Object.keys(orderData.data[0]);
      const xAxisData = { data: xAxis };
      line_chart_option.xAxis = xAxisData;
      line_chart_option.legend = xAxisData;
      line_chart_option.series = [];
      xAxis.forEach((key) => {
        line_chart_option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      // 使用刚指定的配置项和数据显示折线图
      line_chart.setOption(line_chart_option);
      //准备柱状图配置
      // 基于准备好的dom，初始化柱状图echarts实例
      const histogram = echarts.init(this.$refs.histogram);
      //准备柱状图配置
      let histogram_option = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["deepskyblue", "aqua"],
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      // 使用刚指定的配置项和数据显示柱状图
      histogram.setOption(histogram_option);
      // 基于准备好的dom，初始化柱状图echarts实例
      const pie_chart = echarts.init(this.$refs.pie_chart);
      //准备饼状图配置
      let pie_chart_option = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "skyblue",
          "deepskyblue",
          "aqua",
          "#ff7070",
          "#ffdc60",
          "#9fe080",
        ],
        series: [
          {
            data: videoData,
            type: "pie",
          },
        ],
      };
      // 使用刚指定的配置项和数据显示饼状图
      pie_chart.setOption(pie_chart_option);
    });
  },
};
</script>

<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;

  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .userinfo {
    .name {
      font-size: 15px;
      margin-bottom: 10px;
    }

    .access {
      font-size: 13px;
      color: #666;
    }
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;

    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}

.el-table {
  font-size: 1px;
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }

  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .price {
      font-size: 16px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }

    .text {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }

  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}

.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>