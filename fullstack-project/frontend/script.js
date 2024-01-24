"use strict";
const fetchCities = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/cities");
    const data = await response.json();
    populateTable(data);
  } catch (error) {
    console.log(error);
  }
};

("use strict");
const populateTable = (data) => {
  const table = document.getElementById("cities-table");
  table.innerHTML = "";
  data.map((item) => {
    const row = document.createElement("tr");

    const idColumn = document.createElement("td");
    idColumn.className = "column-id";
    idColumn.innerHTML = '<a href="city.html">' + item.id + "</a>";
    idColumn.onclick = () => {
      sessionStorage.setItem("cityId", item.id);
    };
    row.appendChild(idColumn);

    const nameColumn = document.createElement("td");
    nameColumn.className = "column-name";
    nameColumn.innerText = item.city;
    row.appendChild(nameColumn);

    const countryColumn = document.createElement("td");
    countryColumn.className = "column-country";
    countryColumn.innerText = item.country;
    row.appendChild(countryColumn);

    const deleteColumn = document.createElement("td");
    deleteColumn.className = "column-delete";
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "x";
    deleteButton.onclick = () => {
      // Call the deleteCity function
      deleteCity(item.id);
    };
    deleteColumn.appendChild(deleteButton);
    row.appendChild(deleteColumn);

    table.appendChild(row);
  });
};

const form = document.getElementById("city-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = {
    city: form.elements["city"].value,
    country: form.elements["country"].value,
  };
  // Call the function the does the backend request
  addCity(city);

  // Clear the current values
  form.elements["city"].value = "";
  form.elements["country"].value = "";
});

const addCity = async (city) => {
  try {
    const response = await fetch("http://localhost:5000/api/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(city),
    });

    // Check if the response succeeded
    if (response.status == 200) {
      // Refresh the list from the backend
      fetchCities();
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteCity = async (id) => {
  try {
    const response = await fetch("http://localhost:5000/api/cities/" + id, {
      method: "DELETE",
    });

    // Check if the response succeeded
    if (response.status == 200) {
      // Refresh the list from the backend
      fetchCities();
    }
  } catch (error) {
    console.log(error);
  }
};

fetchCities();
