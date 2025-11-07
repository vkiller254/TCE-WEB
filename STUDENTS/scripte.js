// Sample student data stored in an array
const students = [
  { 
    admNo: "ADM5390", 
    name: "JUMAH Alfred Breznive", 
    course: "Diploma in Automotive Engineering", 
    duration: "2.5 years", 
    expiry: "2027",
    photo: "img/5390.jpeg"
  },
  { 
    admNo: "ADM123", 
    name: "Michael Lesakale", 
    course: "Diploma in Electrical and Electronics", 
    duration: "2.5 years", 
    expiry: "2027",  // <-- comma added here
    photo: "img/123.jpeg"
  },

  { 
    admNo: "ADM546", 
    name: "Feisal Ahmed I brahim", 
    course: "Information and Communications Technology", 
    duration: "3 years", 
    expiry: "2028" ,
    photo:"img/546.jpg"
  },
  { admNo: "ADM2025-004", 
    name: "David Karanja", 
    course: "Electrical Engineering", 
    duration: "4 years", 
    expiry: "2029-06-01" 
  },
  { admNo: "ADM2025-005", 
    name: "Esther Wanjiku", 
    course: "Human Resource Management", 
    duration: "2 years", 
    expiry: "2027-03-15" 
  },
  { admNo: "ADM2025-006", 
    name: "Felix Omondi", 
    course: "Graphic Design", 
    duration: "1 year", 
    expiry: "2026-09-20" 
  },
  { admNo: "ADM2025-007", 
    name: "Grace Naliaka", 
    course: "Software Development", 
    duration: "3 years", 
    expiry: "2028-07-28" 
  },
  { admNo: "ADM2025-008", 
    name: "Hassan Abdi", 
    course: "Cyber Security", 
    duration: "2 years", 
    expiry: "2027-04-11" 
  },
  { admNo: "ADM2025-009", 
    name: "Irene Chebet", 
    course: "Business Information Technology", 
    duration: "3 years", 
    expiry: "2028-09-19" 
  },
  { admNo: "ADM2025-010", 
    name: "John Mworia", 
    course: "Computer Repair & Maintenance", 
    duration: "1 year", 
    expiry: "2026-12-02" 
  },
  { admNo: "ADM2025-011", 
    name: "Kevin Kimani", 
    course: "Networking and Systems", 
    duration: "2 years", 
    expiry: "2027-08-14" 
  },
  { admNo: "ADM2025-012", 
    name: "Linda Oduor", 
    course: "Accounting and Finance", 
    duration: "3 years", 
    expiry: "2028-05-27" 
  },
  { admNo: "ADM2025-013", 
    name: "Mohamed Noor", 
    course: "Database Administration", 
    duration: "2 years", 
    expiry: "2027-06-18" 
  },
  { admNo: "ADM2025-014", 
    name: "Naomi Wairimu", 
    course: "Front-End Development", 
    duration: "1 year", 
    expiry: "2026-11-04" 
  },
  { admNo: "ADM2025-015", 
    name: "Oscar Kiprotich", 
    course: "Electrical Installation", 
    duration: "3 years", 
    expiry: "2028-02-22" 
  },
  { admNo: "ADM2025-016", 
    name: "Patricia Anyango", 
    course: "Entrepreneurship", 
    duration: "2 years", 
    expiry: "2027-03-09" 
  },
  { admNo: "ADM2025-017", 
    name: "Quincy Barasa", 
    course: "Mechanical Engineering", 
    duration: "4 years", 
    expiry: "2029-01-31" 
  },
  { admNo: "ADM2025-018", 
    name: "Ruth Kamau", 
    course: "Digital Marketing", 
    duration: "1 year", 
    expiry: "2026-08-25" 
  },
  { admNo: "ADM2025-019", 
    name: "Samuel Maina", 
    course: "Data Science", 
    duration: "3 years", 
    expiry: "2028-10-05" 
  },
  { admNo: "ADM2025-020", 
    name: "Terry Atieno", 
    course: "Photography and Videography", 
    duration: "1 year", 
    expiry: "2026-12-29" 
  }
];


