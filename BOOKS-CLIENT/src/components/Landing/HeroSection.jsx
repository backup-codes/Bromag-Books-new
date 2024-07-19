import logo from "@/assets/images/logo.svg";

const HeroSection = () => {
  return (
    <div className="relative top-[12rem] z-20 w-[85rem] h-56 border-4 rounded-full bg-white border-landing-primary flex items-center justify-center gap-10">
      <img src={logo} className="w-[16rem] h-[16rem] relative " />
      <p className="w-2/3 text-2xl font-roboto-condensed text-muted">
        Our business model involves running a comprehensive food ordering and
        delivery platform, with restaurant owners leasing our services on a
        monthly prepaid basis. Furthermore, we boost restaurant visibility
        through social media promotion and manage deliveries using our own team
        of riders.
      </p>
    </div>
  );
};

export default HeroSection;