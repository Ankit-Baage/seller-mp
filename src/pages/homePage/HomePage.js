import React from "react";
import totalOrder from "../../assets/totalOrder.svg";
import totalSales from "../../assets/totalSales.svg";
import returnedOrder from "../../assets/returnedOrder.svg";
import totalCustomer from "../../assets/totalCustomer.svg";
import transaction from "../../assets/transaction.svg";
import sales from "../../assets/sales.svg";
import newOrder from "../../assets/newOrder.svg";
import addInventory from "../../assets/addInventory.svg";
import prexo from "../../assets/prexo.svg";
import vrp from "../../assets/vrp.svg";
import openBox from "../../assets/openBox.svg";
import spare from "../../assets/spare.svg";
import new_phone from "../../assets/new_phone.svg";
import { Info } from "../../component/infoCard/Info";
import { Card } from "../../component/infoCard/Card";
import classes from "./homePage.module.css";
import { CustomSelect } from "../../component/experiment/customSelect/CustomSelect";
import { PieChart } from "../../component/graphs/piChart/PiChart";

const infoCards = [
  { id: 1, image: totalOrder, title: "Total Order", subTitle: "243" },
  {
    id: 2,
    image: totalSales,
    title: "Total Sales",
    subTitle: "₹ 243,587.12",
  },
  { id: 3, image: returnedOrder, title: "Returned Order", subTitle: "06" },
  {
    id: 4,
    image: totalCustomer,
    title: "Total Customer",
    subTitle: "2453",
  },
];

const optionData = [
  { id: 1, label: "weekly" },
  { id: 2, label: "monthly" },
  { id: 3, label: "yearly" },
];

const earnings = [
  { id: 1, image: transaction, title: "Transaction", subTitle: "204,538.54" },
  { id: 2, image: sales, title: "sales", subTitle: "₹ 223,587.12" },
];

const salesData = [
  { name: "newPhones", sales: 65, color: "#b3b3b3" },
  { name: "openBox", sales: 55, color: "#009951" },
  { name: "spares", sales: 45, color: "#80caff" },
  { name: "prexo", sales: 35, color: "#F5F6FA" },
  { name: "vrp", sales: 75, color: "#FF6F3F" },
];

const buttonGroups = [
  {
    id: 1,
    titleImage: newOrder,
    title: "New Orders",
    buttons: [
      { id: "1-1", image: prexo, title: "Prexo (27)" },
      { id: "1-2", image: vrp, title: "VRP (54)" },
      { id: "1-3", image: openBox, title: "Open Box (15)" },
      { id: "1-4", image: spare, title: "Spares (32)" },
      { id: "1-5", image: new_phone, title: "New Phones (18)" },
    ],
  },
  {
    id: 2,
    titleImage: addInventory,
    title: "Add Inventory",
    buttons: [
      { id: "2-1", image: prexo, title: "Prexo" },
      { id: "2-2", image: vrp, title: "VRP" },
      { id: "2-3", image: openBox, title: "Open Box" },
      { id: "2-4", image: spare, title: "Spares" },
      { id: "2-5", image: new_phone, title: "New Phones" },
    ],
  },
];

export const HomePage = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__content}>
        <div className={classes.box__infoCards}>
          {infoCards.map((infoCard) => (
            <Card key={infoCard.id} className={classes.box__infoCards__card}>
              <Info
                image={infoCard.image}
                title={infoCard.title}
                subTitle={infoCard.subTitle}
              />
            </Card>
          ))}
        </div>
        <Card className={classes.box__earningCard}>
          <div className={classes.box__earning}>
            <div className={classes.box__earning__leftColumn}>
              <div className={classes.box__earning__leftColumn__content}>
                <h1 className={classes.box__earning__leftColumn__title}>
                  Earning Report
                </h1>
                <h1 className={classes.box__earning__leftColumn_subTitle}>
                  Income report seen in graphs
                </h1>
              </div>
              <div className={classes.box__infoCards__earnings}>
                {earnings.map((earning) => (
                  <Info
                  key={earning.id}
                    image={earning.image}
                    title={earning.title}
                    subTitle={earning.subTitle}

                  />
                ))}
              </div>
            </div>
            <div className={classes.box__earning__rightColumn}>
              <CustomSelect optionData={optionData} label="Choose" />
              <div className={classes.box__content__graph}>
                <PieChart data={salesData} />
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className={classes.box}>
        {buttonGroups.map((buttonGroup) => (
          <div className={classes.box__nav} key={buttonGroup.id}>
            <div className={classes.box__nav__head}>
              <img
                src={buttonGroup.titleImage}
                alt={buttonGroup.title}
                className={classes.box__nav__img}
              />
              <h1 className={classes.box__nav__title}>{buttonGroup.title}</h1>
            </div>
            <hr className={classes.box__nav__sep} />
            <div className={classes.box__nav__buttons}>
              {buttonGroup.buttons.map((button) => (
                <button
                  className={classes.box__nav__buttons__button}
                  key={button.id}
                >
                  <img
                    src={button.image}
                    alt={button.title}
                    className={classes.box__nav__buttons__bnt__img}
                  />
                  <h1 className={classes.box__nav__buttons__bnt__title}>
                    {button.title}
                  </h1>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
