$(document).ready(function() {
    // Initialize jQuery UI Accordion
    $("#hobbies-accordion").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content"
    });

    // Initialize jQuery UI Datepicker
    $("#date").datepicker({
        dateFormat: "yy-mm-dd",
        minDate: 0
    });

    // Toggle Fun Facts
    let factsVisible = false;
    $("#toggle-facts").click(function() {
        factsVisible = !factsVisible;
        const factsContainer = $("#facts-container");
        if (factsVisible) {
            factsContainer.slideDown(300, function() {
                $(this).css('display', 'block');
            });
            $(this).text("Hide Fun Facts");
        } else {
            factsContainer.slideUp(300);
            $(this).text("Show Fun Facts");
        }
    });

    // Contact Form Validation and Submission
    $("#contactForm").submit(function(e) {
        e.preventDefault();
        
        // Get form values
        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const message = $("#message").val().trim();
        const date = $("#date").val();

        // Validation
        if (!name || !email || !message) {
            showMessage("Please fill in all required fields", "error");
            return;
        }

        if (!isValidEmail(email)) {
            showMessage("Please enter a valid email address", "error");
            return;
        }

        // Simulate form submission
        setTimeout(() => {
            showMessage("Message sent successfully!", "success");
            $("#contactForm")[0].reset();
        }, 1000);
    });

    // GitHub Profile Data
    fetchGitHubProfile();

    // Event Delegation for List Items
    $("#facts-container").on("click", "li", function() {
        $(this).toggleClass("bg-[#2a2a2a]");
    });

    // Hobbies Toggle
    let hobbiesVisible = false;
    $("#toggle-hobbies").click(function() {
        hobbiesVisible = !hobbiesVisible;
        const hobbiesContainer = $("#hobbies-container");
        if (hobbiesVisible) {
            hobbiesContainer.slideDown(300, function() {
                $(this).css('display', 'block');
            });
            $(this).text("Hide Hobbies");
        } else {
            hobbiesContainer.slideUp(300);
            $(this).text("Show Hobbies");
        }
    });

    // Contact Form Toggle with smooth transition
    let contactVisible = false;
    document.addEventListener('DOMContentLoaded', function() {
        const contactToggle = document.getElementById('toggle-contact');
        if (contactToggle) {
            contactToggle.addEventListener('click', function() {
                contactVisible = !contactVisible;
                const contactContainer = document.getElementById('contact-container');
                const button = document.getElementById('toggle-contact');
                
                if (contactVisible) {
                    contactContainer.classList.remove('hidden');
                    contactContainer.style.maxHeight = contactContainer.scrollHeight + "px";
                    button.textContent = 'Hide Contact Form';
                } else {
                    contactContainer.style.maxHeight = "0";
                    setTimeout(() => {
                        contactContainer.classList.add('hidden');
                    }, 300);
                    button.textContent = 'Show Contact Form';
                }
            });
        }
    });

    // GitHub Profile Toggle with smooth transition
    let githubVisible = false;
    document.addEventListener('DOMContentLoaded', function() {
        const githubToggle = document.getElementById('toggle-github');
        if (githubToggle) {
            githubToggle.addEventListener('click', function() {
                githubVisible = !githubVisible;
                const githubContainer = document.getElementById('github-container');
                const button = document.getElementById('toggle-github');
                
                if (githubVisible) {
                    githubContainer.classList.remove('hidden');
                    githubContainer.style.maxHeight = githubContainer.scrollHeight + "px";
                    button.textContent = 'Hide Profile';
                } else {
                    githubContainer.style.maxHeight = "0";
                    setTimeout(() => {
                        githubContainer.classList.add('hidden');
                    }, 300);
                    button.textContent = 'Show Profile';
                }
            });
        }
    });

    // Click effects for containers
    document.addEventListener('DOMContentLoaded', function() {
        const factsContainer = document.getElementById('facts-container');
        if (factsContainer) {
            factsContainer.addEventListener('click', function(e) {
                if (e.target.tagName === 'LI') {
                    e.target.classList.toggle('bg-[#2a2a2a]');
                }
            });
        }

        const hobbiesContainer = document.getElementById('hobbies-container');
        if (hobbiesContainer) {
            hobbiesContainer.addEventListener('click', function(e) {
                if (e.target.tagName === 'LI') {
                    e.target.classList.toggle('bg-[#2a2a2a]');
                }
            });
        }

        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // Add your form submission logic here
                alert('Message sent successfully!');
                this.reset();
            });
        }
    });
});

// Helper Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    const messageClass = type === "success" ? "success-message" : "error-message";
    const $message = $(`<div class="${messageClass}">${message}</div>`);
    
    $("body").append($message);
    $message.fadeIn();

    setTimeout(() => {
        $message.fadeOut(() => {
            $message.remove();
        });
    }, 3000);
}

