import "../styles/Footer.css";
import Section from "./Section";

const Footer = () => {
  return (
    <footer>
      <Section innerClassName={"footer"}>
        @ Copyright {new Date().getFullYear()}. All rights reserved |  Developed by Tech 231 Liberia Limited.
      </Section>
    </footer>
  );
};

export default Footer;
