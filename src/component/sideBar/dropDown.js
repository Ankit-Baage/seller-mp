import dashboard from "../../assets/home.svg";
import prexo from "../../assets/prexo.svg";
import vrp from "../../assets/vrp.svg";
import openBox from "../../assets/openBox.svg";
import spare from "../../assets/spare.svg";
import new_phone from "../../assets/new_phone.svg";
import payment from "../../assets/payment.svg";

export const dropdowns = [
  {
    id: "category",
    title: "Manage Inventory",
    options: [
      { id: "vrp", image: vrp, name: "VRP", path: "vrp" },
      { id: "spares", image: spare, name: "Spares", path: "spares" },
      {
        id: "new_phones",
        image: new_phone,
        name: "New Phones",
        path: "new_phones",
      },
      { id: "openBox", image: openBox, name: "Open Box", path: "open_box" },
      { id: "prexo", image: prexo, name: "Prexo", path: "prexo" },
    ],
  },
];

export const withoutDropdowns = [
  { id: "home", image: dashboard, name: "Home", path: "/" },
  { id: "orders", image: payment, name: "Orders", path: "orders" },
];
