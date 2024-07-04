import { useLocation } from 'react-router-dom'

const useActive = () => {

    const { pathname } = useLocation();

    const isActive = (path = '', type = 'normal') => {

        if (type === 'normal') {
            return path === pathname;
        }

        return pathname.includes(path)
    }

    return { isActive }
}

export { useActive }
