import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Modal, Select, ConfigProvider } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { authActions } from '../store';
import { useDispatch } from 'react-redux';
import PopularProductCard from './PopularProductCard';
import { frontendurl } from '../../url';

const { Option } = Select;

const cardContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '16px',
};

const cardStyle = {
  flex: '0 0 calc(50% - 16px)',
  border: '1px solid black',
  borderRadius: '8px',
  backgroundColor: 'white',
  padding: '16px',
  position: 'relative',

  // Ensure relative positioning for absolute children
};

const buttonStyle = {
  backgroundColor: 'purple',
  color: 'white',
  transition: 'background-color 0.3s ease-in-out',
  border: 'none',
  borderRadius: '4px',
  padding: '8px 16px',
  marginTop: '8px',
  position: 'absolute',
  bottom: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
};

const titleStyle = {
  color: 'black',
  marginBottom: '16px',
};

const textStyle = {
  color: 'black',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const AdminLogin = () => {
  const isadmin = useSelector((state) => state.isAdminLoggedIn);
  const [tickets, setTickets] = useState([]);
  const [completedTickets, setCompletedTickets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [expandedIssue, setExpandedIssue] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [staffMembers, setStaffMembers] = useState([]);
  const [assignStaff, setAssignStaff] = useState(null);
  const [viewPhotoModalVisible, setViewPhotoModalVisible] = useState(false);
  const [products, setProducts] = useState([])
  const [photoUrl, setPhotoUrl] = useState('');
  const dispatch = useDispatch();

  const colors1 = ['#6253E1', '#A466FF'];
  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`${frontendurl}/api/allList/pendingtickets`);
      setTickets(response.data.ticketslist);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const fetchCompletedTickets = async () => {
    try {
      const response = await axios.get(`${frontendurl}/api/allList/completedtickets`);
      setCompletedTickets(response.data.completedTickets);
    } catch (error) {
      console.error('Error fetching completed tickets:', error);
    }
  };

  const fetchStaffMembers = async () => {
    try {
      const response = await axios.get(`${frontendurl}/api/v3/stafflist`);
      setStaffMembers(response.data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching staff members:', error);
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchCompletedTickets();
    fetchStaffMembers();
  }, []);

  const navigate = useNavigate();

  const handleExpandAddress = (index) => {
    setExpandedIssue(expandedIssue === index ? null : index);
  };

  const handleViewPhoto = (ticket) => {
    setPhotoUrl(ticket._id); // Assuming imageUrl is a property of the ticket object
    setViewPhotoModalVisible(true);
  };

  const handleModalCancel = () => {
    setViewPhotoModalVisible(false);
  };

  const handleAssignTicket = (issue) => {
    setSelectedIssue(issue);
    setDropdownVisible(true);
  };

  const handleStaffSelect = async (staffId) => {
    try {
      const response = await axios.post(`${frontendurl}/api/v3/staff`, { staffId });

      setAssignStaff(response.data);
      setSelectedStaff(response.data.fullName);
      setDropdownVisible(false);
      setModalVisible(true);
    } catch (error) {
      console.error('Error assigning ticket:', error);
    }
  };

  const handleModalOk = () => {
    axios
      .post(`${frontendurl}/api/allList/assign`, {
        staffId: assignStaff._id,
        ticketId: selectedIssue._id,
      })
      .then((response) => {
        console.log('Assignment successful:', response.data.message);
        setModalVisible(false);
        fetchCompletedTickets();
        fetchTickets();
      })
      .catch((error) => {
        console.error('Error during assignment:', error);
      });
    setModalVisible(false);
  };
  const logout = () => {
        localStorage.clear('id');
        localStorage.clear('adminLoginId');
        localStorage.clear('staffLoginId');
        dispatch(authActions.logout());
        dispatch(authActions.staffLogout());
        dispatch(authActions.adminLogout());
        navigate('/');
      };
      useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get(`${frontendurl}/api/v5/allbuildings`);
            setProducts(response.data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProducts();
      }, []);

  return (
    <div>
      {!isadmin && (
        <div style={{ padding: '16px' }}>
          <Typography.Paragraph style={{ marginBottom: '16px' }}>
            You need to login as an Admin to access this page. Click the button below to login as admin.
          </Typography.Paragraph>
          <Button
            style={{ marginBottom: '16px', backgroundColor: 'purple', color: 'white', border: 'none' }}
            onClick={() => navigate('/Adminlogin')}
          >
            Login as Admin
          </Button>
          <Typography.Paragraph>
            If you want to raise a ticket or want to explore about us, click the button below.
          </Typography.Paragraph>
          <Button
            style={{ backgroundColor: 'purple', color: 'white', border: 'none' }}
            onClick={() => navigate('/')}
          >
            Home
          </Button>
        </div>
      )}

      {isadmin && (
        <>
          <div className="max-container max-sm:mt-12 p-4">
            <section id="products">
              <div className="flex flex-col justify-start gap-5">
                <div className="flex justify-between items-center">
                  <h2 className="text-4xl font-palanquin font-bold">
                    Available <span className="text-purple-800">Flats</span>
                  </h2>
                  <div className="flex space-x-4">
                 
                  <button
                    onClick={() => navigate('/Newbuilding')}
                    className="bg-purple-500 text-white py-2 px-4 mx-0 rounded transition duration-300 ease-in-out hover:bg-purple-700"
                  >
                    Add Building
                  </button>
                  <button
                    onClick={logout}
                    className="bg-purple-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-purple-700"
                  >
                    Logout
                  </button>
                  </div>
                </div>
              </div>
              <div className="flex mt-16 flex-row flex-shrink-0 gap-4 py-2 overflow-x-auto scrollbar-webkit scrollbar-thin">
              <div>
      <section id="products"
       className="max-container max-sm:mt-12
       ">
        <div className="flex w-120 flex-row  flex-shrink-0 gap-4 py-1 overflow-x-auto 
        scrollbar-webkit scrollbar-thin
          ">
          {products.map((product)=>(
            <PopularProductCard key={product.name}
            {...product}/>
          ))}


        </div>

      </section>

    </div>
              </div>
            </section>

            <section id="new-staff" style={{ textAlign: 'center', marginTop: '32px' }}>
              <h2 className="text-4xl font-palanquin font-bold">
                Add New <span className="text-purple-800">Staff</span>
              </h2>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                      colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
                      colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
                      lineWidth: 0,
                    },
                  },
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  style={{
                    marginTop: '16px',
                    padding: '12px 24px',
                    fontSize: '16px',
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    borderRadius: '8px',
                  }}
                  onClick={() => navigate('/StaffEnroll')}
                >
                  Enroll
                </Button>
              </ConfigProvider>
            </section>

            <Typography.Title level={2} style={{ marginTop: '32px' }}>
              Pending Tickets and Issues
            </Typography.Title>

            <div style={cardContainerStyle}>
              {tickets.map((issue, index) => (
                <Card
                  key={index}
                  hoverable
                  style={cardStyle}
                  bodyStyle={{
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    position: 'relative',
                  }}
                >
                  <Typography.Title level={4} style={titleStyle}>
                    {issue.buildingName}
                  </Typography.Title>
                  <div>
                    <h3 style={textStyle}>
                      <strong>Building Name:</strong> {issue.buildingName}
                    </h3>
                    <p style={textStyle}>
                      <strong>Flat No:</strong> {issue.flatNo}
                    </p>
                    <p style={textStyle}>
                      <strong>Contact No:</strong> {issue.contactNo}
                    </p>
                    <p style={textStyle}>
                      <strong>Issue:</strong> {issue.issue}
                    </p>
                    {issue.street || issue.city || issue.postalCode ? (
                      <p style={textStyle}>
                        <span
                          style={{
                            display: 'inline-block',
                            maxWidth: expandedIssue === index ? 'none' : '150px',
                            whiteSpace: expandedIssue === index ? 'normal' : 'nowrap',
                            overflow: expandedIssue === index ? 'visible' : 'hidden',
                            textOverflow: expandedIssue === index ? 'clip' : 'ellipsis',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleExpandAddress(index)}
                        >
                          {`${issue.street}, ${issue.city}, ${issue.postalCode}`}
                        </span>
                      </p>
                    ) : null}
                  </div>
                  <div className='mt-10'>
                  <Button
                    type="primary"
                    className="mt-2"
                    style={buttonStyle}
                    onClick={() => handleAssignTicket(issue)}
                  >
                    Assign Ticket
                  </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Typography.Title level={2} style={{ marginTop: '32px' }}>
              Completed Tickets
            </Typography.Title>

            <div style={cardContainerStyle}>
              {completedTickets.map((completedIssue, index) => (
                <Card
                  key={index}
                  hoverable
                  style={cardStyle}
                  bodyStyle={{
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    position: 'relative',
                  }}
                >
                  <Typography.Title level={4} style={titleStyle}>
                    {completedIssue.buildingName}
                  </Typography.Title>
                  <div>
                    <h3 style={textStyle}>
                      <strong>Building Name:</strong> {completedIssue.buildingName}
                    </h3>
                    <p style={textStyle}>
                      <strong>Flat No:</strong> {completedIssue.flatNo}
                    </p>
                    <p style={textStyle}>
                      <strong>Contact No:</strong> {completedIssue.contactNo}
                    </p>
                    <p style={textStyle}>
                      <strong>Issue:</strong> {completedIssue.issue}
                    </p>
                    {completedIssue.street || completedIssue.city || completedIssue.postalCode ? (
                      <p style={textStyle}>
                        <span
                          style={{
                            display: 'inline-block',
                            maxWidth: expandedIssue === `completed-${index}` ? 'none' : '150px',
                            whiteSpace: expandedIssue === `completed-${index}` ? 'normal' : 'nowrap',
                            overflow: expandedIssue === `completed-${index}` ? 'visible' : 'hidden',
                            textOverflow: expandedIssue === `completed-${index}` ? 'clip' : 'ellipsis',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleExpandAddress(`completed-${index}`)}
                        >
                          {`${completedIssue.street}, ${completedIssue.city}, ${completedIssue.postalCode}`}
                        </span>
                      </p>
                    ) : null}
                  </div>
                  <div className='mt-10'>
                  <Button
                    type="primary"
                    className="mt-2"
                    style={buttonStyle}
                    onClick={() => handleViewPhoto(completedIssue)}
                  >
                    View Photo
                  </Button></div>
                </Card>
              ))}
            </div>

            <Modal
              title="Assign Ticket"
              visible={modalVisible}
              onOk={handleModalOk}
              onCancel={() => setModalVisible(false)}
            >
              <Typography.Paragraph>
                Are you sure you want to assign the ticket for{' '}
                {selectedIssue && selectedIssue.issue} to {selectedStaff}?
              </Typography.Paragraph>
            </Modal>

            <Modal
              title="Select Staff Member"
              visible={dropdownVisible}
              onCancel={() => setDropdownVisible(false)}
              footer={null}
            >
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Select a staff member"
                optionFilterProp="children"
                onChange={handleStaffSelect}
                onDropdownVisibleChange={(open) => {
                  if (!open) {
                    setDropdownVisible(false);
                    setModalVisible(true);
                  }
                }}
                filterOption={(input, option) =>
                  typeof option.children === 'object' &&
                  option.children.join('').toLowerCase().includes(input.toLowerCase())
                }
              >
                {staffMembers.map((staff) => (
                  <Option key={staff._id} value={staff._id}>
                    {staff.fullName} - {staff.work}
                  </Option>
                ))}
              </Select>
            </Modal>

            <Modal
              title="View Photo"
              visible={viewPhotoModalVisible}
              onCancel={handleModalCancel}
              footer={null}
            >
              <img src={`${frontendurl}/api/allList/taskpicture?id=${photoUrl}`} alt="Ticket Photo" style={{ maxWidth: '100%', height: 'auto' }} />
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminLogin;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, Typography, Button, Modal, Select, ConfigProvider } from 'antd';
// import { TinyColor } from '@ctrl/tinycolor';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { authActions } from '../store';


// const { Option } = Select;

// const cardContainerStyle = {
//   display: 'flex',
//   flexDirection: 'row',
//   flexWrap: 'wrap',
//   gap: '16px',
// };

// const cardStyle = {
//   flex: '0 0 calc(50% - 16px)',
//   border: '1px solid black',
//   borderRadius: '8px',
//   backgroundColor: 'white',
//   padding: '16px',
//   position: 'relative', // Ensure relative positioning for absolute children
// };

// const buttonStyle = {
//   backgroundColor: 'purple',
//   color: 'white',
//   transition: 'background-color 0.3s ease-in-out',
//   border: 'none',
//   borderRadius: '4px',
//   padding: '8px 16px',
//   marginTop: '8px',
//   position: 'absolute',
//   bottom: '16px',
//   left: '50%',
//   transform: 'translateX(-50%)',
// };

// const titleStyle = {
//   color: 'black',
//   marginBottom: '16px',
// };

// const textStyle = {
//   color: 'black',
//   overflow: 'hidden',
//   textOverflow: 'ellipsis',
//   whiteSpace: 'nowrap',
// };

// const AdminLogin = () => {
//   const isadmin = useSelector((state) => state.isAdminLoggedIn);
//   const [tickets, setTickets] = useState([]);
//   const [completedTickets, setCompletedTickets] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedIssue, setSelectedIssue] = useState(null);
//   const [expandedIssue, setExpandedIssue] = useState(null);
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [selectedStaff, setSelectedStaff] = useState(null);
//   const [staffMembers, setStaffMembers] = useState([]);
//   const [assignStaff, setAssignStaff] = useState(null);
//   const [viewPhotoModalVisible, setViewPhotoModalVisible] = useState(false);
//   const [photoUrl, setPhotoUrl] = useState('');
//   const dispatch = useDispatch()
//   const colors1 = ['#6253E1', '#A466FF'];
//   const getHoverColors = (colors) =>
//     colors.map((color) => new TinyColor(color).lighten(5).toString());
//   const getActiveColors = (colors) =>
//     colors.map((color) => new TinyColor(color).darken(5).toString());

//   const fetchTickets = async () => {
//     try {
//       const response = await axios.get('http://localhost:1000/api/allList/pendingtickets');
//       setTickets(response.data.ticketslist);
//     } catch (error) {
//       console.error('Error fetching tickets:', error);
//     }
//   };

//   const fetchCompletedTickets = async () => {
//     try {
//       const response = await axios.get('http://localhost:1000/api/allList/completedtickets');
//       setCompletedTickets(response.data.completedTickets);
//     } catch (error) {
//       console.error('Error fetching completed tickets:', error);
//     }
//   };

//   const fetchStaffMembers = async () => {
//     try {
//       const response = await axios.get('http://localhost:1000/api/v3/stafflist');
//       setStaffMembers(response.data); // Update state with fetched data
//     } catch (error) {
//       console.error('Error fetching staff members:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//     fetchCompletedTickets();
//     fetchStaffMembers();
//   }, []);

//   const navigate = useNavigate();

//   const handleExpandAddress = (index) => {
//     setExpandedIssue(expandedIssue === index ? null : index);
//   };

//   const handleViewPhoto = (ticket) => {
//     setPhotoUrl(ticket.imageUrl); // Assuming imageUrl is a property of the ticket object
//     setViewPhotoModalVisible(true);
//   };

//   const handleModalCancel = () => {
//     setViewPhotoModalVisible(false);
//   };

//   const handleAssignTicket = (issue) => {
//     setSelectedIssue(issue);
//     setDropdownVisible(true);
//   };

//   const handleStaffSelect = async (staffId) => {
//     try {
//       console.log()
//       const response = await axios.post('http://localhost:1000/api/v3/staff', { staffId:staffId });
//       setAssignStaff(response.data);
//       setSelectedStaff(response.data.fullName);
//       setDropdownVisible(false);
//       setModalVisible(true);
//     } catch (error) {
//       console.error('Error assigning ticket:', error);
//     }
//   };

//   const handleModalOk = () => {
//     axios
//       .post('http://localhost:1000/api/allList/assign', {
//         staffId: assignStaff._id,
//         ticketId: selectedIssue._id,
//       })
//       .then((response) => {
//         console.log('Assignment successful:', response.data.message);
//         setModalVisible(false);
//         fetchCompletedTickets();
//         fetchTickets();
//       })
//       .catch((error) => {
//         console.error('Error during assignment:', error);
//       });
//     setModalVisible(false);
//   };
//   const logout = () => {
//     localStorage.clear('id');
//     localStorage.clear('adminLoginId');
//     localStorage.clear('staffLoginId');
//     dispatch(authActions.logout());
//     dispatch(authActions.staffLogout());
//     dispatch(authActions.adminLogout());
//     navigate('/');
//   };

//   return (
//     <div>
//       {!isadmin && (
//         <div style={{ padding: '16px' }}>
//           <Typography.Paragraph style={{ marginBottom: '16px' }}>
//             You need to login as an Admin to access this page. Click the button below to login as admin.
//           </Typography.Paragraph>
//           <Button
//             style={{ marginBottom: '16px', backgroundColor: 'purple', color: 'white', border: 'none' }}
//             onClick={() => navigate('/Adminlogin')}
//           >
//             Login as Admin
//           </Button>
//           <Typography.Paragraph>
//             If you want to raise a ticket or want to explore about us, click the button below.
//           </Typography.Paragraph>
//           <Button
//             style={{ backgroundColor: 'purple', color: 'white', border: 'none' }}
//             onClick={() => navigate('/')}
//           >
//             Home
//           </Button>
//         </div>
//       )}

//       {isadmin && (
//         <>
//           <div className="max-container max-sm:mt-12 p-4">
//             <section id="products">
//               <div className="flex flex-col justify-start gap-5">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-4xl font-palanquin font-bold">
//                     Available <span className="text-purple-800">Flats</span>
//                   </h2>
//                   <div className="flex space-x-4">
                 
//                   <button
//                     onClick={() => navigate('/Newbuilding')}
//                     className="bg-purple-500 text-white py-2 px-4 mx-0 rounded transition duration-300 ease-in-out hover:bg-purple-700"
//                   >
//                     Add Building
//                   </button>
//                   <button
//                     onClick={logout}
//                     className="bg-purple-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-purple-700"
//                   >
//                     Logout
//                   </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex mt-16 flex-row flex-shrink-0 gap-4 py-2 overflow-x-auto scrollbar-webkit scrollbar-thin">
//                 {/* Render products */}
//               </div>
//             </section>

//             <section id="new-staff" style={{ textAlign: 'center', marginTop: '32px' }}>
//               <h2 className="text-4xl font-palanquin font-bold">
//                 Add New <span className="text-purple-800">Staff</span>
//               </h2>
//               <ConfigProvider
//                 theme={{
//                   components: {
//                     Button: {
//                       colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
//                       colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
//                       colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
//                       lineWidth: 0,
//                     },
//                   },
//                 }}
//               >
//                 <Button
//                   type="primary"
//                   size="large"
//                   style={{
//                     marginTop: '16px',
//                     padding: '12px 24px',
//                     fontSize: '16px',
//                     transition: 'all 0.3s ease-in-out',
//                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//                     borderRadius: '8px',
//                   }}
//                   onClick={() => navigate('/StaffEnroll')}
//                 >
//                   Enroll
//                 </Button>
//               </ConfigProvider>
//             </section>

//             <Typography.Title level={2} style={{ marginTop: '32px' }}>
//               Pending Tickets and Issues
//             </Typography.Title>

//             <div style={cardContainerStyle}>
//               {tickets.map((issue, index) => (
//                 <Card
//                   key={index}
//                   hoverable
//                   style={cardStyle}
//                   bodyStyle={{
//                     padding: 16,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'flex-start',
//                     position: 'relative',
//                   }}
//                 >
//                   <Typography.Title level={4} style={titleStyle}>
//                     {issue.buildingName}
//                   </Typography.Title>
//                   <div>
//                     <h3 style={textStyle}>
//                       <strong>Building Name:</strong> {issue.buildingName}
//                     </h3>
//                     <p style={textStyle}>
//                       <strong>Flat No:</strong> {issue.flatNo}
//                     </p>
//                     <p style={textStyle}>
//                       <strong>Contact No:</strong> {issue.contactNo}
//                     </p>
//                     <p style={textStyle}>
//                       <strong>Issue:</strong> {issue.issue}
//                     </p>
//                     {issue.street || issue.city || issue.postalCode ? (
//                       <p style={textStyle}>
//                         <span
//                           style={{
//                             display: 'inline-block',
//                             maxWidth: expandedIssue === index ? 'none' : '150px',
//                             whiteSpace: expandedIssue === index ? 'normal' : 'nowrap',
//                             overflow: expandedIssue === index ? 'visible' : 'hidden',
//                             textOverflow: expandedIssue === index ? 'clip' : 'ellipsis',
//                             cursor: 'pointer',
//                           }}
//                           onClick={() => handleExpandAddress(index)}
//                         >
//                           {`${issue.street}, ${issue.city}, ${issue.postalCode}`}
//                         </span>
//                       </p>
//                     ) : null}
//                   </div>
//                   <Button
//                     type="primary"
//                     className="mt-2"
//                     style={buttonStyle}
//                     onClick={() => handleAssignTicket(issue)}
//                   >
//                     Assign Ticket
//                   </Button>
//                 </Card>
//               ))}
//             </div>

//             <Typography.Title level={2} style={{ marginTop: '32px' }}>
//               Completed Tickets
//             </Typography.Title>

//             <div style={cardContainerStyle}>
//               {completedTickets.map((completedIssue, index) => (
//                 <Card
//                   key={index}
//                   hoverable
//                   style={cardStyle}
//                   bodyStyle={{
//                     padding: 16,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'flex-start',
//                     position: 'relative',
//                   }}
//                 >
//                   <Typography.Title level={4} style={titleStyle}>
//                     {completedIssue.buildingName}
//                   </Typography.Title>
//                   <div>
//                     <h3 style={textStyle}>
//                       <strong>Building Name:</strong> {completedIssue.buildingName}
//                     </h3>
//                     <p style={textStyle}>
//                       <strong>Flat No:</strong> {completedIssue.flatNo}
//                     </p>
//                     <p style={textStyle}>
//                       <strong>Contact No:</strong> {completedIssue.contactNo}
//                     </p>
//                     <p style={textStyle}>
//                       <strong>Issue:</strong> {completedIssue.issue}
//                     </p>
//                     {completedIssue.street || completedIssue.city || completedIssue.postalCode ? (
//                       <p style={textStyle}>
//                         <span
//                           style={{
//                             display: 'inline-block',
//                             maxWidth: expandedIssue === `completed-${index}` ? 'none' : '150px',
//                             whiteSpace: expandedIssue === `completed-${index}` ? 'normal' : 'nowrap',
//                             overflow: expandedIssue === `completed-${index}` ? 'visible' : 'hidden',
//                             textOverflow: expandedIssue === `completed-${index}` ? 'clip' : 'ellipsis',
//                             cursor: 'pointer',
//                           }}
//                           onClick={() => handleExpandAddress(`completed-${index}`)}
//                         >
//                           {`${completedIssue.street}, ${completedIssue.city}, ${completedIssue.postalCode}`}
//                         </span>
//                       </p>
//                     ) : null}
//                   </div>
//                   <Button
//                     type="primary"
//                     className="mt-2"
//                     style={buttonStyle}
//                     onClick={() => handleViewPhoto(completedIssue)}
//                   >
//                     View Photo
//                   </Button>
//                 </Card>
//               ))}
//             </div>

//             <Modal
//               title="Assign Ticket"
//               visible={modalVisible}
//               onOk={handleModalOk}
//               onCancel={() => setModalVisible(false)}
//             >
//               <Typography.Paragraph>
//                 Are you sure you want to assign the ticket for{' '}
//                 {selectedIssue && selectedIssue.issue} to {selectedStaff}?
//               </Typography.Paragraph>
//             </Modal>

//             <Modal
//               title="Select Staff Member"
//               visible={dropdownVisible}
//               onCancel={() => setDropdownVisible(false)}
//               footer={null}
//             >
//               <Select
//                 showSearch
//                 style={{ width: '100%' }}
//                 placeholder="Select a staff member"
//                 optionFilterProp="children"
//                 onChange={handleStaffSelect}
//                 onDropdownVisibleChange={(open) => {
//                   if (!open) {
//                     setDropdownVisible(false);
//                     setModalVisible(true);
//                   }
//                 }}
//                 filterOption={(input, option) =>
//                   typeof option.children === 'object' &&
//                   option.children.join('').toLowerCase().includes(input.toLowerCase())
//                 }
//               >
//                 {staffMembers.map((staff) => (
//                   <Option key={staff._id} value={staff._id}>
//                     {staff.fullName} - {staff.work}
//                   </Option>
//                 ))}
//               </Select>
//             </Modal>

//             <Modal
//               title="View Photo"
//               visible={viewPhotoModalVisible}
//               onCancel={handleModalCancel}
//               footer={null}
//             >
//               <img src={photoUrl} alt="Ticket Photo" style={{ maxWidth: '100%', height: 'auto' }} />
//             </Modal>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default AdminLogin;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, Typography, Button, Modal, Select, ConfigProvider } from 'antd';
// import { TinyColor } from '@ctrl/tinycolor';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const { Option } = Select;

// const cardContainerStyle = {
//   display: 'flex',
//   flexDirection: 'row',
//   flexWrap: 'wrap',
//   gap: '16px',
// };

// const cardStyle = {
//   flex: '0 0 calc(50% - 16px)',
//   border: '1px solid black',
//   borderRadius: '8px',
//   backgroundColor: 'white',
//   padding: '16px',
// };

// const buttonStyle = {
//   backgroundColor: 'purple',
//   color: 'white',
//   transition: 'background-color 0.3s ease-in-out',
//   border: 'none',
//   borderRadius: '4px',
//   padding: '8px 16px',
//   marginTop: '8px',
//   position: 'absolute',
//   bottom: '16px',
//   right: '16px',
// };

// const centeredButtonStyle = {
//   backgroundColor: 'purple',
//   color: 'white',
//   transition: 'background-color 0.3s ease-in-out',
//   border: 'none',
//   borderRadius: '4px',
//   padding: '8px 16px',
//   marginTop: '8px',
//   position: 'absolute',
//   bottom: '16px',
//   left: '50%',
//   transform: 'translateX(-50%)',
// };

// const titleStyle = {
//   color: 'black',
//   marginBottom: '16px',
// };

// const textStyle = {
//   color: 'black',
// };

// const colors1 = ['#6253E1', '#A466FF'];
// const getHoverColors = (colors) =>
//   colors.map((color) => new TinyColor(color).lighten(5).toString());
// const getActiveColors = (colors) =>
//   colors.map((color) => new TinyColor(color).darken(5).toString());

// const AdminLogin = () => {
//   const isadmin = useSelector((state) => state.isAdminLoggedIn);
//   const [completedTickets, setCompletedTickets] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedIssue, setSelectedIssue] = useState(null);
//   const [expandedIssue, setExpandedIssue] = useState(null);
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [selectedStaff, setSelectedStaff] = useState(null);
//   const [staffMembers, setStaffMembers] = useState([]);
//   const [assignStaff, setAssignStaff] = useState(null);
//   const [viewPhotoModalVisible, setViewPhotoModalVisible] = useState(false);
//   const [photoUrl, setPhotoUrl] = useState('');

//   const fetchCompletedTickets = async () => {
//     try {
//       const response = await axios.get('http://localhost:1000/api/allList/completedtickets');
//       setCompletedTickets(response.data.completedTickets);
//     } catch (error) {
//       console.error('Error fetching completed tickets:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCompletedTickets();
//   }, []);

//   const navigate = useNavigate();

//   const handleExpandAddress = (index) => {
//     setExpandedIssue(expandedIssue === index ? null : index);
//   };

//   const handleViewPhoto = (ticket) => {
//     setPhotoUrl(ticket.imageUrl); // Assuming imageUrl is a property of the ticket object
//     setViewPhotoModalVisible(true);
//   };

//   const handleModalCancel = () => {
//     setViewPhotoModalVisible(false);
//   };

//   return (
//     <div>
//       {!isadmin && (
//         <div style={{ padding: '16px' }}>
//           <Typography.Paragraph style={{ marginBottom: '16px' }}>
//             You need to login as an Admin to access this page. Click the button below to login as admin.
//           </Typography.Paragraph>
//           <Button
//             style={{ marginBottom: '16px', backgroundColor: 'purple', color: 'white', border: 'none' }}
//             onClick={() => navigate('/Adminlogin')}
//           >
//             Login as Admin
//           </Button>
//           <Typography.Paragraph>
//             If you want to raise a ticket or want to explore about us, click the button below.
//           </Typography.Paragraph>
//           <Button
//             style={{ backgroundColor: 'purple', color: 'white', border: 'none' }}
//             onClick={() => navigate('/')}
//           >
//             Home
//           </Button>
//         </div>
//       )}

//       {isadmin && (
//         <>
//           <div className="max-container max-sm:mt-12 p-4">
//             <section id="products">
//               <div className="flex flex-col justify-start gap-5">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-4xl font-palanquin font-bold">
//                     Available <span className="text-purple-800">Flats</span>
//                   </h2>
//                   <button
//                     onClick={() => navigate('/Newbuilding')}
//                     className="bg-purple-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-purple-700"
//                   >
//                     Add Building
//                   </button>
//                 </div>
//               </div>
//               <div className="flex mt-16 flex-row flex-shrink-0 gap-4 py-2 overflow-x-auto scrollbar-webkit scrollbar-thin">
//                 {/* Render products */}
//               </div>
//             </section>

//             <section id="new-staff" style={{ textAlign: 'center', marginTop: '32px' }}>
//               <h2 className="text-4xl font-palanquin font-bold">
//                 Add New <span className="text-purple-800">Staff</span>
//               </h2>
//               <ConfigProvider
//                 theme={{
//                   components: {
//                     Button: {
//                       colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
//                       colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
//                       colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
//                       lineWidth: 0,
//                     },
//                   },
//                 }}
//               >
//                 <Button
//                   type="primary"
//                   size="large"
//                   style={{
//                     marginTop: '16px',
//                     padding: '12px 24px',
//                     fontSize: '16px',
//                     transition: 'all 0.3s ease-in-out',
//                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//                     borderRadius: '8px',
//                   }}
//                   onClick={() => navigate('/StaffEnroll')}
//                 >
//                   Enroll
//                 </Button>
//               </ConfigProvider>
//             </section>

//             <Typography.Title level={2} style={{ marginTop: '32px' }}>
//               Completed Tickets
//             </Typography.Title>

//             <div style={cardContainerStyle}>
//               {completedTickets.map((completedIssue, index) => (
//                 <Card
//                   key={index}
//                   hoverable
//                   style={cardStyle}
//                   bodyStyle={{
//                     padding: 16,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'flex-start',
//                     position: 'relative',
//                   }}
//                 >
//                   <Typography.Title level={4} style={titleStyle}>
//                     {completedIssue.buildingName}
//                   </Typography.Title>
//                   <div>
//                     <h3 style={textStyle}>
//                       <strong>Building Name:</strong> {completedIssue.buildingName}
//                     </h3>
//                     <p style={textStyle}>
//                       <strong>Flat No:</strong> {completedIssue.flatNo}
//                     </p>
//                     <p style={textStyle}>
//                       <strong>Contact No:</strong> {completedIssue.contactNo}
//                     </p>
//                     <p style={textStyle}>
//                       <strong>Issue:</strong> {completedIssue.issue}
//                     </p>
//                     {/* View Photo Button */}
//                     <Button
//                       type="primary"
//                       className="mt-2"
//                       style={buttonStyle}
//                       onClick={() => handleViewPhoto(completedIssue)}
//                     >
//                       View Photo
//                     </Button>
//                   </div>
//                 </Card>
//               ))}
//             </div>

//             {/* Modal for Viewing Photo */}
//             <Modal
//               title="View Photo"
//               visible={viewPhotoModalVisible}
//               onCancel={handleModalCancel}
//               footer={null}
//             >
//               <div>
//                 <img src={photoUrl} alt="Ticket Photo" style={{ maxWidth: '100%' }} />
//               </div>
//             </Modal>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default AdminLogin;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, Typography, Button, Modal, Select, ConfigProvider } from 'antd';

// import PopularProductCard from '../components/PopularProductCard';
// import axios from 'axios';
// import { TinyColor } from '@ctrl/tinycolor';
// import { useSelector } from 'react-redux';
// import Nav from '../components/Nav';


// const { Option } = Select;

// const cardContainerStyle = {
//   display: 'flex',
//   flexDirection: 'row',
//   flexWrap: 'wrap',
//   gap: '16px',
// };

// const cardStyle = {
//   flex: '0 0 calc(50% - 16px)',
//   border: '1px solid black',
//   borderRadius: '8px',
//   backgroundColor: 'white',
//   padding: '16px',
// };

// const buttonStyle = {
//   backgroundColor: 'purple',
//   color: 'white',
//   transition: 'background-color 0.3s ease-in-out',
//   border: 'none',
//   borderRadius: '4px',
//   padding: '8px 16px',
//   marginTop: '8px',
//   position: 'absolute',
//   bottom: '16px',
//   right: '16px',
// };

// const centeredButtonStyle = {
//   backgroundColor: 'purple',
//   color: 'white',
//   transition: 'background-color 0.3s ease-in-out',
//   border: 'none',
//   borderRadius: '4px',
//   padding: '8px 16px',
//   marginTop: '8px',
//   position: 'absolute',
//   bottom: '16px',
//   left: '50%',
//   transform: 'translateX(-50%)',
// };

// const titleStyle = {
//   color: 'black',
//   marginBottom: '16px',
// };

// const textStyle = {
//   color: 'black',
// };

// const colors1 = ['#6253E1', '#A466FF'];
// const getHoverColors = (colors) =>
//   colors.map((color) => new TinyColor(color).lighten(5).toString());
// const getActiveColors = (colors) =>
//   colors.map((color) => new TinyColor(color).darken(5).toString());

// const AdminLogin = () => {
//   const isadmin = useSelector((state) => state.isAdminLoggedIn)
//   const [tickets, setTickets] = useState([]);
//   const [completedTickets, setCompletedTickets] = useState([]);
//   const fetchTickets = async () => {
//     try {
//       const response = await axios.get('http://localhost:1000/api/allList/pendingtickets');
//       setTickets(response.data.ticketslist);
//     } catch (error) {
//       console.error('Error fetching tickets:', error);
//     }
//   };
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:1000/api/v5/allbuildings');
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);
//   useEffect(() => {

//     fetchTickets();
//   }, []);
//   const fetchCompletedTickets = async () => {
//     try {
//       const response = await axios.get('http://localhost:1000/api/allList/completedtickets');
//       setCompletedTickets(response.data.completedTickets);
//     } catch (error) {
//       console.error('Error fetching completed tickets:', error);
//     }
//   };
//   useEffect(() => {


//     fetchCompletedTickets();
//   }, []);


//   const navigate = useNavigate();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedIssue, setSelectedIssue] = useState(null);
//   const [expandedIssue, setExpandedIssue] = useState(null);
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [selectedStaff, setSelectedStaff] = useState(null);
//   const [staffMembers, setstaffmembers] = useState([]);
//   const [assignstaff , setassignstaff] = useState(null)

//   useEffect(() => {
//     const fetchStaffMembers = async () => {
//       try {
//         const response = await axios.get('http://localhost:1000/api/v3/stafflist');
//         setstaffmembers(response.data); // Update state with fetched data
//       } catch (error) {
//         console.error('Error fetching staff members:', error);
//       }
//     };

//     fetchStaffMembers();
//   }, []); // Add this effect
//   const handleButtonClick = () => {
//     navigate('/Newbuilding');
//   };

//   const handleEnrollClick = () => {
//     navigate('/StaffEnroll');
//   };
  
 

//   const handleAssignTicket = (issue) => {
//     setSelectedIssue(issue);
//     setDropdownVisible(true);
//   };

//   const handleStaffSelect = async (staffid) => {
//     console.log("gmm")
//     setassignstaff(null)
//     setSelectedStaff(null);
//     const response = await axios.post('http://localhost:1000/api/v3/staff', { staffId: staffid });
//     setassignstaff(response.data)
//     setSelectedStaff(response.data.fullName);
//     setDropdownVisible(false);
//     setModalVisible(true); //makes the assigning confirm 
//   };

//   const handleModalOk = () => {
//  // Replace with your actual state structure
//  console.log(assignstaff._id)
//     axios.post('http://localhost:1000/api/allList/assign', {
//         staffId: assignstaff._id, // Assuming assignstaff has an id property
//         ticketId: selectedIssue._id, // Assuming selectedIssue has an id property
//     })
//     .then(response => {
//         console.log('Assignment successful:', response.data.message);
//         setModalVisible(false);
//         fetchCompletedTickets();
//         fetchTickets();
//          // Close modal or handle UI state accordingly
//     })
//     .catch(error => {
//         console.error('Error during assignment:', error);
//         // You might want to handle UI feedback for errors here
//     });
//     setModalVisible(false);
//   };

//   const handleModalCancel = () => {
//     setModalVisible(false);
//   };

//   const handleExpandAddress = (index) => {
//     setExpandedIssue(expandedIssue === index ? null : index);
//   };

//   const handleViewPhoto = (ticket) => {
//     console.log(`Viewing photo for ticket: ${ticket.buildingName}`);
//     navigate('/ViewPhoto');

//     // Logic to view photo should be implemented here
//     // Placeholder for now
//   };

//   return (
//     <div>
//       {!isadmin && (
//         <div style={{ padding: '16px' }}>
//           <Typography.Paragraph style={{ marginBottom: '16px' }}>
//             You need to login as an Admin to access this page. Click the button below to login as admin.
//           </Typography.Paragraph>
//           <Button
//             style={{ marginBottom: '16px', backgroundColor: 'purple', color: 'white', border: 'none' }}
//             onClick={() => navigate('/Adminlogin')}
//           >
//             Login as Admin
//           </Button>
//           <Typography.Paragraph>
//             If you want to raise a ticket or want to explore about us, click the button below.
//           </Typography.Paragraph>
//           <Button
//             style={{ backgroundColor: 'purple', color: 'white', border: 'none' }}
//             onClick={() => navigate('/')}
//           >
//             Home
//           </Button>
//         </div>
//       )}
//      { isadmin && <>
//     <div className="max-container max-sm:mt-12 p-4">
//       <section id="products">
//         <div className="flex flex-col justify-start gap-5">
//           <div className="flex justify-between items-center">
//             <h2 className="text-4xl font-palanquin font-bold">
//               Available <span className="text-purple-800">Flats</span>
//             </h2>
//             <button
//               onClick={handleButtonClick}
//               className="bg-purple-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-purple-700"
//             >
//               Add Building
//             </button>
//           </div>
//         </div>
//         <div className="flex mt-16 flex-row flex-shrink-0 gap-4 py-2 overflow-x-auto scrollbar-webkit scrollbar-thin">
//           {products.map((product) => (
//             <PopularProductCard key={product.buildingname} {...product} />
//           ))}
//         </div>
//       </section>

//       <section id="new-staff" style={{ textAlign: 'center', marginTop: '32px' }}>
//         <h2 className="text-4xl font-palanquin font-bold">
//           Add New <span className="text-purple-800">Staff</span>
//         </h2>
//         <ConfigProvider
//           theme={{
//             components: {
//               Button: {
//                 colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
//                 colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
//                 colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
//                 lineWidth: 0,
//               },
//             },
//           }}
//         >
//           <Button
//             type="primary"
//             size="large"
//             style={{
//               marginTop: '16px',
//               padding: '12px 24px',
//               fontSize: '16px',
//               transition: 'all 0.3s ease-in-out',
//               boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//               borderRadius: '8px',
//             }}
//             onClick={handleEnrollClick}
//           >
//             Enroll
//           </Button>
//         </ConfigProvider>
//       </section>

//       <Typography.Title level={2} style={{ marginTop: '32px' }}>
//         Pending Tickets and Issues
//       </Typography.Title>

//       <div style={cardContainerStyle}>
//         {tickets.map((issue, index) => (
//           <Card
//             key={index}
//             hoverable
//             style={cardStyle}
//             bodyStyle={{
//               padding: 16,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'flex-start',
//               position: 'relative',
//             }}
//           >
//             <Typography.Title level={4} style={titleStyle}>
//               {issue.buildingName}
//             </Typography.Title>
//             <div>
//               <h3 style={textStyle}>
//                 <strong>Building Name:</strong> {issue.buildingName}
//               </h3>
//               <p style={textStyle}>
//                 <strong>Flat No:</strong> {issue.flatNo}
//               </p>
//               <p style={textStyle}>
//                 <strong>Contact No:</strong> {issue.contactNo}
//               </p>
//               <p style={textStyle}>
//                 <strong>Issue:</strong> {issue.issue}
//               </p>
//               {issue.street || issue.city || issue.postalCode ? (
//                 <p style={textStyle}>
//                   <span
//                     style={{
//                       display: 'inline-block',
//                       maxWidth: expandedIssue === index ? 'none' : '150px',
//                       whiteSpace: expandedIssue === index ? 'normal' : 'nowrap',
//                       overflow: expandedIssue === index ? 'visible' : 'hidden',
//                       textOverflow: expandedIssue === index ? 'clip' : 'ellipsis',
//                       cursor: 'pointer',
//                     }}
//                     onClick={() => handleExpandAddress(index)}
//                   >
//                     {`${issue.street}, ${issue.city}, ${issue.postalCode}`}
//                   </span>
//                 </p>
//               ) : null}
//             </div>
//             <Button
//               type="primary"
//               className="mt-2"
//               style={buttonStyle}
//               onClick={() => handleAssignTicket(issue)}
//             >
//               Assign Ticket
//             </Button>
//           </Card>
//         ))}
//       </div>

//       <Typography.Title level={2} style={{ marginTop: '32px' }}>
//         Completed Tickets
//       </Typography.Title>

//       <div style={cardContainerStyle}>
//         {completedTickets.map((completedIssue, index) => (
//           <Card
//             key={index}
//             hoverable
//             style={cardStyle}
//             bodyStyle={{
//               padding: 16,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'flex-start',
//               position: 'relative',
//             }}
//           >
//             <Typography.Title level={4} style={titleStyle}>
//               {completedIssue.buildingName}
//             </Typography.Title>
//             <div>
//               <h3 style={textStyle}>
//                 <strong>Building Name:</strong> {completedIssue.buildingName}
//               </h3>
//               <p style={textStyle}>
//                 <strong>Flat No:</strong> {completedIssue.flatNo}
//               </p>
//               <p style={textStyle}>
//                 <strong>Contact No:</strong> {completedIssue.contactNo}
//               </p>
//               <p style={textStyle}>
//                 <strong>Issue:</strong> {completedIssue.issue}
//               </p>
//               {completedIssue.street || completedIssue.city || completedIssue.postalCode ? (
//                 <p style={textStyle}>
//                   <span
//                     style={{
//                       display: 'inline-block',
//                       maxWidth: expandedIssue === `completed-${index}` ? 'none' : '150px',
//                       whiteSpace: expandedIssue === `completed-${index}` ? 'normal' : 'nowrap',
//                       overflow: expandedIssue === `completed-${index}` ? 'visible' : 'hidden',
//                       textOverflow: expandedIssue === `completed-${index}` ? 'clip' : 'ellipsis',
//                       cursor: 'pointer',
//                     }}
//                     onClick={() => handleExpandAddress(`completed-${index}`)}
//                   >
//                     {`${completedIssue.street}, ${completedIssue.city}, ${completedIssue.postalCode}`}
//                   </span>
//                 </p>
//               ) : null}
//             </div>
//             {/* <Button
//               type="primary"
//               className="mt-2"
//               style={buttonStyle}
//               onClick={() => handleAssignTicket(completedIssue)}
//             >
//               view photo
//             </Button> */}
//           </Card>
//         ))}

        
//       </div>

//       <Modal
//         title="Assign Ticket"
//         open={modalVisible}
//         onOk={handleModalOk}
//         onCancel={handleModalCancel}
//       >
//         <Typography.Paragraph>
//           Are you sure you want to assign the ticket for{' '}
//           {selectedIssue && selectedIssue.issue} to {selectedStaff}?
//         </Typography.Paragraph>
//       </Modal>

//       <Modal
//         title="Select Staff Member"
//         open={dropdownVisible}
//         onCancel={() => setDropdownVisible(false)}
//         footer={null}
//       >
//         <Select
//   showSearch
//   style={{ width: '100%' }}
//   placeholder="Select a staff member"
//   optionFilterProp="children"
//   onChange={handleStaffSelect}
//   onDropdownVisibleChange={(open) => {
//     if (!open) {
//       setDropdownVisible(false);
//       setModalVisible(true);
//     }
//   }}
//   filterOption={(input, option) =>
//     typeof option.children === 'object' &&
//     option.children.join('').toLowerCase().includes(input.toLowerCase())
//   }
// >
//   {staffMembers.map((staff) => (
//     <Option key={staff._id} value={staff.staffId}>
//       {staff.fullName} - {staff.work}
//     </Option>
//   ))}
// </Select>
//       </Modal>
//     </div>
//     </>}
//     </div>
//   );
// };

// export default AdminLogin;