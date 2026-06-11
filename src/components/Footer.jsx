import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer id="contact">
      <div className="wrap">
        <div className="foot-cols">
          <div>
            <h4>Products</h4>
            <Link to="/catalog">Notebooks</Link>
            <Link to="/catalog">Folders &amp; Files</Link>
            <Link to="/catalog">Crayons &amp; Chalks</Link>
            <Link to="/catalog">Pens &amp; Writing</Link>
            <Link to="/catalog">All Products</Link>
          </div>
          <div>
            <h4>Services</h4>
            <Link to="/wholesale">Wholesale</Link>
            <Link to="/customization">Custom Branding</Link>
            <Link to="/wholesale">Corporate Gifting</Link>
            <Link to="/wholesale">Bulk Orders</Link>
          </div>
          <div>
            <h4>About</h4>
            <Link to="/">About Noted</Link>
            <Link to="/">Sustainability</Link>
            <Link to="/">Press</Link>
            <Link to="/">Careers</Link>
          </div>
          <div>
            <h4>Support</h4>
            <Link to="/wholesale">Contact Us</Link>
            <Link to="/dashboard">Track Order</Link>
            <Link to="/terms">Returns</Link>
            <Link to="/terms">FAQ</Link>
          </div>
        </div>

        <div className="foot-bot">
          <span>© {new Date().getFullYear()} Noted by 4 Knotts. All rights reserved.</span>
          <div className="legal">
            <Link to="/terms">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/terms">Cookie Settings</Link>
            <span>Made in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
