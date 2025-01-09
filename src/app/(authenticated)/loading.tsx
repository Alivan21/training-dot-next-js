import type { FC, ReactElement } from 'react';
import { Spin } from 'antd';

const Loading: FC = (): ReactElement => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default Loading;
