import React from "react";

import "./newcampground.scss";

const NewCampground = () => (
  <div className="container">
    <h2 className="heading">Ajouter un spot de camping sauvage</h2>
    <div className="content" >
      <form className="form">
        <label className="label">
          Titre* :
          <input type="text" value="" />
        </label>
        <label className="label">
          URL de l'image* :
          <input type="text" value="" />
        </label>
        <label className="label">
          Description* :
          <textarea value="" />
        </label>
        <label className="label">
          Pays* :
          <input type="text" value="" />
        </label>
      </form>
    </div>
    <div className="actions">
      <input type="submit" value="Annuler" />
      <input type="submit" value="Valider" />
    </div>
  </div>
);

export default NewCampground;