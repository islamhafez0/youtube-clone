import { formatDistanceToNow } from "date-fns";

export function formatNumber(number: string): string {
  let num = parseInt(number, 10);
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return num.toString();
  }
}

export function formatYouTubeDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return "0:00";
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  const formattedMinutes =
    hours > 0 ? String(minutes).padStart(2, "0") : String(minutes);
  const formattedSeconds = String(seconds).padStart(2, "0");
  return hours > 0
    ? `${hours}:${formattedMinutes}:${formattedSeconds}`
    : `${formattedMinutes}:${formattedSeconds}`;
}

export function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  const formattedDate = Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
  return formattedDate;
}

export function formatTimeAgo(timestamp: string) {
  return formatDistanceToNow(timestamp, { addSuffix: true });
}
