import { useState } from "react";
import { arrowRight } from "../assets/icons";
import { shoes, statistics } from "../constants";
import { bigShoe1 } from "../assets/images";
import ShoeCard from "../components/ShoeCard";

const Hero = () => {
  const [bigShoeImg, setBigShoeImg] = useState(bigShoe1);

  return (
    <section
      id="home"
      className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 px-4 py-8 md:px-8 max-container"
    >
      <div
        id="hmm"
        className="relative xl:w-2/5 flex-col justify-center items-start w-full mr-14 pt-28"
      >
        <p className="text-xl font-montserrat text-black-50">Welcome to</p>
        <h1 className="mt-2 font-palanquin text-6xl sm:text-8xl max-sm:text-[48px] max-sm:leading-[52px] font-bold ">
          <span className="text-purple-900 font-montserrat xl:bg-white xl:whitespace-nowrap relative pr-10 ">
            3WayAssist
          </span>
          <br />
          <span className="inline-block mt-3">Rental Management</span>
        </h1>
        <p className="font-montserrat text-black text-lg leading-8 mt-6 mb-14 sm:max-w-sm">
          Live comfortably with our included maintenance and resident assistance programs
        </p>
        <a href="#products">
          <button
            className="flex justify-center items-center gap-2 px-7 py-4 font-montserrat text-lg leading-none bg-purple-800 rounded-full text-white border-black shadow-md hover:shadow-lg hover:bg-purple-600"
          >
            Explore
            <img
              src={arrowRight}
              alt="arrow right icon"
              className="ml-2 rounded-full w-5 h-5"
            />
          </button>
        </a>
        <p className="mt-10 p-4 text-lg font-montserrat text-black">We are managing</p>
        <div className="flex justify-start items-start flex-wrap w-full mt-2 gap-10 md:gap-16">
          {statistics.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-palanquin font-bold">{stat.value}</p>
              <p className="leading-7 font-montserrat text-slate-gray">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-primary bg-hero bg-cover bg-center ">
        <img
          src={bigShoeImg}
          alt="shoe collection"
          width={610}
          height={500}
          className="object-contain"
          style={{ opacity: 0.9 }}
        />
        <div className="flex sm:gap-6 gap-3 absolute bottom-5 sm:left-[10%] max-sm:px-6">
          {shoes.map((shoe) => (
            <div key={shoe}>
              <ShoeCard
                imgURL={shoe}
                changeBigShoeImage={(shoe) => setBigShoeImg(shoe)}
                bigShoeImg={bigShoeImg}
                imgClass="w-24 h-24 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

// import { useState } from "react"
// import { arrowRight } from "../assets/icons"
// import {shoes, statistics } from "../constants"
// import {bigShoe1} from "../assets/images"
// import ShoeCard from "../components/ShoeCard"

// const Hero = () => {
//   const [bigShoeImg, setbigShoeImg] = useState(bigShoe1)
  
//   return (
//     <section 
//       id="home"
//       className="w-full flex xl:flex-row flex-col
//       justify-center min-h-screen gap-10 max-container "
      
//     >
//       <div id = 'hmm' className="relative xl:w-2/5 flex-col justify-center items-start
//       w-full max-xl:padding-x pt-28">
//         <p className="text-xl font-montserrat
//         text-black-50 ">Welcome to</p>
//         <h1 className="mt-2 font-palanquin text-8xl
//         max-sm:text-[72px] max-sm:leading-[82] font-bold">
//           <span className="text-purple-900 xl:bg-white xl:whitespace-nowrap
//           relative z-10 pr-10 font-sans">3WayAssist</span>
//           <br/>
//           <span className=" inline-block
//           mt-3">Rental Management</span>
         
//         </h1>
//         <p className="font-montserrat text-black
//         text-lg leading-8 mt-6 mb-14 sm:max-w-sm
//         ">Live comfortably with our included maintenance and resident assistance programs
//         </p>
//         <a href="#products"><button className="flex justify-center
//     items-center gap-2 px-7 py-4 font-montserrat
//     text-lg leading-none bg-purple-800 rounded-full text-white
//     border-black shadow-md hover:shadow-lg  hover:bg-purple-600 ">
//        Explore
         
//        <img
//          src={arrowRight}
//          alt="arrow right icon"
//          className="ml-2 rounded-full
//          w-5 h-5"
       
//        />
//     </button></a>
//         <p className="mt-10 p-4 text-lg font-montserrat text-black">
//     We are managing
// </p>
//         <div className="flex justify-start items-start flex-wrap w-full
//         mt-2 gap-16">
//           {statistics.map((stat)=>(
//             <div key={stat.label}>
//                 <p className="text-4xl font-palanquin
//                 font-bold">{stat.value}</p>
//                 <p className="leading-7 font-montserrat
//                 text-slate-gray">{stat.label}</p>

//             </div>
//           ))}

//         </div>


//       </div>
//       <div className="relative flex-1 flex justify-center items-center
//     xl:min-h-screen max-xl:py-40 bg-primary bg-hero bg-cover bg-center">
//   <img
//     src={bigShoeImg}
//     alt="shoe collection"
//     width={610}
//     height={500}
//     className="object-contain"
//   />
//   <div className="flex sm:gap-6 gap-3 absolute -bottom-[5%]
//       sm:left-[10%] max-sm:px-6">
//     {shoes.map((shoe) => (
//       <div key={shoe}>
//         <ShoeCard
//           imgURL={shoe}
//           changeBigShoeImage={(shoe) => setbigShoeImg(shoe)}
//           bigShoeImg={bigShoeImg}
//           imgClass="w-24 h-24 object-contain"
//         />
//       </div>
//     ))}
//   </div>
// </div>
//     </section>
//   );
// };

// export default Hero