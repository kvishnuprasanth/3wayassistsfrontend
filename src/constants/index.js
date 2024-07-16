import { facebook, instagram, shieldTick, support, truckFast, twitter } from "../assets/icons";
import { bigShoe1, bigShoe2, bigShoe3, customer1, customer2, thumbnailShoe1, thumbnailShoe2, thumbnailShoe3, appartment1, appartment2, appartment3, appartment4 } from "../assets/images";

export const dropdownlist = { 
    
        href: "#", 
        label: "Login",
        isButton: true,
        dropdown: [
            { href: "Login", label: "User Login" },
            { href: "StaffLogin", label: "Staff Login" },
            { href: "AdminLogin", label:"Admin Login" }
        ]
    
    }
export const navLinks = [
    { href: "/", label: "Home", isButton: true },
    
    { href: "#about-us", label: "About Us", isButton: true },
    { href: "Ticket", label: "Help ticket", isButton: true },
    { href: "#contact-us", label: "Contact Us", isButton: true },

    { 
        href: "#", 
        label: "Login",
        isButton: true,
        dropdown: [
            { href: "Login", label: "User Login" },
            { href: "StaffLogin", label: "Staff Login" },
            { href: "AdminLogin", label:"Admin Login" }
        ]
    },
    { href: "signUp", label: "Signup", isButton: true },
    { href: "MyTickets", label: "MyTickets", isButton: true }
];

export const Login = [
    { 
        label: "Login", 
        dropdown: [
            { href: "Login", label:"User Login" },
            { href: "StaffLogin", label:"Staff Login" },
            { href: "AdminLogin", label:"Admin Login" }
        ]
    }
];

export const shoes = [
    {
        thumbnail: thumbnailShoe1,
        bigShoe: bigShoe1,
    },
    {
        thumbnail: thumbnailShoe2,
        bigShoe: bigShoe2,
    },
    {
        thumbnail: thumbnailShoe3,
        bigShoe: bigShoe3,
    },
];

export const statistics = [
    
    { value: '1500+', label: 'Flats' },
    { value: '25+', label: 'Staff' },
];

export const products = [
    {
        imgURL: appartment1,
        name: "ASBL aspire",
        price: "Rent-₹30000",
    },
    {
        imgURL: appartment2,
        name: "ASBL LAKE SIDE",
        price: "Rent-₹35000",
    },
    {
        imgURL: appartment3,
        name: "RAINBOW VISTAS ROCK GARDEN ",
        price: "Rent-₹40000",
    },
    {
        imgURL: appartment4,
        name: "Marina skies",
        price: "Rent-₹30000",
    },
    {
        imgURL: appartment1,
        name: "Ghataprabha",
        price: "Rent-₹30000",
    },
    
];

export const services = [
    {
        imgURL: truckFast,
        label: "24/7 Help Desk",
        subtext: "We offer prompt assistance for tenant and owner inquiries, maintenance requests, and concerns, ensuring reliable support."
    },
    {
        imgURL: shieldTick,
        label: "Secure Payment",
        subtext: "Experience worry-free transactions with our secure payment options."
    },
    {
        imgURL: support,
        label: "Tenant Placement ",
        subtext: "Our team handles tenant placement with background checks and lease facilitation, ensuring a smooth rental process for owners."
    },
];
export const issues = [
    {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        contactNo: "0987654321",
        flatNo: "102",
        buildingName: "ASBL Aspire",
        street: "Second Street",
        city: "Hyderabad",
        postalCode: "500002",
        issue: "Electrical failure in the living room",
        status:"pending",
        StaffName:"john",
        StaffNumber:"8008283902"
        
    },
    {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        contactNo: "0987654321",
        flatNo: "102",
        buildingName: "ASBL Lake Side",
        street: "Second Street",
        city: "Hyderabad",
        postalCode: "500002",
        issue: "Electrical failure in the living room",
        status:"assigned",
        StaffName:"suresh",
        StaffNumber:"8008283903"
    },
    {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        contactNo: "0987654321",
        flatNo: "102",
        buildingName: "Marina Skies",
        street: "Qaitallapur near idl lake",
        city: "Hyderabad",
        postalCode: "500002",
        issue: "Electrical failure in the living room",
        StaffName:"ramesh",
        StaffNumber:"8008283905"
        
    },
    
  ];
  export const staffMembers = [
    { id: 1, name: 'StaffMember 1', work: 'Plumber' },
    { id: 2, name: 'StaffMember 2', work: 'Electrician' },
    { id: 3, name: 'StaffMember 3', work: 'Carpenter' },
    { id: 4, name: 'StaffMember 4', work: 'Cleaner' },
  ];
  
  

