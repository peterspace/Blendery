import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import {
  WalletSellIcon,
  ExchangeIcon,
  NotificationIcon,
  UpArrowIcon,
  DownArrowIcon,
} from "../assets/smart-icons";
import { FaConnectdevelop } from "react-icons/fa6";

export const DashboardMenuAdmin = (props) => {
  const { setPage, page, mode, user } = props;

  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(0);
  const [activePage, setActivePage] = useState("");

  const [name, surname] = user.name.split(" ");

  useEffect(() => {
    if (page.includes("Buy")) {
      setIsSubMenuOpen(1);
    } else if (page.includes("Sell")) {
      setIsSubMenuOpen(2);
    }
    setActivePage(page);
  }, [page]);

  const handleOpen = (value) => {
    setIsSubMenuOpen(isSubMenuOpen === value ? 0 : value);
  };

  return (
    <Card className="h-[calc(100vh-2rem)] w-[18%] p-10 pr-6 shadow-xl shadow-blue-gray-900/5 box-border rounded-none">
      <div className="flex mb-14 items-center">
        <div
          style={{
            backgroundImage: `url(${user?.photo})`,
          }}
          className="w-12 h-12 rounded-[24px] bg-cover bg-center"
        ></div>
        <div className="flex flex-col ml-2 text-base text-[#111111] font-normal">
          <div>{name}</div>
          <div>{surname}</div>
        </div>
      </div>
      <List className="text-[#111111] w-[92%] p-0 font-normal gap-2">
        <ListItem
          ripple={false}
          className={`cursor-pointer p-2 rounded-lg ${
            activePage === "Exchange" ? "bg-[#ECEAFF] text-[#5046E5]" : ""
          }`}
          onClick={() => {
            setIsSubMenuOpen(0);
            setPage("Exchange");
          }}
        >
          <ListItemPrefix>
            <ExchangeIcon
              size={20}
              stroke={activePage === "Exchange" ? "#5046E5" : "#111111"}
            />
          </ListItemPrefix>
          Exchange
        </ListItem>

        <Accordion
          open={isSubMenuOpen === 1}
          icon={
            isSubMenuOpen === 1 ? (
              <UpArrowIcon size={12} fill={"#5046E5"} />
            ) : (
              <DownArrowIcon size={12} fill={"#111111"} />
            )
          }
        >
          <ListItem
            ripple={false}
            className={`p-0 w-full ${
              isSubMenuOpen === 1 ? "bg-[#ECEAFF]" : ""
            }`}
            selected={isSubMenuOpen === 2}
          >
            <AccordionHeader
              onClick={() => {
                handleOpen(1);
                setPage("Buy (Cash)");
              }}
              className="border-b-0 py-3 px-2 m-0 bg-transparent focus:bg-transparent shadow-none focus:shadow-none text-[#111111]"
            >
              <ListItemPrefix>
                <WalletSellIcon
                  size={20}
                  stroke={isSubMenuOpen === 1 ? "#5046E5" : "#111111"}
                />
              </ListItemPrefix>
              <Typography
                className={`mr-auto font-normal ${
                  isSubMenuOpen === 1 ? "text-[#5046E5]" : ""
                }`}
              >
                Buy
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-2 px-5">
            <List className="p-0">
              <ListItem
                className={`cursor-pointer w-[80%] p-2 rounded-lg ${
                  activePage === "Buy (Cash)" ? "text-[#5046E5] font-bold" : ""
                }`}
                ripple={false}
                onClick={() => {
                  setPage("Buy (Cash)");
                }}
              >
                Cash
              </ListItem>
              <ListItem
                className={`cursor-pointer w-[80%] p-2 rounded-lg ${
                  activePage === "Buy (Card)" ? "text-[#5046E5] font-bold" : ""
                }`}
                ripple={false}
                onClick={() => {
                  setPage("Buy (Card)");
                }}
              >
                Card
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={isSubMenuOpen === 2}
          icon={
            isSubMenuOpen === 2 ? (
              <UpArrowIcon size={12} fill={"#5046E5"} />
            ) : (
              <DownArrowIcon size={12} fill={"#111111"} />
            )
          }
        >
          <ListItem
            ripple={false}
            className={`p-0 ${isSubMenuOpen === 2 ? "bg-[#ECEAFF]" : ""}`}
            selected={isSubMenuOpen === 2}
          >
            <AccordionHeader
              onClick={() => {
                handleOpen(2);
                setPage("Sell (Cash)");
              }}
              className="border-b-0 py-3 px-2 m-0 bg-transparent focus:bg-transparent shadow-none focus:shadow-none text-[#111111]"
            >
              <ListItemPrefix>
                <WalletSellIcon
                  size={20}
                  stroke={isSubMenuOpen === 2 ? "#5046E5" : "#111111"}
                />
              </ListItemPrefix>
              <Typography
                className={`mr-auto font-normal ${
                  isSubMenuOpen === 2 ? "text-[#5046E5]" : ""
                }`}
              >
                Sell
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-2 px-5">
            <List className="p-0">
              <ListItem
                className={`cursor-pointer w-[80%] p-2 rounded-lg ${
                  activePage === "Sell (Cash)" ? "text-[#5046E5] font-bold" : ""
                }`}
                ripple={false}
                onClick={() => {
                  setPage("Sell (Cash)");
                }}
              >
                Cash
              </ListItem>
              <ListItem
                className={`cursor-pointer w-[80%] p-2 rounded-lg ${
                  activePage === "Sell (Card)" ? "text-[#5046E5] font-bold" : ""
                }`}
                ripple={false}
                onClick={() => {
                  setPage("Sell (Card)");
                }}
              >
                Card
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <ListItem
          ripple={false}
          className={`cursor-pointer p-2 pl-1.5 rounded-lg ${
            activePage === "Defi" ? "bg-[#ECEAFF] text-[#5046E5]" : ""
          }`}
          onClick={() => {
            setIsSubMenuOpen(0);
            setPage("Defi");
          }}
        >
          <ListItemPrefix>
            <FaConnectdevelop
              size={20}
              color={activePage === "Defi" ? "#5046E5" : "#111111"}
            />
          </ListItemPrefix>
          Defi
        </ListItem>

        <ListItem
          ripple={false}
          className={`cursor-pointer p-2 pl-1.5 rounded-lg ${
            activePage === "Notifications" ? "bg-[#ECEAFF] text-[#5046E5]" : ""
          }`}
          onClick={() => {
            setIsSubMenuOpen(0);
            setPage("Notifications");
          }}
        >
          <ListItemPrefix>
            <NotificationIcon
              size={20}
              stroke={activePage === "Notifications" ? "#5046E5" : "#111111"}
            />
          </ListItemPrefix>
          Notifications
          <ListItemSuffix className="ml-6">
            <Chip
              value="4"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
      </List>
    </Card>
  );
};
