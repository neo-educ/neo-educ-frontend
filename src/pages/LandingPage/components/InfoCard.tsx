
interface InfoCardProps {
    title: string;
    description: string;
    icon: string;
}
const InfoCard = ({
    title,
    description,
    icon,
}:InfoCardProps) => {
  return (
    <div className="flex flex-col p-4 rounded border border-black shadow-md ">
        <div>
            <i className={`${icon} text-4xl text-ne_primary`}></i>
            <h3>{title}</h3>
            <p className="text-sm text-gray-700">{description}</p>
        </div>
    </div>
  )
}

export default InfoCard