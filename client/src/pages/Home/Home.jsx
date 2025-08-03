import React from 'react'
import Banner from './Banner'
import BestSellerMeals from './BestSellerMeals'
import { FavoriteMeal } from './FavoriteMeal'
// import { Promo } from './Promo'
// import { MoreMeals } from './MoreMeals'
import { Review } from './Review'
import Header from '../../components/Header'
import MainFooter from '../../components/MainFooter'
import ContactMe from './ContactMe'

function Home() {
    return (
        <>
            <Header />
            <div>
                <Banner />
                <BestSellerMeals />
                <FavoriteMeal />
                {/* <Promo /> */}
                <Review />
                {/* <MoreMeals /> */}
                <ContactMe />
            </div>
            <MainFooter />
        </>
    )
}

export default Home