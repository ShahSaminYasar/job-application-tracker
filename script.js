const jobs = [
  {
    id: 1,
    company: "Mobile First Corp.",
    title: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    status: "not applied",
    description:
      "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
  },
  {
    id: 2,
    company: "CloudScale Labs",
    title: "Frontend Engineer",
    location: "New York, NY",
    type: "Full-time",
    salary: "$115,000 - $145,000",
    status: "not applied",
    description:
      "Develop modern web applications using React and TypeScript. Collaborate closely with design and backend teams.",
  },
  {
    id: 3,
    company: "FinEdge Solutions",
    title: "Backend Developer (Node.js)",
    location: "San Francisco, CA",
    type: "Part-time",
    salary: "$140,000 - $165,000",
    status: "not applied",
    description:
      "Design and maintain scalable REST APIs and microservices powering financial products.",
  },
  {
    id: 4,
    company: "PixelCraft Studio",
    title: "UI/UX Designer",
    location: "Remote",
    type: "Contract",
    salary: "$70/hr - $90/hr",
    status: "not applied",
    description:
      "Create intuitive user interfaces and experiences for SaaS products with a strong focus on usability.",
  },
  {
    id: 5,
    company: "DataBridge Inc.",
    title: "Full Stack Developer",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    status: "not applied",
    description:
      "Work across the stack using React, Node.js, and PostgreSQL to deliver high-quality enterprise solutions.",
  },
  {
    id: 6,
    company: "NextGen AI",
    title: "Machine Learning Engineer",
    location: "Boston, MA",
    type: "Part-time",
    salary: "$150,000 - $185,000",
    status: "not applied",
    description:
      "Build and deploy machine learning models into production environments with a focus on scalability.",
  },
  {
    id: 7,
    company: "SecureNet Systems",
    title: "DevOps Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$125,000 - $155,000",
    status: "not applied",
    description:
      "Manage CI/CD pipelines, cloud infrastructure, and deployment automation using AWS and Docker.",
  },
  {
    id: 8,
    company: "BrightStart EdTech",
    title: "Product Manager",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$110,000 - $135,000",
    status: "not applied",
    description:
      "Lead cross-functional teams to define, build, and launch impactful education technology products.",
  },
];

const jobsContainer = document.getElementById("jobs-container");
const jobCounter = document.getElementById("job-counter");
const totalStat = document.getElementById("stat-total");
const interviewStat = document.getElementById("stat-interview");
const rejectedStat = document.getElementById("stat-rejected");
const tabButtons = document.querySelectorAll(".tab-btn");
const tabBtnAll = document.getElementById("tab-btn-all");
const tabBtnInterview = document.getElementById("tab-btn-interview");
const tabBtnRejected = document.getElementById("tab-btn-rejected");

document.addEventListener("DOMContentLoaded", () => {
  renderJobs();
});

jobsContainer.addEventListener("click", function (e) {
  const actionBtn = e.target.closest(".action-btn");
  const deleteBtn = e.target.closest(".delete-btn");

  if (actionBtn) {
    const id = actionBtn.dataset.id;
    const status = actionBtn.dataset.status;
    changeStatus(Number(id), status);
  } else if (deleteBtn) {
    const id = deleteBtn.dataset.id;
    deleteJob(Number(id));
  }
});

tabButtons.forEach((tabButton) =>
  tabButton.addEventListener("click", (e) => {
    const dataStatus = e.target.dataset.status;
    setTab(dataStatus);
  }),
);