function fetchGitHubProfile() {
    // Using JSONPlaceholder API for demonstration
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/users/1",
        method: "GET",
        success: function(data) {
            // Update Name card
            $("#github-data").find("div:nth-child(1) p").text(data.name);
            
            // Update Username card
            $("#github-data").find("div:nth-child(2) p").text(data.username);
            
            // Update Email card
            $("#github-data").find("div:nth-child(3) p").text(data.email);
            
            // Update Website card
            const websiteLink = $("#github-data").find("div:nth-child(4) a");
            websiteLink.attr("href", `http://${data.website}`);
            websiteLink.text(data.website);
            
            // Update Company card
            $("#github-data").find("div:nth-child(5) p").text(data.company.name);
        },
        error: function() {
            $("#github-data").html(`
                <div class="col-span-2 p-6 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    Failed to load profile data. Please try again later.
                </div>
            `);
        }
    });
}

// Toggle text functionality
function toggleText() {
    const fullText = document.getElementById('fullText');
    const button = document.getElementById('readMoreBtn');
    
    if (fullText.style.display === 'none') {
        fullText.style.display = 'inline';
        button.textContent = 'Show Less';
    } else {
        fullText.style.display = 'none';
        button.textContent = 'Read More';
    }
}

// Fun Facts Toggle with smooth transition
let factsVisible = false;
document.addEventListener('DOMContentLoaded', function() {
    const factsToggle = document.getElementById('toggle-facts');
    const factsContainer = document.getElementById('facts-container');
    if (factsToggle && factsContainer) {
        factsToggle.addEventListener('click', function() {
            factsVisible = !factsVisible;
            if (factsVisible) {
                factsContainer.classList.remove('hidden');
                factsContainer.style.maxHeight = factsContainer.scrollHeight + "px";
                factsToggle.textContent = 'Hide Fun Facts';
            } else {
                factsContainer.style.maxHeight = "0";
                setTimeout(() => {
                    factsContainer.classList.add('hidden');
                }, 300);
                factsToggle.textContent = 'Show Fun Facts';
            }
        });
    }
});

// Hobbies Toggle with smooth transition
let hobbiesVisible = false;
document.addEventListener('DOMContentLoaded', function() {
    const hobbiesToggle = document.getElementById('toggle-hobbies');
    if (hobbiesToggle) {
        hobbiesToggle.addEventListener('click', function() {
            hobbiesVisible = !hobbiesVisible;
            const hobbiesContainer = document.getElementById('hobbies-container');
            const button = document.getElementById('toggle-hobbies');
            
            if (hobbiesVisible) {
                hobbiesContainer.classList.remove('hidden');
                hobbiesContainer.style.maxHeight = hobbiesContainer.scrollHeight + "px";
                button.textContent = 'Hide Hobbies';
            } else {
                hobbiesContainer.style.maxHeight = "0";
                setTimeout(() => {
                    hobbiesContainer.classList.add('hidden');
                }, 300);
                button.textContent = 'Show Hobbies';
            }
        });
    }
});

// Contact Form Toggle with smooth transition
let contactVisible = false;
document.addEventListener('DOMContentLoaded', function() {
    const contactToggle = document.getElementById('toggle-contact');
    if (contactToggle) {
        contactToggle.addEventListener('click', function() {
            contactVisible = !contactVisible;
            const contactContainer = document.getElementById('contact-container');
            const button = document.getElementById('toggle-contact');
            
            if (contactVisible) {
                contactContainer.classList.remove('hidden');
                contactContainer.style.maxHeight = contactContainer.scrollHeight + "px";
                button.textContent = 'Hide Contact Form';
            } else {
                contactContainer.style.maxHeight = "0";
                setTimeout(() => {
                    contactContainer.classList.add('hidden');
                }, 300);
                button.textContent = 'Show Contact Form';
            }
        });
    }
});

// GitHub Profile Toggle with smooth transition
let githubVisible = false;
document.addEventListener('DOMContentLoaded', function() {
    const githubToggle = document.getElementById('toggle-github');
    if (githubToggle) {
        githubToggle.addEventListener('click', function() {
            githubVisible = !githubVisible;
            const githubContainer = document.getElementById('github-container');
            const button = document.getElementById('toggle-github');
            
            if (githubVisible) {
                githubContainer.classList.remove('hidden');
                githubContainer.style.maxHeight = githubContainer.scrollHeight + "px";
                button.textContent = 'Hide Profile';
            } else {
                githubContainer.style.maxHeight = "0";
                setTimeout(() => {
                    githubContainer.classList.add('hidden');
                }, 300);
                button.textContent = 'Show Profile';
            }
        });
    }
});

// Click effects for containers
document.addEventListener('DOMContentLoaded', function() {
    const factsContainer = document.getElementById('facts-container');
    if (factsContainer) {
        factsContainer.addEventListener('click', function(e) {
            if (e.target.tagName === 'LI') {
                e.target.classList.toggle('bg-[#2a2a2a]');
            }
        });
    }

    const hobbiesContainer = document.getElementById('hobbies-container');
    if (hobbiesContainer) {
        hobbiesContainer.addEventListener('click', function(e) {
            if (e.target.tagName === 'LI') {
                e.target.classList.toggle('bg-[#2a2a2a]');
            }
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Message sent successfully!');
            this.reset();
        });
    }
}); 