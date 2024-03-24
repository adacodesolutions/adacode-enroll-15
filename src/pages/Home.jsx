import logo from "../assets/logo.png";
import "./Home.scss";

const Home = () => {
  return (
    <div className="hero_section">
      <section className="head_section">
        <img src={logo} />
        <h1>
          Ada<span>code </span>Solu<span>tions</span>
        </h1>
        <p className="quote">Excellence for tomorrows Innovators</p>
        <div className="blink_container">
          <div className="blink_button">
            <h5>15 Days Master Class for just 999Rs..!</h5>
          </div>
        </div>
        <div className="hero_details">
          <p>3rd Floor, 4 Wing Avenue, Panniyankara</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
