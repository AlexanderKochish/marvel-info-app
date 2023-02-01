import { Skeleton } from '@mui/material';
import './skeleton.scss';

const MySkeleton = () => {
    return (
            <div className="skeleton">
            <p className="char__select">Please select a character to see information</p>
                <div className="skeleton__header">
                <Skeleton variant="circular" width={60} height={60} />
                <Skeleton variant="text" sx={{ fontSize: '3rem',width:'80%' }} />
                </div>
                <div className="skeleton__block">
                <Skeleton variant="rectangular" height={70} width={380}/>
                <Skeleton variant="text" sx={{ fontSize: '1rem',width:'100%' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem',width:'100%' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem',width:'100%' }} />
                </div>
            </div>
    )
}

export default MySkeleton;