import React, { useEffect, useState } from "react";
import { Card } from "antd";

import { getAllCountries } from "../service/countriesAPI";
import BarGraph from "../components/BarGraph";
import CardTableHeader from "../components/CardTableHeader";
import CountryTable from "../components/CountryTable";

export default function Dashboard() {
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  const [countriesArr, setCountriesArr] = useState([]);
  const [searchedText, setSearchText] = useState("");
  const [filteredCountriesArr, setFilteredCountriesArr] = useState([]);
  const [selectedCountryKeys, setSelectedCountryKeys] = useState(favorites);
  const [faveCountriesArr, setFaveCountriesArr] = useState();
  const [isTableLoading, setIsTableLoading] = useState(true);

  // componentDidMount
  useEffect(() => {
    (async function () {
      const countriesResult = await getAllCountries();
      // adding keys on array object
      countriesResult.forEach(function (element, index) {
        element.key = index;
      });
      setIsTableLoading(false);
      // this is for holding the array of countries
      setCountriesArr(countriesResult);
      // this is for showing the filtered array in table
      setFilteredCountriesArr(countriesResult);
    })();
  }, []);

  // componentDidUpdate
  useEffect(() => {
    // when there is selected record or checked country
    if (countriesArr && selectedCountryKeys && selectedCountryKeys.length) {
      // filtering the countriesArr if selectedCountryKeys match the country key on countriesArr
      const selectedCountriesArr = countriesArr.filter((country) =>
        selectedCountryKeys.includes(country.key)
      );
      // forming the data that needed for the graph
      const faveCountriesBarGraphDataFormat = selectedCountriesArr.map(
        (country) => [country.name, country.population]
      );
      setFaveCountriesArr(faveCountriesBarGraphDataFormat);
    } else {
      setFaveCountriesArr();
    }
  }, [selectedCountryKeys, countriesArr]);

  return (
    <div className="app-container">
      <Card
        className="border-round"
        title={
          <CardTableHeader
            setSearchText={setSearchText}
            setFilteredCountriesArr={setFilteredCountriesArr}
            countriesArr={countriesArr}
            searchedText={searchedText}
          />
        }
      >
        <CountryTable
          isTableLoading={isTableLoading}
          selectedCountryKeys={selectedCountryKeys}
          searchedText={searchedText}
          filteredCountriesArr={filteredCountriesArr}
          setSelectedCountryKeys={setSelectedCountryKeys}
        />
      </Card>

      <Card
        className={
          faveCountriesArr ? "border-round" : "empty-favorites border-round"
        }
      >
        {faveCountriesArr ? (
          <BarGraph faveCountriesArr={faveCountriesArr} />
        ) : (
          <b>Select country to see the chart population</b>
        )}
      </Card>
    </div>
  );
}
