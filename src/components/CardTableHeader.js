import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import { Input } from "antd";
import "../App.css";

export default function CardTableHeader({
  countriesArr,
  setSearchText,
  setFilteredCountriesArr,
  searchedText,
}) {
  function handleOnSearch(e) {
    setSearchText(e.target.value);
    // to make case insensitive
    const searchTextValue = e.target.value.toLowerCase();
    // filter provide a callback every element and returns a filtered arr
    const filteredData = countriesArr.filter(
      (country) =>
        country.name.toLowerCase().includes(searchTextValue) ||
        country.capital.toLowerCase().includes(searchTextValue)
    );
    // this is where set the filtered data that need to display on the data
    setFilteredCountriesArr(filteredData);
  }

  return (
    <div className="card-table-header">
      <Title level={3}>List of countries</Title>
      <Input
        className="w-50"
        placeholder="Search name or capital"
        prefix={<SearchOutlined />}
        value={searchedText}
        onChange={handleOnSearch}
      />
    </div>
  );
}
