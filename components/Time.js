import { formatInTimeZone } from "date-fns-tz";

export default function Time({ date }) {
  const isoString = `${date}T00:00+0900`;
  return (
    <time dateTime={isoString}>
      {formatInTimeZone(new Date(isoString), "Asia/Tokyo", "yyyy年MM月dd日")}
    </time>
  );
}

/**
 * @param {string} dateString
 * @returns {string}
 */
function dateStringToIsoString(dateString) {
  return new Date(`${dateString}T00:00+0900`);
}
