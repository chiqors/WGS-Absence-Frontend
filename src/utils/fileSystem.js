// function to get the file from input type=file
export const getFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// function to read the log file that is uploaded
export const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// function to return the from readFile function
export const readLog = async (file) => {
  // output: [{timestamp, activity, user}]
  // timestamp: Date
  // activity: String
  // user: {employee_id, account_id, full_name}

  const fileContent = await readFile(file);
  // split the file content by new line
  const lines = fileContent.split(/\r?\n/);
  // each line contains like: 2021-01-01T00:00:00.000Z,login,1,1,John Doe
  // split each line by comma
  const data = lines.map((line) => line.split(","));
  // convert the data to the format that we want
  const result = data.map((item) => {
    return {
      timestamp: new Date(item[0]),
      activity: item[1],
      user: {
        employee_id: item[2],
        account_id: item[3],
        full_name: item[4],
      },
    };
  });
  return result;
};
