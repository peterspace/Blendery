import { useState, useEffect } from 'react';
import UserDataTable from './tables/UserDataTable';

const UserRecord = (props) => {
  const { columns, data, mode, setMode } = props;
  const themeL = localStorage.getItem('theme')
    ? JSON.parse(localStorage.getItem('theme'))
    : false;
  const [theme, setTheme] = useState(themeL); // default light mode

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', JSON.stringify(theme));
      setMode(false);
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', JSON.stringify(theme));
      setMode(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  useEffect(() => {
    if (mode === false) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', JSON.stringify(mode));
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', JSON.stringify(theme));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <div className="container mx-auto bg-white dark:bg-bgDarkMode text-black' dark:text-gray-100">
      <UserDataTable
        columns={columns}
        data={data}
        setTheme={setTheme}
        theme={theme}
      />
    </div>
  );
};

export default UserRecord;
