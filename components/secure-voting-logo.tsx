"use client"

interface SecureVotingLogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
}

export function SecureVotingLogo({ className = "", size = "md", showText = true }: SecureVotingLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-xl",
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Shield Outline */}
          <path
            d="M50 5C50 5 25 15 25 15C25 15 25 45 25 45C25 65 50 85 50 85C50 85 75 65 75 65C75 45 75 15 75 15C75 15 50 5 50 5Z"
            stroke="#EA580C"
            strokeWidth="4"
            fill="none"
          />

          {/* Checkmark */}
          <path
            d="M35 45L45 55L65 35"
            stroke="#EA580C"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Padlock */}
          <g transform="translate(55, 55)">
            {/* Lock Body */}
            <rect x="0" y="8" width="16" height="12" rx="2" fill="#EA580C" />
            {/* Lock Shackle */}
            <path
              d="M4 8V6C4 3.79086 5.79086 2 8 2C10.2091 2 12 3.79086 12 6V8"
              stroke="#EA580C"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Keyhole */}
            <circle cx="8" cy="13" r="1.5" fill="white" />
            <rect x="7.5" y="13" width="1" height="3" fill="white" />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-orange-600 dark:text-orange-500 leading-tight ${textSizeClasses[size]}`}>
            SECURE
          </span>
          <span className={`font-bold text-orange-600 dark:text-orange-500 leading-tight ${textSizeClasses[size]}`}>
            VOTING
          </span>
        </div>
      )}
    </div>
  )
}