// DOM refs
const input = document.getElementById("admInput");
const btn = document.getElementById("searchBtn");
const resultArea = document.getElementById("resultArea");

// Utility: clear results
function clearResult() {
  resultArea.innerHTML = "";
}

// Utility: format date to readable form
function formatDate(iso) {
  try {
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    // e.g. 31 Aug 2028
    return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

// Build success card
// Build success card
function renderCard(student) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="photo">
      <img src="${escapeHtml(student.photo)}" alt="${escapeHtml(student.name)}" />
    </div>

    <div class="meta">
      <div class="label">Name</div>
      <div class="value">${escapeHtml(student.name)}</div>
      <div class="details">
        <div class="detail-item">
          <div class="label">Admission</div>
          <div class="value">${escapeHtml(student.admNo)}</div>
        </div>
        <div class="detail-item">
          <div class="label">Course</div>
          <div class="value">${escapeHtml(student.course)}</div>
        </div>
        <div class="detail-item">
          <div class="label">Duration</div>
          <div class="value">${escapeHtml(student.duration)}</div>
        </div>
        <div class="detail-item">
          <div class="label">Expiry</div>
          <div class="value">${formatDate(student.expiry)}</div>
        </div>
      </div>
    </div>

    <div class="actions">
      <button type="button" class="copyBtn" data-adm="${escapeHtml(student.admNo)}" title="Copy Admission Number">
        <i class="fa fa-copy"></i> Copy ID
      </button>
      <small class="copy-feedback">Copied!</small>
    </div>
  `;

  // Handle copy animation
  const copyBtn = card.querySelector(".copyBtn");
  const feedback = card.querySelector(".copy-feedback");
  copyBtn.addEventListener("click", (e) => {
    const id = e.currentTarget.dataset.adm;
    navigator.clipboard?.writeText(id).then(() => {
      feedback.style.opacity = "1";
      feedback.style.transform = "translateY(-4px)";
      setTimeout(() => {
        feedback.style.opacity = "0";
        feedback.style.transform = "translateY(0)";
      }, 1200);
    });
  });

  return card;
}

// Build error card
function renderError(query) {
  const card = document.createElement("div");
  card.className = "card error";
  card.innerHTML = `
    <div class="meta">
      <div class="label">No record found</div>
      <div class="value">Admission: ${escapeHtml(query)}</div>
      <div style="margin-top:10px;color:#6a2c32">Check the admission number and try again.</div>
    </div>
    <div class="actions">
      <small>Not found</small>
      <button type="button" class="clearBtn">Clear</button>
    </div>
  `;
  card.querySelector(".clearBtn").addEventListener("click", () => {
    clearResult();
    input.value = "";
    input.focus();
  });
  return card;
}

// Simple html escape
function escapeHtml(str = "") {
  return String(str).replace(/[&<>"']/g, function (s) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[s];
  });
}

// Search logic
function findStudent(q) {
  if (!q) return null;
  const norm = q.trim().toLowerCase();

  return students.find(s => 
    (s.admNo && s.admNo.toLowerCase() === norm) ||
    (s.name && s.name.toLowerCase() === norm)
  );
}

// Main search flow
function doSearch() {
  const q = input.value || "";
  clearResult();

  if (!q.trim()) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "Enter an admission number and click Search.";
    resultArea.appendChild(empty);
    input.focus();
    return;
  }

  const found = findStudent(q);
  if (found) resultArea.appendChild(renderCard(found));
  else resultArea.appendChild(renderError(q));
}

// Event listeners
btn.addEventListener("click", doSearch);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") doSearch();
});
input.addEventListener("input", () => {
  // clear previous results as the user types
  if (resultArea.firstChild) clearResult();
});
