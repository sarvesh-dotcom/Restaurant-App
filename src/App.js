import React ,{lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Body from "./component/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./component/About";
import Error from "./component/Error";
import Contact from "./component/Contact";
import RestaurantMenu from "./component/RestaurantMenu";
import Shimmer from "./component/Shimmer";


const Instamart = lazy(()=>import("./component/Instamart"));

const AppLayout = () => {
    return (
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element : <AppLayout/>,
        errorElement : <Error />,
        children: [
            {
                path: "/",
                element: <Body/>,
            },
            {
                path: "/about",
                element: <About/>,
            },
            {
                path: "/contact",
                element: <Contact/>,
            },
            {
                path:"/restaurant/:id",
                element: <RestaurantMenu/>
            },
            {
                path:"/instamart",
                element: <Suspense fallback={<Shimmer/>}> <Instamart/> </Suspense>
            }
        ]
    }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);