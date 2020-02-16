export function createBarChartData({ data, ...rest } = {}) {
  return {
    labels: data.map(({ label }) => label),
    datasets: [
      {
        data: data.map(({ count }) => count),
        ...rest
      }
    ]
  };
}

export function createToolTipConfig({
  backgroundColor = "#fff",
  titleFontColor = "#000",
  borderColor = "#3b3b3b",
  borderWidth = 0.5,
  bodyFontColor = "#000",
  bodySpacing = 10,
  xPadding = 15,
  yPadding = 15,
  cornerRadius = 0.15,
  color = "#000"
} = {}) {
  return {
    backgroundColor,
    titleFontColor,
    borderColor,
    borderWidth,
    bodyFontColor,
    bodySpacing,
    xPadding,
    yPadding,
    cornerRadius,
    color
  };
}

export function createPieChartData({ data, ...rest } = {}) {
  return {
    labels: data.map(({ label }) => label),
    datasets: [
      {
        data: data.map(({ count }) => count),
        backgroundColor: colorsArr,
        ...rest
      }
    ]
  };
}

const colorsArr = ["#000", "#e51e1e", "#6b269f", "#9de", "#2287"];
