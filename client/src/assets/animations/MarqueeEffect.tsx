import "../styles/marquee.css";

interface MarqueeEffectProps {
  title: string;
  subtitle: string;
}

const MarqueeEffect: React.FC<MarqueeEffectProps> = ({ title, subtitle }) => {
  return (
    <div className="content">
      <div className="marquee">
        <div className="marquee_blur" aria-hidden="true">
          <p className="marquee_text">{title}</p>
        </div>
        <div className="marquee_clear">
          <p className="marquee_text">{title}</p>
        </div>
      </div>
      <p className="text">{subtitle}</p>
    </div>
  );
};

export default MarqueeEffect;
