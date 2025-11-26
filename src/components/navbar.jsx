import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-slate-500 w-full h-18 flex justify-between items-center p-4 gap-4 px-18 absolute">
      <a
        onClick={() => {
          navigate("/home");
        }}
      >
        <h1 className="text-white font-bold text-4xl cursor-pointer">
          AEROCODE
        </h1>
      </a>
      <div className="flex gap-8">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="w-10 h-10 cursor-pointer"
        >
          <img src="/img/personIcon.png" alt="" />
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="w-10 h-10 cursor-pointer"
        >
          <img src="/img/outIcon.png" alt="" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
