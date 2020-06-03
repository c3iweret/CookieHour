import StudentDashboard from "../views/StudentDashboard/StudentDashboard";
import TeacherDashboard from "../views/TeacherDashboard/TeacherDashboard";
import OfficeHours from "../views/OfficeHours/OfficeHours";
import Settings from "../views/Settings/Settings";

const appRoutes = [
  {
    path: "/student/dashboard",
    user: "student",
    name: "Courses",
    icon: "pe-7s-bookmarks",
    component: StudentDashboard
  },
  {
    path: "/student/officehours",
    name: "Office Hours",
    icon: "pe-7s-albums",
    component: OfficeHours
  },
  {
    path: "/teacher/dashboard",
    user: "teacher",
    name: "Courses",
    icon: "pe-7s-bookmarks",
    component: TeacherDashboard
  },
  {
    path: "/teacher/officehours",
    name: "Office Hours",
    icon: "pe-7s-albums",
    component: OfficeHours
  },
  {
    path: "/teacher/settings",
    user: "teacher",
    name: "Settings",
    icon: "pe-7s-config",
    component: Settings
  }
  // { redirect: true, path: "/", to: "/", name: "Home" }
];

export default appRoutes;