function renderJobs(type = null) {
  // Update Stat Counters
  totalStat.innerText = jobs.length;
  interviewStat.innerHTML = jobs.filter(
    (job) => job.status === "interview",
  ).length;
  rejectedStat.innerHTML = jobs.filter(
    (job) => job.status === "rejected",
  ).length;

  //   Render Job Cards
  const filteredJobs = type ? jobs.filter((job) => job.status === type) : jobs;

  jobCounter.innerText = type
    ? `${filteredJobs.length} of ${jobs.length}`
    : filteredJobs.length;
  jobsContainer.innerHTML = "";

  if (filteredJobs.length > 0) {
    for (const job of filteredJobs) {
      const jobDiv = document.createElement("div");
      jobDiv.classList = "card bg-base-100 card-border fade overflow-hidden";
      jobDiv.innerHTML = `
        <div class="card-body border-l-[3px] ${job.status === "interview" ? "border-success/40" : job.status === "rejected" ? "border-error/40" : "border-secondary/40"}">
            <div class="flex items-center justify-between gap-3">
                <h4 class="card-title text-lg">${job.company}</h4>

                <button data-id="${job.id}" class="btn btn-circle btn-outline btn-sm btn-error delete-btn"><i class="fa-regular fa-trash-can"></i></button>
            </div>

            <p class="text-sm md:text-lg font-light -mt-2 md:-mt-3 text-secondary">
              ${job.title}
            </p>

            <p
              class="flex flex-row items-center flex-wrap gap-3 text-xs md:text-sm font-light text-secondary"
            >
              <span>${job.location}</span> • <span>${job.type}</span> •
              <span>${job.salary}</span>
            </p>

            <span class="badge badge-soft text-xs md:text-sm ${job.status === "interview" ? "badge-success" : job.status === "rejected" ? "badge-error" : "badge-warning"} mt-1 mb-1.5 uppercase"
              >${job.status}</span
            >

            <p class="text-xs md:text-sm font-normal text-secondary">
              ${job.description}
            </p>

            <div class="flex gap-2 items-center mt-2">
              ${
                job.status !== "interview"
                  ? `<button data-id='${job.id}' data-status='interview' class="btn btn-outline btn-success btn-xs md:btn-sm uppercase action-btn">
                Interview
              </button>`
                  : ""
              }
              
              ${
                job.status !== "rejected"
                  ? `<button data-id='${job.id}' data-status='rejected' class="btn btn-outline btn-error btn-xs md:btn-sm uppercase action-btn">Rejected</button>`
                  : ""
              }
            </div>
        </div>
    `;
      jobsContainer.appendChild(jobDiv);
    }
  } else {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList = "card bg-base-100 fade";
    emptyDiv.innerHTML = `
    <div class="card-body items-center gap-1 py-25">
        <img
        src="./job-icon.png"
        alt="File Icon"
        class="w-full max-w-[60px] mb-3"
        />
        <h6 class="card-title text-lg">No Jobs Available</h6>
        <p class="text-xs md:text-sm font-normal text-secondary">
        Check back soon for new job opportunities
        </p>
    </div>`;
    jobsContainer.appendChild(emptyDiv);
  }
}

function setTab(tab) {
  tabButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

  switch (tab) {
    case "all":
      tabBtnAll.classList.add("active");
      renderJobs();
      break;

    case "interview":
      tabBtnInterview.classList.add("active");
      renderJobs("interview");
      break;

    case "rejected":
      tabBtnRejected.classList.add("active");
      renderJobs("rejected");
      break;

    default:
      break;
  }
}

function getCurrentTab() {
  const currentTab = document.querySelector(".tab-btn.active");
  const currentTabText = currentTab.dataset.status;
  return currentTabText;
}

function changeStatus(id, status) {
  const target = jobs.find((job) => job.id === id);
  if (!target) {
    return alert("Invalid job");
  }

  if (
    confirm(
      `Are you sure to change the status of the job "${target.company} - ${target.title}" to ${status}?`,
    )
  ) {
    target.status = status;
    const currentTab = getCurrentTab();
    renderJobs(currentTab === "all" ? null : currentTab);
  }
}

function deleteJob(id) {
  const target = jobs.find((job) => job.id === id);

  if (!target) {
    return alert("Invalid ID");
  }

  if (
    confirm(
      `Are your sure you want to delete the job "${target.company} - ${target.title}"? This action CANNOT be undone!`,
    )
  ) {
    const targetIndex = jobs.indexOf(target);
    jobs.splice(targetIndex, 1);
    const currentTab = getCurrentTab();
    renderJobs(currentTab === "all" ? null : currentTab);
  }
}
