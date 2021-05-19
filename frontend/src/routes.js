/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Mining from "views/Mining.js";
import TableList from "views/TableList.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/user",
  },
  {
    path: "/send-transaction",
    name: "Send",
    rtlName: "الرموز",
    icon: "tim-icons icon-spaceship",
    component: Icons,
    layout: "/user",
  },
  {
    path: "/mining",
    name: "Mining",
    rtlName: "الرموز",
    icon: "tim-icons icon-scissors",
    component: Mining,
    layout: "/user",
  },
  {
    path: "/history",
    name: "Your History List",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/user",
  }
];
export default routes;
