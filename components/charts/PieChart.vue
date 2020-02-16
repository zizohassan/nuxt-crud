<script>
import { Pie } from "vue-chartjs";
import { createToolTipConfig, createPieChartData } from "./_chartsHelpers";

export default {
  extends: Pie,
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
      createPieChartData({ data: this.data }),
      this.options || pieChartOptions
    );
  }
};

const pieChartOptions = {
  legend: {
    position: "bottom",
    labels: {
      padding: 10,
      usePointStyle: true,
      fontSize: 10,
      fontFamily: "Cairo , sans-serif"
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: false
  },
  layout: {
    padding: {
      bottom: 20
    }
  },
  tooltips: createToolTipConfig()
};
</script>
