import { BookingForm } from "@/components/booking-form";
import { BrandMark } from "@/components/brand-mark";
import { services, serviceAreas, trustPoints } from "@/lib/site-data";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="shell">
          <header className="topbar">
            <div className="brand-lockup">
              <BrandMark />
              <div>
                <p className="eyebrow">Phoenix Metro premium cleaning</p>
                <h1>White Glove Cleaning</h1>
              </div>
            </div>
            <a className="phone-chip" href="tel:+17252519337">
              Call for same-week availability
            </a>
          </header>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="kicker">Luxury-level care without the luxury hassle</p>
              <h2>
                Sparkling homes, simple online booking, and full-payment checkout
                in minutes.
              </h2>
              <p className="lede">
                White Glove Cleaning helps Phoenix Metro households stay polished
                with recurring maintenance, deep cleans, and move-focused service
                delivered by detail-first professionals.
              </p>
              <div className="hero-actions">
                <a className="primary-button" href="#booking">
                  Book and pay online
                </a>
                <a className="secondary-button" href="#services">
                  Explore services
                </a>
              </div>
              <ul className="stat-row" aria-label="Company highlights">
                <li>
                  <strong>100%</strong>
                  <span>Secure Stripe checkout</span>
                </li>
                <li>
                  <strong>7 days</strong>
                  <span>Phoenix Metro availability</span>
                </li>
                <li>
                  <strong>Flat-rate</strong>
                  <span>Pricing with add-on options</span>
                </li>
              </ul>
            </div>

            <div className="hero-card">
              <p className="card-label">What clients book most</p>
              <div className="service-spotlight">
                <h3>Signature Deep Clean</h3>
                <p>
                  Kitchens, bathrooms, dusting, floors, baseboards, detail work,
                  and a high-touch finishing pass for that just-reset feeling.
                </p>
              </div>
              <div className="checklist">
                {trustPoints.map((point) => (
                  <div className="check-item" key={point.title}>
                    <span>{point.title}</span>
                    <small>{point.description}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section" id="services">
        <div className="shell">
          <div className="section-heading">
            <p className="section-kicker">Services</p>
            <h2>Built for the way Phoenix homes actually live</h2>
            <p>
              Start with a core cleaning package, then personalize it with home
              size adjustments and extra-detail add-ons during checkout.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.name}>
                <p className="service-price">From ${service.basePrice}</p>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section accent-section" id="areas">
        <div className="shell split-layout">
          <div>
            <p className="section-kicker">Service area</p>
            <h2>Serving the Phoenix Metro</h2>
            <p>
              We’re positioned for homes across the Valley, from quick recurring
              visits to move-out turnarounds and one-time reset cleanings.
            </p>
          </div>
          <div className="area-list" aria-label="Service areas">
            {serviceAreas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section" id="booking">
        <div className="shell booking-layout">
          <div className="section-heading compact">
            <p className="section-kicker">Book now</p>
            <h2>Choose your cleaning, confirm your details, and pay securely.</h2>
            <p>
              The booking tool calculates a live estimate and sends you into
              Stripe Checkout for full payment. You can update service details
              before paying.
            </p>
          </div>
          <BookingForm />
        </div>
      </section>

      <section className="content-section">
        <div className="shell final-cta">
          <div>
            <p className="section-kicker">Questions before booking?</p>
            <h2>We can help you choose the right cleaning plan.</h2>
            <p>
              Reach out for help with pricing, large homes, special requests, or
              move-in and move-out scheduling.
            </p>
          </div>
          <div className="cta-links">
            <a
              className="primary-button"
              href="mailto:whiteglovescleaningaz@gmail.com"
            >
              whiteglovescleaningaz@gmail.com
            </a>
            <a className="secondary-button" href="tel:+17252519337">
              (725) 251-9337
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
