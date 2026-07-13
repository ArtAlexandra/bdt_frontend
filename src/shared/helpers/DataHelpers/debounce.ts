import { debounce as Debounce } from 'ts-debounce';

interface IDebounceProps {
    callback: (...args: any[]) => void;
    time: number;
};

const debounce = ({ callback, time }: IDebounceProps) => {
    return Debounce(callback, time);
};

export default debounce;
