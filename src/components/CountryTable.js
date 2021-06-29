import React from "react";
import Highlighter from "react-highlight-words";
import { Avatar, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function CountryTable({
  isTableLoading,
  searchedText,
  selectedCountryKeys,
  filteredCountriesArr,
  setSelectedCountryKeys,
}) {
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
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend"],
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      sorter: (a, b) => a.region.localeCompare(b.region),
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
      sorter: (a, b) => a.capital.localeCompare(b.capital),
      sortDirections: ["descend"],
    },
  ];
  const rowSelection = {
    type: "checkbox",
    selectedRowKeys: selectedCountryKeys,
    onChange: onSelectChange,
  };
  const tableLoading = {
    spinning: isTableLoading,
    indicator: <LoadingOutlined style={{ fontSize: 60 }} spin />,
  };
  function onSelectChange(selectedRowKeys) {
    localStorage.setItem("favorites", JSON.stringify(selectedRowKeys));
    setSelectedCountryKeys(selectedRowKeys);
  }
  return (
    <Table
      className="table-striped-rows"
      rowSelection={rowSelection}
      height="500px"
      dataSource={filteredCountriesArr}
      columns={countriesTableColumn}
      scroll={{ y: 500 }}
      loading={tableLoading}
    />
  );
}
