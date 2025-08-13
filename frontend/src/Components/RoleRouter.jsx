import { Spin } from 'antd';

// This component is now just a placeholder loading screen.
// The loader function will run and redirect before this component is fully shown.
const RoleRouter = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Spin tip="Initializing..." size="large">
        <div className="p-12 bg-white rounded-lg shadow-md" />
      </Spin>
    </div>
  );
};

export default RoleRouter;