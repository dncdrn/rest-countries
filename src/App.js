import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import Chart from "react-google-charts";
import { Avatar, Card, Col, Input, Row, Skeleton, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getAllCountries } from "./service/countriesAPI";
import "./App.css";
import "antd/dist/antd.css";
import Title from "antd/lib/typography/Title";

function App() {
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  const [countriesArr, setCountriesArr] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredCountriesArr, setFilteredCountriesArr] = useState([]);
  const [selectedRowKeyss, setSelectedRowKeyss] = useState(favorites);
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
        searchText ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={name}
          />
        ) : (
          name
        ),
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Capital",
      dataIndex: "capital",
      render: (capital) =>
        searchText ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={capital}
          />
        ) : (
          capital
        ),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
  ];

  useEffect(() => {
    (async function () {
      const countriesResult = await getAllCountries();
      countriesResult.forEach(function (element, idx) {
        element.key = idx;
      });
      setCountriesArr(countriesResult);
      setFilteredCountriesArr(countriesResult);
    })();
  }, []);

  const rowSelection = {
    type: "checkbox",
    selectedRowKeys: selectedRowKeyss,
    onChange: onSelectChange,
  };

  function onSelectChange(selectedRowKeys) {
    localStorage.setItem("favorites", JSON.stringify(selectedRowKeys));
    setSelectedRowKeyss(selectedRowKeys);
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
    if (countriesArr && selectedRowKeyss.length) {
      const selectedCountriesArr = countriesArr.filter((country) =>
        selectedRowKeyss.includes(country.key)
      );
      const faveCountriesBarGraphDataFormat = selectedCountriesArr.map(
        (country) => [country.name, country.population]
      );
      faveCountriesBarGraphDataFormat.unshift(["Country", "Total Population"]);
      setFaveCountriesArr(faveCountriesBarGraphDataFormat);
    }
  }, [selectedRowKeyss, countriesArr]);

  return (
    <div className="App">
      <Row gutter={16}>
        <Col span={12}>
          <Card
            className="border-round"
            title={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Title level={3}>List of countries</Title>
                <Input
                  style={{ width: "50%" }}
                  placeholder="Search name or capital"
                  prefix={<SearchOutlined />}
                  value={searchText}
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
        </Col>
        <Col span={12}>
          <Card className="border-round">
            {faveCountriesArr ? (
              <Chart
                height={"690px"}
                chartType="Bar"
                loader={<Skeleton />}
                data={faveCountriesArr}
                options={{
                  // Material chart options
                  chart: {
                    title: "Population of Countries",
                    subtitle: "Based on countries that you selected",
                  },
                  hAxis: {
                    title: "Total Population",
                    minValue: 0,
                  },
                  vAxis: {
                    title: "Country",
                  },
                  bars: "horizontal",
                  axes: {
                    y: {
                      15: { side: "right" },
                    },
                  },
                }}
              />
            ) : (
              <b> Select country to see the population</b>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;
