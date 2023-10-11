export const calculateTime = (time, hoursToAdd) => {
  try {
    let [hours, minutes, period] = time.split(" ");
    if (hoursToAdd) {
      if (hours == 12 && hoursToAdd < 12) {
        period = period === "AM" ? "AM" : "PM";
      } else if (period === "AM" && parseInt(hours) + hoursToAdd >= 12) {
        period = "PM";
      } else if (period === "PM" && parseInt(hours) + hoursToAdd >= 12) {
        period = "AM";
      }
      hours = (parseInt(hours) + hoursToAdd) % 12;
      hours = hours === 0 ? 12 : hours;
    }
    return `${hours}:${minutes} ${period}`;
  } catch (error) {
    console.warn("Error fetching sleeptimes", error);
  }
};
