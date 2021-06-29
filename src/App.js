import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { Avatar, Card, Col, Input, Row, Skeleton, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getAllCountries } from "./service/countriesAPI";
import "./App.css";
import "antd/dist/antd.css";
import Title from "antd/lib/typography/Title";
import BarGraph from "./components/BarGraph";

function App() {
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  const [countriesArr, setCountriesArr] = useState([]);
  const [searchedText, setSearchText] = useState("");
  const [filteredCountriesArr, setFilteredCountriesArr] = useState([]);
  const [selectedCountryKeys, setSelectedCountryKeys] = useState(favorites);
  const [faveCountriesArr, setFaveCountriesArr] = useState();

  const countriesTableColumn = [
    {
      title: "Flag",
      dataIndex: "flag",
      key: "flag",
      render: (flag) => <Avatar shape="square" size="large" src={flag} />,
    },
    {
      title: "Country",
      dataIndex: "name",
      key: "name",
      render: (name) =>
        searchedText ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchedText]}
            autoEscape
            textToHighlight={name}
          />
        ) : (
          name
        ),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      sorter: (a, b) => a.region.length - b.region.length,
      sortDirections: ["descend"],
    },
    {
      title: "Capital",
      dataIndex: "capital",
      render: (capital) =>
        searchedText ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchedText]}
            autoEscape
            textToHighlight={capital}
          />
        ) : (
          capital
        ),
      sorter: (a, b) => {
        return a.capital.length - b.capital.length;
      },
      sortDirections: ["descend"],
    },
  ];

  useEffect(() => {
    (async function () {
      const countriesResult = await getAllCountries();
      countriesResult.forEach(function (element, index) {
        element.key = index;
      });
      setCountriesArr(countriesResult);
      setFilteredCountriesArr(countriesResult);
    })();
  }, []);

  const rowSelection = {
    type: "checkbox",
    selectedRowKeys: selectedCountryKeys,
    onChange: onSelectChange,
  };

  function onSelectChange(selectedRowKeys) {
    localStorage.setItem("favorites", JSON.stringify(selectedRowKeys));
    setSelectedCountryKeys(selectedRowKeys);
  }

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
    <div className="App">
      <div className="app-container">
        <Card
          className="border-round"
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexFlow: "wrap",
              }}
            >
              <Title level={3}>List of countries</Title>
              <Input
                style={{ width: "50%" }}
                placeholder="Search name or capital"
                prefix={<SearchOutlined />}
                value={searchedText}
                onChange={handleOnSearch}
              />
            </div>
          }
        >
          <Table
            className="table-striped-rows"
            style={{ width: "100%" }}
            rowSelection={rowSelection}
            dataSource={filteredCountriesArr}
            columns={countriesTableColumn}
            scroll={{ y: 500 }}
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
    </div>
  );
}

export default App;
