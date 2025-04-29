const RESTAURANTS_API_URL = import.meta.env.VITE_RESTAURANTS_API_URL;

export const restaurantAPI = {
    RestaurantsAPIhealth: `${RESTAURANTS_API_URL}/health`,

    getAllCategories: `${RESTAURANTS_API_URL}/category`,
    createCategories: `${RESTAURANTS_API_URL}/category`,
    getCategoryByID: `${RESTAURANTS_API_URL}/category/:id`,

    getAllMenuItems: `${RESTAURANTS_API_URL}/menu`,
    createMenuItems: `${RESTAURANTS_API_URL}/menu`,
    getMenuItemsByRestaurantID: (id) => `${RESTAURANTS_API_URL}/menu/restaurant/${id}`,
    getMenuItemsByID: `${RESTAURANTS_API_URL}/menu/:id`,
    getMyMenuItems: `${RESTAURANTS_API_URL}/menu/restaurant/my-menu-items`,
    updateMyMenuItem: (id) => `${RESTAURANTS_API_URL}/menu/restaurant/my-menu-items/${id}`,
    updateMenuItemAvailability: (id) => `${RESTAURANTS_API_URL}/menu/availability/${id}`,
    deleteMyMenuItem: (id) => `${RESTAURANTS_API_URL}/menu/restaurant/my-menu-items/${id}`,

    getAllRestaurantsWithCategories: `${RESTAURANTS_API_URL}/restaurant`,
    getMyTopOrders: `${RESTAURANTS_API_URL}/orders/top`,
    getMyRecentOrders: `${RESTAURANTS_API_URL}/orders/recent`,
}