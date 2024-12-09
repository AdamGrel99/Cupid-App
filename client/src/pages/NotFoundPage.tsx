import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      404 Not Found
      <Link to="/">Home</Link>
    </>
  );
}

export default NotFoundPage;
