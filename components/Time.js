import { formatInTimeZone } from "date-fns-tz";

export default function Time({ datetime }) {
  return (
    <time dateTime={datetime}>
      {formatInTimeZone(new Date(datetime), "Asia/Tokyo", "yyyy年MM月dd日")}
    </time>
  );
}
