import LandingNavbar from "./Navbars/LandingNavbar";
import RestaurantLandingNavbar from "./Navbars/RestaurantLandingNavbar";
import DeliveryLandingNavbar from "./Navbars/DeliveryLandingNavbar";

import DeliveryNavBar from "./UserNavbars/DeliveryNavBar";
import RestaurantNavbar from "./UserNavbars/RestaurantNavbar";
import CustomerNavBar from "./UserNavbars/CustomerNavBar";

import RestaurantLogin from "./Forms/Auth/RestaurantLogin";
import DeliveryLogin from "./Forms/Auth/DeliveryLogin";
import RestaurantReg from "./Forms/Registration/RestaurantReg";
import DeliveryReg from "./Forms/Registration/DeliveryReg";

import PageTitle from "./PageComponents/PageTitle";
import NewCardForm from "./Forms/Payment/NewCardForm";

import ThemeButton from "./Buttons/ThemeButton";
import CloseButton from "./Buttons/CloseButton";
import ProfileButton from "./Buttons/ProfileButton";
import NotificationsButton from "./Buttons/NotificationsButton";
import SeeMoreButton from "./Buttons/SeeMoreButton";
import LikeButton from "./Buttons/Customer/LikeButton";
import BackButton from "./Buttons/BackButton";
import AvailabilityToggleButton from "./Buttons/Restaurant/AvailabilityToggleButton";
import LocationSelectButton from "./Buttons/Customer/LocationSelectButton";
import MenuItemAvailabilityButton from "./Buttons/Restaurant/MenuItemAvailabilityButton";
import MapViewButton from "./MapView/MapViewButton";

import RestaurantCard from "./Cards/Customer/RestaurantCard";
import FoodItemCard from "./Cards/Customer/FoodItemCard";
import CardSelect from "./Cards/Payment/CardSelect";
import SavedCards from "./Cards/Payment/SavedCards";
import Card from './Cards/Payment/Card'
import ConfirmModal from "./Cards/Payment/ConfirmModal";

import Footer from "./Footer/Footer";
import ThemeLogo from "./Logos/ThemeLogo";
import ThemeTextLogo from "./Logos/ThemeTextLogo";
import ComponentHealth from "./Cards/ComponentHealth";

import ShoppingCartButton from "./ShoppingCart/ShoppingCartButton";
import Counter from "./ShoppingCart/Counter";

import DeliveryMap from "./DeliveryMap/DeliveryMap";
import DeliveryOrders from "./DeliveryMap/OrderSocket"

import OrderAccordionItem from "./Accordions/Customer/OrderAccordionItem";

import OrderTimeline from "./Timelines/Customer/OrderTimeline";

import OrderRequests from "./Widgets/Restaurant/OrderRequests";

import ImageUploader from "./ImageUploaders/ImageUploader";

import StarRating from "./Ratings/StarRating";

export {
  //Navbars
  LandingNavbar,
  RestaurantLandingNavbar,
  DeliveryLandingNavbar,

  //User Navbars
  DeliveryNavBar,
  RestaurantNavbar,
  CustomerNavBar,

  //Forms
  RestaurantLogin,
  DeliveryLogin,
  RestaurantReg,
  DeliveryReg,
  NewCardForm,

  //Page Components
  PageTitle,
  
  //Buttons
  ThemeButton,
  CloseButton,
  ProfileButton,
  NotificationsButton,
  SeeMoreButton,
  LikeButton,
  BackButton,
  AvailabilityToggleButton,
  LocationSelectButton,
  MapViewButton,
  MenuItemAvailabilityButton,

  //Cards
  RestaurantCard,
  FoodItemCard,
  CardSelect,
  SavedCards,
  Card,
  ConfirmModal,

  //Accordions
  OrderAccordionItem,

  //Common
  Footer,
  ThemeLogo,
  ThemeTextLogo,
  ComponentHealth,

  //Shopping Cart
  ShoppingCartButton,
  Counter,

  //Delivery
  DeliveryMap,
  DeliveryOrders,
  
  //Timelines
  OrderTimeline,

  //Widgets
  OrderRequests,

  //Image Uploaders
  ImageUploader,

  // Ratings
  StarRating,
};
