import logo from "../src/assets/logo.png";

export const constants = {
  logo,
};

export const navBarLink = [
  { label: "Home", link: "/" },
  { label: "About", link: "/about" },
  { label: "Page", link: "/page" },
  { label: "Contact", link: "/contact" },
  { label: "Support", link: "/support" },
];

export const authCardDetails = {
  signup: [
    {
      imgSrc:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/logo-design-template-35b0a3e2315d19a46c046165f315b000.jpg?ts=1592240511",
      btnLabel: "Student SignUp",
      redirectRoute: "student",
    },
    {
      imgSrc:
        "https://media.istockphoto.com/id/876177980/vector/university-vector.jpg?s=612x612&w=0&k=20&c=FqW7PHJFlpzTfK3ax3zPhxgTCgCnVQaPnnmTRPmdjjc=",
      btnLabel: "College Staff SignUp",
      redirectRoute: "college-staff",
    },
    {
      imgSrc:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/American_Broadcasting_Company_Logo.svg/767px-American_Broadcasting_Company_Logo.svg.png",
      btnLabel: "Company SignUp",
      redirectRoute: "company",
    },
  ],
  login: [
    {
      imgSrc:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/logo-design-template-35b0a3e2315d19a46c046165f315b000.jpg?ts=1592240511",
      btnLabel: "Student Login",
      redirectRoute: "student",
      btnColour: "blue",
    },

    {
      imgSrc:
        "https://media.istockphoto.com/id/876177980/vector/university-vector.jpg?s=612x612&w=0&k=20&c=FqW7PHJFlpzTfK3ax3zPhxgTCgCnVQaPnnmTRPmdjjc=",
      btnLabel: "College Staff Login",
      redirectRoute: "college-staff",
      btnColour: "blue",
    },
    {
      imgSrc:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/American_Broadcasting_Company_Logo.svg/767px-American_Broadcasting_Company_Logo.svg.png",
      btnLabel: "Company Login",
      redirectRoute: "company",
      btnColour: "blue",
    },
  ],
};
