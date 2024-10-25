import React, { useEffect } from "react";
import InputWithEdit from "../../../../components/inputField/InputWithEdit";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import {
  RESET,
  getUserData,
  updateProfileDetail,
} from "../../../../redux/features/student/auth/authSlice";
import UserLayout from "../../../../components/layout/UserLayout";
import FormField from "../../../../components/containers/FormField";
import Label from "../../../../components/label";
import Button from "../../../../components/buttons/Button";
import SlateBackground from "../../../../components/containers/SlateBackground";
import ProjectCard from "../../../../components/project-card";

const Project = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, isLoggedIn, message, student } =
    useSelector((state) => state.studentAuth);
  const globalAuth = useSelector((state) => state.globalAuth);
  const studentUtil = useSelector((state) => state.studentUtils);

  const form = useForm();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = form;

  function handleUploadProjectDetails(data) {
    const projectData = { typ: "projects", value: data };
    // console.log(projectData);
    dispatch(updateProfileDetail(projectData));

    dispatch(RESET());
  }

  useEffect(() => {
    if (globalAuth.isLoggedIn) {
      dispatch(getUserData());

      dispatch(RESET());
    }
  }, [globalAuth.isLoggedIn]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });

      dispatch(getUserData());
    }
  }, [updateProfileDetail, isSuccess, dispatch]);
  return (
    <UserLayout
      slateBgStyles={"gap-20 p-10 "}
      purpleBgStyles={"justify-start flex-col gap-20"}
    >
      <form
        onSubmit={handleSubmit(handleUploadProjectDetails)}
        className="flex flex-col items-center p-8 mx-auto bg-white gap-4 rounded-md w-2/3 shadow-grey-300 shadow-md"
      >
        <h3 className="text-xl font-medium">Project Form</h3>

        <div className="flex flex-wrap gap-4 justify-between">
          <FormField additionalStyles={"max-w-[48%]"}>
            <Label>Project Title</Label>
            <InputWithEdit
              type="text"
              placeholder="Project Title"
              validationObj={{
                ...register("title", {
                  required: {
                    value: true,
                    message: "Please enter the Project Title.",
                  },
                }),
              }}
              error={errors.title?.message}
            />
          </FormField>
          <FormField additionalStyles={"max-w-[48%]"}>
            <Label> Project Link</Label>
            <InputWithEdit
              type="text"
              placeholder="Project Link"
              validationObj={{
                ...register("link", {
                  required: {
                    value: true,
                    message: "Please enter your link of your project.",
                  },
                }),
              }}
              error={errors.link?.message}
            />
          </FormField>
          <FormField additionalStyles={"max-w-[48%]"}>
            <Label> Project Duration</Label>
            <InputWithEdit
              type="text"
              placeholder="Project Duration"
              validationObj={{
                ...register("duration", {
                  required: {
                    value: true,
                    message: "Please enter the total Project duration.",
                  },
                }),
              }}
              error={errors.duration?.message}
            />
          </FormField>
          <FormField additionalStyles={"max-w-[48%]"}>
            <Label> Description</Label>
            <InputWithEdit
              type="text"
              placeholder="Project Description."
              validationObj={{
                ...register("description", {
                  required: {
                    value: true,
                    message: "Please enter your internship experience.",
                  },
                }),
              }}
              error={errors.description?.message}
            />
          </FormField>

          <Button
            type={"submit"}
            color={"pink"}
            label={"Save Details"}
            additionalStyles={
              "w-40 mt-4 mx-auto max-sm:w-10/12 max-sm:text-xs max-sm:p-3  "
            }
          />
        </div>
      </form>

      {student?.pastInternshipsProjects.projects.length > 0 ? (
        <SlateBackground
          additionalStyles={
            "flex flex-col gap-6 w-full justify-center items-center mt-10 bg-neutral-50 p-6 w-4/5 mx-auto"
          }
        >
          {student?.pastInternshipsProjects.projects.map((eachProject) => (
            <ProjectCard
              key={nanoid()}
              index={
                student.pastInternshipsProjects.projects.indexOf(eachProject) +
                1
              }
              link={eachProject.link}
              title={eachProject.title}
              duration={eachProject.duration}
              description={eachProject.description}
            />
          ))}
        </SlateBackground>
      ) : (
        <div className={"bg-neutral-50 mt-10 w-2/3 mx-auto p-10 flex-center "}>
          You don't have any project. Please fill up above form to add one.
        </div>
      )}
    </UserLayout>
  );
};

export default Project;
