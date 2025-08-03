import Header from "../../components/Header";
import MainFooter from "../../components/MainFooter";
import AllMeals from "./AllMeals"; // renamed from AllBooks

const Shop = () => {
    return (
        <>
            <Header />
            <div className="w-full flex flex-col p-6">
                <AllMeals />
            </div>
            <MainFooter />
        </>
    );
};

export default Shop;
