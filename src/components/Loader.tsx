interface LoaderProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
  className?: string
}

export default function Loader({ size = 'medium', color = '#007bff', className = '' }: LoaderProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-current`}
        style={{ borderTopColor: color }}
      />
    </div>
  )
} 