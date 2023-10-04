import React from "react";
import Drawer from "../components/Drawer";
import MealList from "../components/MealList";
import FoodList from "../components/FoodList";

const Main = () => {
  return (
    <div className="container">
      <Drawer user={localStorage.getItem("username")} />
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">
              <FoodList />
            </div>
            <div className="col-lg-8 col-md-6">
              <MealList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
