import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Welcome/Login";
import Register from "@/components/Welcome/Register";
import Dashboard from "@/components/shared/Dashboard";
import Test from "@/components/shared/test";
import TeamSpace from "@/components/TeamSpace/TeamSpace";
import TeamManagement from "@/components/TeamManagement/TeamManagement";
import DriverStartRun from "@/components/Run/DriverStartRun";
import PitcrewStartRun from "@/components/Run/PitcrewStartRun";
import ObserverStartRun from "@/components/Run/ObserverStartRun";
import DriverSetup from "@/components/Setup/DriverSetup";
import CrewpitSetup from "@/components/Setup/CrewpitSetup";
import Invited from "@/components/TeamManagement/Invited";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/Register",
      name: "Register",
      component: Register
    },
    {
      path: "/Dashboard",
      name: "Dashboard",
      component: Dashboard
    },
    {
      path: "/test",
      name: "test",
      component: Test
    },
    {
      path: "/TeamSpace",
      name: "TeamSpace",
      component: TeamSpace
    },
    {
      path: "/DriverStartRun",
      name: "DriverStartRun",
      component: DriverStartRun
    },
    {
      path: "/PitcrewStartRun",
      name: "PitcrewStartRun",
      component: PitcrewStartRun
    },
    {
      path: "/ObserverStartRun",
      name: "ObserverStartRun",
      component: ObserverStartRun
    },
    {
      path: "/TeamManagement",
      name: "TeamManagement",
      component: TeamManagement
    },
    {
      path: "/DriverSetup",
      name: "DriverSetup",
      component: DriverSetup
    },
    {
      path: "/CrewpitSetup",
      name: "CrewpitSetup",
      component: CrewpitSetup
    },
    {
      path: "/Invited/:link",
      name: "Invited",
      component: Invited
    },
    { path: "*", redirect: "/" }
  ]
});