export const reviews = [
    {
        imgURL: customer1,
        customerName: 'Morich Brown',
        rating: 4.5,
        feedback: "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!"
    },
    {
        imgURL: customer2,
        customerName: 'Lota Mongeskar',
        rating: 4.5,
        feedback: "The product not only met but exceeded my expectations. I'll definitely be a returning customer!"
    }
];


export const footerLinks = [
   
    {
        title: "Help",
        links: [
            { name: "About us", link: "/" },
            { name: "FAQs", link: "/" },
            { name: "How it works", link: "/" },
            { name: "Privacy policy", link: "/" },
            { name: "Payment policy", link: "/" },
        ],
    },
    {
        title: "General",
        links: [
            { name: "Customers", link: "/" },
            { name: "What's new", link: "/" },
            { name: "Pricing", link: "/" },
            { name: "Trust and Security", link: "/" },
            { name: "Support", link: "/" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "assist.3way@gmail.com", link: "mailto:assist.3way@gmail.com" },

            { name: "+919866606660", link: "tel:+919866606660" },
            { name: "Our Address" , link: "https://maps.app.goo.gl/z7iEQipQ24u28kxJ6" }
        ],
    },
];

export const socialMedia = [
    { src: facebook, alt: "facebook logo", link: "https://www.instagram.com/3way_assist?igsh=MXhsbTIwcDFuN2lpNA==" },
    { src: twitter, alt: "twitter logo",link:"" },
    { src: instagram, alt: "instagram logo",
        link:"https://www.instagram.com/3way_assist?igsh=MWg2bGFoNTdsZ2ZqMQ==" },
];



// import { facebook, instagram, shieldTick, support, truckFast, twitter } from "../assets/icons";
// import { bigShoe1, bigShoe2, bigShoe3, customer1, customer2, thumbnailShoe1, thumbnailShoe2, thumbnailShoe3, appartment1, appartment2, appartment3, appartment4 } from "../assets/images";

// export const navLinks = [
//     { href: "/", label: "Home" },   
//     { href: "StaffLogin", label:"Staff Login" },
//     { href: "#about-us", label: "About Us" },
//     { href: "Ticket", label: "Report an Issue" },
//     { href: "#contact-us", label: "Contact Us" },
//     { 
//         href: "#", 
//         label: "Login",
//         isButton: true,
//         dropdown: [
//             { href: "Login", label: "User Login" },
//             { href: "StaffLogin", label: "Staff Login" }
//         ]
//     },
//     { href: "signUp", label: "Signup" }
// ];

// export const Login = [
//     { 
//         label: "Login", 
//         dropdown: [
//             { href: "Login", label:"User Login" },
//             { href: "StaffLogin", label:"Staff Login" }
//         ]
//     }
// ];

// export const shoes = [
//     {
//         thumbnail: thumbnailShoe1,
//         bigShoe: bigShoe1,
//     },
//     {
//         thumbnail: thumbnailShoe2,
//         bigShoe: bigShoe2,
//     },
//     {
//         thumbnail: thumbnailShoe3,
//         bigShoe: bigShoe3,
//     },
// ];

// export const statistics = [
    
