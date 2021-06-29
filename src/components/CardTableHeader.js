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
    const searchTextValue = e.target.value.toLowerCase();
    const filteredData = countriesArr.filter(
      (country) =>
        country.name.toLowerCase().includes(searchTextValue) ||
        country.capital.toLowerCase().includes(searchTextValue)
    );
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
