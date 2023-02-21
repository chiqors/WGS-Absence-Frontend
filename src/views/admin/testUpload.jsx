import React from "react";

const testUpload = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <input type="file" name="uploaded_file" />
        <input type="text" name="hello" className="input input-bordered" />
        <input type="submit" value="Upload" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default testUpload;
