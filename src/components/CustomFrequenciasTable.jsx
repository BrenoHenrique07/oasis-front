import React from 'react';

function CustomFrequenciasTable({ columns, data }) {
  return (
    <div className="w-4/6 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="text-sm text-center w-full">
        <thead className="text-xs text-white uppercase bg-sky-600">
          <tr>
            {columns.map((column) => (
              <th scope="col" className="px-2 py-3" key={column.key}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr className="bg-white border-b dark:bg-white" key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td className="py-4" key={columnIndex}>
                  {item[columnIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomFrequenciasTable;
