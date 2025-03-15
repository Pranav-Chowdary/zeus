document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signupForm");

    // Email Validation: Check Format and Trusted Domains (for Recruiters)
    form.addEventListener("submit", (event) => {
        const userType = document.getElementById("userType").value;
        const email = document.getElementById("email").value;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            event.preventDefault();
            return;
        }

        if (userType === "recruiter") {
            const trustedDomains = ["companydomain.com", "officialdomain.com"];
            const emailDomain = email.split("@")[1];

            if (!trustedDomains.includes(emailDomain)) {
                alert("Please use an official company email address.");
                event.preventDefault();
                return;
            }
        }

        // Password Validation: Ensure Passwords Match
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            event.preventDefault();
        }
    });

    // GSAP Animations for Title and Form Elements
    gsap.from(".animated-title", {
        duration: 1.2,
        y: -50,
        opacity: 0,
        ease: "bounce.out"
    });

    gsap.from("fieldset", {
        duration: 1,
        x: -50,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out"
    });

    // GSAP Animations for Buttons
    const buttons = document.querySelectorAll(".role-button, button");
    gsap.from(buttons, {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        stagger: 0.3,
        ease: "elastic.out(1, 0.3)"
    });

    buttons.forEach((button) => {
        // Hover Effects for Buttons
        button.addEventListener("mouseenter", () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1.1,
                backgroundColor: "#005f8d",
                color: "#fff"
            });
        });

        button.addEventListener("mouseleave", () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1,
                backgroundColor: "#0073b1",
                color: "#fff"
            });
        });
    });

    // Redirect Role Buttons to Appropriate Pages
    const jobSeekerBtn = document.getElementById("jobSeekerBtn");
    const recruiterBtn = document.getElementById("recruiterBtn");

    if (jobSeekerBtn) {
        jobSeekerBtn.addEventListener("click", () => {
            location.href = jobSeekerBtn.dataset.url;
        });
    }

    if (recruiterBtn) {
        recruiterBtn.addEventListener("click", () => {
            location.href = recruiterBtn.dataset.url;
        });
    }

    // PAN Verification Logic
    const verifyPanButton = document.getElementById("verifyPanButton");
    const businessPancardInput = document.getElementById("businessPancard");
    const verificationStatus = document.getElementById("verificationStatus");
    const companyDetails = document.getElementById("companyDetails");
    const submitButton = document.querySelector(".animated-submit");

    // Handle PAN Verification Button Click
    verifyPanButton.addEventListener("click", () => {
        const panNumber = businessPancardInput.value.trim();

        if (!panNumber) {
            verificationStatus.textContent = "Please enter a PAN number to verify.";
            verificationStatus.style.color = "red";
            shakeElement(businessPancardInput);
            return;
        }

        // Predefined PAN Data for Testing
        const panDatabase = {
            "U74900UP2011PTC045365": "Google",
            "U74899DL1988PTC032549": "Microsoft",
            "L22210MH1995PLC084781": "TCS",
            "U72200KA2009PLC050684": "Infosys",
            "U74120TG2004PTC043417": "Deloitte"
        };

        if (panDatabase[panNumber]) {
            // Success Animation and Unlock Fields
            verifyPanButton.textContent = "Verified";
            verifyPanButton.style.backgroundColor = "Green";
            verificationStatus.textContent = `Welcome ${panDatabase[panNumber]}! Your PAN Number is Verified.`;
            verificationStatus.style.color = "green";
            unlockFields();
        } else {
            // Failure Animation
            verifyPanButton.textContent = "Not Verified";
            verifyPanButton.style.backgroundColor = "Red";
            verificationStatus.textContent = "Sorry! Your PAN Number is not Verified.";
            verificationStatus.style.color = "red";
            shakeElement(businessPancardInput);
        }
    });

    // Unlock form fields after successful PAN verification
    function unlockFields() {
        companyDetails.classList.remove("locked");
        submitButton.classList.remove("locked");
        submitButton.disabled = false;

        gsap.to(companyDetails, { opacity: 1, duration: 0.5 });
        gsap.to(submitButton, { opacity: 1, duration: 0.5 });
    }

    // Shake animation for invalid input
    function shakeElement(element) {
        gsap.fromTo(
            element,
            { x: -10 },
            { x: 10, repeat: 5, yoyo: true, duration: 0.2 }
        );
    }
});
