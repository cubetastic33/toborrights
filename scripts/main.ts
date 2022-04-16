const toast = document.getElementById("toast");

export function show_toast(message: string, duration: number = 2000) {
    toast.innerText = message;
    toast.style.display = "fixed";
    // After duration, slide the toast out of view
    setTimeout(() => toast.className = "slide-down", duration);
    setTimeout(() => {
        toast.className = "";
        toast.style.display = "none";
    }, duration + 500);
}
