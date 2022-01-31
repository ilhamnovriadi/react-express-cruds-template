import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatRp } from "../../utils/tools";
import "./index.scss";
const URL = process.env.REACT_APP_RESTAPI;

const Detail = () => {
  const { id } = useParams();
  const [product, setproduct] = useState("");

  useEffect(() => {
    const getProduct = () => {
      axios
        .get(URL + "/product/" + id)
        .then((res) => {
          setproduct(res.data);
        })
        .catch((err) => console.log(err));
    };
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {product?._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {product?.nama_merek}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: Rp{formatRp(product?.harga)}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {product?.stok}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>: {product?.active ? "Aktif" : "Tidak Aktif"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Detail;
