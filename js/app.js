document.querySelectorAll(".checklist").forEach((checklist) => {
    const key = checklist.dataset.key;
    const checkboxes = checklist.querySelectorAll("input");

    // Load saved state
    const saved = JSON.parse(localStorage.getItem(key)) || [];

    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = saved[index] || false;

        checkbox.addEventListener("change", () => {
            const state = Array.from(checkboxes).map(cb => cb.checked);
            localStorage.setItem(key, JSON.stringify(state));
        });
    });
});
