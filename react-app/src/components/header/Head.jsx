import React from "react";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";

const Head = ({ onHomeClick, onPlotRecClick, onContentRecClick, onAnalysisClick }) => {
  return (
    <header className={`header`}>
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem" onClick={onHomeClick}>Home</li>
          <li className="menuItem" onClick={onPlotRecClick}>Overview Rec</li>
          <li className="menuItem" onClick={onContentRecClick}>Content Rec</li>
          <li className="menuItem" onClick={onAnalysisClick}>Analysis</li>
        </ul>
      </ContentWrapper>
    </header>
  );
};

export default Head;