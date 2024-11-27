import React, { useState, useEffect } from "react";

/* global google */
const AutocompleteSuggestions = ({
  input,
  setUserDestination,
  setSearchQuery,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [sessionToken, setSessionToken] = useState(null);

  useEffect(() => {
    // Check if Google Maps API is loaded
    if (window.google && google.maps && google.maps.places) {
      setSessionToken(new google.maps.places.AutocompleteSessionToken());
    } else {
      console.error(
        "Google Maps API is not loaded. Check your API key and script."
      );
    }
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!input.trim() || !sessionToken) {
        setSuggestions([]);
        return;
      }

      if (!window.google || !google.maps || !google.maps.places) {
        console.error("Google Maps API is not available.");
        return;
      }

      const autocompleteService = new google.maps.places.AutocompleteService();

      // Set Calgary's latitude and longitude as the location bias
      const calgaryLatLng = new google.maps.LatLng(51.0447, -114.0719);

      const request = {
        input,
        //location: calgaryLatLng,
       // radius: 50000, // 50 km radius
        sessionToken,
        componentRestrictions: { country: "ca" }, // Restrict to Canada
        locationBias: calgaryLatLng, // Use locationBias instead of location
        locationRestriction: new google.maps.LatLngBounds( // Add locationRestriction
          new google.maps.LatLng(50.821810, -114.270563), // South-West bounds
          new google.maps.LatLng(51.317888, -113.802511) // North-East bounds
        ),
      };

      try {
        autocompleteService.getPlacePredictions(
          request,
          (predictions, status) => {
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              predictions
            ) {
              setSuggestions(predictions);
            } else {
              console.error(
                "No predictions available or error in fetching predictions."
              );
              setSuggestions([]);
            }
          }
        );
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [input, sessionToken]);

  const formatSecondaryText = (secondaryText) => {
    // Split the secondary text by commas and return only the first part
    if (!secondaryText) return "";
    const parts = secondaryText.split(","); // Split by commas
    return parts[0]?.trim() || ""; // Return only the street address part
  };

  return (
    <div className="autocomplete-suggestions bg-white rounded-lg">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="suggestion-item"
          onClick={() => {
            setUserDestination(suggestion.description);
            setSearchQuery("");
          }}
        >
          <strong>{suggestion.structured_formatting.main_text}</strong>{" "}
          {formatSecondaryText(suggestion.structured_formatting.secondary_text)}
        </div>
      ))}
    </div>
  );
};

export default AutocompleteSuggestions;
