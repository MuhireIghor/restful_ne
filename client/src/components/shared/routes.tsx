import { ImBooks } from "react-icons/im";
interface Route {
  icon: any;
  name: string;
  path: string;
  isPublic?: boolean;
}



export const StudentRoutes = [

  {
    icon: < ImBooks />,
    name: "Books",
    path: "/student/books",
  },
];


