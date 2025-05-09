import React from "react";
import {
  FaHome,
  FaUser,
  FaComments,
  FaHeart,
  FaUsers,
  FaNewspaper,
  FaBookOpen,
  FaCalendar,
  FaStore,
  FaVideo
} from "react-icons/fa";
import "./Home.css";
import Doglovers from "../../assets/dogloverz.png";
import Gamerz from "../../assets/gamers.png";
import Travel from "../../assets/travels.png";
import Cat from "../../assets/cat.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Sidebar() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
      const fetchGroups = async () => {
        try {
          const res = await axios.get("http://localhost:8001/api/groups/", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setGroups(res.data);
        } catch (err) {
          console.error("Failed to fetch groups", err.response?.data || err.message);
        }
      };
  
      fetchGroups();
    }, []);
  return (
    <aside className="sidebar">
      <div className="nav-section">
        <Link to={"/home/feed"}><div className="nav-item"><FaHome /> Home</div></Link>
        <Link><div className="nav-item"><FaUser /> Profile</div></Link>
        <div className="seperator"></div>
      </div>
      <div className="nav-section">
        <strong>Favorites</strong>
        <Link><div className="nav-item"><FaComments /> Messages</div></Link>
        <Link><div className="nav-item"><FaHeart /> Start Swiping</div></Link>
        <Link><div className="nav-item"><FaUsers /> Friends</div></Link>
        <Link><div className="nav-item"><FaNewspaper /> Feed</div></Link>
        <Link><div className="nav-item"><FaBookOpen /> Stories</div></Link>
        <Link><div className="nav-item"><FaCalendar /> Events</div></Link>
        <Link><div className="nav-item"><FaStore /> Storefront</div></Link>
        <Link><div className="nav-item"><FaVideo /> Live</div></Link>
        <Link><div className="seperator"></div></Link>
      </div>
      <div className="nav-section">
        <strong>Groups</strong>
        <Link><div className="group-item"> <img src={Doglovers} alt="Doglovers"  className="user-avatar"/> <span>Dog Lovers</span></div></Link>
        <Link><div className="group-item"> <img src={Gamerz} alt="Gamerz"  className="user-avatar"/> <span>GamerzZzZ</span></div></Link>
        <Link to="/home/group"><div className="group-item"> <img src={Travel} alt="Travel"  className="user-avatar"/> <span>Travel Girls</span></div></Link>
        <Link><div className="group-item"> <img src={Cat} alt="Cat"  className="user-avatar"/> <span>Cat Memez</span></div></Link>
      </div>
        {/* <div className="nav-section">
            <strong>Groups</strong>
            {groups.map((group) => (
                <Link to={`/home/group/${group.id}`} key={group.id}>
                <div className="group-item">
                    <img
                    src={group.group_image_url || "/default-group.png"}
                    alt={group.name}
                    className="user-avatar"
                    />
                    <span>{group.group_name || group.name}</span>
                </div>
                </Link>
            ))}
        </div> */}

    </aside>
  );
}
