import { useState } from "react";
import DataTable from "react-data-table-component";

const styles = "bg-white outline-none p-1 w-1/2 border";

interface userData {
  id: number;
  name: string;
  age: string;
  location: string;
}

const Home = () => {
  const [data, setData] = useState<Array<userData>>([]);

  const handleRow = () => {
    const newData = {
      id: data.length + 1,
      name: "",
      age: "",
      location: "",
    };

    setData([...data, newData]);
  };

  const deleteRow = (id: number) => {
    const updatedData = data.filter((row) => row.id !== id);

    const updatedDataWithRow = updatedData.map((row, index) => ({
      ...row,
      id: index + 1,
    }));

    setData(updatedDataWithRow);
  };

  const handleNameChange = (id: number, value: string) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, name: value } : row))
    );
  };

  const handleAgeChange = (id: number, value: string) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, age: value } : row))
    );
  };

  const handleLocationChange = (id: number, value: string) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, location: value } : row))
    );
  };

  const columns = [
    {
      name: "Id",
      label: "ID",
      selector: (row: userData) => row.id,
    },
    {
      name: "Name",
      label: "Name",
      selector: (row: userData) => row.name,
      cell: (row: userData) => (
        <input
          value={row.name}
          onChange={(e) => handleNameChange(row.id, e.target.value)}
          className={`${styles}`}
          type="text"
        />
      ),
    },
    {
      name: "Age",
      label: "Age",
      selector: (row: userData) => row.age,
      cell: (row: userData) => (
        <input
          className={`${styles}`}
          value={row.age}
          onChange={(e) => handleAgeChange(row.id, e.target.value)}
          type="text"
        />
      ),
    },
    {
      name: "Location",
      label: "Location",
      selector: (row: userData) => row.location,
      cell: (row: userData) => (
        <input
          className={`${styles}`}
          value={row.location}
          onChange={(e) => handleLocationChange(row.id, e.target.value)}
          type="text"
        />
      ),
    },
    {
      name: "",
      label: "",
      cell: (row: userData) => (
        <button
          onClick={() => deleteRow(row.id)}
          className="px-4 py-2 bg-red-500 text-white rounded-full "
        >
          Delete Row
        </button>
      ),
    },
  ];

  return (
    <>
      <button
        onClick={handleRow}
        className="px-4 py-2 bg-blue-500 text-white rounded-full "
      >
        Add Row
      </button>
      <DataTable
        title="Data Table with editable and added rows"
        data={data}
        columns={columns}
      />
    </>
  );
};

export default Home;
