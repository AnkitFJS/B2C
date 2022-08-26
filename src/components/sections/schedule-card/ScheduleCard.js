import { Col, Row, DatePicker } from "antd";
import React from "react";
import Link from "next/link";
import moment from "moment";

const ScheduleCard = ({ data }) => {
  const [date, setDate] = React.useState(
    moment(Date.now()).format("MM-DD-YYYY")
  );

  const handleChange = (date) => {
    const outputFormat = "MM-DD-YYYY";
    const date1 = moment(date).format(outputFormat);
    setDate(date1);
  };

  return (
    <>
      <p>
        Showing Tee Times for: Casselberry Golf Club , Grande Lakes on {date}
      </p>

      <DatePicker
        style={{ width: "100%", marginBottom: 20, marginTop: 10 }}
        onChange={(date) => handleChange(date)}
        defaultValue={moment(date, 'MM-DD-YYYY')}
      />
      {data.filter((x) => x.date===date).length>0?

      <Row gutter={20}>
        {data.filter((x) => x.date===date).map((x) => (
          <Col md={6}>
            <div
              style={{
                backgroundColor: "#88c74a",
                padding: 10,
                width: "100%",
                textAlign: "center",
              }}
            >
              <p style={{ textAlign: "center" }}>{x.time}</p>
            </div>
            <Link
              href={process.env.PUBLIC_URL + `/product/[slug]`}
              as={process.env.PUBLIC_URL + `/product/${data.slug}`}
            >
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  border: "1px solid lightgray",
                  padding: 10,
                  marginBottom: 30,
                  cursor: "pointer",
                }}
              >
                <p style={{ textAlign: "center", color: "#88c74a" }}>
                  {x.cost}
                  <span style={{ fontSize: 10 }}>.00</span>
                </p>
                <p style={{ textAlign: "center" }}>{x.holes} holes</p>
                <p style={{ textAlign: "center", fontSize: 13 }}>
                  <i className="fas fa-flag" style={{ color: "#88c74a" }} /> 18
                  /{x.people}{" "}
                  <i className="fas fa-users" style={{ color: "#88c74a" }} />{" "}
                </p>
              </div>
            </Link>
          </Col>
        ))}
        
      </Row>
      :
        <p style={{ textAlign: "center" }}>No record found </p>}
    </>
  );
};

export default ScheduleCard;
