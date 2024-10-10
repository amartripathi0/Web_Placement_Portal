import React from "react";
import { FaGithub } from "react-icons/fa6";
import { projectDetails } from "../../constants";
import SocialHandles from "../../components/social-handles";

const About = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-200  to-pink-300 min-h-screen pt-28 pb-10 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className=" bg-neutral-950 bg-opacity-90 py-10 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">
            {projectDetails.projectTitle}
          </h1>
        </div>

        <div className="p-8">
          <p className="text-gray-600 mb-6">{projectDetails.projectBio}</p>

          <div className="flex space-x-4 mb-8">
            <a
              href={projectDetails.projectGithubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700"
            >
              <FaGithub className="mr-2" /> Project GitHub 
              
            </a>
            <SocialHandles/>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {projectDetails.projectTools.map((tool, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-6 mt-8">
            <p className="text-gray-700">
              {projectDetails.projectDetail.topPara}
            </p>
            {projectDetails.projectDetail.parasArray.map((para, index) => (
              <p key={index} className="text-gray-700">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
