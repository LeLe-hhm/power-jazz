import './index.scss';

interface OverlayProps {
  show: boolean;
  onClick: () => void;
}

const Overlay = ({ show, onClick }: OverlayProps) => {
  return show ? (
    <div className="overlay" onClick={onClick} />
  ) : null;
};

export default Overlay; 