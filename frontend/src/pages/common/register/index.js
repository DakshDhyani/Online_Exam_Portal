
import React from "react";
import { Form ,message} from "antd";
import {Link} from "react-router-dom"
import { registerUser } from "../../../apicalls/users";

function Register() {

  const onFinish = async(values)=>{
    try {
      const response = await registerUser(values)
      if(response.success)
      {
        message.success(response.message);
      }
      else{
        message.error(response.message);
      }
    } catch (error) {
      MessageChannel.error(error.message);
    } 
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="card  w-400 p-3">
          <div className="flex flex-col">
            <h1 className="text-2xl">Register</h1>
            <div className="divider"></div>

            {/* using antd forms , see the syntax carefully*/}

            <Form layout="vertical" className="mt-2" onFinish={onFinish}>
              {/* In form item mentioning the name is compulsary */}
              <Form.Item name="name" label="Name">
                <input type="text"/>
              </Form.Item>
              <Form.Item name="email" label="Email">
                <input type="text"/>
              </Form.Item>
              <Form.Item name="password" label="Password">
                <input type="password"/>
              </Form.Item>

              <div  className="flex flex-col gap-20">

                  <button type="submit" className="primary-btn mt-2 w-100" >Register</button>
                  <Link to= "/login" className="gap-30" >Already a Member ? Login </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
