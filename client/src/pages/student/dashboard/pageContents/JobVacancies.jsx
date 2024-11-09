import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobs,
  jobApplyByStudent,
} from "../../../../redux/features/student/utilsServices/utilSlice";
import JobCard from "../../../../components/job-card";
import StudentPageLayout from "../../../../components/layout/StudentPageLayout";

const JobVacancies = () => {
  const dispatch = useDispatch();
  const { isSuccess, isLoading, data, message } = useSelector(
    (state) => state.studentUtils
  );

  useEffect(() => {
    if (isSuccess && data) {
    } else {
      dispatch(getJobs());
    }
  }, [isSuccess, data, dispatch, message]);

  function handleJobApply(jobId) {
    dispatch(jobApplyByStudent(jobId));
  }
  if (isLoading) return <></>;

  return (
    <StudentPageLayout
      slateBgStyles={"flex flex-col gap-8 w-2/3 p-8 bg-neutral-50"}
    >
      {data &&
        data.map((eachCompany) => (
          <JobCard
            key={eachCompany.company}
            company={eachCompany}
            handleJobApply={handleJobApply}
          />
        ))}
    </StudentPageLayout>
  );
};

export default JobVacancies;
