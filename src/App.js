import "./App.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import react, { useState, useEffect } from "react";

function App() {
  const [list, setList] = useState([]);
  const [inputBoxes, setInputBoxes] = useState();
  const [cardNumber, setCardNumber] = useState([]);
  const [array, setArr] = useState([1, 2, 3, 4]);
  const [details, setDetails] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  useEffect(() => {}, []);

  const handleKeyPress = (e, id) => {
    e.key.charCodeAt(0) >= 48 &&
      e.key.charCodeAt(0) <= 57 &&
      details.number.length <= 16 &&
      setDetails({ ...details, number: details.number + e.key });
  };
  const handleKeyDown = (e, id) => {
    e.key == "Backspace" &&
      setDetails({ ...details, number: details.number.slice(0, -1) });
  };

  const handleChange = (e, id) => {
    if (e.target.value.length == 4 && id != 4)
      document.getElementById(id + 1).focus();
    if (e.target.value.length == 0 && id != 1)
      document.getElementById(id - 1).focus();

    if (e.target.value.length > 4 && id == 1) {
      setDetails(
        { ...details, number: e.target.value },
        document.getElementById(4).focus()
      );
      checkPaste(e.target.value);
    }
  };

  const checkPaste = (temp) => {
    console.log(temp);
    for (let i = 1; i <= 4; i++) {
      document.getElementById(i).value = temp.substring(4 * (i - 1), 4 * i);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    document.getElementById("form").reset();
    setList([
      ...list,
      {
        cvc: details.cvc,
        expiry: details.expiry,
        focus: "",
        name: details.name,
        number: details.number,
      },
    ]);
    setDetails({
      cvc: "",
      expiry: "",
      focus: "",
      name: "",
      number: "",
    });
  };

  const onDelete = (number) => {
    var arr = list.filter((item) => {
      return item.number != number;
    });

    setList(arr);
  };

  return (
    <div className="container">
      <div className="form-div" id="form-div">
        <Cards
          cvc={details.cvc}
          expiry={details.expiry}
          focused={details.focus}
          name={details.name}
          number={details.number}
        />
        {console.log(details)}
        <form id="form">
          <table>
            <tr>
              <td>
                <label>Card Number</label>
              </td>
              <td>
                {array.map((item, id) => {
                  return (
                    <input
                      type="tel"
                      name="number"
                      placeholder="****"
                      className="input-card-number"
                      id={id + 1}
                      maxlength={id == 3 ? "4" : ""}
                      onKeyPress={(e) => handleKeyPress(e, id + 1)}
                      onChange={(e) => {
                        handleChange(e, id + 1);
                      }}
                      onKeyDown={(e) => {
                        handleKeyDown(e);
                      }}
                      onFocus={(e) =>
                        setDetails({ ...details, focus: e.target.name })
                      }
                    />
                  );
                })}
              </td>
            </tr>
            <tr>
              <td>
                <label>Cardholder Name</label>
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  placeholder="Card holder Name"
                  maxLength="16"
                  value={details.name}
                  onChange={(e) => {
                    e.target.value.length == 0 &&
                      setDetails({ ...details, name: "" });

                    (e.target.value.charCodeAt(e.target.value?.length - 1) ==
                      32 ||
                      (e.target.value.charCodeAt(e.target.value?.length - 1) >=
                        97 &&
                        e.target.value.charCodeAt(e.target.value?.length - 1) <=
                          122) ||
                      (e.target.value.charCodeAt(e.target.value?.length - 1) >=
                        65 &&
                        e.target.value.charCodeAt(e.target.value?.length - 1) <=
                          90)) &&
                      setDetails({ ...details, name: e.target.value });
                  }}
                  onFocus={(e) =>
                    setDetails({ ...details, focus: e.target.name })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Expiry Date</label>
              </td>
              <td>
                <input
                  type="text"
                  name="expiry"
                  placeholder="Expiry"
                  maxlength="4"
                  value={details.expiry}
                  onChange={(e) => {
                    e.target.value.length == 0 &&
                      setDetails({ ...details, expiry: "" });
                    e.target.value.length == 2 &&
                      setDetails({ ...details, expiry: details.expiry + "/" });
                    e.target.value.charCodeAt(e.target.value?.length - 1) >=
                      48 &&
                      e.target.value.charCodeAt(e.target.value?.length - 1) <=
                        57 &&
                      setDetails({ ...details, expiry: e.target.value });
                  }}
                  onFocus={(e) =>
                    setDetails({ ...details, focus: e.target.name })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Cvv </label>
              </td>
              <td>
                <input
                  type="text"
                  name="cvc"
                  placeholder="Cvv"
                  maxlength="3"
                  value={details.cvc}
                  onChange={(e) => {
                    e.target.value.length == 0 &&
                      setDetails({ ...details, cvc: "" });
                    e.target.value.charCodeAt(e.target.value?.length - 1) >=
                      48 &&
                      e.target.value.charCodeAt(e.target.value?.length - 1) <=
                        57 &&
                      setDetails({ ...details, cvc: e.target.value });
                  }}
                  onFocus={(e) =>
                    setDetails({ ...details, focus: e.target.name })
                  }
                />
              </td>
            </tr>
          </table>

          <button onClick={(e) => onSubmit(e)}>Submit</button>
        </form>
      </div>
      <div className="list-box">
        <table>
          <thead>
            <th width="20%">Name</th>
            <th width="50%">Card Number</th>
            <th width="20%">Actions</th>
          </thead>
          <tbody>
            {list.map((item) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <center>
                    <td>{item.number}</td>
                  </center>
                  <td>
                    <button onClick={() => onDelete(item.number)}>
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