//     { value: '1500+', label: 'Flats' },
//     { value: '25+', label: 'Staff' },
// ];

// export const products = [
//     {
//         imgURL: appartment1,
//         name: "ASBL aspire",
//         price: "Rent-₹30000",
//     },
//     {
//         imgURL: appartment2,
//         name: "ASBL LAKE SIDE",
//         price: "Rent-₹35000",
//     },
//     {
//         imgURL: appartment3,
//         name: "RAINBOW VISTAS ROCK GARDEN ",
//         price: "Rent-₹40000",
//     },
//     {
//         imgURL: appartment4,
//         name: "Marina skies",
//         price: "Rent-₹30000",
//     },
//     {
//         imgURL: appartment1,
//         name: "Ghataprabha",
//         price: "Rent-₹30000",
//     },
    
// ];

// export const services = [
//     {
//         imgURL: truckFast,
//         label: "24/7 Help Desk",
//         subtext: "We offer prompt assistance for tenant and owner inquiries, maintenance requests, and concerns, ensuring reliable support."
//     },
//     {
//         imgURL: shieldTick,
//         label: "Secure Payment",
//         subtext: "Experience worry-free transactions with our secure payment options."
//     },
//     {
//         imgURL: support,
//         label: "Tenant Placement ",
//         subtext: "Our team handles tenant placement with background checks and lease facilitation, ensuring a smooth rental process for owners."
//     },
// ];

// export const reviews = [
//     {
//         imgURL: customer1,
//         customerName: 'Morich Brown',
//         rating: 4.5,
//         feedback: "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!"
//     },
//     {
//         imgURL: customer2,
//         customerName: 'Lota Mongeskar',
//         rating: 4.5,
//         feedback: "The product not only met but exceeded my expectations. I'll definitely be a returning customer!"
//     }
// ];


// export const footerLinks = [
   
//     {
//         title: "Help",
//         links: [
//             { name: "About us", link: "/" },
//             { name: "FAQs", link: "/" },
//             { name: "How it works", link: "/" },
//             { name: "Privacy policy", link: "/" },
//             { name: "Payment policy", link: "/" },
//         ],
//     },
//     {
//         title: "General",
//         links: [
//             { name: "Customers", link: "/" },
//             { name: "What's new", link: "/" },
//             { name: "Pricing", link: "/" },
//             { name: "Trust and Security", link: "/" },
//             { name: "Support", link: "/" },
//         ],
//     },
//     {
//         title: "Get in touch",
//         links: [
//             { name: "assist.3way@gmail.com", link: "mailto:assist.3way@gmail.com" },

//             { name: "+919866606660", link: "tel:+919866606660" },
//             { name: "Our Address" , link: "https://maps.app.goo.gl/z7iEQipQ24u28kxJ6" }
//         ],
//     },
// ];

// export const socialMedia = [
//     { src: facebook, alt: "facebook logo", link: "https://www.instagram.com/3way_assist?igsh=MXhsbTIwcDFuN2lpNA==" },
//     { src: twitter, alt: "twitter logo",link:"" },
//     { src: instagram, alt: "instagram logo",
//         link:"https://www.instagram.com/3way_assist?igsh=MWg2bGFoNTdsZ2ZqMQ==" },
// ];





// import { facebook, instagram, shieldTick, support, truckFast, twitter } from "../assets/icons";
// import { bigShoe1, bigShoe2, bigShoe3, customer1, customer2, thumbnailShoe1, thumbnailShoe2, thumbnailShoe3, appartment1, appartment2, appartment3, appartment4 } from "../assets/images";

// export const navLinks = [
//     { href: "/", label: "Home" },   
//     { href: "StaffLogin", label:"Staff Login" },
//     { href: "#about-us", label: "About Us" },
//     { href: "Ticket", label: "Report an Issue" },
//     { href: "#contact-us", label: "Contact Us" },
//     { href: "Login", label: "Login"},
//     { href: "signUp", label: "Signup"}
// ];
// export const Login = [
//     { 
//         label: "Login", 
//         dropdown: [
//             { href: "Login", label:"User Login" },
//             { href: "StaffLogin", label:"Staff Login" }
//         ]
//     }
// ];

