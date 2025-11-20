"use client";

import { useState, useEffect } from "react";
import styles from "./Search.module.css";
import Main from "../Main/Main";
import '../../app/globals.css';


export default function Search({ showBackground = true }) {
  const [searchedCarModel, setSearchedCarModel] = useState("");
  const [message, setMessage] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Hide/show hero and info sections based on search results
  useEffect(() => {
    const heroSection = document.getElementById('hero-section');
    const infoSection = document.getElementById('info-section');
    const howItWorksSection = document.getElementById('how-it-works-section');
    
    if (heroSection && infoSection && howItWorksSection) {
      if (results.length > 0) {
        // Hide all sections
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(-20px)';
        infoSection.style.opacity = '0';
        infoSection.style.transform = 'translateY(-20px)';
        howItWorksSection.style.opacity = '0';
        howItWorksSection.style.transform = 'translateY(-20px)';
        
        // Hide after transition
        setTimeout(() => {
          heroSection.style.display = 'none';
          infoSection.style.display = 'none';
          howItWorksSection.style.display = 'none';
        }, 300);
      } else {
        // Show all sections
        heroSection.style.display = 'block';
        infoSection.style.display = 'block';
        howItWorksSection.style.display = 'block';
        
        // Show with transition
        setTimeout(() => {
          heroSection.style.opacity = '1';
          heroSection.style.transform = 'translateY(0)';
          infoSection.style.opacity = '1';
          infoSection.style.transform = 'translateY(0)';
          howItWorksSection.style.opacity = '1';
          howItWorksSection.style.transform = 'translateY(0)';
        }, 10);
      }
    }
  }, [results]);

  async function handleSearchForm(e) {
    e.preventDefault();

    if (!searchedCarModel.trim()) {
      setMessage("Please enter a number plate.");
      setResults([]);
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // Call backend API on port 5001
      const response = await fetch(`http://localhost:5001/api/cars/search?q=${encodeURIComponent(searchedCarModel)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Search failed');
      }

      if (data.count === 0) {
        setMessage("No car found with that number plate or model.");
        setResults([]);
      } else {
        setMessage("");
        setResults(data.data);
      }
    } catch (error) {
      console.error('Search error:', error);
      setMessage("Error searching for cars. Please try again.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className={showBackground ? styles.searchContainer : styles.searchContainerNoBg}>
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
            disabled={searchedCarModel.trim().length !== 7 || isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>

          {message && <div className={styles.message}>{message}</div>}
          
          {results.length > 0 && (
            <button 
              type="button" 
              className={styles.clearButton}
              onClick={() => {
                setResults([]);
                setSearchedCarModel("");
                setMessage("");
              }}
            >
              ← Tilbage til forside
            </button>
          )}
        </div>
      </div>

      {results.length > 0 && (
        <div className={styles.resultsSection}>
          <div className="container">
            <h2 className={styles.resultsTitle}>Søgeresultater</h2>
          </div>
          {results.map((car, index) => (
            <div key={index}>
              <Main car={car} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
