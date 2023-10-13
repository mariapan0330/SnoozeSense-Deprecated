export const calculateTime = (
  time: string,
  hoursToAdd?: number,
  minutesToAdd?: number
) => {
  try {
    let [hours, minutes, period] = time.split(" ");
    if (hoursToAdd) {
      if (hours === "12" && hoursToAdd < 12) {
        period = period === "AM" ? "AM" : "PM";
      } else if (period === "AM" && parseInt(hours) + hoursToAdd >= 12) {
        period = "PM";
      } else if (period === "PM" && parseInt(hours) + hoursToAdd >= 12) {
        period = "AM";
      }
      hours = ((parseInt(hours) + hoursToAdd) % 12).toString();
      hours = hours === "0" ? "12" : hours;
    }

    if (minutesToAdd) {
      const totalMinutes = parseInt(minutes) + minutesToAdd;
      minutes = (totalMinutes % 60).toString().padStart(2, "0");
      let prevHours = hours;
      hours = (parseInt(hours) + Math.floor(totalMinutes / 60)).toString();
      if (hours === "0") {
        hours = "12";
      }
      if (parseInt(prevHours) < 12 && parseInt(hours) >= 12) {
        period = period === "AM" ? "PM" : "AM";
      }
    }

    return `${hours}:${minutes} ${period}`;
  } catch (error) {
    console.log("There was an error with calculating time.");
  }
};
