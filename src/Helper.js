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

export default {
  getAgeFromBirthDate,
  checkIfNumIsMultipleOf,
  checkIfPhotoFromExternalSource,
  getAssetPath,
  getBirthdate,
};
