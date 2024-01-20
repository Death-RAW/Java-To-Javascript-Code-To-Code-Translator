import React, { useState } from "react";
import Tree from "react-d3-tree";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another



const CodeTranslatorTab = () => {

  const [javaCode, setJavaCode] = useState(
    `System.out.println("Hello World");`
  );
  const [jsCode, setJsCode] = useState("");
  const [jsData, setJsData] = useState({
    javascript_code: "",
    string_labels: [],
  });

  // waiting for the transation to be complete
  const [waiting, setWaiting] = useState(false);

  const [ast, setAst] = useState(
    "Translated AST goes here"
  );

  // toggle ast
  const [showAst, setShowAst] = useState(false);

  // copy translated code to clipboard
  const [copied, setCopied] = useState(false);
  const [copyText, setCopyText] = useState("Copy");

  const [alertClass, setAlertClass] = useState("alert alert-secondary");
  const [showAlert, setShowAlert] = useState(true);
  const [alertMessage, setAlertMessage] = useState("Status");
  
  const [translateDisabled, setTranslateDisabled] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsData.javascript_code);
    setCopied(true);
    setCopyText("Copied!");
  };

  
  const handleTranslate = async (e) => {
    // TODO: implement code translation logic
    // setJsCode("Translated JavaScript code goes here");

    e.preventDefault();
    setWaiting(true);
    setTranslateDisabled(true);
    const response = await fetch("http://127.0.0.1:5000/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ java_code: javaCode }),
    });
    const data = await response.json();
    console.log(data);

    var js = (data.javascript_code).toString()
    console.log(typeof js)

    try{
        console.log(data.ast);
        console.log("----------------------------");
        console.log(data.formatted_jscode);
        console.log(data.string_labels);
        
        setAst(data.ast);

        if(data.error_status == "true"){
          setAlertClass("alert alert-danger");
          setShowAlert(true);
          setAlertMessage("error in the code");
        }else if(data.error_status == "false"){
          setAlertClass("alert alert-success");
          setShowAlert(true);
          setAlertMessage("Translation Successful");
        }
    }catch(error) {
        console.log(error)
    }

    setJsData({
      javascript_code: data.formatted_jscode,
      string_labels: data.string_labels,
    });
    setWaiting(false);
    setTranslateDisabled(false);
  };

  const handleCompile = () => {
    // TODO: implement code compilation logic
    // TODO: For future work
    console.log("compilation is triggered.")
  };

  const handleClear = () => {
    // TODO: implement code compilation logic
    setJavaCode("");
    setJsCode("");
    setJsData({
        javascript_code: "",
        string_labels:[]
    })
    setAst("Translated AST goes here");
    setCopied(false);
    setCopyText("Copy");
    setAlertMessage("Status");
    setAlertClass("alert alert-secondary");
  };

  const handleShowAst = () => {
    setShowAst(!showAst);
  };

  const styles = {
    // try to the center the buttons
    buttonsStyle: {
      top: "50%",
    },

    copyButton: {
      float: "right",
    }
  };
  return (
    <div className="container my-5">
      {/* <h3>Translate Java to JavaScript</h3> */}
      <div className="row mt-3">
      <div className="">
            <button className="btn btn-secondary btn-sm" onClick={copyToClipboard} style={styles.copyButton}>{copyText}</button>
      </div>
        <div className="col-12 col-md-5">
          <h3>Java Code</h3>
          <Editor
            value={javaCode}
            onValueChange={(javaCode) => setJavaCode(javaCode)}
            highlight={(javaCode) => highlight(javaCode, languages.java)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              backgroundColor: "#f5f5f5",
              borderRadius: 5,
              height: "300px",
              overflow: "scroll"
            }}
            
          />
          <br/>
        </div>
        <div className="col-12 col-md-2" style={styles.buttonsStyle}>
          <div className="row">
            <button className="btn btn-primary" onClick={handleCompile} disabled={true}>
              Compile
            </button>
          </div>
          <br />
          <div className="row">
            <button className="btn btn-primary" onClick={handleTranslate} disabled={translateDisabled}>
              Translate
            </button>
          </div>
          <br />

          <div className="row">
          <div className={alertClass} role="alert">
           <center> {showAlert && alertMessage} </center>
          </div>
          </div>
          <br />

          <div className="row">
            <center>
            {waiting && 
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div> 
            }
            </center>
          </div>
          <br />
          <div className="row">
            <button className="btn btn-primary" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
        <div className="col-12 col-md-5">
          <h3>JavaScript Code</h3>
          <Editor
            value={jsData.javascript_code}
            onValueChange={(jsCode) => setJsCode(jsCode)}
            highlight={(jsCode) => highlight(jsCode, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              backgroundColor: "#f5f5f5",
              borderRadius: 5,
              height: "300px",
              overflow: "scroll"
            }}
          />
        </div>
      </div>
      <hr/>
      <div className="row mt-3">
            <h4>String Literals</h4>
            <div className="list-group">
                {jsData.string_labels.map(function(name, index){
                    return <a href="#" key={index} className="list-group-item list-group-item-action" data-clipboard-text="text">{name}</a>
                })}
            </div>
      </div>
      <hr/>
      <div className="crow mt-3">
            <h4>Abstract Syntax Tree</h4>
            <button className="btn btn-primary" onClick={handleShowAst}>
              Toggle AST
            </button>
            { showAst &&
              <div>
                  <pre>{ast.toLowerCase()}</pre>
              </div>
            } 
      </div>
    </div>
  );
};

export default CodeTranslatorTab;
