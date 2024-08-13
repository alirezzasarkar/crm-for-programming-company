interface Title {
  title: string;
}

const Title: React.FC<Title> = ({ title }) => {
  return (
    <>
      <h2 className="text-md mb-4 font-bold text-blue-600">{title}</h2>
      <div className="border-t border-gray-300 w-full"></div>
    </>
  );
};

export default Title;
