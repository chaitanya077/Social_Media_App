import React from "react";
import { formatRelative } from "date-fns";
function Message({ photoUrl, createdAt, text, displayName }) {
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
    <div>
      {photoUrl ? (
        <img src={photoUrl} alt="Avatar" width={45} height={45} />
      ) : null}
      {displayName ? <p>{displayName}</p> : null}
      {createdAt?.seconds ? (
        <span className="">
              {formatDate(new Date(createdAt.seconds * 1000))}
            </span>
      ) : null}
      <p>{text}</p>
    </div>
    </>
  );
}

export default Message;
