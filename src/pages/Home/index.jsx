import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import axios from "axios";
import { formatRp } from "../../utils/tools";
const URL = process.env.REACT_APP_RESTAPI;

const Home = () => {
  const [product, setproduct] = useState([]);
  const [keyword, setkeyword] = useState("");
  const deleteProduct = (id) => {
    axios
      .delete(URL + "/product/" + id)
      .then((res) => getProduct())
      .catch((err) => console.log(err));
  };
  const getProduct = () => {
    axios
      .get(URL + "/product")
      .then((res) => setproduct(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getProduct();
  }, []);

  const fuzzySearch = (list, searchValue) => {
    let buf = ".*" + searchValue.replace(/(.)/g, "$1.*").toLowerCase();
    var reg = new RegExp(buf);
    let newList = list.filter(function (e) {
      return reg.test(e.nama_merek.toLowerCase());
    });
    return newList;
  };

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tambah Produk
      </Link>
      <div className="search">
        <input
          value={keyword}
          onChange={(e) => setkeyword(e.target.value)}
          type="text"
          placeholder="Masukan kata kunci..."
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-right">Stock</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {fuzzySearch(product, keyword).map((item, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.nama_merek}</td>
                <td className="text-right">Rp{formatRp(item.harga)}</td>
                <td className="text-right">{item.stok}</td>
                <td className="text-center">
                  <Link
                    to={`/detail/${item._id}`}
                    className="btn btn-sm btn-info"
                  >
                    Detail
                  </Link>
                  <Link
                    to={`/edit/${item._id}`}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </Link>
                  <Link
                    to="#"
                    onClick={() => deleteProduct(item._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
