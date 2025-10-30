export const dashboardConfig = [
  /*{
    id: "phased-cost",
    type: "barChart",
    title: "Phased Cost",
    filters: {
      key: "costType",
      options: [
        { label: "All", value: "all" },
        { label: "Estimated Gross Budget", value: "gross" },
        { label: "Funding Request", value: "funding" },
      ],
      default: "all"
    },
    width: "1/2",
    height: "lg",
    api: "/api/dashboard/phased-cost"
  },*/
  {
    id: "priority-score",
    type: "bubbleChart",
    title: "Projects by Priority Score",
    width: "1/1",
    height: "lg",
    api: "/api/dashboard/priority-score"
  },
  {
    id: "projects-per",
    type: "barChart",
    title: "Projects per",
    filters: {
      key: "dimension",
      options: [
        { label: "Primary Performance Outcome", value: "performance" },
        { label: "Primary Risk Mitigation", value: "risk" },
      ],
      default: "performance"
    },
    width: "1/1",
    height: "lg",
    api: "/api/dashboard/projects-per"
  }
];
