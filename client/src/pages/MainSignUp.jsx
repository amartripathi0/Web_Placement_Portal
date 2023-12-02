import React from "react";
import SignUpCard from "../Components/SignUpCard";

function MainSignUp() {
  return (
    <div className=" flex flex-col h-[92vh]   justify-center gap-16   w-screen bg-gradient-to-r from-red-400 via-gray-300 to-blue-500">
      <h1 className="text-7xl text-center font-bold">SIGNUP📝</h1>

      <div className=" flex justify-evenly items-center ">
        <SignUpCard
          imgSrc="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/logo-design-template-35b0a3e2315d19a46c046165f315b000.jpg?ts=1592240511"
          btnLabel="Student SignUp"
          redirectRoute = "student"

        />
        <SignUpCard
          imgSrc="https://media.istockphoto.com/id/876177980/vector/university-vector.jpg?s=612x612&w=0&k=20&c=FqW7PHJFlpzTfK3ax3zPhxgTCgCnVQaPnnmTRPmdjjc="
          btnLabel="College Staff SignUp"
          redirectRoute = "college-staff"

        />
        <SignUpCard
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/American_Broadcasting_Company_Logo.svg/767px-American_Broadcasting_Company_Logo.svg.png"
          btnLabel="Company SignUp"
          redirectRoute = "company"
        />
      </div>
    </div>
  );
}

export default MainSignUp;
