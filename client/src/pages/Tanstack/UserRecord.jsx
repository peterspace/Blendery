import { useState, useEffect, useCallback } from "react";
import UserDataTable from "./tables/UserDataTable";
import MemoizedUserTransactionsTable from "./tables/UserTransactionsTable";
import NoTransactionFound from "../../components/NoTransactionFound";

const UserRecord = (props) => {
  const { columns, data, mode, setMode } = props;

  const themeL = localStorage.getItem("theme")
    ? JSON.parse(localStorage.getItem("theme"))
    : false;
  const [theme, setTheme] = useState(themeL); // default light mode
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", JSON.stringify(theme));
      setMode(false);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", JSON.stringify(theme));
      setMode(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  useEffect(() => {
    if (mode === false) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", JSON.stringify(mode));
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", JSON.stringify(theme));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    formatTableData(data);
  }, []);

  const formatTableData = useCallback((data) => {
    const formattedTableData = data.reduce((accumulator, obj) => {
      const formattedObj = {
        id: obj._id,
        orderNo: obj.orderNo,
        status: obj.status,
        from: `${obj.fValue} ${obj.fToken.symbol.toUpperCase()}`,
        to: `${obj.tValue} ${obj.tToken.symbol.toUpperCase()}`,
        pin: obj.pin,
        dispatcherId: obj.dispatcherId,
        timeLeft: obj.timeLeft,
      };

      accumulator.push(formattedObj);
      return accumulator;
    }, []);

    setTableData(formattedTableData);
  }, []);

  return (
    <div className="container mx-auto bg-white dark:bg-bgDarkMode text-black' dark:text-gray-100">
      {/* <UserDataTable
        columns={columns}
        data={data}
        setTheme={setTheme}
        theme={theme}
      /> */}

      {tableData.length ? (
        <MemoizedUserTransactionsTable
          columns={columns}
          data={data}
          tableData={tableData}
          setTheme={setTheme}
          theme={theme}
        />
      ) : (
        <NoTransactionFound />
      )}
    </div>
  );
};

export default UserRecord;
