<script>
import { Bar } from "vue-chartjs";
import { createToolTipConfig, createBarChartData } from "./chartsHelpers";

export default {
  extends: Bar,

  props: {
    data: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      required: false
    }
  },

  mounted() {
    this.renderChart(
      createBarChartData({ data: this.data }),
      this.options || barChartOptions
    );
  }
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
  tooltips: createToolTipConfig()
};
</script>
