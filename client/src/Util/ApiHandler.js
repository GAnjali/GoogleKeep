import axios from "axios";

const getNotes = async () => {
    try {
        return await axios.get("http://localhost:3000/notes");
    } catch (err) {
        return err;
    }
};

export default getNotes;