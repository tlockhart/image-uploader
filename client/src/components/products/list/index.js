import ProductImageViewBtn from "components/buttons/product-image-view-btn";

let ProductListItem = (props) => {
  let name = props.name;
  let value = props.value;
  let id = props.id;
  let regex = /['"']+/g;
  let productImage = props.productImage.replace(regex, "");
  let userRole = props.role;
  console.log("PRODUCTLISTITEM-USERRole:", userRole);

  const viewPath = "/products/product/";
  return (
    <>
      <ProductImageViewBtn
        productImage={productImage}
        id={id}
        userRole={userRole}
        value={value}
        name={name}
        viewPath={viewPath}
        viewBtnClickHandler={(event) => props.filterClickHandler(event)}
      />
    </>
  );
};

export default ProductListItem;
