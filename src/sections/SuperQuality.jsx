import { appartment5 } from "../assets/images";
import Buttons from "../components/Buttons";
import { arrowRight } from "../assets/icons"

const SuperQuality = () => {
  return (
    <section
      id='about-us'
      className='flex justify-between items-center max-lg:flex-col gap-10 w-full max-container'
    >
      <div className='flex flex-1 flex-col'>
        <h2 className='font-palanquin capitalize text-4xl lg:max-w-lg font-bold'>
          We Redefine
          <span className='text-purple-800'> Quality rental management, </span>
          <span className='text-black'>expert help. </span> 
        </h2>
        <p className='mt-4 lg:max-w-lg info-text'>
        We embody the art of seamless rental management.
         With a wealth of industry expertise,
         our passionate team is dedicated to crafting exceptional experiences for property owners and tenants alike.
        </p>
        <p className='mt-6 lg:max-w-lg info-text'>
        Join us and experience a world where rental management meets superlative quality at every step.
        </p>
        <div className='mt-11'>
          <Buttons label='View details' iconURL={arrowRight} />
        </div>
      </div>

      <div className='flex-1 flex justify-center items-center'>
        <img
          src={appartment5}
          alt='product detail'
          width={570}
          height={522}
          className='object-contain'
        />
      </div>
    </section>
  );
};

export default SuperQuality;