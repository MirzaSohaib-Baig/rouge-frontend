import React from "react";
import "./Group.css";
import GroupTravelers from "../../assets/Group_of_travels.jpg";
import { FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GroupPage = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
  
    const importAll = (r) => r.keys().map(r);
    const avatarImages = importAll(require.context('../../assets/avatars', false, /\.(png|jpe?g|svg)$/));
  
    useEffect(() => {
      const fetchGroup = async () => {
        try {
          const res = await axios.get(`http://127.0.0.1:8001/chat/group/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setGroup(res.data);
        } catch (err) {
          console.error("Failed to fetch group details", err.response?.data || err.message);
        }
      };
  
      fetchGroup();
    }, [id]);
  

  return (
    <main className="group-page">
      <img src={GroupTravelers} alt="Group Banner" className="group-banner" />

      <div className="group-header">
        <p className="group-subtitle">Group by Harry</p>
        <h1 className="group-title">Group of Travellers</h1>
        <div className="group-members">
            <FaLock className="group-icon" /> <span>Private group - 731 members</span>
        </div>

        <div className="group-fix">
            <div className="member-avatars">
                {avatarImages.map((imgSrc, idx) => (
                    <img
                    key={idx}
                    src={imgSrc}
                    alt={`member-${idx}`}
                    className="member-avatar"
                    />
                ))}
            </div>

            <div className="group-actions">
            <button className="action-btn">Request</button>
            <button className="action-btn">Share</button>
            </div>
        </div>
      </div>

      <div className="group-main">
        <div className="group-feed">Feed content here...</div>
        <div className="group-about">
          <h3>About</h3>
          <p>This group is for those who love to travel and share adventures.</p>
        </div>
      </div>
    </main>
  );

//   if (!group) return <div className="group-page">Loading...</div>;

//   return (
//     <main className="group-page">
//       <img src={group.group_image_url} alt="Group Banner" className="group-banner" />

//       <div className="group-header">
//         <p className="group-subtitle">Group by {group.created_by?.name || "Unknown"}</p>
//         <h1 className="group-title">{group.group_name || group.name}</h1>
//         <div className="group-members">
//           <FaLock className="group-icon" />
//           <span>{group.type} group</span>
//         </div>

//         <div className="group-fix">
//           <div className="member-avatars">
//             {avatarImages.map((imgSrc, idx) => (
//               <img
//                 key={idx}
//                 src={imgSrc}
//                 alt={`member-${idx}`}
//                 className="member-avatar"
//               />
//             ))}
//           </div>

//           <div className="group-actions">
//             <button className="action-btn">Request</button>
//             <button className="action-btn">Share</button>
//           </div>
//         </div>
//       </div>

//       <div className="group-main">
//         <div className="group-feed">Feed content here...</div>
//         <div className="group-about">
//           <h3>About</h3>
//           <p>This group is for those who love to travel and share adventures.</p>
//         </div>
//       </div>
//     </main>
//   );
};

export default GroupPage;
