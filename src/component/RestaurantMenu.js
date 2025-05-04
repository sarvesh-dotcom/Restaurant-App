import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "./config";
import Shimmer from "./Shimmer";
import useRestaurant from "../utils/useRestaurant";

const RestaurantMenu = () => {
    const { id } = useParams();

    const restaurant = useRestaurant(id);

    return (!restaurant) ? <Shimmer/> : (
        <div>
            <h1>Restaurant ID: {id}</h1>
            <h2>{restaurant?.name || "Loading..."}</h2> {/* Handle loading */}
            <img className="img-menu" src = {IMG_CDN_URL + restaurant?.cloudinaryImageId}></img>
            <h3>{restaurant.city}</h3>
            <h3>{restaurant.areaName}</h3>
            <h3>{restaurant.costForTwoMessage}</h3>
            
        </div>
    );
}

export default RestaurantMenu;
