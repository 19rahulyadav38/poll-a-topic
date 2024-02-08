//import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./app.scss";
import { LeafPoll, Result } from "react-leaf-polls";
import "react-leaf-polls/dist/index.css";
import CreateTopic from "./components/CreateTopic";
import { _castVote, _voteCount, _voteTopic } from "./api/common";
import { useEffect, useState } from "react";

// Persistent data array (typically fetched from the server)

// Object keys may vary on the poll type (see the 'Theme options' table below)
const customTheme = {
  textColor: "black",
  mainColor: "#00B87B",
  backgroundColor: "rgb(255,255,255)",
  alignment: "center",
};

function App() {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState([]);
  const [showTopic, setShowTopic] = useState(false);
  const [counter, setCounter] = useState(0)

  function vote(item) {
    // Here you probably want to manage
    // and return the modified data to the server.

    let topic = {
      topic: title,
      options: item,
    };
    try {
      _castVote(topic).then(async (res) => {
        if (res?.status === 200) {
          console.log("res :", res);
          setCounter(counter+1)
          voteCount();
        } else {
          console.log("Something went wrong", res);
        }
      });
    } catch (error) {
      console.log("Error:", error);
    }

    console.log("item :", item);
  }

  const voteTopic = () => {
    try {
      _voteTopic().then(async (res) => {
        if (res?.status === 200) {
          setTitle(res?.data?.result[0]?.title);
          let voteOptions = await res?.data?.result[0]?.options;
          const newOptions = voteOptions.map((val, index) => ({
            ...val,
            id: index,
          }));
          console.log("newoptions :", newOptions);
          setOptions(res?.data?.result[0]?.options);
          console.log("res in vote topic", res);
        } else {
          console.log("Something went wrong", res);
        }
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const voteCount = () => {
    console.log("title :", title);
    let data = {
      topic: title,
    };
    console.log("data :", data);
    try {
      _voteCount(data).then(async (res) => {
        if (res?.status === 200) {
          console.log("res in vote", res);
          setResult(res?.data?.result);
        } else {
          console.log("Something went wrong", res);
        }
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    voteTopic();
  }, []);

  useEffect(()=>{
    voteCount();
  },[counter])

  return (
    <div className="App">
      {showTopic ? (
        <CreateTopic setShowTopic={setShowTopic} />
      ) : (
        <>
          <div className="d-flex justify-content-end">
            <button className="my-5 btn btn-primary" onClick={() => setShowTopic(true)}>
              Create a topic
            </button>
          </div>
          <h1>{title}</h1>
          <ul>
            {options?.map((val, index) => {
              return <li className="p-1 btn btn-info mx-1 px-2" onClick={(e) => vote(val.text)}>{val.text}</li>;
            })}
          </ul>

          <h4 className="mt-5">Poll Result</h4>
          <ul>
            {result?.map((val, index) => {
              return (
                <li>
                  {val.name} {val.vote}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
