import React, { useState, useEffect } from "react";

const CodeTranslatorTab = () => {
  const [javaCode, setJavaCode] = useState("");
  const [jsCode, setJsCode] = useState("");

  const [jsData, setJsData] = useState({
    javascript_code: "",
    string_labels: "",
  });

  // useEffect(() => {
  //   // Using fetch to fetch the api from
  //   // flask server it will be redirected to proxy
  //   fetch("/translate").then((res) =>
  //     res.json().then((data) => {
  //       // Setting a data from api
  //       setJsData({
  //         javascript_code : data.javascript_code,
  //         string_labels : data.string_labels
  //       });
  //     })
  //   );
  // }, []);

  const handleTranslate = async () => {
    // TODO: implement code translation logic
    // setJsCode("Translated JavaScript code goes here");

    e.preventDefault();
    const response = await fetch('/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "java_code" :javaCode })
    });
    const data = await response.json();
    console.log(data);
    setJsData(
      {
        javascript_code : data.javascript_code,
        string_labels : data.string_labels
      }
    )
  };

  const handleCompile = () => {
    // TODO: implement code compilation logic
    alert("Code compiled successfully!");
  };

  return (
    <div className="container my-5">
      <h1>Code Translator</h1>
      <div className="row mt-3">
        <div className="col-12 col-md-6">
          <h3>Java Code</h3>
          <textarea
            className="form-control"
            rows="10"
            value={javaCode}
            onChange={(e) => setJavaCode(e.target.value)}
          ></textarea>
        </div>
        <div className="col-12 col-md-6">
          <h3>Translated JavaScript Code</h3>
          <textarea
            className="form-control"
            rows="10"
            value={jsData.javascript_code}
            readOnly
          ></textarea>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <button className="btn btn-primary" onClick={handleTranslate}>
            Translate
          </button>
        </div>
        <div className="col-12">
          <button className="btn btn-primary" onClick={handleCompile}>
            Compile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeTranslatorTab;
