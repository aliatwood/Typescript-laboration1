import './styles/styles.scss';

interface CourseInfo {
    code: string;
    name: string;
    progression: "A" | "B" | "C";
    syllabus: string;
}

const codeInput = document.getElementById("code") as HTMLInputElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const progressionInput = document.getElementById("progression") as HTMLInputElement;
const syllabusInput = document.getElementById("syllabus") as HTMLInputElement;
const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
const tableBody = document.getElementById("course-list") as HTMLTableSectionElement;

let courses: CourseInfo[] = [];

function loadCourses(): void {
    const data = localStorage.getItem("courses");
    if (data) {
        courses = JSON.parse(data) as CourseInfo[];
    }
}

function saveCourses(): void {
    localStorage.setItem("courses", JSON.stringify(courses));
}

function deleteCourse(index: number): void {
    courses.splice(index, 1);
    saveCourses();
    renderCourses();
}

function renderCourses(): void {
    tableBody.innerHTML = "";

    courses.forEach((course: CourseInfo, index: number) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${course.code}</td>
            <td>${course.name}</td>
            <td>${course.progression}</td>
            <td><a href="${course.syllabus}" target="_blank">View</a></td>
            <td><button data-index="${index}">Delete</button></td>
        `;

        const deleteBtn = row.querySelector("button") as HTMLButtonElement;
        deleteBtn.addEventListener("click", () => deleteCourse(index));

        tableBody.appendChild(row);
    });
}

function addCourse(): void {
    const code: string = codeInput.value.trim();
    const name: string = nameInput.value.trim();
    const progression: string = progressionInput.value.trim().toUpperCase();
    const syllabus: string = syllabusInput.value.trim();

    if (!code || !name || !progression || !syllabus) {
        alert("You have to fill all the fields!");
        return;
    }

    if (!["A", "B", "C"].includes(progression)) {
        alert("Progression must be A, B or C!");
        return;
    }

    const exists: boolean = courses.some((c: CourseInfo) => c.code === code);
    if (exists) {
        alert("Course code has to be unique!");
        return;
    }

    const newCourse: CourseInfo = {
        code,
        name,
        progression: progression as "A" | "B" | "C",
        syllabus
    };

    courses.push(newCourse);
    saveCourses();
    renderCourses();

    codeInput.value = "";
    nameInput.value = "";
    progressionInput.value = "";
    syllabusInput.value = "";
}

addBtn.addEventListener("click", addCourse);

loadCourses();
renderCourses();