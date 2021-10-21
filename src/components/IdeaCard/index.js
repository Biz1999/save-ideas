import React from "react";
import { BsTrash } from "react-icons/bs";

// import { Container } from './styles';

function IdeaCard() {
  return (
    <div className="idea">
      <div className="idea__main-info">
        <h2>Any content 1</h2>
        <h3>10/20/2021</h3>
        <BsTrash />
      </div>
      <p className="idea__short-descript">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has
      </p>
    </div>
  );
}

export default IdeaCard;
