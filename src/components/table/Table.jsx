import { useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./columns";
import "./table.css";

const Table = ({ data }) => {
  const columns = useMemo(() => COLUMNS, []);
  const d = useMemo(() => data, [data]);

  const tabelInstance = useTable({ columns, data: d });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tabelInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
