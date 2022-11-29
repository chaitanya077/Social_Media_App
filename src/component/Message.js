import React from "react";
import { formatRelative } from "date-fns";
import { Avatar } from "@mui/material";
import "../styles/chat.css";
import PropTypes from 'prop-types';
function Message({
    createdAt = null,
    text = '',
    displayName = '',
    photoUrl = '',
  }) {
    const formatDate = date => {
        let formattedDate = '';
        if (date) {
          // Convert the date in words relative to the current date
          formattedDate = formatRelative(date, new Date());
          // Uppercase the first letter
          formattedDate =
            formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        }
        return formattedDate;
      };
  return (
    <>
    <div className="custommess2">
    <div className="row">
        <div className="col-2 pe-0">
        {true ? (
          <Avatar className="post_avatar " alr="Avatar" src="data:image/jpeg;base64,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" />
      ) : null}
        </div>
        <div className="col-6 px-0">
        {displayName ? <p>{displayName}</p> : null}
      {createdAt?.seconds ? (
        <span className="custommess1">
              {formatDate(new Date(createdAt.seconds * 1000))}
            </span>
      ) : null}
        </div>
    </div>
      
      
      <p className="custommess7 py-2">{text}</p>
    </div>
    </>
  );
}
// s
  
  export default Message;
