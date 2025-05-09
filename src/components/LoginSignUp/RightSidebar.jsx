import React from "react";
import DogLoverz from "../../assets/dogloverz.png";
import Travels from "../../assets/travels.png";
import Cat from "../../assets/cat.png";
import Heaper from "../../assets/heaper.png";
import "./Home.css";
import Mason from "../../assets/Mason.png";
import Isabel from "../../assets/Isabel.png";

export default function RightSidebar() {
  return (
    <aside className="right-sidebar">
      <div className="community-section">
        <strong>Community Chats</strong>
        <div className="chat-group"> <img src={DogLoverz} alt="Doglovers" className="user-avatar" /> <span>Dog Lovers</span></div>
        <div className="chat-group"><img src={Travels} alt="Travel" className="user-avatar" /> <span>Travel Girls</span></div>
        <div className="chat-group"> <img src={Cat} alt="Cat" className="user-avatar" /> <span>Cat Memez</span></div>
        <div className="seperator"></div>
      </div>
      <div className="birthday-section">
        <strong>Birthdays</strong>
        <div className="birthday">20 August</div>
        <div className="birthday-entry"><div className="circle-avatar"></div> Bob Hammod – 29 yrs</div>
        <div className="birthday-entry"> <img src={Heaper} alt="Heaper" className="user-avatar" /> Heaper Mitchell – 21 yrs</div>
        <div className="birthday">22 August</div>
        <div className="birthday-entry"> <img src={Mason} alt="Mason" className="user-avatar" /> Mason Copper – 30 yrs</div>
        <div className="birthday">1 September</div>
        <div className="birthday-entry"><img src={Isabel} alt="Isabel" className="user-avatar" /> Isabel Hughes – 10 yrs</div>
      </div>
    </aside>
  );
}
