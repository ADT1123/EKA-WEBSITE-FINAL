// src/components/EkaLogo.tsx
type EkaLogoProps = {
  className?: string;
};

const EkaLogo = ({ className }: EkaLogoProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 120 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="EKA logo"
    >
      <defs>
        <linearGradient id="ekaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f973b7" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      {/* Circular mark */}
      <circle cx="16" cy="16" r="14" fill="url(#ekaGradient)" />
      <path
        d="M11 17.5c1.2-2.4 2.6-4.6 5.1-6.5 2.1-1.5 4.4-2.4 6.4-2.7"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M13 20.5c1.4 1.4 3.1 2.3 5.3 2.6"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Simple “EKA” wordmark */}
      <g transform="translate(40, 7)" fill="#111827">
        {/* E */}
        <path d="M0 0h8c1.1 0 2 .9 2 2v1H3v4h5v3H3v4h7v3H0V0z" />
        {/* K */}
        <path d="M15 0h4v7l4-7h4l-4.5 7.3L31 18h-4.2l-3.8-6.3V18h-4V0z" />
        {/* A */}
        <path d="M36 0h4l6 18h-4.3l-1-3.3h-5.6l-1 3.3H30L36 0zm3.4 11.4-1.8-6.1-1.8 6.1h3.6z" />
      </g>
    </svg>
  );
};

export default EkaLogo;
