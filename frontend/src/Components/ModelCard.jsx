const ModelCard = ({ model, onClick }) => {
    return (
        <div
            className="p-4 border rounded cursor-pointer bg-gray-100 hover:bg-gray-200 transition"
            onClick={() => onClick(model.url)}
        >
            <h2 className="text-lg font-semibold">{model.name}</h2>
            <p className="text-sm text-gray-600">{model.description}</p>
        </div>
    );
};

export default ModelCard;
