import React, { useState } from "react";
import { Button } from "antd";
import { SITE_SERVICE } from "../../../service/base";

export const TestPage = () => {
  const [respStr, setRespStr] = useState<string>("");
  return (
    <div>
      <Button
        onClick={async () => {
          setRespStr("");
          try {
            const resp = await SITE_SERVICE.test();
            console.debug(resp);
            setRespStr(JSON.stringify(resp || {}));
          } catch (e) {
            console.error(e);
            setRespStr(JSON.stringify(e || {}));
          }
        }}
      >
        test
      </Button>
      <div>rest: {respStr}</div>
    </div>
  );
};
