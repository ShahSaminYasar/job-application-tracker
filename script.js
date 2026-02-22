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
    status: "interview",
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
    status: "interview",
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
    status: "rejected",
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
    status: "interview",
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
    status: "interview",
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
    status: "rejected",
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

function renderJobs(type = null) {
  // Update Stat Counters
  totalStat.innerText = jobs?.length;
  interviewStat.innerHTML = jobs?.filter(
    (job) => job?.status === "interview",
  )?.length;
  rejectedStat.innerHTML = jobs?.filter(
    (job) => job?.status === "rejected",
  )?.length;

  //   Render Job Cards
  const filteredJobs = type ? jobs.filter((job) => job.status === type) : jobs;

  jobCounter.innerText = type
    ? `${filteredJobs?.length} of ${jobs?.length}`
    : filteredJobs?.length;
  jobsContainer.innerHTML = "";

  for (const job of filteredJobs) {
    const jobDiv = document.createElement("div");

    jobDiv.classList = "card bg-base-100 fade";
    jobDiv.innerHTML = `
        <div class="card-body border-l-3 ${job?.status === "interview" ? "border-success/30" : job?.status === "rejected" ? "border-error/30" : "border-secondary/30"}">
            <h4 class="card-title text-lg">${job?.company}</h4>
            <p class="text-lg font-light -mt-2 text-secondary">
              ${job?.title}
            </p>

            <p
              class="flex flex-row items-center flex-wrap gap-3 text-sm font-light text-secondary"
            >
              <span>${job?.location}</span> • <span>${job?.type}</span> •
              <span>${job?.salary}</span>
            </p>

            <span class="badge badge-soft ${job?.status === "interview" ? "badge-success" : job?.status === "rejected" ? "badge-error" : "badge-warning"} mt-1 mb-1.5 capitalize"
              >${job?.status}</span
            >

            <p class="text-sm font-normal text-secondary">
              ${job?.description}
            </p>

            <div class="flex gap-2 items-center mt-2">
              <button onclick='changeStatus(${job?.id}, "interview")' class="btn btn-outline btn-success btn-sm">
                Interview
              </button>

              <button onclick='changeStatus(${job?.id}, "rejected")' class="btn btn-outline btn-error btn-sm">Rejected</button>
            </div>
        </div>
    `;

    jobsContainer.appendChild(jobDiv);
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

function changeStatus(id, status) {
  const target = jobs.find((job) => job?.id === id);
  if (!target) {
    return alert("Invalid job");
  }

  target.status = status;

  const currentTab = document.querySelector(".tab-btn.active");
  const currentTabText = currentTab?.textContent?.trim()?.toLowerCase();

  renderJobs(currentTabText === "all" ? null : currentTabText);
}
