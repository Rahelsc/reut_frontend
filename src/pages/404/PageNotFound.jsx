import "./pageNotFound.css";

const PageNotFound = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="containerOf404">
      <img className="image404" src={`${PF}404Page.png`} alt="" />
    </div>
  );
};

export default PageNotFound;
