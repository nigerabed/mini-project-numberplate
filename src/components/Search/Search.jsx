"use client";

import { useState } from "react";
import styles from "./Search.module.css";
import Main from "../Main/Main";
import carData from "../../carData/cardata.json";
import '../../app/globals.css'; // just import, no need to assign to a variable


export default function Search() {
  const [searchedCarModel, setSearchedCarModel] = useState("");
  const [message, setMessage] = useState("");
  const [results, setResults] = useState([]);

  function handleSearchForm(e) {
    e.preventDefault();

    const filtered = carData.filter(
      (car) =>
        car.plate.toLowerCase().includes(searchedCarModel.toLowerCase()) ||
        car.model.toLowerCase().includes(searchedCarModel.toLowerCase())
    );

    if (filtered.length === 0) {
      setMessage("No car found with that number plate or model.");
      setResults([]);
    } else {
      setMessage("");
      setResults(filtered);
    }
  }

  return (
    <>
      <div className={`container`}>
        <form className={styles.form} onSubmit={handleSearchForm}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Enter Number plate..."
            value={searchedCarModel}
            onChange={(e) => {
              const value = e.target.value;
              setSearchedCarModel(value);

              if (value.trim() === "") {
                setMessage("Please enter a number plate.");
              } else if (value.trim().length !== 7) {
                setMessage("Number plate must be exactly 7 characters.");
              } else {
                setMessage(""); // clear message when valid
              }
            }}
          />
          <button
            type="submit"
            className={styles.button}
            disabled={searchedCarModel.trim().length !== 7} // disable if not 7
          >
            Search
          </button>
        </form>

        {message && <div className={styles.message}>{message}</div>}

        {results.length > 0 && (
          <div>
            {results.map((car, index) => (
              <div key={index}>
                <Main car={car} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
