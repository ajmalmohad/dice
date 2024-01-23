type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
}[];

const certificatesData: Certificate = [
  {
    id: "1",
    title: "Web Development",
    issuer: "Coursera",
    issueDate: "2021-08-25",
    expiryDate: "2021-08-25",
  },
  {
    id: "2",
    title: "Python for Data Science and AI",
    issuer: "Coursera",
    issueDate: "2021-08-25",
    expiryDate: "2021-08-25",
  },
  {
    id: "3",
    title: "Introduction to Data Science in Python",
    issuer: "Coursera",
    issueDate: "2021-08-25",
    expiryDate: "2021-08-25",
  },
  {
    id: "4",
    title: "Introduction to HTML5",
    issuer: "Coursera",
    issueDate: "2021-08-25",
    expiryDate: "2021-08-25",
  },
  {
    id: "5",
    title: "Introduction to CSS3",
    issuer: "Coursera",
    issueDate: "2021-08-25",
    expiryDate: "2021-08-25",
  },
  {
    id: "6",
    title: "Interactivity with JavaScript",
    issuer: "Coursera",
    issueDate: "2021-08-25",
    expiryDate: "2021-08-25",
  },
  {
    id: "7",
    title: "Single Page Web Applications with AngularJS",
    issuer: "Coursera",
    issueDate: "2021-08-25",
    expiryDate: "2021-08-25",
  },
  {
    id: "8",
    title: "Front-End Web Development with React",
    issuer: "Coursera",
    issueDate: "2021-08-25",
    expiryDate: "2021-08-25",
  },
  {
    id: "9",
    title: "Front-End Web UI Frameworks and Tools: Bootstrap 4",
    issuer: "Coursera",
    issueDate: "2021-08-25",
    expiryDate: "2021-08-25",
  },
  {
    id: "10",
    title: "Multiplatform Mobile App Development with React Native",
    issuer: "Coursera",
    issueDate: "2021-08-25",
    expiryDate: "2021-08-25",
  },
  {
    id: "11",
    title: "Multiplatform Mobile App Development with React Native",
    issuer: "Coursera",
    issueDate: "2021-08-25",
    expiryDate: "2021-08-25",
  },
  {
    id: "12",
    title: "Multiplatform Mobile App Development with React Native",
    issuer: "Coursera",
    issueDate: "2021-08-25",
    expiryDate: "2021-08-25",
  },
];

export default function getStudentCertificates() {
  return certificatesData;
}
