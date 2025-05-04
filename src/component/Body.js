import { RestaurantCard, restaurantList } from "./config";
import { useState, useEffect} from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import { FETCH_RES_URL } from "./config";
import useOnline from "../utils/useOnline";

const Body = () => {
    
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect( ()=> {
        getRestaurants();
    },[]);

    async function getRestaurants() {
        const data = await fetch(FETCH_RES_URL);
        const jsondata = await data.json();
        setAllRestaurants(jsondata?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurants(jsondata?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    if(!allRestaurants) return null;
   
    const isOnline = useOnline();

    if (!isOnline){
        return <h1>Offline, please check your Internet connection!!!</h1>
    }

    return allRestaurants.length === 0 ? (<Shimmer/> ) : (
        <>
            <div className=" p-5 bg-pink-50 my-5">
                <input
                    type="text"
                    className="focus:bg-purple-50 p-2 m-2 w-1/3 border border-purple-500 rounded-md"
                    placeholder="Search for restaurants"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                    className="p-2 m-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                    onClick={() => {
                        // Filter the restaurants based on search input
                        const filteredData = filterData(searchInput, allRestaurants);
                        setFilteredRestaurants(filteredData);
                    }}
                >
                    Search
                </button>
            </div>

            <div className="flex flex-wrap">
                {filteredRestaurants.length === 0 ? (
                    <h1>No restaurants found</h1>
                ) : (
                    filteredRestaurants.map((restaurant) => (
                            <Link 
                            to={"restaurant/"+restaurant.info.id}
                            key={restaurant.info.id}>
                        <RestaurantCard
                            {...restaurant.info} 
                            
                        />
                        </Link>
                    ))
                )}
            </div>
        </>
    );

};

export default Body;