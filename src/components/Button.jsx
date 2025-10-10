const Button = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className=" lg:px-6 lg:py-1.5 px-6 py-1 border-2 border-[#0DBB56] bg-[#0DBB56] text-white text-sm lg:text-base hover:bg-transparent hover:text-black hover:opacity-95 cursor-pointer transition-all rounded-full"
    >
      {title}
    </button>
  );
};

export default Button;
