import React from "react";
import { MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Text from "components/inputs/text";

let RegistrationForm = (props) => {
  return (
    <main role="main" className="form-align flex-shrink-0">
      <MDBContainer>
        <MDBRow>
          <MDBCol size="12" middle={true}>
            <form>
              <h1 className="mt-5">Registration Form</h1>
              <br />
              {/* email */}
              <div className="form-group">
                {/* email */}
                <Text
                  htmlFor={"formGroupEmail"}
                  className={"form-control"}
                  id={"formGroupEmail"}
                  // placeholder={"email"}
                  name={"email"}
                  label={"Email"}
                  value={props.email}
                  changeHandler={props.changeHandler}
                />
                {/* password */}
                <Text
                  htmlFor={"formGroupPassword"}
                  className={"form-control"}
                  id={"formGroupPassword"}
                  // placeholder={"password"}
                  name={"password"}
                  label={"Password"}
                  value={props.password}
                  changeHandler={props.changeHandler}
                />
                <br />
                <MDBRow>
                  <MDBCol>
                    <label htmlFor="formGroupPassword" />
                    <MDBBtn
                      className={"mx-0"}
                      color="blue-grey"
                      onClick={props.clickHandler}
                    >
                      Submit
                    </MDBBtn>
                    <h3 className="mt-5">
                      {props.message ? props.message : ""}
                    </h3>
                  </MDBCol>
                </MDBRow>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </main>
  );
};

export default RegistrationForm;
