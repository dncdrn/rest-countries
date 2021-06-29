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

  useEffect(() => {
    (async function () {
      const countriesResult = await getAllCountries();
      countriesResult.forEach(function (element, index) {
        element.key = index;
      });
      setIsTableLoading(false);
      setCountriesArr(countriesResult);
      setFilteredCountriesArr(countriesResult);
    })();
  }, []);

  useEffect(() => {
    if (countriesArr && selectedCountryKeys && selectedCountryKeys.length) {
      const selectedCountriesArr = countriesArr.filter((country) =>
        selectedCountryKeys.includes(country.key)
      );
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
