import React, { useState } from "react";
import { _createTopic } from "../api/common";

function CreateTopic(props) {
  const [topic, setTopic] = useState("");
  const [options, setOptions] = useState([]);

  const createPost = () => {
    const newOptions = (options.length > 0) && options?.split(",").map((val) => val.trim()); // Split options string and remove leading/trailing spaces
    console.log("first", newOptions);
    console.log(typeof newOptions);
    setOptions(newOptions);

    let requestData = {
      topic: topic,
      options: newOptions,
    };

    try {
      _createTopic(requestData).then(async (res) => {
      
        if (res === 200) {
          console.log(res);
          setOptions([]);
          setTopic("");
        } else {
          console.log("Something went wrong");
        }
      });
    } catch (error) {
      console.log("Error:", error);
    }
    props.setShowTopic(false)
  };

  return (
    <div className="create-topic-box">
      <h1>Create a topic</h1>
      <div>
        <label htmlFor="">Enter Topic</label>
        <input
          value={topic}
          type="text"
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Topic"
        />
      </div>
      <div>
        <label htmlFor="">Please enter comma separated values</label>
        <input
          value={options}
          type="text"
          onChange={(e) => setOptions(e.target.value)}
          placeholder="Options"
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={() => createPost()}>
        Create
      </button>
    </div>
  );
}

export default CreateTopic;
