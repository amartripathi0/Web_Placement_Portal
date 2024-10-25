import React from 'react';

export default function JobCard({ company, handleJobApply }) {
  return (
    <div className="bg-zinc-300 w-full p-6 gap-5 flex flex-col rounded-lg shadow-md hover:bg-zinc-400 transition-all">
      <div className="flex justify-between items-center px-4">
        <h1 className="bg-white p-3 rounded-md text-sm">
          Company Name: <span className="font-bold">{company.company}</span>
        </h1>
      </div>
      <div className="bg-white flex flex-col justify-around gap-6 rounded-lg p-6">
        {company.jobs.map((eachJob, index) => (
          <div key={eachJob._id} className="flex items-center justify-between w-full border border-neutral-600 rounded hover:-translate-y-1 duration-150 p-4 transition-all hover:bg-blue-100 hover:shadow-lg shadow-sm">
            <div className="flex w-full h-14">
              <div className="flex-col flex w-1/2 justify-between">
                <div className="flex gap-3 items-center">
                  <h1 className="text-sm">Job Role:</h1>
                  <span className="font-semibold text-sm">{eachJob.role}</span>
                </div>

                <div className="flex gap-3 items-center">
                  <h1 className="text-sm">Qualifications:</h1>
                  <div className="flex flex-wrap">
                    {eachJob.qualifications.map((qual, idx) => (
                      <span key={idx} className="font-semibold text-sm mr-2">{qual}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-col flex w-1/2 justify-between">
                <div className="flex gap-3 items-center">
                  <h1 className="text-sm">End Date:</h1>
                  <span className="font-semibold text-sm">{eachJob.applicationDeadline.split("T")[0]}</span>
                </div>

                <div className="flex gap-3 items-center">
                  <h1 className="text-sm">Start Date:</h1>
                  <span className="font-semibold text-sm">{eachJob.startDate.split("T")[0]}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleJobApply(eachJob._id)}
              className="w-32 text-sm font-semibold text-white bg-cyan-500 hover:bg-cyan-600 p-2 rounded-lg flex items-center justify-center"
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
