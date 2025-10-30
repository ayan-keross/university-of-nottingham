import { BarChartWidget } from "@/components/charts/barChartWidget";
import BubbleChartWidget from "@/components/charts/bubbleChartWidget";


export const widgetMap: Record<string, any> = {
  barChart: BarChartWidget,
  bubbleChart: BubbleChartWidget,
};
