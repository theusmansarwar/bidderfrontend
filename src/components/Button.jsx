const Button = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-10 py-1.5 border-2 border-[#0DBB56] bg-[#0DBB56] text-white hover:bg-transparent hover:text-black hover:opacity-95 cursor-pointer transition-all rounded-full"
    >
      {title}
    </button>
  );
};

export default Button;
