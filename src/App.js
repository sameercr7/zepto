import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const person = [
    { firstName: "Sameer" },
    { firstName: "Madav" },
    { firstName: "Neha" },
    { firstName: "Amar" },
  ];

  const [val, setVal] = useState("");
  const [lis, setLis] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [highlightedChip, setHighlightedChip] = useState(null);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue === "" && e.keyCode === 8 && lis.length > 0) {
      setHighlightedChip(lis[lis.length - 1]);
    } else {
      setHighlightedChip(null);
    }

    setVal(inputValue);

    const filtered = person.filter(
      (p) =>
        p.firstName.toLowerCase().includes(inputValue.toLowerCase()) &&
        !lis.includes(p.firstName)
    );
    setFilteredList(filtered);
  };

  const handleAddTag = (name) => {
    setLis([...lis, name]);
    setVal("");
    setFilteredList([]);
  };

  const handleRemoveTag = (name) => {
    const updatedList = lis.filter((item) => item !== name);
    setLis(updatedList);
    setFilteredList([]);
    setHighlightedChip(null);
  };

  useEffect(() => {
    // Remove the highlighted chip on component unmount
    return () => {
      setHighlightedChip(null);
    };
  }, []);

  return (
    <div className="main">
      <div className="content">
        <div className="taginput">
          <input
            placeholder="Write Name"
            style={{
              margin: "5px",
              textAlign: "center",
              lineHeight: "2em",
              height: "2em",
            }}
            value={val}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.keyCode === 8 && val === "" && lis.length > 0) {
                handleRemoveTag(lis[lis.length - 1]);
              }
            }}
          />
          {filteredList.length > 0 && (
            <ul className="name-list">
              {filteredList.map((name, index) => (
                <li
                  key={index}
                  onClick={() => handleAddTag(name.firstName)}
                  className={highlightedChip === name ? "highlighted" : ""}
                >
                  {name.firstName}
                </li>
              ))}
            </ul>
          )}
          {lis.map((name, index) => (
            <button
              key={index}
              onClick={() => handleRemoveTag(name)}
              className={highlightedChip === name ? "highlighted" : ""}
            >
              {name}
              <span>X</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
