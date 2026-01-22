export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <svg width="40" height="40" viewBox="0 0 40 40" className="text-white">
          <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 15 L20 25 L28 15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="20" cy="12" r="2" fill="currentColor"/>
        </svg>
      </div>
      <span className="text-xl font-bold text-white tracking-wide">GR</span>
    </div>
  );
}