// export const shoes = [
//     {
//         thumbnail: thumbnailShoe1,
//         bigShoe: bigShoe1,
//     },
//     {
//         thumbnail: thumbnailShoe2,
//         bigShoe: bigShoe2,
//     },
//     {
//         thumbnail: thumbnailShoe3,
//         bigShoe: bigShoe3,
//     },
// ];

// export const statistics = [
    
//     { value: '1500+', label: 'Flats' },
//     { value: '25+', label: 'Staff' },
// ];

// export const products = [
//     {
//         imgURL: appartment1,
//         name: "ASBL aspire",
//         price: "Rent-₹30000",
//     },
//     {
//         imgURL: appartment2,
//         name: "ASBL LAKE SIDE",
//         price: "Rent-₹35000",
//     },
//     {
//         imgURL: appartment3,
//         name: "RAINBOW VISTAS ROCK GARDEN ",
//         price: "Rent-₹40000",
//     },
//     {
//         imgURL: appartment4,
//         name: "Marina skies",
//         price: "Rent-₹30000",
//     },
//     {
//         imgURL: appartment1,
//         name: "Ghataprabha",
//         price: "Rent-₹30000",
//     },
    
// ];

// export const services = [
//     {
//         imgURL: truckFast,
//         label: "24/7 Help Desk",
//         subtext: "We offer prompt assistance for tenant and owner inquiries, maintenance requests, and concerns, ensuring reliable support."
//     },
//     {
//         imgURL: shieldTick,
//         label: "Secure Payment",
//         subtext: "Experience worry-free transactions with our secure payment options."
//     },
//     {
//         imgURL: support,
//         label: "Tenant Placement ",
//         subtext: "Our team handles tenant placement with background checks and lease facilitation, ensuring a smooth rental process for owners."
//     },
// ];

// export const reviews = [
//     {
//         imgURL: customer1,
//         customerName: 'Morich Brown',
//         rating: 4.5,
//         feedback: "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!"
//     },
//     {
//         imgURL: customer2,
//         customerName: 'Lota Mongeskar',
//         rating: 4.5,
//         feedback: "The product not only met but exceeded my expectations. I'll definitely be a returning customer!"
//     }
// ];


// export const footerLinks = [
   
//     {
//         title: "Help",
//         links: [
//             { name: "About us", link: "/" },
//             { name: "FAQs", link: "/" },
//             { name: "How it works", link: "/" },
//             { name: "Privacy policy", link: "/" },
//             { name: "Payment policy", link: "/" },
//         ],
//     },
//     {
//         title: "General",
//         links: [
//             { name: "Customers", link: "/" },
//             { name: "What's new", link: "/" },
//             { name: "Pricing", link: "/" },
//             { name: "Trust and Security", link: "/" },
//             { name: "Support", link: "/" },
//         ],
//     },
//     {
//         title: "Get in touch",
//         links: [
//             { name: "assist.3way@gmail.com", link: "mailto:assist.3way@gmail.com" },

//             { name: "+919866606660", link: "tel:+919866606660" },
//             { name: "Our Address" , link: "https://maps.app.goo.gl/z7iEQipQ24u28kxJ6" }
//         ],
//     },
// ];

// export const socialMedia = [
//     { src: facebook, alt: "facebook logo", link: "https://www.instagram.com/3way_assist?igsh=MXhsbTIwcDFuN2lpNA==" },
//     { src: twitter, alt: "twitter logo",link:"" },
//     { src: instagram, alt: "instagram logo",
//         link:"https://www.instagram.com/3way_assist?igsh=MWg2bGFoNTdsZ2ZqMQ==" },
// ];