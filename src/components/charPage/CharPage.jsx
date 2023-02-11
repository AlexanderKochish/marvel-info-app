import React from "react";
import "./charPage.scss";
import AppBanner from "../appBanner/AppBanner";

const CharPage = ({ foundChar }) => {
  const altDesriptionText = !foundChar.description
    ? "No description this Character"
    : foundChar.description;

  return (
    <div className="charpage">
      <AppBanner />
      <div className="charpage__wrapper">
        <div className="charpage__img-wrapper">
          <img
            src={`${foundChar.thumbnail.path}.${foundChar.thumbnail.extension}`}
            alt="character"
          />
        </div>
        <div className="charpage__content">
          <h3>{foundChar.name}</h3>
          <p>{altDesriptionText}</p>
        </div>
      </div>
    </div>
  );
};

export default CharPage;
