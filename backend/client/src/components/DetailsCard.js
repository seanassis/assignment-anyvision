import React, { useState } from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;
const DetailsCard = props => {
    const [data] = useState(props.data);

    function renderData(){
        Object.keys(data).map((key,index) => {
            const text = data[key];
            return (
              <Panel header={key} key={index}>
                {text}
              </Panel>
            );
                })
            }

return (
  <Collapse bordered={false} defaultActiveKey={["1"]}>
    {renderData()}
  </Collapse>
);
}

export default DetailsCard;

