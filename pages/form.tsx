import React from "react";

const SPREADSHEET_ID = "1aegvldcxY4XYWZ-4zHT7pjBZFc04KzGqdi4h2YQhtTk";
const CLIENT_ID =
  "878912810-03bmk8j5sbjkdfsda0cgbtemccg4obqu.apps.googleusercontent.com";
const API_ID = "AIzaSyAlQu9TQArZeW__G3PbP_VUMYxDAHHwTSk";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

const FormPage = () => {
  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Long url" />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default FormPage;
