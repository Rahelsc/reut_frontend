import "./chatOnline.css";

const ChatOnline = () => {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwildfor.life%2Fsites%2Fdefault%2Ffiles%2Fspecies%2Fhero%2Ftiger_hero.jpg&f=1&nofb=1"
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Dov</span>
      </div>
    </div>
  );
};

export default ChatOnline;
