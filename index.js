document.getElementById("refresh-btn").addEventListener("click", refreshPage);

function refreshPage() {
  window.location.href = "index.html";
}

const menubarIcon = document.getElementById("Menubar");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

menubarIcon.addEventListener("click", function () {
  sidebar.classList.add("active");
  overlay.style.display = "block"; // Display the overlay
  document.body.classList.add("no-scroll");
});

function closeSidebar() {
  sidebar.classList.remove("active");
  overlay.style.display = "none"; // Hide the overlay
  document.body.classList.remove("no-scroll");
}

document.addEventListener("click", function (event) {
  if (!sidebar.contains(event.target) && !menubarIcon.contains(event.target)) {
    closeSidebar();
  }
});

// Close sidebar when overlay is clicked
overlay.addEventListener("click", closeSidebar);

function switchSidebarSection(section) {
  // Define all section names in lowercase
  const sections = ["home", "ladies", "men", "kids"];

  sections.forEach(name => {
    // Section and image elements
    const sectionEl = document.getElementById(`${name}-section`);
    const imageEl = document.getElementById(`${name}-images`);

    // If this is the one clicked, activate it; otherwise, hide it
    if (name.toUpperCase() === section) {
      sectionEl.classList.add("active");
      imageEl.classList.add("active");
    } else {
      sectionEl.classList.remove("active");
      imageEl.classList.remove("active");
    }
  });
}


// Admin sidebar functionality
function openAdminSidebar() {
  const adminSidebar = document.getElementById("adminSidebar");
  if (adminSidebar) {
    adminSidebar.classList.add("active");
    document.body.style.overflow = 'hidden';
  }
}

function closeAdminSidebar() {
  const adminSidebar = document.getElementById("adminSidebar");
  if (adminSidebar) {
    adminSidebar.classList.remove("active");
    document.body.style.overflow = 'auto';
  }
}

// DOM ready actions
document.addEventListener('DOMContentLoaded', () => {
  const adminIcon = document.getElementById('Admin');
  const adminSidebar = document.getElementById('adminSidebar');

  if (adminIcon && adminSidebar) {
    adminIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      openAdminSidebar();
    });

    adminSidebar.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
      if (!adminSidebar.contains(e.target) && !adminIcon.contains(e.target)) {
        closeAdminSidebar();
      }

    });
  }})

    // Redirect to signup page
  const account = document.querySelector(".create-account");
  if (account) {
    account.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "signup.html";
    });
  }
document.addEventListener('DOMContentLoaded', () => {
  const searchBox = document.querySelector('.search-box');
  if (searchBox) {
    searchBox.addEventListener('click', () => {
      window.location.href = 'search.html';
    });
  }
});





