import { useState } from "react";
import { ItemInputForm } from "../../components/ItemInputForm";

const CreateItem = () => {

    const [key, setKey] = useState(0);

    return (
        <ItemInputForm key={key} clear={() => setKey((prev) => prev === 0 ? 1 : 0)} />
    )
}

export default CreateItem;
