import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ALL_PRODUCTS } from "../data/catalog";
import collage from "../assets/products/catalog-collage.png";
import Mascot3D from "../components/Mascot3D";
import ReviewBoard from "../components/ReviewBoard";

const pick = (cat) => ALL_PRODUCTS.find((p) => p.category === cat);

function Home() {
  // scroll reveal (Apple-style)
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  const best = [
    pick("Folder"),
    pick("File"),
    pick("Crayons & Chalks"),
    pick("Pens"),
  ].filter(Boolean);
  while (best.length < 4 && ALL_PRODUCTS[best.length]) best.push(ALL_PRODUCTS[best.length]);

  const folderImg = pick("Folder")?.front;
  const fileImg = pick("File")?.front || pick("Binder")?.front;
  const crayonImg = pick("Crayons & Chalks")?.front;

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-pad">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">
              Notebooks &amp; custom stationery
            </span>
            <h1 className="display">
              <em>
                Every ambition<br />needs preparation.
              </em>
            </h1>
            <p className="lede">
              Premium notebooks, executive diaries and custom-branded
              stationery — made in India on proper 100&nbsp;GSM paper,
              finished to last the year you bought them.
            </p>
            <div className="cta-row">
              <Link className="alink" to="/catalog">
                Shop the collection <span className="arr">›</span>
              </Link>
              <Link className="alink" to="/customization">
                Customise yours <span className="arr">›</span>
              </Link>
            </div>
          </div>

          <div className="stage">
            <img src={collage} alt="Noted by 4 Knotts product range" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="band about" id="about">
        <div className="wrap about-grid">
          <div className="reveal">
            <span className="eyebrow">About Noted</span>
            <h2>
              Reaching new<br />heights, page by page.
            </h2>
            <p className="lede" style={{ marginTop: 18 }}>
              A trusted name in Indian stationery, Noted by 4 Knotts is built
              for people who still believe a blank page is worth the trouble.
              From students and writers to founders and boardrooms — we make
              notebooks, folders and custom-branded stationery worth keeping.
            </p>
            <div className="cta-row" style={{ marginTop: 26 }}>
              <Link className="alink" to="/catalog">
                Explore the range <span className="arr">›</span>
              </Link>
              <Link className="alink" to="/wholesale">
                Wholesale &amp; corporate <span className="arr">›</span>
              </Link>
            </div>
          </div>
          <div className="reveal" style={{ display: "flex", justifyContent: "center" }}>
            <Mascot3D />
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="band-2" id="bestsellers">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Our best sellers</span>
            <h2>Tried, tested &amp; loved.</h2>
            <p className="lede" style={{ margin: "14px auto 0" }}>
              The products our customers keep coming back for.
            </p>
          </div>
          <div className="best-grid">
            {best.map((p) => (
              <Link className="pcard reveal" to={`/product/${p.slug}`} key={p.id}>
                <div className="art">
                  <img src={p.front} alt={p.title} />
                </div>
                <div className="b">
                  <h3>{p.title}</h3>
                  <p>
                    {p.sub ? `${p.sub} · ` : ""}₹{p.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="best-foot reveal">
            <Link className="alink" to="/catalog">
              View all products <span className="arr">›</span>
            </Link>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section id="collection">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Explore</span>
            <h2>The collection.</h2>
            <p className="lede" style={{ margin: "14px auto 0" }}>
              Ranges made properly — for every desk and every kind of
              working day.
            </p>
          </div>
          <div className="col-grid">
            <Link className="col-card light reveal" to="/catalog">
              <div className="col-text">
                <h2>Folders</h2>
                <p>Translucent, corporate &amp; modern — built for daily use.</p>
              </div>
              {folderImg && <div className="col-art"><img src={folderImg} alt="" /></div>}
              <div className="col-foot"><span className="alink">Explore <span className="arr">›</span></span></div>
            </Link>

            <Link className="col-card dark reveal" to="/catalog">
              <div className="col-text">
                <h2>Files &amp; binders</h2>
                <p>Corporate finish, secure closure — for the corner office.</p>
              </div>
              {fileImg && <div className="col-art"><img src={fileImg} alt="" /></div>}
              <div className="col-foot"><span className="alink">Explore <span className="arr">›</span></span></div>
            </Link>

            <Link className="col-card light reveal" to="/catalog">
              <div className="col-text">
                <h2>Crayons &amp; pens</h2>
                <p>Bright, smooth, non-toxic — for creators big and small.</p>
              </div>
              {crayonImg && <div className="col-art"><img src={crayonImg} alt="" /></div>}
              <div className="col-foot"><span className="alink">Explore <span className="arr">›</span></span></div>
            </Link>
          </div>
        </div>
      </section>

      {/* DIFFERENCE */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Why Noted</span>
            <h2>The details others skip.</h2>
          </div>
          <div className="diff-grid">
            {[
              ["📄", "100 GSM paper", "Zero bleed-through. Smooth, fountain-pen friendly, on every page."],
              ["🎨", "25+ designs", "From quiet and minimal to bold and statement — a finish for every shelf."],
              ["✦", "Custom branding", "Logos, monograms and full-cover prints, produced to spec."],
              ["📦", "Bulk-ready", "Schools, offices and corporates supplied at scale — on time, on spec."],
              ["🌱", "Eco-conscious", "Recyclable packaging and responsibly sourced paper, as standard."],
              ["🚚", "Pan-India shipping", "Tracked to your door, anywhere in the country."],
            ].map(([ico, h, p]) => (
              <div className="fcard reveal" key={h}>
                <div className="fico">{ico}</div>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RATINGS — write & post a review */}
      <ReviewBoard />

      {/* QUOTE */}
      <section className="quote">
        <div className="wrap reveal">
          <h2>“Creativity flows when curiosity is stoked.”</h2>
          <div className="author">— Noted by 4 Knotts</div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner" id="wholesale">
        <div className="wrap reveal">
          <h2>Bulk orders &amp; corporate gifting.</h2>
          <p>
            Schools, offices and corporates stock up with us — predictable lead
            times, GST invoicing and a dedicated account manager from quote to
            delivery.
          </p>
          <Link className="alink" to="/wholesale">
            Request wholesale pricing <span className="arr">›</span>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
