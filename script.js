// <!-- login section -->
function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}

function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    // Ensure the registerForm exists before adding the event listener
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, password })
                });

                if (response.ok) {
                    alert('Registration successful! Please login.');
                    showLogin();
                } else {
                    const data = await response.json();
                    alert(data.message || 'Registration failed.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during registration.');
            }
        });
    }

    // Ensure the login form exists before adding the event listener
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');

            // Check if the inputs exist before accessing their values
            if (emailInput && passwordInput) {
                const email = emailInput.value;
                const password = passwordInput.value;

                try {
                    const response = await fetch('/api/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        // Store the token in localStorage
                        localStorage.setItem('token', data.token);
                        // Redirect to dashboard or home page
                        window.location.href = '/dashboard';
                    } else {
                        alert('Login failed. Please check your credentials.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred during login.');
                }
            } else {
                console.error('Email or password input not found.');
            }
        });
    }

    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');

            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            burger.classList.toggle('toggle');
        });
    };

    navSlide();

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const ctaButtons = document.querySelectorAll('.cta-button');

    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Fetch and display jobs
    fetch('/api/jobs')
        .then(response => response.json())
        .then(jobs => {
            const jobList = document.getElementById('job-list');
            jobs.forEach(job => {
                const jobCard = document.createElement('div');
                jobCard.className = 'card';
                jobCard.innerHTML = `
                    <h3>${job.title}</h3>
                    <p><strong>Company:</strong> ${job.company}</p>
                    <p>${job.description}</p>
                    <p><strong>Budget:</strong> ${job.budget}</p>
                    <p><strong>Skills:</strong> ${job.skills.join(', ')}</p>
                    <button onclick="applyForJob(${job.id})">Apply Now</button>
                `;
                jobList.appendChild(jobCard);
            });
        });

    // Fetch and display talents
    fetch('/api/talents')
        .then(response => response.json())
        .then(talents => {
            const talentList = document.getElementById('talent-list');
            talents.forEach(talent => {
                const talentCard = document.createElement('div');
                talentCard.className = 'card';
                talentCard.innerHTML = `
                    <h3>${talent.name}</h3>
                    <p><strong>Title:</strong> ${talent.title}</p>
                    <p>${talent.description}</p>
                    <p><strong>Hourly Rate:</strong> ${talent.hourlyRate}</p>
                    <p><strong>Skills:</strong> ${talent.skills.join(', ')}</p>
                    <button onclick="hireTalent(${talent.id})">Hire Now</button>
                `;
                talentList.appendChild(talentCard);
            });
        });

    // Fetch and display dashboard data
    fetch('/api/dashboard')
        .then(response => response.json())
        .then(data => {
            document.getElementById('active-jobs').textContent = data.activeJobs;
            document.getElementById('completed-projects').textContent = data.completedProjects;
            document.getElementById('total-earnings').textContent = `$${data.totalEarnings}`;
        });
});

function applyForJob(jobId) {
    console.log(`Applying for job ${jobId}`);
    // Implement job application logic here
}

function hireTalent(talentId) {
    console.log(`Hiring talent ${talentId}`);
    // Implement talent hiring logic here
}

