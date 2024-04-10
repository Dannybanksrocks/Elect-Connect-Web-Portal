import "../styles/GridItem.css";

export const GridItem = ({ centeredTitle, grid, children, title, filter }) => (
  <div className={`grid-item grid-${grid}`}>
    <div className="grid-header">
      <div className="grid-title">
        <div
          className={`grid-title-text ${
            centeredTitle && "grid-title-text-centered"
          }`}
        >
          {title}
        </div>
        {filter && filter}
      </div>
    </div>
    <div className="grid-children">{children}</div>
  </div>
);
