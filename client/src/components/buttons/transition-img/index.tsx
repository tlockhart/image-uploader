import "./style.css";
import { Link } from 'react-router-dom';

function transitionImg(props: TransitionImgPropType) {
  console.log("IMG Props:", props);
  const { name, value } = props.to.state;
  return (
    <>
      <div className="card-wrapper inline-block">
        <div className="card card-rotating">
          {/* <div className="view view-cascade overlay"> */}
          <Link to={props.to} className="view overlay zoom rounded">
            <img
              className="card-img-top image-rules img-fluid"
              src={props.productImage}
              alt={`product ${props.id}`}
            />
          </Link>
          <a>
            <div className="mask rgba-white-slight"></div>
          </a>
          {/* </div> */}
          {/* Card Content */}
          <div className="card-body card-body-cascade text-center">

            {/* Title */}
            <h4 className="card-title"><strong>{name}</strong></h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default transitionImg;