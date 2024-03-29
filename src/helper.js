import dayjs from "dayjs";
import { BACKEND_URL } from "./config";

const getAgeFromBirthDate = (birthDate) => {
  // get age from birthdate
  return dayjs().diff(birthDate, "year");
};

const checkIfNumIsMultipleOf = (number, multipleOf) => {
  // check if number is multiple of multipleOf
  return number % multipleOf === 0;
};

const checkIfPhotoFromExternalSource = (photo) => {
  // check if photo is from external source
  if (photo) {
    return photo.includes("http");
  } else {
    return false;
  }
};

const getAssetPath = (asset) => {
  // get asset path
  const checkAsset = checkIfPhotoFromExternalSource(asset);
  if (checkAsset) {
    return asset;
  } else {
    return `${BACKEND_URL + asset}`;
  }
};

const getBirthdate = (datetime) => {
  // get birthdate
  return dayjs(datetime).format("YYYY-MM-DD");
};

const getDurationHours = (start_time, end_time) => {
  if (end_time === null) {
    return "Still Working...";
  }
  // get duration hours
  const duration_hours = dayjs(end_time).diff(dayjs(start_time), "hour");
  return "±" + duration_hours + " hours";
};

const getHumanReadableDate = (datetime) => {
  // get human readable date
  // example output: "September 1, 2021"
  return dayjs(datetime).format("MMMM D, YYYY");
};

const getHumanReadableTime = (datetime) => {
  // get human readable time
  // example output: "12:00 AM"
  return dayjs(datetime).format("h:mm A");
};

const getHumanReadableDatetime = (datetime) => {
  // get human readable time
  // example output: "September 1, 2021 12:00 AM"
  return dayjs(datetime).format("MMMM D, YYYY h:mm A");
};

const getTodayYesterdayAgo = (datetime) => {
  // get today, yesterday, ago
  // example output: "today", "yesterday", "2 days ago"
  const today = dayjs().format("YYYY-MM-DD");
  const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  const date = dayjs(datetime).format("YYYY-MM-DD");
  if (date === today) {
    return "Today";
  } else if (date === yesterday) {
    return "Yesterday";
  } else {
    return `${dayjs().diff(dayjs(datetime), "day")} days ago`;
  }
};

const convertDatetimeToTime = (datetime) => {
  // convert datetime to time
  // example output: "12:00 AM"
  return dayjs(datetime).format("h:mm A");
};

const getHumanWorkingHours = (time_in, time_out) => {
  // output: (1:21 PM - 2:00 PM)
  // if time_out is null, output: (IN 1:21 PM)
  if (time_out === null) {
    return `(IN: ${convertDatetimeToTime(time_in)})`;
  } else {
    return `(${convertDatetimeToTime(time_in)} - ${convertDatetimeToTime(
      time_out
    )})`;
  }
};

const getCurrentWeeks = (week) => {
  if (week === 0) {
    return "This Week";
  } else if (week === 1) {
    return "Last Week";
  } else {
    return `${week} weeks ago`;
  }
};

const truncateString = (str, num) => {
  // truncate string
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

const getHumanReadableStatus = (status) => {
  // get human readable status
  // not_assigned, assigned, need_discussion, completed, cancelled
  if (status === "not_assigned") {
    return "Not Assigned";
  } else if (status === "assigned") {
    return "Assigned";
  } else if (status === "need_discussion") {
    return "Need Discussion";
  } else if (status === "completed") {
    return "Completed";
  } else if (status === "cancelled") {
    return "Cancelled";
  }
};

const getHumanReadableStatusColor = (status) => {
  // get human readable badge color
  // not_assigned, assigned, need_discussion, completed, cancelled
  if (status === "not_assigned") {
    return "secondary";
  } else if (status === "assigned") {
    return "primary";
  } else if (status === "need_discussion") {
    return "warning";
  } else if (status === "completed") {
    return "success";
  } else if (status === "cancelled") {
    return "danger";
  }
};

const getDurationType = (duration) => {
  // full_time, part_time, business_trip
  if (duration === "full_time") {
    return "Full Time";
  } else if (duration === "part_time") {
    return "Part Time";
  } else if (duration === "business_trip") {
    return "Business Trip";
  }
};

const getHumanWorkingHoursWithDay = (time_in, time_out) => {
  // output: March 1, 2021 (1:21 PM - 2:00 PM)
  // if time_out is null, output: March 1, 2021 (IN 1:21 PM)
  if (time_out === null) {
    return `${getHumanReadableDate(time_in)} (IN: ${convertDatetimeToTime(
      time_in
    )})`;
  } else {
    return `${getHumanReadableDate(time_in)} (${convertDatetimeToTime(
      time_in
    )} - ${convertDatetimeToTime(time_out)})`;
  }
};

const getHowManyDaysInThisMonth = () => {
  // get how many days in this month
  return dayjs().daysInMonth();
};

const getHowManyWorkingDaysInThisMonth = () => {
  // get how many working days in this month
  // exclude saturday and sunday
  const daysInMonth = dayjs().daysInMonth();
  let workingDays = 0;
  for (let i = 0; i < daysInMonth; i++) {
    const day = dayjs().startOf("month").add(i, "day").format("dddd");
    if (day !== "Saturday" && day !== "Sunday") {
      workingDays++;
    }
  }
  return workingDays;
};

const getDatetimeNow = () => {
  // example output: "September 1, 2021 12:00:00 AM"
  return dayjs().format("MMMM D, YYYY h:mm:ss A");
};

const numPlaced = (number) => {
  // 1 => 1st, 2 => 2nd, so on
  if (number === 1) {
    return `${number}st`;
  } else if (number === 2) {
    return `${number}nd`;
  } else if (number === 3) {
    return `${number}rd`;
  } else {
    return `${number}th`;
  }
};

export default {
  getAgeFromBirthDate,
  checkIfNumIsMultipleOf,
  checkIfPhotoFromExternalSource,
  getAssetPath,
  getBirthdate,
  getDurationHours,
  getHumanReadableDate,
  getHumanReadableTime,
  getHumanReadableDatetime,
  getTodayYesterdayAgo,
  convertDatetimeToTime,
  getHumanWorkingHours,
  getCurrentWeeks,
  truncateString,
  getHumanReadableStatus,
  getHumanReadableStatusColor,
  getDurationType,
  getHumanWorkingHoursWithDay,
  getHowManyDaysInThisMonth,
  getHowManyWorkingDaysInThisMonth,
  getDatetimeNow,
  numPlaced,
};
