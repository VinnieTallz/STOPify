import React, { useState, useEffect } from "react";

/* global google */
const AutocompleteSuggestions = ({ input, onSuggestionSelect }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Load Google Maps Places library and create a session token
    const loadPlacesLibrary = async () => {
      const { AutocompleteSessionToken } = await google.maps.importLibrary("places");
      setToken(new AutocompleteSessionToken());
    };
    loadPlacesLibrary();
  }, []);

  useEffect(() => {
    // Fetch suggestions when input changes
    const fetchSuggestions = async () => {
      if (!input.trim() || !token) return;

      const { AutocompleteSuggestion } = await google.maps.importLibrary("places");

      const userLocation = await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
          () => resolve(null)
        );
      });

      if (!userLocation) return;

      const request = {
        input,
        origin: userLocation,
        language: "en-US",
        region: "us",
        sessionToken: token,
      };

      try {
        const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
        setSuggestions(suggestions.map((s) => s.placePrediction.text));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [input, token]);

  return (
    <div className="autocomplete-suggestions">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="suggestion-item"
          onClick={() => onSuggestionSelect(suggestion.description)}
        >
          {suggestion.description}
        </div>
      ))}
    </div>
  );
};

export default AutocompleteSuggestions;
