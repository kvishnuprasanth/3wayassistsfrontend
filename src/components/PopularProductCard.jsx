import {star} from '../assets/icons'

const PopularProductCard = ({buildingname,rent,_id,address}) => {
  return (
    <div className="flex shrink-0 flex-col
    w-100 ">
        <img
            src= {`http://localhost:${process.env.PORT}/api/v5/buildingpicture?id=${_id}`}
            alt={buildingname}
            className="w-[280px] h-[280px] object-cover"
        />
        <div className="mt-8 flex
        justify-start gap-2.5">
            <img
               src={star}
               alt="rating"
               width={24}
               height={24}
            
            
            
            />
            <p className='font-monserrat
            text-xl leading-normal text-slate-gray'>(4.5)</p>

        </div>
        <div>
          
        </div>
        <div className="w-[280px]">
        <h3 className='mt-2 text-2xl
        leading-normal font-semibold 
        font-palanquin text-wrap:break-word'>{buildingname}</h3>
        <p>{rent}</p>
        </div>
        
         
    </div>
  )
}

export default PopularProductCard