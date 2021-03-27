// import './styles.css';
import ProductUpdateBtn from './transition-btn';

let UpdateBtn = (props: ProdUpdateItemProps) => {
    return (
        <ProductUpdateBtn 
          to={
            {
              pathname: `${props.path}${props.id}`,
              state: {
                name: props.name,
                value: props.value,
                id: props.id,
              }
            }
          }
          buttonName={props.btnName}/>
        );
};

export default UpdateBtn;