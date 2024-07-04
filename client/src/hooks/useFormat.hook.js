const useFormat = () => {

    const format = (raw) => {

        if (!raw) return null;

        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = new Date(raw).toLocaleDateString('en-US', options);
        return formattedDate;
    }

    return { format };
}

export { useFormat }