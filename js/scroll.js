const observer = new IntersectionObserver((entries) => {
    entries.forEach((ele) => {
        if (ele.isIntersecting) {
            ele.target.classList.add("showing");
        }
    })
})

const HiddenElements = document.querySelectorAll(".hidden");
HiddenElements.forEach((ele) => {
    observer.observe((ele))
}); 