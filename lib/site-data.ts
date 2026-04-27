export const heroMetrics = [
  { value: "10k+", label: "distressed records scanned weekly" },
  { value: "< 5 min", label: "from search to skip-trace workflow" },
  { value: "1 stack", label: "lists, pipeline, outreach, and follow-up" },
] as const;

export const spotlightCards = [
  {
    title: "Fast List Building",
    description:
      "Filter owner data, distress signals, equity, absentee tags, and neighborhood patterns in one workspace.",
  },
  {
    title: "Live Lead Routing",
    description:
      "Push hot prospects into a pipeline, assign next actions, and keep your team synced without spreadsheet drift.",
  },
  {
    title: "Outbound Ready",
    description:
      "Prep skip trace, SMS, and dialer workflows from the same lead profile so outreach starts immediately.",
  },
] as const;

export const featurePillars = [
  {
    label: "Data Engine",
    title: "Target the right properties before everyone else does.",
    description:
      "Build sniper lists around equity, owner type, distress triggers, lien signals, and neighborhood momentum instead of generic county dumps.",
    bullets: ["Equity and absentee filters", "Saved search presets", "Map-first territory review"],
  },
  {
    label: "Pipeline",
    title: "Work every lead inside a tight, visual acquisition flow.",
    description:
      "Move leads from fresh pull to contacted, negotiating, and closed with clear status ownership and action prompts.",
    bullets: ["Kanban-style lead stages", "Activity notes and reminders", "Priority scoring for follow-up"],
  },
  {
    label: "Outreach",
    title: "Launch contact faster with fewer tool handoffs.",
    description:
      "Queue skip tracing, tee up messaging, and keep lead context attached to every outbound attempt.",
    bullets: ["Skip trace-ready records", "SMS and dialer positioning", "Conversation-linked lead history"],
  },
] as const;

export const comparisonRows = [
  {
    label: "Lead discovery",
    propSniper: "Stacked filters with territory review",
    legacy: "CSV exports and manual cleanup",
  },
  {
    label: "Pipeline visibility",
    propSniper: "Stage-based board with next actions",
    legacy: "Scattered notes across sheets and CRMs",
  },
  {
    label: "Outbound prep",
    propSniper: "Lead record ready for tracing and outreach",
    legacy: "Jumping between third-party apps",
  },
] as const;

export const workflowSteps = [
  {
    step: "01",
    title: "Build a sniper list",
    description:
      "Search by area, distress indicators, property profile, and owner characteristics to isolate the best-fit opportunities.",
  },
  {
    step: "02",
    title: "Qualify and route leads",
    description:
      "Drop promising records into your active pipeline, flag urgency, and assign follow-up before momentum fades.",
  },
  {
    step: "03",
    title: "Activate outreach",
    description:
      "Move directly into skip trace and contact workflows with the property context preserved the whole way through.",
  },
] as const;

export const dashboardNav = [
  "Command",
  "Lists",
  "Pipeline",
  "Outreach",
  "Dispo",
] as const;

export const filterChips = [
  "Absentee owners",
  "High equity",
  "Tax delinquent",
  "Vacant",
  "Pre-foreclosure",
] as const;

export const pipelineStages = [
  { title: "New pull", count: 48 },
  { title: "Skip traced", count: 31 },
  { title: "Contacted", count: 18 },
  { title: "Offers out", count: 6 },
] as const;

export const activityFeed = [
  "7 new absentee-owner records matched your Phoenix West preset",
  "3 leads moved into hot follow-up after trace results returned",
  "1 negotiation task due in the next 45 minutes",
] as const;

export const proofStats = [
  { value: "1,284", label: "records in active stack" },
  { value: "62", label: "fresh traces this week" },
  { value: "14", label: "hot leads waiting on contact" },
  { value: "3.4x", label: "faster than spreadsheet chasing" },
] as const;
