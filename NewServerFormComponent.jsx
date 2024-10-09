import { db } from '../firebase/firebase';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';

function AddServerForm() {
    const [serverData, setServerData] = useState({
        servername: '',
        serverdesc: '',
        serverimg: ''
    });

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const docRef = await addDoc(collection(db, 'servers'), {
                servername: serverData.servername,
                serverdesc: serverData.serverdesc,
                serverimg: serverData.serverimg
            });
            console.log('Document written with ID:', docRef.id);
        } catch (e) {
            console.error('Error adding document:', e);
        }
    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setServerData({
            ...serverData,
            [name]: value
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Server Name:</label>
                    <input
                        type="text"
                        name="servername"
                        value={serverData.servername}
                        onChange={handleInputChange}
                        placeholder="Enter server name"
                        required
                    />
                </div>
                <div>
                    <label>Server Description:</label>
                    <input
                        type="text"
                        name="serverdesc"
                        value={serverData.serverdesc}
                        onChange={handleInputChange}
                        placeholder="Enter server description"
                        required
                    />
                </div>
                <div>
                    <label>Server Image Link:</label>
                    <input
                        type="text"
                        name="serverimg"
                        value={serverData.serverimg}
                        onChange={handleInputChange}
                        placeholder="Enter server image link"
                        required
                    />
                </div>
                <button type="submit">Add Server</button>
            </form>
            <div>This is some data</div>
        </div>
    );
}

export default AddServerForm;
