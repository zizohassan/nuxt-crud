<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: ["data", "options"],
  data() {
    return {
      opt: barChartOptions
    };
  },
  mounted() {
    // this.opt.scales.yAxes[0].ticks.min = this.options.min;
    // this.opt.scales.yAxes[0].ticks.max = this.options.max;
    // this.opt.scales.yAxes[0].ticks.stepSize = this.options.stepSize;
    this.renderChart({
      labels: [],
      datasets: [
        {
          label: "HEY",
          // borderColor: "#000",
          // backgroundColor: "#FFF",
          data: [12],
          borderWidth: 2
        },
        {
          label: "HEY",
          // borderColor: "#000",
          // backgroundColor: "#FFF",
          data: [50],
          borderWidth: 2
        }
      ]
    });
  }
};

const chartTooltip = {
  backgroundColor: "#fff",
  titleFontColor: "#000",
  // borderColor: ThemeColors().separatorColor,
  borderWidth: 0.5,
  bodyFontColor: "#000",
  bodySpacing: 10,
  xPadding: 15,
  yPadding: 15,
  cornerRadius: 0.15,
  color: "#000"
};

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        gridLines: {
          display: true,
          lineWidth: 1,
          color: "rgba(0,0,0,0.1)",
          drawBorder: false,
          fontFamily: "Cairo , sans-serif"
        },
        ticks: {
          beginAtZero: true,

          padding: 20,
          fontFamily: "Cairo , sans-serif"
        }
      }
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
          fontFamily: "Cairo , sans-serif"
        }
      }
    ]
  },
  legend: {
    display: false
  },
  tooltips: chartTooltip
};
</script>
