const SERVER = process.env.REACT_APP_SERVER;

const getRoles = async () => {
    try {
        let response = await fetch(`${SERVER}/role/all`)

        if (response.status === 401) {
            throw new Error('You are not authorized');
        }

        if (!response.ok) {
            throw new Error('Failed');
        }

        let { data } = await response.json();

        return data;

    } catch (error) {
        throw new Error(error.message);
    }
}

const addRole = async (payload) => {

    if (!payload) {
        throw new Error('Payload not found');
    }

    try {
        let response = await fetch(`${SERVER}/role/add`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.status === 401) {
            throw new Error('You are not authorized');
        }

        if (!response.ok) {
            throw new Error('Failed');
        }

    } catch (error) {
        throw new Error(error.message);
    }
}

const getRoleById = async (id) => {

    try {
        let response = await fetch(`${SERVER}/role/details/${id}`)

        if (response.status === 401) {
            throw new Error('You are not authorized');
        }

        if (!response.ok) {
            throw new Error('Failed');
        }

        let { data } = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateRole = async (props, id) => {
    try {
        let response = await fetch(`${SERVER}/role/edit/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(props),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.status === 401) {
            throw new Error('You are not authorized');
        }

        if (!response.ok) {
            throw new Error('Failed');
        }

    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteRole = async (id) => {
    try {
        let response = await fetch(`${SERVER}/role/remove/${id}`, { method: 'DELETE' });

        if (response.status === 401) {
            throw new Error('You are not authorized');
        }

        if (response.status === 403) {
            throw new Error('Role is assigned to some users');
        }

        if (!response.ok) {
            throw new Error('Failed');
        }

    } catch (error) {
        throw new Error(error);
    }
}

export { getRoles, addRole, getRoleById, updateRole, deleteRole }