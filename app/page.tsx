import { BookingForm } from "@/components/booking-form";
import { BrandMark } from "@/components/brand-mark";
import {
  activityFeed,
  comparisonRows,
  dashboardNav,
  featurePillars,
  filterChips,
  heroMetrics,
  pipelineStages,
  proofStats,
  spotlightCards,
  workflowSteps,
} from "@/lib/site-data";

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="shell">
          <header className="topbar">
            <div className="brand-lockup">
              <BrandMark />
              <div>
                <p className="eyebrow">Investor operating system</p>
                <h1>Prop Sniper</h1>
              </div>
            </div>
            <nav className="topbar-nav" aria-label="Primary">
              <a href="#platform">Platform</a>
              <a href="#workflow">Workflow</a>
              <a href="#pricing">Pricing</a>
            </nav>
            <a className="phone-chip" href="#pricing">
              Start your setup
            </a>
          </header>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="kicker">Modeled after the fast, all-in-one wholesaling feel of xLeads</p>
              <h2>Pull better property lists, run your lead pipeline, and launch outreach from one purple-black command center.</h2>
              <p className="lede">
                Prop Sniper is built for investors who want the SaaS speed of
                modern wholesaling tools without losing focus. Search, qualify,
                route, and activate leads in one tight flow.
              </p>
              <div className="hero-actions">
                <a className="primary-button" href="#pricing">
                  Start Prop Sniper
                </a>
                <a className="secondary-button" href="#platform">
                  Explore platform
                </a>
              </div>
              <ul className="stat-row" aria-label="Platform highlights">
                {heroMetrics.map((metric) => (
                  <li key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hero-panel">
              <div className="hero-appframe">
                <aside className="hero-appframe__sidebar" aria-label="Demo app navigation">
                  <div className="hero-appframe__brand">
                    <BrandMark />
                    <div>
                      <strong>Prop Sniper</strong>
                      <span>Acquisition OS</span>
                    </div>
                  </div>
                  <div className="hero-navlist">
                    {dashboardNav.map((item, index) => (
                      <span
                        className={index === 0 ? "hero-navlist__item hero-navlist__item--active" : "hero-navlist__item"}
                        key={item}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="hero-appframe__sidecard">
                    <small>Today</small>
                    <strong>18 hot leads</strong>
                    <span>Priority queue ready for SMS and dialer follow-up.</span>
                  </div>
                </aside>

                <div className="hero-panel__card hero-panel__card--primary">
                  <div className="signal-row">
                    <span className="signal-pill signal-pill--live">Live filters</span>
                    <span className="signal-pill">Maricopa County</span>
                    <span className="signal-pill">Updated 2m ago</span>
                  </div>
                  <div className="hero-panel__header">
                    <div>
                      <h3>Lead command view</h3>
                      <p>
                        Distressed absentee owners, high equity, recent tax
                        pressure, and quick-routing actions lined up in one
                        command center.
                      </p>
                    </div>
                    <div className="hero-scorecard">
                      <small>Lead score</small>
                      <strong>89</strong>
                    </div>
                  </div>

                  <div className="chip-cluster">
                    {filterChips.map((chip) => (
                      <span className="chip-cluster__item" key={chip}>
                        {chip}
                      </span>
                    ))}
                  </div>

                  <div className="hero-appgrid">
                    <div className="hero-stack">
                      {spotlightCards.map((card) => (
                        <article className="hero-stack__item" key={card.title}>
                          <strong>{card.title}</strong>
                          <span>{card.description}</span>
                        </article>
                      ))}
                    </div>

                    <div className="pipeline-preview">
                      <div className="pipeline-preview__header">
                        <strong>Pipeline board</strong>
                        <span>142 active leads</span>
                      </div>
                      <div className="pipeline-preview__columns">
                        {pipelineStages.map((stage) => (
                          <article className="pipeline-stage" key={stage.title}>
                            <small>{stage.title}</small>
                            <strong>{stage.count}</strong>
                            <span>Live records</span>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="activity-list" aria-label="Recent activity">
                    {activityFeed.map((item) => (
                      <div className="activity-list__item" key={item}>
                        <span />
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hero-proofbar" aria-label="Performance stats">
                {proofStats.map((item) => (
                  <div className="micro-card" key={item.label}>
                    <small>{item.label}</small>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section content-section--dense" id="platform">
        <div className="shell">
          <div className="section-heading">
            <p className="section-kicker">Platform</p>
            <h2>The all-in-one wholesaling rhythm, adapted for Prop Sniper.</h2>
            <p>
              The goal here is the same feeling the xLeads video sells: one tool
              that takes you from finding the record to working the deal, but
              with your own darker Prop Sniper identity.
            </p>
          </div>

          <div className="feature-grid">
            {featurePillars.map((pillar) => (
              <article className="feature-card" key={pillar.title}>
                <p className="card-label">{pillar.label}</p>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
                <ul>
                  {pillar.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="platform-strip" aria-label="Core modules">
            <article className="platform-strip__card">
              <p className="card-label">List intelligence</p>
              <strong>Saved stacks, territory slices, and filter presets</strong>
              <span>Built to feel instant, dense, and operator-friendly.</span>
            </article>
            <article className="platform-strip__card">
              <p className="card-label">Acquisition workflow</p>
              <strong>Hot-lead routing with next actions baked in</strong>
              <span>No spreadsheet hopping once a lead gets interesting.</span>
            </article>
            <article className="platform-strip__card">
              <p className="card-label">Contact activation</p>
              <strong>Skip trace, SMS, dialer, and dispo context in one stack</strong>
              <span>Closer to the xLeads promise, but in your own voice.</span>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section accent-section" id="workflow">
        <div className="shell split-layout">
          <div>
            <p className="section-kicker">Workflow</p>
            <h2>Designed to move like a lead machine, not a brochure site.</h2>
            <p>
              Instead of generic marketing sections, this layout leans into the
              fast-moving SaaS pattern from the reference: focused metrics,
              product cards, and a clear path into setup.
            </p>
          </div>
          <div className="workflow-list">
            {workflowSteps.map((item) => (
              <article className="workflow-card" key={item.step}>
                <span>{item.step}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="shell comparison-card">
          <div className="section-heading compact">
            <p className="section-kicker">Why it feels different</p>
            <h2>Prop Sniper now reads like a platform instead of a service flyer.</h2>
            <p>
              This section mirrors the comparison-heavy SaaS framing common in
              wholesaling tools, while staying grounded in your own branding.
            </p>
          </div>
          <div className="comparison-table" role="table" aria-label="Platform comparison">
            <div className="comparison-table__head" role="row">
              <span role="columnheader">Category</span>
              <span role="columnheader">Prop Sniper</span>
              <span role="columnheader">Old-school workflow</span>
            </div>
            {comparisonRows.map((row) => (
              <div className="comparison-table__row" role="row" key={row.label}>
                <span role="cell">{row.label}</span>
                <span role="cell">{row.propSniper}</span>
                <span role="cell">{row.legacy}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section" id="pricing">
        <div className="shell booking-layout">
          <div className="section-heading compact">
            <p className="section-kicker">Pricing and setup</p>
            <h2>Choose a Prop Sniper tier, tailor your workspace, and continue to secure checkout.</h2>
            <p>
              The checkout flow stays live, but the interface now feels like a
              product onboarding step instead of a cleaning quote form.
            </p>
          </div>
          <BookingForm />
        </div>
      </section>

      <section className="content-section">
        <div className="shell final-cta">
          <div>
            <p className="section-kicker">Launch faster</p>
            <h2>Get the xLeads-style energy with a Prop Sniper finish.</h2>
            <p>
              This version is set up to sell a platform: sharper hierarchy,
              dashboard cues, stronger conversion focus, and a purple-black
              visual system throughout.
            </p>
          </div>
          <div className="cta-links">
            <a className="primary-button" href="#pricing">
              Build your workspace
            </a>
            <a className="secondary-button" href="/admin/bookings">
              View admin dashboard
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
