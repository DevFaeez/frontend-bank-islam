import Slider from "react-slick";
import HomepageNavBar from "../components/Navbar/HomepageNavBar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography } from "@mui/material";
import HomeUpdate from "../components/Home/HomeUpdate";

export default function Homepage() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: false,
  };

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <HomepageNavBar />

      <div className="slider-container m-0 p-0 border-none">
        <Slider {...settings}>
          <div>
            <img
              src={"/src/assets/homepage-1.png"}
              alt="Slide 1"
              className="w-full h-screen object-cover outline-none"
            />
          </div>
          <div>
            <img
              src={"/src/assets/homepage-2.jpg"}
              alt="Slide 2"
              className="w-full h-screen object-cover outline-none"
            />
          </div>
        </Slider>
      </div>
      <div className="py-8">
        <Typography
          color="secondary"
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Bank Islam New Features
        </Typography>
        <div className="flex gap-4 items-center justify-center pt-6">
          <HomeUpdate
            imagesUrl={"/src/assets/feature-2.png"}
            title={"Are you bussines owner?"}
            desc={
              "Discover how our BIMB Biz can help you manage your efficiently and effortlessly, good luck owner"
            }
          />
          <HomeUpdate
            imagesUrl={"/src/assets/feature-1.png"}
            title={"Need Assistence? Find answer here"}
            desc={
              "Visit our Help Center for guides, FAQs, and  top tips on using the app. We're here to support you!"
            }
          />
          <HomeUpdate
            imagesUrl={"/src/assets/feature-2.png"}
            title={"Stay alert, stay protected"}
            desc={
              "Learn how to protect yourself from fraud and safeguard your financial information with our essential tips"
            }
          />
        </div>
      </div>
      <div className="py-10 px-60">
        <Typography
          variant="body2"
          sx={{ textAlign: "center", color: "#949494" }}
        >
          Discover the enhanced{" "}
          <b style={{ color: "#4a4848" }}>Bank Islam Internet Banking</b>{" "}
          experience with the all-new BIMB platform, combining advanced
          technology and user-friendly design for secure and seamless digital
          banking. With BIMB Mobile and BIMB Web, you can conveniently manage
          your Bank Islam accounts anytime, anywhere. Effortlessly perform
          transactions, view balances, and access a wide range of banking
          services with streamlined navigation. The platform is built with your
          security in mind, featuring BIMB Secure for robust encryption and
          multi-layered user authentication. Experience the future of Bank Islam
          Internet Banking with tools designed to make your financial management
          easier and safer than ever.
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            color: "black",
            fontSize: "10px",
            marginTop: "30px",
          }}
        >
          © 2025 Bank Islam Malaysia BerhadReg. No. 198301002944 (98127-X) All
          right reserved.
        </Typography>
      </div>
    </div>
  );
}
