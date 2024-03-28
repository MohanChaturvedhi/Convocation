import React, { useState } from 'react';
// import axios from 'axios';
import { data } from './data.js'; // Mock data for development (optional)
import './ConvocationList.css';

export default function ConvocationList() {
  const [sessionYear, setSessionYear] = useState('2016-2017');
  const [convocationMembers, setConvocationMembers] = useState([]);
  const [flag, setFlag] = useState(false);
  const [sort, setSort] = useState('name');
  const [searchItem, setSearchItem] = useState('');

  const Filehandler = (e) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post('http://localhost:8000/convocationlist', {
    //     sessionYear,
    //   });
    setConvocationMembers(data);
    setFlag(true);
    // } catch (e) {
    //   console.error('Error fetching data:', e);
    // }
  };

  const ApplyFilter = (e) => {
    e.preventDefault();
    let temp = [...convocationMembers]; // Create a new array
    if (sort === 'name') {
      temp.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'branch') {
      temp.sort((a, b) => a.branch.localeCompare(b.branch));
    } else if (sort === 'Date') {
      temp.sort((a, b) => {
        const dateA = a.Date.split("-");
        const dateB = b.Date.split("-");
        const yearComparison = dateA[0] - dateB[0];
        if (yearComparison !== 0) {
          return yearComparison;
        } else {
          return dateA[1] - dateB[1];
        }
      });
    } else {
      temp.sort((a, b) => a.cgpa - b.cgpa);
    }
    setConvocationMembers(temp);
  };

  const SearchFilter = (e) => {
    setSearchItem(e.target.value);
  };

  const filteredMembers = convocationMembers.filter((member) => {
    const searchText = searchItem.toLowerCase();
    return (
      member.name.toLowerCase().includes(searchText) ||
      member.branch.toLowerCase().includes(searchText) ||
      member.Date.toLowerCase().includes(searchText) ||
      member.cgpa.toString().includes(searchText)
    );
  });

  return (
    <div className="container">
      <h1>Session-year</h1>
      <form onSubmit={Filehandler} className="form">
        <select value={sessionYear} onChange={e => setSessionYear(e.target.value)}>
          <option value="2016-2017">2016-2017</option>
          <option value="2018-2019">2018-2019</option>
          <option value="2019-2020">2019-2020</option>
          <option value="2020-2021">2020-2021</option>
          <option value="2022-2023">2022-2023</option>
          <option value="2023-2024">2023-2024</option>
        </select>
        <button>Submit</button>
      </form>
      {flag && convocationMembers.length > 0 &&
        <div>
          <form onChange={ApplyFilter} className="form">
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option>cgpa</option>
              <option>name</option>
              <option>branch</option>
              <option>Date</option>
            </select>
            <button>Apply filter</button>
          </form>
          <input type="text" placeholder="Search" value={searchItem} onChange={SearchFilter} />
          <div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    {Object.keys(filteredMembers[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, i) => (
                        <td key={i}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      }
    </div>
  );
}
