import React from "react";
import "../App.css";
import history from "../history";
import { logout } from "../services/firebaseService";
import { addExpense, expenses } from "../model/Expense";
import logo from "../public/images/cs-pepsico-logo-colour.png";
import { auth } from "../config";

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      medical_type: "",
      medical_for: "",
      expenses: null,
      name: "",
      age: 0,
      medical_at: "",
      amount: 0,
      uid: auth.currentUser.uid,
    };
  }

  componentDidMount() {
    this.setState({ expenses: expenses() });
  }

  handleAddExpense = (event) => {
    event.preventDefault();
    addExpense(this.state);
    alert("send success");
  };

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCategoryChange = (e) => {
    this.setState({ medical_type: e.target.value });
  };

  handleTypeChange = (e) => {
    this.setState({ medical_for: e.target.value });
  };

  render() {
    const {
      uid,
      medical_type,
      medical_for,
      expenses,
      name,
      age,
      medical_at,
      amount,
    } = this.state;

    return (
      <div>
        <div className="header">
          <img src={logo} className="img" />
          <div>
            <button
              className="reportBtn"
              onClick={() => {
                history.push("/home");
              }}
            >
              Home
            </button>
            <button
              className="reportBtn"
              onClick={() => {
                history.push({
                  pathname: "/history",
                  uid: uid,
                });
              }}
            >
              Report
            </button>
            <button className="logoutBtn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        <div className="main">
          <div className="title">Reimburse Medical Expenses</div>
          <div className="inputBox">
            <form>
              <div className="wrapperInput">
                <p className="form-row">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.onInputChange}
                  />
                </p>
                <p className="form-row">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={age}
                    onChange={this.onInputChange}
                  />
                </p>
                <p className="form-row">
                  <label>Expense</label>
                  <input
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={this.onInputChange}
                  />
                </p>
                <p className="form-row">
                  <label>Medical At</label>
                  <input
                    type="datetime-local"
                    name="medical_at"
                    value={medical_at}
                    onChange={this.onInputChange}
                  />
                </p>
                <p className="form-col">
                  <select
                    id="dropdown"
                    className="selectBtn"
                    onChange={this.handleCategoryChange}
                  >
                    <option value="title">ประเภทการรักษาพยาบาล</option>
                    <option value="ผู้ป่วยนอก (OPD) พบแพทย์รักษา รับยาแล้วกลับบ้าน">
                      ผู้ป่วยนอก (OPD) พบแพทย์รักษา รับยาแล้วกลับบ้าน
                    </option>
                    <option
                      value="ผู้ป่วยใน (IPD แอดมิทนอนโรงพยาบาล หรือรับการรักษาเกิน 6
                  ชั่วโมง)"
                    >
                      ผู้ป่วยใน (IPD แอดมิทนอนโรงพยาบาล หรือรับการรักษาเกิน 6
                      ชั่วโมง)
                    </option>
                    <option
                      value="ทันตกรรม (ถอนฟัน อุดฟัน ขูดหินปูน รักษารากฟัน
                  ใช้สิทธิครอบครัวได้)"
                    >
                      ทันตกรรม (ถอนฟัน อุดฟัน ขูดหินปูน รักษารากฟัน
                      ใช้สิทธิครอบครัวได้)
                    </option>
                    <option value="ตัดแว่น (ใช้สิทธิได้เฉพาะพนักงาน)">
                      ตัดแว่น (ใช้สิทธิได้เฉพาะพนักงาน)
                    </option>
                    <option value="อื่นๆ">อื่นๆ</option>
                  </select>
                </p>
                <p className="form-col">
                  <select
                    id="dropdown"
                    className="selectBtn"
                    onChange={this.handleTypeChange}
                  >
                    <option value="title">เบิกค่ารักษาพยาบาลให้ใคร</option>
                    <option value="ตัวเอง">ตัวเอง</option>
                    <option value="คู่สมรส">คู่สมรส</option>
                    <option value="บุตร">บุตร</option>
                    <option value="บิดา">บิดา</option>
                    <option value="มารดา">มารดา</option>
                  </select>
                </p>

                <div></div>
                <button className="submitBtn" onClick={this.handleAddExpense}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default InputForm;
