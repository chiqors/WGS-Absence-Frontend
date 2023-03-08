import dayjs from "dayjs";

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
  return photo.includes("http");
};

const getAssetPath = (asset) => {
  // get asset path
  checkIfPhotoFromExternalSource(asset)
    ? (asset = asset)
    : (asset = import.meta.env.VITE_APP_BACKEND_URL + asset);
  return asset;
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

export default {
  getAgeFromBirthDate,
  checkIfNumIsMultipleOf,
  checkIfPhotoFromExternalSource,
  getAssetPath,
  getBirthdate,
  getDurationHours,
  getHumanReadableDate,
  getTodayYesterdayAgo,
  convertDatetimeToTime,
  getHumanWorkingHours,
  getCurrentWeeks,
};
