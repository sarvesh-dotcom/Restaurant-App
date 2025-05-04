import {useState, useEffect} from "react";


const useRestaurant = (id) => {
    const  [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        getRestaurantInfo();
    }, [id]); // Add id as a dependency

    async function getRestaurantInfo() {
        try {
            const response = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.0759837&lng=72.8776559&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`);
            const json = await response.json();

            console.log("API Response:", json.data); // Debugging

            // Extract restaurant info safely
            const restaurantInfo = json?.data?.cards?.find(
                (card) => card?.card?.card?.info?.name
            )?.card?.card?.info;

            setRestaurant(restaurantInfo || {}); // Ensure it stays an object
        } catch (error) {
            console.error("Error fetching restaurant data:", error);
        }
    }
    return restaurant;
};

export default useRestaurant;