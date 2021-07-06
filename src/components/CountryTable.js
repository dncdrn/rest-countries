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
  // column for table
  const countriesTableColumn = [
    {
      title: "Flag",
      // Display field of the data record, support nest path by string array
      dataIndex: "flag",
      // Unique key of this column, you can ignore this prop if you've set a unique dataIndex
      key: "flag",
      // Renderer of the table cell.
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
      // Sort function for local sort, see Array.sort's compareFunction.
      sorter: (a, b) => a.name.localeCompare(b.name),
      // Supported sort way, override sortDirections in Table, could be ascend, descend
      sortDirections: ["descend"],
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      filters: [
        { text: "Americas", value: "Americas" },
        { text: "Asia", value: "Asia" },
      ],
      onFilter: (value, record) => record.region.includes(value),
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
    // can be radio or checkbox
    type: "checkbox",
    // Controlled selected row keys
    selectedRowKeys: selectedCountryKeys,
    // Callback executed when selected rows change
    onChange: onSelectChange,
  };
  const tableLoading = {
    spinning: isTableLoading,
    indicator: <LoadingOutlined style={{ fontSize: 60 }} spin />,
  };
  function onSelectChange(selectedRowKeys) {
    // only accept string
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
