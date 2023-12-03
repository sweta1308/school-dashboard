import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <main className="min-h-screen flex justify-center items-center flex-col">
      <img
        src="https://res.cloudinary.com/sweta-agarwalla/image/upload/v1688189080/6363147-removebg-preview_s5o7ju.png"
        alt="404 illustration"
      />
      <h2 className="font-bold text-xl">
        Oops! The page you’re trying to reach doesn’t exist.
      </h2>
      <Link
        to="/"
        className="mt-[10px] hover:text-primary-color hover:underline"
      >
        Click here to go back home
      </Link>
    </main>
  );
};
