document.addEventListener("DOMContentLoaded", () => {
    // Animate the title
    gsap.from(".animated-title", {
        duration: 1.2,
        y: -50,
        opacity: 0,
        ease: "bounce.out"
    });

    // Animate the form fields
    gsap.from("input", {
        duration: 1,
        x: -50,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out"
    });

    // Animate the login button
    gsap.from(".animated-submit", {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        delay: 1,
        ease: "elastic.out(1, 0.3)"
    });

    // Error animation for incorrect credentials
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", (event) => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Mock validation
        if (email !== "example@example.com" || password !== "password123") {
            event.preventDefault();
            gsap.fromTo(
                loginForm,
                { x: -10 },
                { x: 10, repeat: 5, yoyo: true, duration: 0.2 }
            );
        }
    });

    // Hover animation for buttons
    const button = document.querySelector(".animated-submit");
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
            backgroundColor: "#1a73e8",
            color: "#fff"
        });
    });
});
