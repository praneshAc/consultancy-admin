import React from "react";
import { Card, Col } from "antd";

import "./DashBoardCard.css";
const DashboardCard = ({icon,title,value}) => {
  return (
    
        <Col xs={24} sm={12} md={6}>
          <Card className="custom-card" bordered={false}>
            {icon }
            <p className="title">{title}</p>
            <h2 className="value">{value}</h2>
          </Card>
        </Col>
      
   
  );
};

export default DashboardCard;
