import React from "react";
import { BsTrash } from "react-icons/bs";
import { format } from "date-fns";

// import { Container } from './styles';

function IdeaCard(props) {
  // const ideaDate = format(
  //   new Date(props?.idea?.created_at),
  //   " hh:mm dd/MM/yyyy"
  // );
  return (
    <div className="idea">
      <div className="idea__main-info">
        <h2>{props?.idea?.title}</h2>
        <h3>{props?.idea?.created_at}</h3>
        <BsTrash />
      </div>
      <p className="idea__short-descript">{props?.idea?.content_idea}</p>
    </div>
  );
}

export default IdeaCard;
