import "../styles/Section.css";

const Section = (props) => {
  return (
    <div
      style={{ background: props.background }}
      className={`custom-section ${props.className}`}
    >
      <div className={`custom-section-inner ${props.innerClassName}`}>
        {props.children}
      </div>
    </div>
  );
};

export default Section;
