import React, { useEffect, useState } from "react";
import axios from "axios";

const Table = ({ category }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await axios.get(`https://quiz-sf08.onrender.com/user`).then((res) => {
          setData(res.data);
        });
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {loading && <h1>Loading...</h1>}
      {!loading && (
        <table className="w-full text-center border-collapse capitalize">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th>name</th>
              <th>category</th>
              <th>points</th>
            </tr>
          </thead>
          <tbody>
            {data && data.filter((i) => i.category === category).length > 0 ? (
              data
                .filter((i) => i.category === category)
                .sort((a, b) => b.point - a.point)
                .map((i, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{i.name}</td>
                      <td>{i.category}</td>
                      <td>{i.point}</td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan={3}>No Players played this category</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Table;
