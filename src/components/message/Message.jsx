import "./message.css";

const Message = ({ own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.gannett-cdn.com%2F-mm-%2Fcc1bc2b7dc8850a6820828fd30897f6bca5c330f%2Fc%3D0-240-4928-3024%2Flocal%2F-%2Fmedia%2F2016%2F07%2F15%2FMIGroup%2FBattleCreek%2F636041969714255783-DSC-4313.JPG%3Fwidth%3D3200%26height%3D1680%26fit%3Dcrop&f=1&nofb=1"
          alt=""
        />
        <p className={own ? "messageText own" : "messageText"}>message stam</p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
};

export default Message;
