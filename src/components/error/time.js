import React from "react";
import { distanceInWordsToNow, format } from "date-fns";

export default function time({ timestamp }) {
  return timestamp ? (
    <div style={{ fontSize: 14 }}>
      {distanceInWordsToNow(new Date(parseInt(timestamp)), { addSuffix: true })}
      <span className="text-muted d-block">{format(new Date(parseInt(timestamp)), "MMM d, YYYY h:mm:ss A")}</span>
    </div>
  ) : null;
}
