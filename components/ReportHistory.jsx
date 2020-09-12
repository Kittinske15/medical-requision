import React from "react";
import { db } from "../config";
import history from "../history";
import { logout } from "../services/firebaseService";
import logo from "../images/cs-pepsico-logo-colour.png";
import "../App.css";
import loadingGif from "../images/loading.gif";

class ReportHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    console.log("mounted");
    db.collection("expenses")
      .get()
      .then((snapshot) => {
        const expenses = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          console.log(data)
          if( data.userId == this.props.location.uid) {
            expenses.push(data);
          }
        });
        this.setState({ expenses: expenses, isLoading: false });
      })
      .catch((error) => alert(error));
  }

  render() {
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
                history.push("/history");
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
          {this.state.isLoading ? (
            <img src={loadingGif} className="loadingGif"/>
          ) : (
            <>
              <div className="title">History Report</div>
              {this.state.expenses &&
                this.state.expenses.map((expense) => {
                  return (
                    <div className="wrapper">
                      <div className="box">
                        <div style={{fontWeight: 600}}>{expense.medical_type}</div>
                        <div>Date: {new Date(expense.medical_at.seconds * 1000).toLocaleDateString("en-US")}</div>
                        <div>{expense.amount} baht</div>
                      </div>
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default ReportHistory;
