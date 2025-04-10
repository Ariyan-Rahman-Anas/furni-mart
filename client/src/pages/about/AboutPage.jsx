import { Button } from "@/components/ui/button";
import usePageTitle from "@/hooks/usePageTitle";
import { Link } from "react-router-dom";

const AboutPage = () => {
  usePageTitle('About');

  const whatWeOffer = [
    {
      title: "Home Furniture",
      details:"From cozy sofas to sleek dining tables, we design pieces that turn houses into homes."
    },
    {
      title: "Office Furniture",
      details: "Smart, ergonomic, and stylish setups to boost productivity and comfort at work."
    },
    {
      title: "Custom Designs",
      details: "Got a vision? Let’s bring it to life with bespoke pieces tailored to your taste and needs."
    }
  ]

  return (
    <div className="px-2 md:px-6 space-y-24 mt-6 max-w-6xl mx-auto text-black">
      {/* Hero Section */}
      <section className="text-center p-6 md:p-12 bg-white rounded-3xl shadow-xl border border-gray-200">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Designing Comfort. <br /> Inspiring Style.</h1>
        <p className="text-xl max-w-3xl mx-auto text-gray-600">
          At <span className="text-black font-bold">WellWood</span>, furniture is an experience. Whether you&apos;re   building your dream home or refining your workspace, our signature pieces fuse purpose with personality.
        </p>
      </section>

      {/* Our Story & Mission */}
      <section className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-4 border-l-4 rounded-l-sm border-black pl-4">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            WellWood started with a simple question: <em>Why settle for furniture that just fills a room,
              when it can transform it?</em> What began as a small design studio has grown into a brand trusted by
            homeowners and businesses alike. Every piece we create reflects our passion for high-quality
            craftsmanship and modern aesthetics.
          </p>
        </div>
        <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            To provide timeless, well-crafted furniture that enhances everyday living—at home and at work. We aim
            to blend style, functionality, and sustainability in every design.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whatWeOffer.map(({title, details}, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-gray-700">{details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className=" bg-gray-50 p-10 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Us?</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg text-gray-700 list-disc list-inside">
          <li>Thoughtful design meets premium materials</li>
          <li>Ethical, sustainable manufacturing</li>
          <li>Exceptional customer service and support</li>
          <li>Trusted by homeowners and startups</li>
          <li>Fast and secure nationwide delivery</li>
        </ul>
      </section>

      {/* Sustainability Commitment */}
      <section className=" bg-white p-10 rounded-2xl shadow-md border">
        <h2 className="text-3xl font-bold mb-4">Sustainability Commitment</h2>
        <p className="text-lg text-gray-700">
          Sustainability is not a trend—it’s our foundation. We partner with responsible suppliers, use low-impact finishes, and minimize waste. Every product is a pledge to protect what matters most: your environment and ours.
        </p>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Let’s Make Your Space Remarkable</h2>
        <p className="mb-6 text-lg text-gray-700">Explore our collections or get in touch with our design team today.</p>
        <div className="flex justify-center gap-6">
          <Link to={"/products"}  >
            <Button>Explore Collections</Button>
          </Link>
          <Link to={"/products"}  >
            <Button variant="outline" >Contact Us</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
export default AboutPage;