import bannerImg from "./../../../assets/images/banner.svg";

const Banner = () => {
  return (
    <div className="container mx-auto">
      <img src={bannerImg} alt="Banner Image" loading="lazy" />
    </div>
  );
};

export default Banner;
