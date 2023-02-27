const getAgeFromBirthDate = (birthDate) => {
  // convert birthDate to Date object
  const birthDateObj = new Date(birthDate);
  // get current date
  const currentDate = new Date();
  // get current year
  const currentYear = currentDate.getFullYear();
  // get birth year
  const birthYear = birthDateObj.getFullYear();
  // calculate age
  const age = currentYear - birthYear;
  // return age
  return age;
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
  return `http://localhost:3000${asset}`;
};

const getBirthdate = (datetime) => {
  // get birthdate
  return datetime.split("T")[0];
};

const getDurationHours = (start_time, end_time) => {
  // get duration hours
  const start_time_obj = new Date(start_time);
  const end_time_obj = new Date(end_time);
  const duration = end_time_obj - start_time_obj;
  const duration_hours = duration / 1000 / 60 / 60;
  return duration_hours;
};

export default {
  getAgeFromBirthDate,
  checkIfNumIsMultipleOf,
  checkIfPhotoFromExternalSource,
  getAssetPath,
  getBirthdate,
  getDurationHours,
};
