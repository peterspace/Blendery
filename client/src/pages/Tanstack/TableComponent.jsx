import { useState, useEffect } from 'react';
import AdminDataTable from './tables/AdminDataTable';
const TableComponent = (props) => {
  const { columns, data } = props;
  const themeL = localStorage.getItem('theme')
    ? JSON.parse(localStorage.getItem('theme'))
    : false;
  const [theme, setTheme] = useState(themeL); // default light mode

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', JSON.stringify(theme));
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', JSON.stringify(theme));
    }
  }, [theme]);

  return (
    <div className="container py-10 mx-auto bg-white dark:bg-bgDarkMode text-black' dark:text-gray-100">
      <AdminDataTable
        columns={columns}
        data={data}
        setTheme={setTheme}
        theme={theme}
      />
    </div>
  );
};

export default TableComponent;
