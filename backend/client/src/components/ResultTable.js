import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table } from 'antd';

function ResultTable(props) {

const [data] = useState(props.data)

const columns = [
  {
    title: "Artist Name",
    dataIndex: "artistName",
    key: "artistName"
  },
  {
    title: "Track Name",
    dataIndex: "trackName",
    key: "trackName"
  },
  {
    title: "Album Name",
    dataIndex: "collectionName",
    key: "collectionName"
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country"
  },
  {
    title: "Genre",
    key: "primaryGenreName",
    dataIndex: "primaryGenreName"
  },
  {
    title: "Artist Page",
    key: "artistViewUrl",
    dataIndex: "artistViewUrl",
    render: text => <a href={text}>{text}</a>
  },
  {
    title: "Action",
    key: "action",
    render: () =>
     <Link to="/details">More Details</Link>
  }
];

return(
  <Table columns={columns} dataSource={data} />);
}
export default ResultTable;



