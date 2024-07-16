import React, { useState, useEffect } from 'react';
import { Card, Typography } from 'antd';
import axios from 'axios';

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
};

const titleStyle = {
  color: 'black',
  marginBottom: '16px',
};

const textStyle = {
  color: 'black',
};

const MyTickets = () => {
  const id = localStorage.getItem("id")
  const [tickets, setTickets] = useState([]);
  const [expandedIssue, setExpandedIssue] = useState(null);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`http://localhost:${process.env.PORT}/api/allList/mytickets`,  {
        params: { id },
      } );
      setTickets(response.data.tickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  useEffect(() => {

    fetchTickets();
  }, []);

  const handleExpandAddress = (index) => {
    setExpandedIssue(expandedIssue === index ? null : index);
  };

  return (
    <div>
      <Typography.Title level={2} style={{ marginTop: '32px' }}>
        My Tickets
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
              <p style={textStyle}>
                <strong>Status:</strong> {issue.status}
              </p>
              {issue.staffName && (
                <p style={textStyle}>
                  <strong>Staff Name:</strong> {issue.staffName}
                </p>
              )}
              {issue.staffNumber && (
                <p style={textStyle}>
                  <strong>Staff Number:</strong> {issue.staffNumber}
                </p>
              )}
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
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;

// import React, { useState, useEffect } from 'react';
// import { Card, Typography } from 'antd';
// import axios from 'axios';

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

// const titleStyle = {
//   color: 'black',
//   marginBottom: '16px',
// };

// const textStyle = {
//   color: 'black',
// };

// const MyTickets = () => {
//   const [tickets, setTickets] = useState([]);
//   const [expandedIssue, setExpandedIssue] = useState(null);

//   useEffect(() => {
//     const fetchTickets = async () => {
//       try {
//         const response = await axios.get('http://localhost:${process.env.PORT}/api/allList/pendingtickets');
//         setTickets(response.data.ticketslist);
//       } catch (error) {
//         console.error('Error fetching tickets:', error);
//       }
//     };

//     fetchTickets();
//   }, []);

//   const handleExpandAddress = (index) => {
//     setExpandedIssue(expandedIssue === index ? null : index);
//   };

//   return (
//     <div>
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
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyTickets;